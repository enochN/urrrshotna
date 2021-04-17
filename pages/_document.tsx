import Document, {Head, Html, NextScript, Main} from "next/document";

export default class MyDocument extends Document {
    render(): JSX.Element {
        return <Html>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    }
}
