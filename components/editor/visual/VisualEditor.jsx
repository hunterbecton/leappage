import { useEffect, useState } from 'react';
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
import { useLeavePageConfirm } from 'hooks/useLeavePageConfirm';

export const VisualEditor = ({ json }) => {
  const isEnabled = useEditorStore((state) => state.isEnabled);
  const setIsEnabled = useEditorStore((state) => state.setIsEnabled);
  const shouldSave = useEditorStore((state) => state.shouldSave);
  const setShouldSave = useEditorStore((state) => state.setShouldSave);

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Enable editor on mount
  useEffect(() => {
    setIsEnabled(true);
  }, []);

  // Set shouldSave to true on mount and cleanup
  useEffect(() => {
    setShouldSave(true);

    return () => setShouldSave(false);
  }, []);

  // Throw prompt when changes not saved
  useLeavePageConfirm(shouldSave);

  return (
    <>
      <Editor
        indicator={{
          success: '#16a34a', // green
          error: '#dc2626', // red
        }}
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
        onNodesChange={() => {
          if (isInitialLoad) {
            setIsInitialLoad(false);
          } else {
            setShouldSave(true);
          }
        }}
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
