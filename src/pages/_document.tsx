import React from 'react';
import getConfig from 'next/config';
import Document, { Html, Head, Main, NextScript } from 'next/document';
// import { ServerStyleSheet } from 'styled-components';

const { publicRuntimeConfig } = getConfig();
export interface CustomDocumentProps {
  styleTags: React.ReactElement[];
}

class CustomDocument extends Document<CustomDocumentProps> {
  //   static getInitialProps({ renderPage }: any) {
  //     const sheet = new ServerStyleSheet();
  //     const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
  //     const styleTags = sheet.getStyleElement();
  //     return { ...page, styleTags };
  //   }
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            type="image/png"
            href="https://s3-ap-southeast-2.amazonaws.com/lendi-dev/images/favicon.ico"
          />
          {/* Segment.io snippet */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
            !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
            analytics.load("${publicRuntimeConfig.SEGMENT_ID}");
            analytics.page();
            }}();
          `,
            }}
          />
          {/* styled-components */}
          {/* {this.props.styleTags} */}
          {/* fonts */}
          <link href="https://fonts.googleapis.com/css?family=Cabin|Open+Sans:400,700" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
