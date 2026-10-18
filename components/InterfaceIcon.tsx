'use client';

import type { ComponentProps } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';

const paths = {
  link: <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />,
  check: <path d="m20 6-11 11-5-5" />,
  error: <path d="m6 6 12 12M6 18 18 6" />,
  left: <path d="m12 19-7-7 7-7M5 12h14" />,
  right: <path d="m9 6 6 6-6 6" />,
  download: <path d="M12 3v12m-5-5 5 5 5-5M5 16v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" />,
  external: <path d="M7 17 17 7M7 7h10v10" />,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
};

type InterfaceIconName = keyof typeof paths;

type Props = Omit<ComponentProps<'svg'>, 'name' | 'children'> & { name: InterfaceIconName };

export default function InterfaceIcon({ name, width = 18, height = width, ...props }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  );
}

export function AnimatedIcon({ name, width = 18, ...props }: Props) {
  const reduceMotion = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <span className="relative inline-flex shrink-0 items-center justify-center" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={name}
            className="inline-flex"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.25 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.25 }}
            transition={{ type: 'spring', duration: reduceMotion ? 0 : 0.3, bounce: 0 }}
          >
            <InterfaceIcon name={name} width={width} {...props} />
          </m.span>
        </AnimatePresence>
      </span>
    </LazyMotion>
  );
}
