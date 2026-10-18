'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatedIcon } from './InterfaceIcon'
import { copyText } from '@/lib/clipboard'
import { iconButtonClass } from './iconButtonClass'

const RESET_COPIED_DELAY_MS = 2000

export default function CopyLinkButton() {
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
        <>
            <button
                type="button"
                onClick={handleCopy}
                className={iconButtonClass}
                aria-label={copied ? '链接已复制' : failed ? '复制失败，点击重试' : '复制文章链接'}
                title={copied ? '链接已复制' : failed ? '复制失败，点击重试' : '复制文章链接'}
            >
                <AnimatedIcon name={copied ? 'check' : 'link'} />
            </button>
            <span className={failed ? 'absolute right-0 top-full mt-2 w-64 text-right text-xs text-neutral-600' : 'sr-only'} role="status">{copied ? '链接已复制' : failed ? '复制失败，请复制浏览器地址栏中的链接。' : ''}</span>
        </>
    )
}
