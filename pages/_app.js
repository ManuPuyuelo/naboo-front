import "../styles/globals.css";
import Header from "../components/Header";
import Head from "next/head";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import activities from "../reducers/activities";
const store = configureStore({
  reducer: { activities },
});
function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Candidator - Manu</title>
          <meta
            name="description"
            content="Test stage Fullstack Naboo - Manu"
          />
          <meta property="og:title" content="Candidator" />
          <meta
            property="og:description"
            content="Test stage Fullstack Naboo - Manu"
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/djfrwyodt/image/upload/v1694082777/image_291_nd4unk.png"
          />
          <meta name="author" content="Manu Puyuelo" />
        </Head>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default App;
