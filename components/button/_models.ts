import { MouseEventHandler, ReactNode } from 'react';

const ButtonSizeObj = {
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
} as const;

export type ButtonSizeType = typeof ButtonSizeObj[keyof typeof ButtonSizeObj];

const ButtonVariantObj = {
  Default: 'default',
  Ghost: 'ghost',
  Loader: 'loader',
} as const;

export type ButtonVariantType =
  typeof ButtonVariantObj[keyof typeof ButtonVariantObj];

const ButtonTypeObj = {
  Button: 'button',
  Submit: 'submit',
  Reset: 'reset',
} as const;

export type ButtonType = typeof ButtonTypeObj[keyof typeof ButtonTypeObj];

export interface ButtonProps {
  size?: ButtonSizeType;
  variant?: ButtonVariantType;
  type?: ButtonType;
  title: string;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  customClassName?: string;
  disabled?: boolean;
}

const IconButtonSizeObj = {
  Xs: 'xs',
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
  Xl: 'xl',
} as const;

export type IconButtonSizeType =
  typeof IconButtonSizeObj[keyof typeof IconButtonSizeObj];

export interface IconButtonProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon: ReactNode;
}
