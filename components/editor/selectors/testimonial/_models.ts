export interface TestimonialCategoryInfo {
  title: string;
}

export interface Testimonial {
  arrayId: string;
  id: string;
  title: string;
  quote: string;
  categoryInfo: TestimonialCategoryInfo[];
  name: string;
  position: string;
  company: string;
  profileImage: string;
}

export interface TestimonialProps {
  testimonials: Testimonial[];
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
}
