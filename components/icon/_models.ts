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
}
