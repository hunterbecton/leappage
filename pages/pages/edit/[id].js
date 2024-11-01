import { useEffect } from 'react';
import lz from 'lzutf8';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { VisualEditor } from 'components/editor/visual';
import { withProtect } from 'middleware/app/withProtect';
import { withPage } from 'middleware/app/withPage';
import { withPageAsAdmin } from 'middleware/app/withPageAsAdmin';
import { withRestrict } from 'middleware/app/withRestrict';
import { withTheme } from 'middleware/app/withTheme';
import { useEditorStore } from 'store';
import { Theme } from 'components/theme';

const validationSchema = yup.object().shape({
  title: yup.string().required('Page title is required'),
  status: yup.string().required('Page status is required'),
  slug: yup.string(),
});

export default function EditPage({ json, page, theme }) {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const setTemplateType = useEditorStore((state) => state.setTemplateType);

  const router = useRouter();

  // Set Template type on mount
  useEffect(() => {
    setTemplateType('page');
  }, [setTemplateType]);

  // Set form values on mount
  useEffect(() => {
    methods.setValue('title', page.title);
    methods.setValue('status', page.status);
    methods.setValue('slug', page.slug);
  }, [router, methods, page.title, page.status, page.slug]);

  return (
    <>
      <NextSeo title='LeapPage | Edit page' noindex={true} nofollow={true} />
      <Theme theme={theme} />
      <FormProvider {...methods}>
        <VisualEditor json={json} type='page' />
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

  const isAdminOrEditor = await withRestrict(ctx, 'admin', 'editor');

  // Get pages if admin or editor
  if (isAdminOrEditor) {
    let page = await withPageAsAdmin(ctx);

    if (!page) {
      return {
        notFound: true,
      };
    }

    page = JSON.parse(page);

    const json = lz.decompress(lz.decodeBase64(page.frame));

    let theme = await withTheme(ctx.req.user.tenant_mongo_id);

    theme = JSON.parse(theme);

    return {
      props: { json, page, theme },
    };
  }

  // Get only pages user owns
  if (!isAdminOrEditor) {
    let page = await withPage(ctx);

    if (!page) {
      return {
        notFound: true,
      };
    }

    page = JSON.parse(page);

    const json = lz.decompress(lz.decodeBase64(page.frame));

    let theme = await withTheme(ctx.req.user.tenant_mongo_id);

    theme = JSON.parse(theme);

    return {
      props: { json, page, theme },
    };
  }
}
