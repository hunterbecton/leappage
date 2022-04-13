export interface HeroCta {
  enabled: boolean;
  id: string;
  text: string;
  link: string;
}

export interface HeroLogo {
  id: string;
  company: string;
  src: string;
}

export interface HeroOneProps {
  title: string;
  description: string;
  ctas: HeroCta[];
  logos: HeroLogo[];
}

export interface HeroTwoProps {
  title: string;
  description: string;
  videoUrl: string;
  ctas: HeroCta[];
}

export interface HeroThreeProps {
  title: string;
  description: string;
  ctas: HeroCta[];
}
