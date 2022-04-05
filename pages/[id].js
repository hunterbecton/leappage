import { useEffect } from 'react';
import lz from 'lzutf8';
import { NextSeo } from 'next-seo';
import { Frame, Editor } from '@craftjs/core';
import * as Fathom from 'fathom-client';
// import ReactDOMServer from 'react-dom/server';
// import parse from 'html-react-parser';

import { withPublishedPage } from 'middleware/app/withPublishedPage';
import { withTenant } from 'middleware/app/withTenant';
import { withTheme } from 'middleware/app/withTheme';
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
import { HeroOne, HeroTwo, HeroThree } from 'components/editor/selectors/hero';
import { DividerOne } from 'components/editor/selectors/divider';
import { Theme } from 'components/theme';
import { useEditorStore } from 'store';
// import { deserializeNodes, renderNodesToJSX } from 'craft/utils';

export default function Page({ json, page, theme }) {
  const setIsPublic = useEditorStore((state) => state.setIsPublic);

  // Initialize Fathom when the app loads
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load('ACPBVJGZ', {
        url: 'https://boundless-fine.leappage.com/script.js',
      });
      Fathom.trackPageview();
    }
  }, []);

  useEffect(() => {
    setIsPublic(true);

    return () => setIsPublic(false);
  }, [setIsPublic]);

  return (
    <>
      <NextSeo
        title={page.title ? page.title : 'Untitled Page'}
        description='Your custom content hub created by LeapPage.'
        noindex={true}
        nofollow={true}
      />
      <Theme theme={theme} />
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
          HeroThree,
          LinkOne,
          LinkTwo,
          DividerOne,
        }}
        enabled={false}
      >
        <Frame json={json} />
      </Editor>
    </>
  );
}

export async function getServerSideProps(ctx) {
  let tenant = await withTenant(ctx);

  // Return 404 page if no tenant
  if (!tenant) {
    return {
      notFound: true,
    };
  }

  tenant = JSON.parse(tenant);

  let page = await withPublishedPage(ctx);

  if (!page) {
    return {
      notFound: true,
    };
  }

  page = JSON.parse(page);

  const json = lz.decompress(lz.decodeBase64(page.frame));
  // const parsedJSON = JSON.parse(json);
  // const nodes = deserializeNodes(parsedJSON);
  // const jsx = renderNodesToJSX(nodes);
  // const html = ReactDOMServer.renderToString(jsx);

  let theme = await withTheme(tenant.id);

  theme = JSON.parse(theme);

  return {
    props: { json, page, theme },
  };
}
