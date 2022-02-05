import { useState } from "react";
import { NextSeo } from "next-seo";

import { Empty } from "components/empty";
import { PageHeading } from "components/heading";
import { MainLayout } from "components/layout";
import { Pagination } from "components/pagination";
import { withProtect } from "middleware/app/withProtect";
import { withMedias } from "middleware/app/withMedias";
import { MediaList } from "components/list/MediaList";
import { UploadFileModal } from "components/modal";
import { useAuth } from "hooks/useAuth";
import { restrict } from "utils";

export default function AllMedia({
  totalMedia,
  medias,
  totalPaginatedPages,
  parsedIndex,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

  return (
    <>
      <NextSeo title="LeapPage | Media" noindex={true} nofollow={true} />
      <UploadFileModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <MainLayout>
        <PageHeading
          title="Media"
          withSubtitle={false}
          withCta={restrict(["admin", "editor"], user)}
          ctaText="Upload File"
          ctaDisabled={isOpen}
          ctaOnClick={() => setIsOpen(true)}
        />
        {totalMedia === 0 && (
          <Empty
            title="No Media"
            subtitle={
              restrict(["admin", "editor"], user)
                ? "Get started by uploading a file"
                : "Uploading is restricted to team admins and editors"
            }
            withCta={restrict(["admin", "editor"], user)}
            ctaOneText="Upload File"
            ctaOneOnClick={() => setIsOpen(true)}
            ctaOneIcon={null}
            ctaTwoText=""
            ctaTwoOnClick={() => null}
          />
        )}
        {totalMedia > 0 && (
          <>
            <MediaList items={medias} href="/media/edit/" />
            <Pagination
              currentPage={parsedIndex}
              limit={24}
              quantity={totalMedia}
              totalPages={totalPaginatedPages}
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
        destination: "/media/1",
        permanent: false,
      },
    };
  }

  const isProtected = await withProtect(ctx);

  if (!isProtected) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let allMediaInfo = await withMedias(ctx);

  if (!allMediaInfo) {
    return {
      notFound: true,
    };
  }

  allMediaInfo = JSON.parse(allMediaInfo);

  const { totalMedia, medias } = allMediaInfo;

  if (!medias) {
    return {
      notFound: true,
    };
  }

  const totalPaginatedPages = Math.ceil(totalMedia / 24);

  if (parsedIndex > totalPaginatedPages && totalPaginatedPages > 0) {
    return {
      redirect: {
        destination: "/media/1",
        permanent: false,
      },
    };
  }

  if (totalMedia === 0 && parsedIndex > 1) {
    return {
      redirect: {
        destination: "/media/1",
        permanent: false,
      },
    };
  }

  return {
    props: { totalMedia, medias, totalPaginatedPages, parsedIndex },
  };
}
