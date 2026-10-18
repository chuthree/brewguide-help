'use client'

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
import ImageZoom from './SingleImageZoom'
import { useCallback, useEffect, useId, useState } from 'react'

interface InlineImagePreviewTagProps {
    label: string
    imageSrc: string
    imageAlt: string
    className?: string
}

export default function InlineImagePreviewTag({
    label,
    imageSrc,
    imageAlt,
    className,
}: InlineImagePreviewTagProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [hasOpenedOnce, setHasOpenedOnce] = useState(false)
    const popupId = `inline-image-preview-${useId().replace(/:/g, '')}`
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: (open) => {
            setIsOpen(open)
            if (open) {
                setHasOpenedOnce(true)
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
            duration: {
                open: 260,
                close: 220,
            },
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
        (node: HTMLAnchorElement | null) => {
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

    useEffect(() => {
        const img = new window.Image()
        img.src = imageSrc
    }, [imageSrc])

    return (
        <>
            <a
                ref={setReference}
                href={imageSrc}
                aria-expanded={isOpen}
                aria-controls={popupId}
                className={className}
                {...getReferenceProps({
                    onClick: (event) => {
                        event.preventDefault()
                    },
                })}
            >
                {label}
            </a>

            {isMounted || hasOpenedOnce ? (
                <FloatingPortal>
                    <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
                    <div
                        id={popupId}
                        ref={setFloating}
                        aria-hidden={!isOpen}
                        inert={!isOpen}
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
                        className="fixed z-50 w-40 rounded-xl bg-white p-1 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_2px_-1px_rgb(0_0_0/0.06),0_2px_4px_0_rgb(0_0_0/0.04)]"
                        {...getFloatingProps()}
                    >
                        <div className="overflow-hidden rounded-lg shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_2px_-1px_rgb(0_0_0/0.06),0_2px_4px_0_rgb(0_0_0/0.04)]">
                            <ImageZoom
                                src={imageSrc}
                                alt={imageAlt}
                                width={512}
                                height={512}
                                loading="eager"
                                className="h-auto w-full"
                            />
                        </div>
                    </div>
                </FloatingFocusManager>
                </FloatingPortal>
            ) : null}
        </>
    )
}
