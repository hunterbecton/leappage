import lz from "lzutf8";
import { NextSeo } from "next-seo";
import ReactDOMServer from "react-dom/server";
import parse from "html-react-parser";

import { withProtect } from "middleware/app/withProtect";
import { withTemplate } from "middleware/app/withTemplate";
import { deserializeNodes, renderNodesToJSX } from "craft/utils";

export default function PreviewTemplate({ html, template }) {
  return (
    <>
      <NextSeo
        title={template.title ? template.title : "Untitled Template"}
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

  let template = await withTemplate(ctx);

  if (!template) {
    return {
      notFound: true,
    };
  }

  template = JSON.parse(template);

  const json = lz.decompress(lz.decodeBase64(template.frame));
  const parsedJSON = JSON.parse(json);
  const nodes = deserializeNodes(parsedJSON);
  const jsx = renderNodesToJSX(nodes);
  const html = ReactDOMServer.renderToString(jsx);

  return {
    props: { html, template },
  };
}
