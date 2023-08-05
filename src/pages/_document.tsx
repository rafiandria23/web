import { Fragment } from 'react';
import NextDocument, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@mui/styles';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          materialUiSheets.collect(<App {...props} />),
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        <Fragment key='styles'>
          {initialProps.styles}
          {materialUiSheets.getStyleElement()}
        </Fragment>,
      ],
    };
  }

  render() {
    return (
      <Html lang='en-US'>
        <Head>
          {/* Favicon */}
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='96x96'
            href='/favicon-96x96.png'
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
