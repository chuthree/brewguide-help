'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { copyText } from '@/lib/clipboard'
import { iconButtonClass } from './iconButtonClass'

const RESET_COPIED_DELAY_MS = 2000

export default function CopyLinkButton() {
    const reduceMotion = useReducedMotion()
    const [failed, setFailed] = useState(false)
    const [copied, setCopied] = useState(false)
    const copiedResetTimeoutRef = useRef<number | null>(null)

    const clearCopiedResetTimeout = useCallback(() => {
        const timeoutId = copiedResetTimeoutRef.current
        if (timeoutId !== null) {
            window.clearTimeout(timeoutId)
            copiedResetTimeoutRef.current = null
        }
    }, [])

    useEffect(() => {
        return clearCopiedResetTimeout
    }, [clearCopiedResetTimeout])

    const showCopiedState = () => {
        clearCopiedResetTimeout()

        setCopied(true)
        copiedResetTimeoutRef.current = window.setTimeout(() => {
            setCopied(false)
            copiedResetTimeoutRef.current = null
        }, RESET_COPIED_DELAY_MS)
    }

    const handleCopy = async () => {
        setFailed(false)
        setCopied(false)
        try {
            await copyText(window.location.href)
            showCopiedState()
        } catch (err) {
            setFailed(true)
            console.error('复制失败:', err)
        }
    }

    return (
        <LazyMotion features={domAnimation}>
            <m.button
                type="button"
                onClick={handleCopy}
                className={iconButtonClass}
                aria-label={copied ? '链接已复制' : failed ? '复制失败，点击重试' : '复制文章链接'}
                title={copied ? '链接已复制' : failed ? '复制失败，点击重试' : '复制文章链接'}
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    <m.div
                        key={copied ? 'check' : 'link'}
                        initial={{
                            opacity: 0,
                            scale: 0.25,
                        }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.25 }}
                        transition={{
                            type: 'spring',
                            duration: reduceMotion ? 0 : 0.3,
                            bounce: 0,
                        }}
                    >
                        {copied ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m20 6-11 11-5-5" /></svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                        )}
                    </m.div>
                </AnimatePresence>
            </m.button>
            <span className={failed ? 'absolute right-0 top-full mt-2 w-64 text-right text-xs text-neutral-600' : 'sr-only'} role="status">{copied ? '链接已复制' : failed ? '复制失败，请复制浏览器地址栏中的链接。' : ''}</span>
        </LazyMotion>
    )
}
