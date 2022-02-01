import { useEffect } from 'react';
import { Frame, Editor, Element } from '@craftjs/core';

// import { Element } from 'craft/Element';
import { QuickBox, Viewport } from 'components/editor/visual';
import { Body } from 'components/editor/selectors/body';
import {
  LogoCloudOne,
  LogoCloudTwo,
  LogoCloudThree,
} from 'components/editor/selectors/logo';
import { StepOne, StepTwo } from 'components/editor/selectors/step';
import { ContentOne, ContentTwo } from 'components/editor/selectors/content';
import {
  TitleOne,
  TitleTwo,
  TitleThree,
  TitleFour,
} from 'components/editor/selectors/titles';
import {
  TestimonialOne,
  TestimonialTwo,
} from 'components/editor/selectors/testimonial';
import { LinkOne, LinkTwo } from 'components/editor/selectors/link';
import { HeroOne, HeroTwo } from 'components/editor/selectors/hero';
import { DividerOne } from 'components/editor/selectors/divider';
import { useEditorStore } from 'store';

export const VisualEditor = ({ json }) => {
  const isEnabled = useEditorStore((state) => state.isEnabled);
  const setIsEnabled = useEditorStore((state) => state.setIsEnabled);

  useEffect(() => {
    setIsEnabled(true);
  }, []);

  return (
    <>
      <Editor
        resolver={{
          Body,
          LogoCloudOne,
          LogoCloudTwo,
          LogoCloudThree,
          ContentOne,
          ContentTwo,
          StepOne,
          StepTwo,
          TitleOne,
          TitleTwo,
          TitleThree,
          TitleFour,
          TestimonialOne,
          TestimonialTwo,
          HeroOne,
          HeroTwo,
          LinkOne,
          LinkTwo,
          DividerOne,
        }}
        onRender={QuickBox}
        enabled={isEnabled}
      >
        <Viewport>
          <Frame json={json}>
            <Element
              canvas
              is={Body}
              custom={{ displayName: 'Body' }}
            ></Element>
          </Frame>
        </Viewport>
      </Editor>
    </>
  );
};
