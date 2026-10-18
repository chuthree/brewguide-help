'use client'

import { copyText } from '@/lib/clipboard'

import {
    autoUpdate,
    flip,
    FloatingPortal,
    FloatingFocusManager,
    offset,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
    useTransitionStyles,
} from '@floating-ui/react'
import {
    isValidElement,
    type ReactNode,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useReducer,
    useRef,
    useState,
} from 'react'

interface InlineTextPreviewTagProps {
    label: string
    content?: string
    children?: ReactNode
    className?: string
    autoCopy?: boolean
    collapsedHeight?: number
    emptyText?: string
    downloadUrl?: string
}

const defaultTriggerClassName =
    'inline cursor-pointer text-inherit underline decoration-current/35 underline-offset-2 transition-opacity hover:opacity-75'

interface PreviewState {
    isOpen: boolean
    hasOpenedOnce: boolean
    hasOverflow: boolean
    copied: boolean
    copiedLeaving: boolean
}

type PreviewAction =
    | { type: 'set-open'; open: boolean }
    | { type: 'set-overflow'; hasOverflow: boolean }
    | { type: 'show-copied' }
    | { type: 'leave-copied' }
    | { type: 'hide-copied' }

const initialPreviewState: PreviewState = {
    isOpen: false,
    hasOpenedOnce: false,
    hasOverflow: false,
    copied: false,
    copiedLeaving: false,
}

function previewReducer(
    state: PreviewState,
    action: PreviewAction
): PreviewState {
    switch (action.type) {
        case 'set-open':
            return {
                ...state,
                isOpen: action.open,
                hasOpenedOnce: state.hasOpenedOnce || action.open,
            }
        case 'set-overflow':
            return { ...state, hasOverflow: action.hasOverflow }
        case 'show-copied':
            return { ...state, copied: true, copiedLeaving: false }
        case 'leave-copied':
            return { ...state, copiedLeaving: true }
        case 'hide-copied':
            return { ...state, copied: false, copiedLeaving: false }
    }
}

function flattenText(node: ReactNode): string {
    if (node === null || node === undefined || typeof node === 'boolean') {
        return ''
    }
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node)
    }
    if (Array.isArray(node)) {
        return node.map(flattenText).join('')
    }
    if (isValidElement<{ children?: ReactNode }>(node)) {
        return flattenText(node.props.children)
    }
    return ''
}

export default function InlineTextPreviewTagClient({
    label,
    content,
    children,
    className,
    autoCopy = true,
    collapsedHeight = 180,
    emptyText,
    downloadUrl,
}: InlineTextPreviewTagProps) {
    const [state, dispatch] = useReducer(previewReducer, initialPreviewState)
    const [copyError, setCopyError] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const copiedVisibleTimerRef = useRef<number | null>(null)
    const copiedLeaveTimerRef = useRef<number | null>(null)
    const textRef = useRef<HTMLPreElement | null>(null)

    const popupId = `inline-text-preview-${useId().replace(/:/g, '')}`
    const resolvedContent = useMemo(() => {
        if (content !== undefined) {
            return content
        }
        return flattenText(children)
    }, [children, content])

    const hasText = resolvedContent.trim().length > 0
    const displayText = hasText ? resolvedContent : (emptyText ?? '暂无内容')

    const clearCopiedTimers = useCallback(() => {
        if (copiedVisibleTimerRef.current !== null) {
            window.clearTimeout(copiedVisibleTimerRef.current)
            copiedVisibleTimerRef.current = null
        }
        if (copiedLeaveTimerRef.current !== null) {
            window.clearTimeout(copiedLeaveTimerRef.current)
            copiedLeaveTimerRef.current = null
        }
    }, [])

    const handleCopy = useCallback(async () => {
        if (!hasText) {
            return
        }
        try {
            await copyText(resolvedContent)
            setCopyError(false)
            dispatch({ type: 'show-copied' })
            clearCopiedTimers()
            copiedVisibleTimerRef.current = window.setTimeout(() => {
                dispatch({ type: 'leave-copied' })
                copiedLeaveTimerRef.current = window.setTimeout(() => {
                    dispatch({ type: 'hide-copied' })
                }, 260)
            }, 1800)
        } catch (error) {
            setCopyError(true)
            console.error('复制失败:', error)
        }
    }, [clearCopiedTimers, hasText, resolvedContent])

    const { refs, floatingStyles, context } = useFloating({
        open: state.isOpen,
        onOpenChange: (open) => {
            dispatch({ type: 'set-open', open })
            if (open) {
                if (autoCopy) {
                    void handleCopy()
                }
            }
        },
        placement: 'bottom-start',
        strategy: 'fixed',
        transform: false,
        middleware: [offset(6), flip({ padding: 12 }), shift({ padding: 12 })],
        whileElementsMounted: autoUpdate,
    })

    const click = useClick(context)
    const dismiss = useDismiss(context)
    const role = useRole(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role,
    ])
    const { isMounted, styles: transitionStyles } = useTransitionStyles(
        context,
        {
            duration: { open: 260, close: 220 },
            initial: {
                opacity: 0,
                transform: 'translateY(-4px) scale(0.99)',
            },
            open: {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
            },
            close: {
                opacity: 0,
                transform: 'translateY(-2px) scale(0.995)',
            },
            common: {
                transitionTimingFunction: 'cubic-bezier(0.3, 0, 0.2, 1)',
            },
        }
    )

    const setReference = useCallback(
        (node: HTMLButtonElement | null) => {
            refs.setReference(node)
        },
        [refs]
    )
    const setFloating = useCallback(
        (node: HTMLDivElement | null) => {
            refs.setFloating(node)
        },
        [refs]
    )

    const checkOverflow = useCallback(() => {
        if (!textRef.current) {
            dispatch({ type: 'set-overflow', hasOverflow: false })
            return
        }
        dispatch({
            type: 'set-overflow',
            hasOverflow: textRef.current.scrollHeight > collapsedHeight + 1,
        })
    }, [collapsedHeight])

    useEffect(() => {
        if (!isMounted) {
            return
        }
        const rafId = window.requestAnimationFrame(checkOverflow)
        const handleResize = () => {
            checkOverflow()
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.cancelAnimationFrame(rafId)
            window.removeEventListener('resize', handleResize)
        }
    }, [checkOverflow, displayText, isMounted])

    useEffect(() => {
        return () => {
            clearCopiedTimers()
        }
    }, [clearCopiedTimers])

    return (
        <>
            <button
                ref={setReference}
                type="button"
                aria-expanded={state.isOpen}
                aria-controls={popupId}
                className={className || defaultTriggerClassName}
                {...getReferenceProps()}
            >
                {label}
            </button>

            {isMounted || state.hasOpenedOnce ? (
                <FloatingPortal>
                    <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
                    <div
                        id={popupId}
                        ref={setFloating}
                        aria-hidden={!state.isOpen}
                        inert={!state.isOpen}
                        aria-label={label}
                        style={{
                            ...floatingStyles,
                            ...(isMounted
                                ? transitionStyles
                                : {
                                      opacity: 0,
                                      transform:
                                          'translateY(-2px) scale(0.995)',
                                      visibility: 'hidden',
                                      pointerEvents: 'none',
                                  }),
                        }}
                        className="fixed z-50 w-[min(92vw,30rem)] rounded-xl bg-white p-1 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_2px_-1px_rgb(0_0_0/0.06),0_2px_4px_0_rgb(0_0_0/0.04)]"
                        {...getFloatingProps()}
                    >
                        <div className="relative overflow-hidden rounded-lg bg-neutral-50 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_2px_-1px_rgb(0_0_0/0.06),0_2px_4px_0_rgb(0_0_0/0.04)]">
                            <pre
                                ref={textRef}
                                style={{
                                    maxHeight: expanded ? '60vh' : `${collapsedHeight}px`,
                                    overflow: expanded ? 'auto' : 'hidden',
                                }}
                                className="overflow-hidden bg-neutral-50 px-3 py-2 font-mono text-[12px] leading-5 break-all whitespace-pre-wrap text-neutral-700"
                            >
                                {displayText}
                            </pre>
                            {state.copied ? (
                                <div
                                    className={`pointer-events-none absolute bottom-0 left-0 z-10 rounded-tr-sm rounded-bl-lg bg-linear-to-t from-emerald-100 to-emerald-50 px-1 py-1 text-[11px] leading-none text-emerald-700 transition-all duration-260 ease-[cubic-bezier(0.3,0,0.2,1)] ${
                                        state.copiedLeaving
                                            ? 'opacity-0'
                                            : 'opacity-100'
                                    }`}
                                >
                                    已复制
                                </div>
                            ) : null}
                            {state.hasOverflow && !expanded ? (
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 rounded-b-lg bg-linear-to-b from-transparent to-neutral-50" />
                            ) : null}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 px-2 py-2 text-xs text-neutral-500">
                            <button type="button" className="cursor-pointer hover:text-fd-foreground" onClick={() => void handleCopy()}>复制 SQL</button>
                            {state.hasOverflow && <button type="button" className="cursor-pointer hover:text-fd-foreground" onClick={() => setExpanded(!expanded)}>{expanded ? '收起' : '展开全文'}</button>}
                            {downloadUrl && <a href={downloadUrl} download className="hover:text-fd-foreground">下载 SQL</a>}
                            <span role="status">{copyError ? '复制失败，请展开全文手动复制或下载。' : state.copied ? '已复制' : ''}</span>
                        </div>
                    </div>
                </FloatingFocusManager>
                </FloatingPortal>
            ) : null}
        </>
    )
}
