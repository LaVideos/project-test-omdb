import {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import Head from 'next/head';
import '../styles/globals.scss';
import {setupStore} from "@/redux";
import {DevSupport} from "@react-buddy/ide-toolbox";


const store = setupStore();


function MyApp({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <title>Movie Search</title>
                <meta name="description" content="Search for your favorite movies"/>
                <meta name="keywords" content="movies, search, favorites"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
                <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
