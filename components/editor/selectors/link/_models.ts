export interface Icon {
  id: string;
  name: string;
}

export interface LinkOne {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  icon: Icon;
}

export interface LinkOneProps {
  links: LinkOne[];
}

export interface LinkTwo {
  id: string;
  ctaText: string;
  ctaLink: string;
  icon: Icon;
}

export interface LinkTwoProps {
  links: LinkTwo[];
}
