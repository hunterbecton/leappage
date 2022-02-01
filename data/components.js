import {
  LogoCloudOne,
  LogoCloudTwo,
  LogoCloudThree,
} from 'components/editor/selectors/logo';
import { ContentOne, ContentTwo } from 'components/editor/selectors/content';
import { StepOne, StepTwo } from 'components/editor/selectors/step';
import {
  TestimonialOne,
  TestimonialTwo,
} from 'components/editor/selectors/testimonial';
import {
  TitleOne,
  TitleTwo,
  TitleThree,
  TitleFour,
} from 'components/editor/selectors/titles';
import { HeroOne, HeroTwo } from 'components/editor/selectors/hero';
import { LinkOne, LinkTwo } from 'components/editor/selectors/link';
import { DividerOne } from 'components/editor/selectors/divider/DividerOne';

export const components = {
  heroes: [
    {
      title: 'Hero One',
      component: <HeroOne />,
      img: '/components/hero/hero-one.jpg',
    },
    {
      title: 'Hero Two',
      component: <HeroTwo />,
      img: '/components/hero/hero-two.jpg',
    },
  ],
  titles: [
    {
      title: 'Title One',
      component: <TitleOne />,
      img: '/components/titles/title-one.jpg',
    },
    {
      title: 'Title Two',
      component: <TitleTwo />,
      img: '/components/titles/title-two.jpg',
    },
    {
      title: 'Title Three',
      component: <TitleThree />,
      img: '/components/titles/title-three.jpg',
    },
    {
      title: 'Title Four',
      component: <TitleFour />,
      img: '/components/titles/title-four.jpg',
    },
  ],
  content: [
    {
      title: 'Content One',
      component: <ContentOne />,
      img: '/components/content/content-one.jpg',
    },
    {
      title: 'Content Two',
      component: <ContentTwo />,
      img: '/components/content/content-two.jpg',
    },
  ],
  steps: [
    {
      title: 'Step One',
      component: <StepOne />,
      img: '/components/step/step-one.jpg',
    },
    {
      title: 'Step Two',
      component: <StepTwo />,
      img: '/components/step/step-two.jpg',
    },
  ],
  testimonials: [
    {
      title: 'Testimonial One',
      component: <TestimonialOne />,
      img: '/components/testimonial/testimonial-one.jpg',
    },
    {
      title: 'Testimonial Two',
      component: <TestimonialTwo />,
      img: '/components/testimonial/testimonial-two.jpg',
    },
  ],
  logos: [
    {
      title: 'Logo One',
      component: <LogoCloudOne />,
      img: '/components/logo/logo-one.jpg',
    },
    {
      title: 'Logo Two',
      component: <LogoCloudTwo />,
      img: '/components/logo/logo-two.jpg',
    },
    {
      title: 'Logo Three',
      component: <LogoCloudThree />,
      img: '/components/logo/logo-three.jpg',
    },
  ],
  links: [
    {
      title: 'Link One',
      component: <LinkOne />,
      img: '/components/link/link-one.jpg',
    },
    {
      title: 'Link Two',
      component: <LinkTwo />,
      img: '/components/link/link-two.jpg',
    },
  ],
  dividers: [
    {
      title: 'Divider One',
      component: <DividerOne />,
      img: '/components/divider/divider-one.jpg',
    },
  ],
};
