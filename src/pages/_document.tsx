import newrelic from 'newrelic';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export type NewRelicProps = {
  browserTimingHeader: string;
};

export default class Document extends NextDocument<NewRelicProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps & { browserTimingHeader: string }> {
    const initialProps = await NextDocument.getInitialProps(ctx);

    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
    });

    return {
      ...initialProps,
      browserTimingHeader,
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

          {/* New Relic */}
          <script
            type='text/javascript'
            dangerouslySetInnerHTML={{ __html: this.props.browserTimingHeader }}
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
