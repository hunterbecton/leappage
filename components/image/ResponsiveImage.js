import Image from 'next/image';

export const ResponsiveImage = ({ src, alt }) => {
  return (
    <div className='unset w-full'>
      <Image
        src={src}
        alt={alt}
        layout='fill'
        objectFit='contain'
        className='h-unset relative w-full object-contain'
      />
    </div>
  );
};
