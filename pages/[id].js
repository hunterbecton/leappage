import lz from "lzutf8";
import { NextSeo } from "next-seo";
import ReactDOMServer from "react-dom/server";
import parse from "html-react-parser";

import { withPublishedPage } from "middleware/app/withPublishedPage";
import { deserializeNodes, renderNodesToJSX } from "craft/utils";

export default function Page({ html, page }) {
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
  let page = await withPublishedPage(ctx);

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

  return {
    props: { html, page },
  };
}
