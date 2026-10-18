'use client'

import Image from 'next/image'
import styles from './document.module.css'
import {
    LazyMotion,
    domAnimation,
    m,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from 'framer-motion'
import {
    useCallback,
    useRef,
    useState,
    type KeyboardEvent as ReactKeyboardEvent,
    type PointerEvent,
} from 'react'

interface BeforeAfterCompareProps {
    beforeSrc: string
    afterSrc: string
    frameSrc?: string
    beforeLabel?: string
    afterLabel?: string
    alt?: string
    className?: string
    initialSplit?: number
}

const MIN_SPLIT = 0
const MAX_SPLIT = 100
const KEYBOARD_STEP = 2
const SCREEN_TOP = 4.29
const SCREEN_BOTTOM = 4.29
const SCREEN_SIDE = 8.46
const SCREEN_WIDTH = 100 - SCREEN_SIDE * 2
const SCREEN_RADIUS = '10% / 4.8%'
const AFTER_CLIP_PATH = `inset(${SCREEN_TOP}% ${SCREEN_SIDE}% ${SCREEN_BOTTOM}% ${SCREEN_SIDE}% round ${SCREEN_RADIUS})`

function clampSplit(value: number): number {
    return Math.min(MAX_SPLIT, Math.max(MIN_SPLIT, value))
}

export default function BeforeAfterCompare({
    beforeSrc,
    afterSrc,
    frameSrc = '/brewguide/changelog/device-frame.webp',
    beforeLabel,
    afterLabel,
    alt = '重构前后界面对比图',
    className,
    initialSplit = 50,
}: BeforeAfterCompareProps) {
    const [split, setSplit] = useState(() => clampSplit(initialSplit))
    const [draggingPointerId, setDraggingPointerId] = useState<number | null>(
        null
    )

    const screenRef = useRef<HTMLDivElement>(null)

    const splitMotion = useMotionValue(clampSplit(initialSplit))
    const splitSpring = useSpring(splitMotion, {
        stiffness: 300,
        damping: 30,
        mass: 0.25,
    })

    const reduceMotion = useReducedMotion()
    const displayedSplit = reduceMotion ? splitMotion : splitSpring
    const sliderLeft = useTransform(displayedSplit, (value) => `${value}%`)
    const beforeClipPath = useTransform(displayedSplit, (value) => {
        const mappedSplit = SCREEN_SIDE + (value / 100) * SCREEN_WIDTH
        return `inset(${SCREEN_TOP}% ${100 - mappedSplit}% ${SCREEN_BOTTOM}% ${SCREEN_SIDE}% round ${SCREEN_RADIUS})`
    })

    const setSplitValue = useCallback(
        (next: number | ((prev: number) => number)) => {
            setSplit((prev) => {
                const nextValue =
                    typeof next === 'function' ? next(prev) : next
                const clamped = clampSplit(nextValue)
                splitMotion.set(clamped)
                return clamped
            })
        },
        [splitMotion]
    )

    const updateSplitFromPointer = useCallback(
        (clientX: number) => {
            const rect = screenRef.current?.getBoundingClientRect()
            if (!rect || rect.width <= 0) {
                return
            }

            const next = ((clientX - rect.left) / rect.width) * 100
            setSplitValue(next)
        },
        [setSplitValue]
    )

    const handlePointerDown = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (event.pointerType === 'mouse' && event.button !== 0) {
                return
            }

            event.preventDefault()
            setDraggingPointerId(event.pointerId)
            event.currentTarget.setPointerCapture(event.pointerId)
            updateSplitFromPointer(event.clientX)
        },
        [updateSplitFromPointer]
    )

    const handlePointerMove = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (draggingPointerId !== event.pointerId) {
                return
            }

            updateSplitFromPointer(event.clientX)
        },
        [draggingPointerId, updateSplitFromPointer]
    )

    const finishDragging = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (draggingPointerId !== event.pointerId) {
                return
            }

            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId)
            }
            setDraggingPointerId(null)
        },
        [draggingPointerId]
    )

    const handleKeyDown = useCallback(
        (event: ReactKeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
                event.preventDefault()
                setSplitValue((prev) => prev - KEYBOARD_STEP)
                return
            }

            if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
                event.preventDefault()
                setSplitValue((prev) => prev + KEYBOARD_STEP)
                return
            }

            if (event.key === 'Home') {
                event.preventDefault()
                setSplitValue(MIN_SPLIT)
                return
            }

            if (event.key === 'End') {
                event.preventDefault()
                setSplitValue(MAX_SPLIT)
            }
        },
        [setSplitValue]
    )

    const isDragging = draggingPointerId !== null
    const wrapperClassName = ['not-prose relative mx-0 my-8', className].filter(Boolean).join(' ')
    const imageSizes = '(max-width: 768px) 88vw, 520px'

    return (
        <LazyMotion features={domAnimation}>
            <figure className={wrapperClassName}>
                <div className="relative">
                    <m.div className={`relative mx-auto ${styles.mediaFrame}`}>
                    <div className="relative aspect-3/2 w-full">
                        <div className="absolute inset-0 flex items-center justify-center p-3">
                            <div className="relative aspect-1419/2796 h-full max-h-full bg-white select-none">
                                <div
                                    className="absolute inset-0 z-0"
                                    style={{ clipPath: AFTER_CLIP_PATH }}
                                >
                                    <Image
                                        src={afterSrc}
                                        alt={alt}
                                        fill
                                        draggable={false}
                                        className="object-contain"
                                        sizes={imageSizes}
                                    />
                                </div>
                                <m.div
                                    className="absolute inset-0 z-10"
                                    style={{ clipPath: beforeClipPath }}
                                >
                                    <Image
                                        src={beforeSrc}
                                        alt=""
                                        aria-hidden
                                        fill
                                        draggable={false}
                                        className="object-contain"
                                        sizes={imageSizes}
                                    />
                                </m.div>

                                <div
                                    ref={screenRef}
                                    className="absolute top-[4.29%] right-[8.46%] bottom-[4.29%] left-[8.46%] z-20 overflow-hidden"
                                    style={{ borderRadius: SCREEN_RADIUS }}
                                >
                                    <m.div
                                        role="slider"
                                        tabIndex={0}
                                        aria-label="拖动查看重构前后界面"
                                        aria-valuemin={MIN_SPLIT}
                                        aria-valuemax={MAX_SPLIT}
                                        aria-valuenow={Math.round(split)}
                                        aria-valuetext={`${Math.round(split)}%`}
                                        onKeyDown={handleKeyDown}
                                        onPointerDown={handlePointerDown}
                                        onPointerMove={handlePointerMove}
                                        onPointerUp={finishDragging}
                                        onPointerCancel={finishDragging}
                                        onLostPointerCapture={() =>
                                            setDraggingPointerId(null)
                                        }
                                        className="absolute inset-y-0 z-20 w-8 -translate-x-1/2 cursor-ew-resize touch-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:outline-none"
                                        style={{ left: sliderLeft }}
                                        animate={
                                            isDragging && !reduceMotion
                                                ? {
                                                      scaleX: 1.04,
                                                  }
                                                : {
                                                      scaleX: 1,
                                                  }
                                        }
                                        transition={{
                                            type: 'spring',
                                            stiffness: 340,
                                            damping: 28,
                                            mass: 0.24,
                                        }}
                                    >
                                        <m.div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 rounded-full bg-white/35"
                                            initial={false}
                                            animate={
                                                isDragging && !reduceMotion
                                                    ? {
                                                          opacity: 0.55,
                                                          scaleX: 1,
                                                      }
                                                    : {
                                                          opacity: 0,
                                                          scaleX: 0.72,
                                                      }
                                            }
                                            transition={{
                                                duration: 0.18,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        />
                                        <m.div
                                            aria-hidden
                                            className="pointer-events-none mx-auto h-full rounded-full bg-white"
                                            initial={false}
                                            animate={
                                                isDragging && !reduceMotion
                                                    ? {
                                                          width: 2,
                                                          opacity: 1,
                                                          boxShadow:
                                                              '0 0 10px rgba(255,255,255,0.7),0 2px 10px rgba(0,0,0,0.25)',
                                                      }
                                                    : {
                                                          width: 1,
                                                          opacity: 0.95,
                                                          boxShadow:
                                                              '0 1px 6px rgba(0,0,0,0.28),0 0 4px rgba(255,255,255,0.4)',
                                                      }
                                            }
                                            transition={{
                                                duration: 0.18,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        />
                                    </m.div>
                                </div>

                                {beforeLabel ? (
                                    <div className="pointer-events-none absolute top-3 left-3 z-30 rounded-full border border-black/8 bg-white/92 px-2 py-0.5 text-[11px] text-neutral-700 shadow-sm">
                                        {beforeLabel}
                                    </div>
                                ) : null}
                                {afterLabel ? (
                                    <div className="pointer-events-none absolute top-3 right-3 z-30 rounded-full border border-black/8 bg-white/92 px-2 py-0.5 text-[11px] text-neutral-700 shadow-sm">
                                        {afterLabel}
                                    </div>
                                ) : null}
                                <div className="pointer-events-none absolute inset-0 z-40">
                                    <Image
                                        src={frameSrc}
                                        alt=""
                                        aria-hidden
                                        fill
                                        draggable={false}
                                        className="object-contain"
                                        sizes={imageSizes}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    </m.div>
                </div>
            </figure>
        </LazyMotion>
    )
}
