import { FocusEvent } from 'react';

export interface Option {
  value: string;
  text: string;
}

export interface ToolbarDropdownProps {
  name: string;
  label: string;
  disabled?: boolean;
  options: Option[];
}

export interface ToolbarGroupProps {
  full?: boolean;
  bgColor?: string;
}

export interface ToolbarSectionProps {
  title: string;
}

export interface ToolbarTextProps {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}
