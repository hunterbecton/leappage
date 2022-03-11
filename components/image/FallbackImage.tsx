import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { FallbackImageProps } from './_models';

export const FallbackImage: FC<FallbackImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc ? imgSrc : '/images/not-found.png'}
      className={className}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};
