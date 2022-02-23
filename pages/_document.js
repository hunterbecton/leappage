import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){}); window.Beacon('init', 'e2b119f4-22dc-4a43-b87b-a93d4590dfe2');`,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.Beacon('init', 'e2b119f4-22dc-4a43-b87b-a93d4590dfe2');`,
            }}
          /> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
