import { Category, Content, Page, Template, Testimonial } from 'models/_models';

export interface CategoryTableProps {
  categories: Category[];
}

export interface ContentTableProps {
  content: Content[];
}

export interface PageTableProps {
  pages: Page[];
}

export interface TemplateTableProps {
  templates: Template[];
}

export interface TestimonialTableProps {
  testimonials: Testimonial[];
}
