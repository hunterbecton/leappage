import { Testimonial } from 'models/_models';

export interface TestimonialData {
  title: string;
  quote: string;
  profileImage: string;
  name: string;
  company: string;
  position: string;
  category: string;
  status: string;
}

export interface Option {
  value: string;
  text: string;
}

export interface TestimonialProps {
  testimonial: Testimonial;
  categoryOptions: Option[];
}
