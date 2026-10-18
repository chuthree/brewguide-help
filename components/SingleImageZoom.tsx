'use client';

import Image, { type ImageProps } from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controlled as Zoom } from 'react-medium-image-zoom';

export type DocumentImageProps = ImageProps;

function CloseIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export default function SingleImageZoom(props: DocumentImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomMargin, setZoomMargin] = useState(24);

  const updateMargin = useCallback(() => {
    const image = ref.current?.querySelector('img');
    if (!image?.naturalWidth || !image.naturalHeight) return;
    const ratio = image.naturalWidth / image.naturalHeight;
    const width = Math.min(800, Math.max(1, window.innerWidth - 48), window.innerHeight * 0.75 * ratio);
    // RMIZ fits into a uniform viewport inset. The smaller inset constrains
    // either width or height to the desired image size without stretching it.
    setZoomMargin(Math.max(24, Math.min(
      (window.innerWidth - width) / 2,
      (window.innerHeight - width / ratio) / 2,
    )));
  }, []);

  useEffect(() => {
    if (!isZoomed) return;
    window.addEventListener('resize', updateMargin, { passive: true });
    return () => window.removeEventListener('resize', updateMargin);
  }, [isZoomed, updateMargin]);

  return (
    <div ref={ref}>
      <Zoom
        isZoomed={isZoomed}
        onZoomChange={(next) => {
          if (next) updateMargin();
          setIsZoomed(next);
        }}
        zoomMargin={zoomMargin}
        IconUnzoom={CloseIcon}
        a11yNameButtonZoom={props.alt ? `放大图片：${props.alt}` : '放大图片'}
        a11yNameButtonUnzoom="关闭图片"
      >
        <Image {...props} alt={props.alt ?? ''} />
      </Zoom>
    </div>
  );
}
