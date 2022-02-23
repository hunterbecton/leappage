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
      width: 600,
      height: 224,
    },
    {
      title: 'Hero Two',
      component: <HeroTwo />,
      img: '/components/hero/hero-two.jpg',
      width: 600,
      height: 218,
    },
  ],
  titles: [
    {
      title: 'Title One',
      component: <TitleOne />,
      img: '/components/titles/title-one.jpg',
      width: 600,
      height: 62,
    },
    {
      title: 'Title Two',
      component: <TitleTwo />,
      img: '/components/titles/title-two.jpg',
      width: 600,
      height: 96,
    },
    {
      title: 'Title Three',
      component: <TitleThree />,
      img: '/components/titles/title-three.jpg',
      width: 600,
      height: 114,
    },
    {
      title: 'Title Four',
      component: <TitleFour />,
      img: '/components/titles/title-four.jpg',
      width: 600,
      height: 80,
    },
  ],
  content: [
    {
      title: 'Content One',
      component: <ContentOne />,
      img: '/components/content/content-one.jpg',
      width: 600,
      height: 344,
    },
    {
      title: 'Content Two',
      component: <ContentTwo />,
      img: '/components/content/content-two.jpg',
      width: 600,
      height: 354,
    },
  ],
  steps: [
    {
      title: 'Step One',
      component: <StepOne />,
      img: '/components/step/step-one.jpg',
      width: 600,
      height: 395,
    },
    {
      title: 'Step Two',
      component: <StepTwo />,
      img: '/components/step/step-two.jpg',
      width: 600,
      height: 457,
    },
  ],
  testimonials: [
    {
      title: 'Testimonial One',
      component: <TestimonialOne />,
      img: '/components/testimonial/testimonial-one.jpg',
      width: 600,
      height: 231,
    },
    {
      title: 'Testimonial Two',
      component: <TestimonialTwo />,
      img: '/components/testimonial/testimonial-two.jpg',
      width: 600,
      height: 203,
    },
  ],
  logos: [
    {
      title: 'Logo One',
      component: <LogoCloudOne />,
      img: '/components/logo/logo-one.jpg',
      width: 600,
      height: 62,
    },
    {
      title: 'Logo Two',
      component: <LogoCloudTwo />,
      img: '/components/logo/logo-two.jpg',
      width: 600,
      height: 72,
    },
    {
      title: 'Logo Three',
      component: <LogoCloudThree />,
      img: '/components/logo/logo-three.jpg',
      width: 600,
      height: 76,
    },
  ],
  links: [
    {
      title: 'Link One',
      component: <LinkOne />,
      img: '/components/link/link-one.jpg',
      width: 600,
      height: 170,
    },
    {
      title: 'Link Two',
      component: <LinkTwo />,
      img: '/components/link/link-two.jpg',
      width: 600,
      height: 94,
    },
  ],
  dividers: [
    {
      title: 'Divider One',
      component: <DividerOne />,
      img: '/components/divider/divider-one.jpg',
      width: 600,
      height: 38,
    },
  ],
};
