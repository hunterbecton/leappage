import { ContentPost } from 'components/editor/selectors/content/_models';
import { Testimonial } from 'components/editor/selectors/testimonial/_models';

export interface ColorPickerValue {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ToolbarColorPickerProps {
  propKey: string;
  onChange: (value: string) => void;
  value: ColorPickerValue;
  label?: string;
}

export interface ToolbarContentProps {
  id: string;
  isGroup?: boolean;
  groupName?: string;
  groupIndex?: number;
  content: ContentPost;
}

export interface Option {
  value: string;
  text: string;
}

export interface ToolbarDropdownProps {
  propKey: string;
  onChange: (value: string) => void;
  value: string;
  options: Option[];
}

export interface ToolbarFontValue {
  name: string;
  fallback: string;
}

export interface ToolbarFontProps {
  onChange: (e: any) => void;
  label?: string;
  value: ToolbarFontValue;
}

export interface ToolbarGroupProps {
  full?: boolean;
  bgColor?: string;
}

const IconVariantObj = {
  Render: 'render',
  Dropdown: 'dropdown',
} as const;

export type IconVariantType =
  typeof IconVariantObj[keyof typeof IconVariantObj];

export interface IconProps {
  id: string;
  variant?: IconVariantType;
  dropdownStyle?: string;
  renderStyle?: string;
  name: string;
}

export interface ToolbarIconDropdownProps {
  onChange: (e: any) => void;
  value: IconProps;
}

export interface ToolbarImageProps {
  propKey: string;
  value: string;
  label?: string;
  id: string;
  isGroup?: boolean;
  groupName?: string;
  groupIndex?: number;
  defaultMediaSize: string;
}

export interface ToolbarMenuItemProps {
  active: boolean;
  onClick: () => void;
}

export interface ToolbarRangeProps {
  propKey: string;
  onChange: (e: any) => void;
  value: number;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface ToolbarSectionProps {
  title: string;
}

export interface ToolbarTestimonialProps {
  id: string;
  isGroup?: boolean;
  groupName?: string;
  groupIndex?: number;
  testimonial: Testimonial;
}

export interface ToolbarTextProps {
  propKey: string;
  onChange: (e: any) => void;
  value: string;
  label?: string;
}

export interface ToolbarTextAreaProps {
  propKey: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  rows?: number;
}

export interface ToolbarTextDropdownOptions {
  value: string;
  text: string;
}

export interface ToolbarTextDropdownProps {
  propKey: string;
  propKeyTwo: string;
  onChange: (e: any) => void;
  onChangeTwo: (e: any) => void;
  value: string;
  valueTwo: string;
  label?: string;
  labelTwo?: string;
  options: ToolbarTextDropdownOptions[];
}

export interface ToolbarToggleProps {
  propKey: string;
  onChange: (e: any) => void;
  value: boolean;
  label?: string;
}

export interface ToolbarItemProps {
  isGroup: boolean;
  groupName: string;
  groupIndex: number;
  propKey: string;
  propKeyTwo: string;
  type: string;
  onChange: (e: any) => void;
  onChangeTwo: (e: any) => void;
  index: number;
  content: ContentPost;
  testimonial: Testimonial;
  defaultMediaSize: string;
  options: ToolbarTextDropdownOptions[];
  min: number;
  max: number;
  step: number;
  rows: number;
  label: string;
}
