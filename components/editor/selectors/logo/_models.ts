export interface Logo {
  id: string;
  company: string;
  src: string;
  height: number;
}

export interface LogoOneProps {
  logos: Logo[];
}

export interface LogoTwoProps {
  subtitle: string;
  logos: Logo[];
}

export interface LogoThreeProps {
  subtitle: string;
  logos: Logo[];
}
