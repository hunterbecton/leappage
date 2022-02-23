import { useEffect } from 'react';
import lz from 'lzutf8';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { VisualEditor } from 'components/editor/visual';
import { withProtect } from 'middleware/app/withProtect';
import { withTemplate } from 'middleware/app/withTemplate';
import { withTheme } from 'middleware/app/withTheme';
import { useEditorStore } from 'store';
import { Theme } from 'components/theme';

const validationSchema = yup.object().shape({
  title: yup.string(),
  status: yup.string(),
});

export default function EditTemplate({ json, template, theme }) {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const setTemplateType = useEditorStore((state) => state.setTemplateType);

  const router = useRouter();

  // Set Template type on mount
  useEffect(() => {
    setTemplateType('template');
  }, [setTemplateType]);

  // Set form values on mount
  useEffect(() => {
    methods.setValue('title', template.title);
    methods.setValue('status', template.status);
  }, [router, methods, template.title, template.status]);

  return (
    <>
      <NextSeo
        title='LeapPage | Edit Template'
        noindex={true}
        nofollow={true}
      />
      <Theme theme={theme} />
      <FormProvider {...methods}>
        <VisualEditor json={json} />
      </FormProvider>
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

  let template = await withTemplate(ctx);

  if (!template) {
    return {
      notFound: true,
    };
  }

  template = JSON.parse(template);

  const json = lz.decompress(lz.decodeBase64(template.frame));

  let theme = await withTheme(ctx.req.user.tenant_mongo_id);

  theme = JSON.parse(theme);

  return {
    props: { json, template, theme },
  };
}
