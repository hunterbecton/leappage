import { Content } from 'models/_models';

export interface Option {
  value: string;
  text: string;
}

export interface ContentFormProps {
  content: Content;
  categoryOptions: Option[];
}

const StatusObj = {
  Drafted: 'drafted',
  Preview: 'preview',
  Published: 'published',
} as const;

export type StatusType = typeof StatusObj[keyof typeof StatusObj];

export interface ContentFormData {
  title: string;
  description: string;
  url: string;
  feature: string;
  category: string;
  status: StatusType;
}
