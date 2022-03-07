export interface Icon {
  id: string;
  name: string;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  icon: Icon;
}

export interface StepOneProps {
  src: string;
  steps: Step[];
}

export interface StepTwoProps {
  steps: Step[];
}
