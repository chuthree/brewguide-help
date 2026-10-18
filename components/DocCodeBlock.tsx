'use client';

import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { copyText } from '@/lib/clipboard';

export default function DocCodeBlock({ children, ...props }: ComponentProps<'pre'>) {
  const reduceMotion = useReducedMotion();
  const codeRef = useRef<HTMLPreElement>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  useEffect(() => () => {
    if (resetRef.current) clearTimeout(resetRef.current);
  }, []);

  async function handleCopy() {
    if (!codeRef.current) return;
    if (resetRef.current) clearTimeout(resetRef.current);
    try {
      await copyText(codeRef.current.textContent ?? '');
      setStatus('copied');
    } catch {
      setStatus('error');
    }
    resetRef.current = setTimeout(() => setStatus('idle'), 2000);
  }

  const label = status === 'copied' ? '已复制' : status === 'error' ? '复制失败，请手动选择内容复制' : '复制内容';

  return (
    <div className="doc-code-block">
      <div className="doc-code-row">
        <span className="doc-code-prompt" aria-hidden="true">$</span>
        <pre {...props} ref={codeRef} tabIndex={0}>{children}</pre>
        <LazyMotion features={domAnimation}>
          <m.button type="button" className="doc-code-copy" onClick={handleCopy} aria-label={label} title={label}>
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span
                className="doc-code-copy-icon"
                key={status}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.25 }}
                transition={{ type: 'spring', duration: reduceMotion ? 0 : 0.3, bounce: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {status === 'copied' ? <path d="m20 6-11 11-5-5" /> : status === 'error' ? <path d="m6 6 12 12M6 18 18 6" /> : <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>}
                </svg>
              </m.span>
            </AnimatePresence>
          </m.button>
        </LazyMotion>
      </div>
      <span role="status" className={status === 'error' ? 'doc-code-error' : 'sr-only'}>{status === 'idle' ? '' : label}</span>
    </div>
  );
}
