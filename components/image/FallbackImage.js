import { useEffect, useState } from 'react';
import Image from 'next/image';

export const FallbackImage = (props) => {
  const { src, fallbackSrc, ...rest } = props;

  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};
