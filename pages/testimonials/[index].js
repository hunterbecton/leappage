import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { toast } from 'react-toastify';

import { Empty } from 'components/empty';
import { PageHeading } from 'components/heading';
import { MainLayout } from 'components/layout';
import { Pagination } from 'components/pagination';
import { useProgressStore } from 'store';
import { withProtect } from 'middleware/app/withProtect';
import { withRestrict } from 'middleware/app/withRestrict';
import { withTestimonials } from 'middleware/app/withTestimonials';
import { TestimonialTable } from 'components/table';

export default function AllTestimonials({
  totalTestimonials,
  testimonials,
  totalPaginatedPages,
  parsedIndex,
}) {
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);

  const createNewTestimonial = async () => {
    setIsAnimating(true);
    setIsCreating(true);

    try {
      const body = {
        title: 'Untitled Testimonial',
      };

      const res = await fetch(`/api/testimonial`, {
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
        toast.success('Testimonial created.');
        router.push(`/testimonials/edit/${data.testimonial.id}`);
      }
    } catch (error) {
      toast.error('Error creating testimonial.');
      console.log(error);
    }

    setIsAnimating(false);
    setIsCreating(false);
  };

  return (
    <>
      <NextSeo title='LeapPage | Testimonials' noindex={true} nofollow={true} />
      <MainLayout>
        <PageHeading
          title='Testimonials'
          withSubtitle={false}
          withCta={true}
          ctaText='Create testimonial'
          ctaDisabled={isCreating}
          ctaOnClick={() => createNewTestimonial()}
        />
        {totalTestimonials === 0 && (
          <Empty
            title='No testimonials'
            subtitle='Create new testimonial below to get started'
            withCta={true}
            ctaOneText='Create testimonial'
            ctaOneOnClick={() => createNewTestimonial()}
            ctaOneIcon={null}
            withCtaTwo={false}
          />
        )}
        {totalTestimonials > 0 && (
          <>
            <TestimonialTable testimonials={testimonials} />
            <Pagination
              currentPage={parsedIndex}
              limit={24}
              quantity={totalTestimonials}
              totalPages={totalPaginatedPages}
              href='/testimonials/'
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
        destination: '/testimonials/1',
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

  const isPermitted = await withRestrict(ctx, 'admin', 'editor');

  if (!isPermitted) {
    return {
      redirect: {
        destination: '/pages/1',
        permanent: false,
      },
    };
  }

  let allTestimonialsInfo = await withTestimonials(ctx);

  if (!allTestimonialsInfo) {
    return {
      notFound: true,
    };
  }

  allTestimonialsInfo = JSON.parse(allTestimonialsInfo);

  const { totalTestimonials, testimonials } = allTestimonialsInfo;

  const totalPaginatedPages = Math.ceil(totalTestimonials / 24);

  if (parsedIndex > totalPaginatedPages && totalPaginatedPages > 0) {
    return {
      redirect: {
        destination: '/testimonials/1',
        permanent: false,
      },
    };
  }

  if (totalTestimonials === 0 && parsedIndex > 1) {
    return {
      redirect: {
        destination: '/testimonials/1',
        permanent: false,
      },
    };
  }

  return {
    props: {
      totalTestimonials,
      testimonials,
      totalPaginatedPages,
      parsedIndex,
    },
  };
}
