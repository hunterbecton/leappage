import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { toast } from 'react-toastify';

import { Empty } from 'components/empty';
import { PageHeading } from 'components/heading';
import { MainLayout } from 'components/layout';
import { TemplateTable } from 'components/table';
import { Pagination } from 'components/pagination';
import { useProgressStore } from 'store';
import { withProtect } from 'middleware/app/withProtect';
import { withTemplates } from 'middleware/app/withTemplates';
import { withPublishedTemplates } from 'middleware/app/withPublishedTemplates';
import { withRestrict } from 'middleware/app/withRestrict';
import { useAuth } from 'hooks/useAuth';
import { restrict } from 'utils';

export default function AllTemplates({
  totalTemplates,
  templates,
  totalPaginatedPages,
  parsedIndex,
}) {
  const [isCreating, setIsCreating] = useState(false);

  const { user } = useAuth();

  const router = useRouter();

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const createNewTemplate = async () => {
    setIsAnimating(true);
    setIsCreating(true);

    try {
      const body = {
        title: 'Untitled Template',
      };

      const res = await fetch(`/api/template`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        toast.success('Template created.');
        router.push(`/templates/edit/${data.template.id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error creating template.');
    }

    setIsAnimating(false);
    setIsCreating(false);
  };

  return (
    <>
      <NextSeo title='LeapPage | Templates' noindex={true} nofollow={true} />
      <MainLayout>
        <PageHeading
          title='Templates'
          withSubtitle={false}
          withCta={restrict(['admin', 'editor'], user)}
          ctaText='Create template'
          ctaDisabled={isCreating}
          ctaOnClick={() => createNewTemplate()}
        />
        {templates.length === 0 && (
          <Empty
            title='No templates'
            subtitle={
              restrict(['admin', 'editor'], user)
                ? 'Create a new template below to get started'
                : 'Creation is restricted to team admins and editors'
            }
            withCta={restrict(['admin', 'editor'], user)}
            ctaOneText='Create template'
            ctaOneOnClick={() => createNewTemplate()}
            ctaOneIcon={null}
            withCtaTwo={false}
          />
        )}
        {templates.length > 0 && (
          <>
            <TemplateTable templates={templates} />
            <Pagination
              currentPage={parsedIndex}
              limit={24}
              quantity={totalTemplates}
              totalPages={totalPaginatedPages}
              href='/href/'
            />
          </>
        )}
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { index } = ctx.params;

  const parsedIndex = parseInt(index);

  // Redirect if not number
  if (!parsedIndex) {
    return {
      redirect: {
        destination: '/templates/1',
        permanent: false,
      },
    };
  }

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

  if (isAdminOrEditor) {
    let allTemplatesInfo = await withTemplates(ctx);

    if (!allTemplatesInfo) {
      return {
        notFound: true,
      };
    }

    allTemplatesInfo = JSON.parse(allTemplatesInfo);

    const { totalTemplates, templates } = allTemplatesInfo;

    const totalPaginatedPages = Math.ceil(totalTemplates / 24);

    if (parsedIndex > totalPaginatedPages && totalPaginatedPages > 0) {
      return {
        redirect: {
          destination: '/templates/1',
          permanent: false,
        },
      };
    }

    if (totalTemplates === 0 && parsedIndex > 1) {
      return {
        redirect: {
          destination: '/templates/1',
          permanent: false,
        },
      };
    }

    return {
      props: { totalTemplates, templates, totalPaginatedPages, parsedIndex },
    };
  }

  // Only get published templates for users
  if (!isAdminOrEditor) {
    let allTemplatesInfo = await withPublishedTemplates(ctx);

    if (!allTemplatesInfo) {
      return {
        notFound: true,
      };
    }

    allTemplatesInfo = JSON.parse(allTemplatesInfo);

    const { totalTemplates, templates } = allTemplatesInfo;

    const totalPaginatedPages = Math.ceil(totalTemplates / 24);

    if (parsedIndex > totalPaginatedPages && totalPaginatedPages > 0) {
      return {
        redirect: {
          destination: '/templates/1',
          permanent: false,
        },
      };
    }

    if (totalTemplates === 0 && parsedIndex > 1) {
      return {
        redirect: {
          destination: '/templates/1',
          permanent: false,
        },
      };
    }

    return {
      props: { totalTemplates, templates, totalPaginatedPages, parsedIndex },
    };
  }
}
