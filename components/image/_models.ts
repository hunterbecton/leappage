import { ImageProps } from 'next/image';

export interface FallbackImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
  width?: ImageProps['width'];
  height?: ImageProps['height'];
  layout: ImageProps['layout'];
  objectFit: ImageProps['objectFit'];
}
