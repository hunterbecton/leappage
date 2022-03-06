import { MouseEventHandler, ReactNode } from 'react';

export interface EmptyProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  withCta: boolean;
  withCtaTwo: boolean;
  ctaOneText: string;
  ctaOneIcon: ReactNode;
  ctaOneOnClick: MouseEventHandler<HTMLButtonElement>;
  ctaOneDisabled: boolean;
  ctaTwoText: string;
  ctaTwoOnClick: MouseEventHandler<HTMLButtonElement>;
}
