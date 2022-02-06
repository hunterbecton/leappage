import { useEffect } from 'react';
import lz from 'lzutf8';
import { NextSeo } from 'next-seo';
import { Frame, Editor } from '@craftjs/core';
// import ReactDOMServer from 'react-dom/server';
// import parse from 'html-react-parser';

import { withProtect } from 'middleware/app/withProtect';
import { withPage } from 'middleware/app/withPage';
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
// import { deserializeNodes, renderNodesToJSX } from 'craft/utils';

export default function PreviewPage({ json, page }) {
  const isEnabled = useEditorStore((state) => state.isEnabled);
  const setIsEnabled = useEditorStore((state) => state.setIsEnabled);

  useEffect(() => {
    setIsEnabled(false);
  }, []);

  return (
    <>
      <NextSeo
        title={page.title ? page.title : 'Untitled Page'}
        description='Your custom content hub created by LeapPage.'
        noindex={true}
        nofollow={true}
      />
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
        enabled={isEnabled}
      >
        <Frame json={json} />
      </Editor>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const isProtected = await withProtect(ctx);

  if (!isProtected) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  let page = await withPage(ctx);

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

  return {
    props: { json, page },
  };
}
