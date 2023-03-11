import React from 'react';
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';
import {ServerStyleSheets} from "@material-ui/styles";

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <link
                        href="<https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap>"
                        rel="stylesheet"
                    />
                </Head>
                <body className={'data-no-margin'}>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}
