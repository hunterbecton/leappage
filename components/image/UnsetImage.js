import Image from 'next/image';

export const UnsetImage = ({ alt, src }) => {
  return (
    <div className='unset-img-container'>
      <Image src={src} alt={alt} layout='fill' className='unset-img' />
    </div>
  );
};
