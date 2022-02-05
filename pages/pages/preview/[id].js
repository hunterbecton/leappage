import lz from "lzutf8";
import { NextSeo } from "next-seo";
import ReactDOMServer from "react-dom/server";
import parse from "html-react-parser";

import { withProtect } from "middleware/app/withProtect";
import { withPage } from "middleware/app/withPage";
import { deserializeNodes, renderNodesToJSX } from "craft/utils";

export default function PreviewPage({ html, page }) {
  return (
    <>
      <NextSeo
        title={page.title ? page.title : "Untitled Page"}
        description="Your custom content hub created by LeapPage."
        noindex={true}
        nofollow={true}
      />
      {parse(html)}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const isProtected = await withProtect(ctx);

  if (!isProtected) {
    return {
      redirect: {
        destination: "/login",
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
  const parsedJSON = JSON.parse(json);
  const nodes = deserializeNodes(parsedJSON);
  const jsx = renderNodesToJSX(nodes);
  const html = ReactDOMServer.renderToString(jsx);

  console.dir(nodes, { depth: null });
  return {
    props: { html, page },
  };
}
