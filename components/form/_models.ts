import React, { FocusEvent } from 'react';

export interface InputProps {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  helpText?: string;
  placeholder: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export interface InputRefProps {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  helpText?: string;
  placeholder: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  ref: React.ForwardedRef<HTMLInputElement>;
}

export interface CheckboxProps {
  name: string;
  label?: string;
  description?: string;
}

export interface ImageInputProps {
  name: string;
  label: string;
  helpText?: string;
  readOnly?: boolean;
  mediaSize?: string;
}

export interface TextAreaProps {
  name: string;
  label: string;
  rows?: number;
  disabled?: boolean;
  helpText?: string;
  placeholder?: string;
  readOnly?: boolean;
}

export interface Option {
  value: string;
  text: string;
}

export interface DropdownProps {
  name: string;
  label: string;
  helpText?: string;
  disabled?: boolean;
  options: Option[];
}

export interface FileUploadProps {
  label: string;
}
