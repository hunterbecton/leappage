import { MouseEventHandler } from 'react';

const SizeObj = {
  Bottom: 'bottom-0',
  Top: 'top-0',
  None: 'none',
  Xs: 'xs',
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
} as const;

export type SizeType = typeof SizeObj[keyof typeof SizeObj];

const ButtonVariantObj = {
  Default: 'default',
  Ghost: 'ghost',
  Loader: 'loader',
} as const;

export type ButtonVariantType =
  typeof ButtonVariantObj[keyof typeof ButtonVariantObj];

export interface PageHeadingProps {
  title: string;
  withSubtitle: boolean;
  subtitle: string;
  withCta: boolean;
  ctaDisabled: boolean;
  ctaVariant: ButtonVariantType;
  ctaText: string;
  ctaOnClick: MouseEventHandler<HTMLButtonElement>;
  containerSize: SizeType;
}

export interface PageHeadingWithLabelProps {
  title: string;
  label: string;
  withCta: boolean;
  ctaDisabled: boolean;
  ctaVariant: ButtonVariantType;
  ctaText: string;
  ctaOnClick: MouseEventHandler<HTMLButtonElement>;
  containerSize: SizeType;
}
