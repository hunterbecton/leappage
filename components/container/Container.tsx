import { FC } from 'react';
import { ContainerProps } from './_models';

export const Container: FC<ContainerProps> = ({
  size,
  customClassName,
  style,
  children,
  ...other
}) => {
  switch (size) {
    case 'bottom-0':
      return (
        <div
          className={`px-4 pt-12 pb-0 ${customClassName}`}
          style={style}
          {...other}
        >
          {children}
        </div>
      );
    case 'top-0':
      return (
        <div
          className={`px-4 pt-0 pb-12 ${customClassName}`}
          style={style}
          {...other}
        >
          {children}
        </div>
      );
    case 'none':
      return (
        <div
          className={`px-4 py-0 ${customClassName}`}
          style={style}
          {...other}
        >
          {children}
        </div>
      );
    case 'xs':
      return (
        <div
          className={`px-4 py-4 ${customClassName}`}
          style={style}
          {...other}
        >
          {children}
        </div>
      );
    case 'sm':
      return (
        <div
          className={`px-4 py-6 ${customClassName}`}
          style={style}
          {...other}
        >
          {children}
        </div>
      );
    case 'md':
      return (
        <div
          className={`px-4 py-8 ${customClassName}`}
          style={style}
          {...other}
        >
          {children}
        </div>
      );
    case 'lg':
      return (
        <div
          className={`px-4 py-12 ${customClassName}`}
          style={style}
          {...other}
        >
          {children}
        </div>
      );
    default:
      return (
        <div
          className={`px-4 py-12 ${customClassName}`}
          style={style}
          {...other}
        >
          {children}
        </div>
      );
  }
};

Container.defaultProps = {
  size: 'lg',
  customClassName: 'bg-white',
};
