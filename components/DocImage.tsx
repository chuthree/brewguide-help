import type { DocumentImageProps } from './SingleImageZoom';
import ImageZoom from './SingleImageZoom';

export default function DocImage(props: DocumentImageProps) {
  return (
    <div className="md-image-frame md-block">
      <ImageZoom {...props} className={`md-image ${props.className ?? ''}`} />
    </div>
  );
}
