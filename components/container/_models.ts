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

export interface ContainerProps {
  size?: SizeType;
  customClassName?: string;
}
