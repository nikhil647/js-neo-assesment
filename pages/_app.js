import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../Components/Header";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
// import store from "../redux/store";
import { setupStore } from "../redux/store";

const store = setupStore({});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <>
          <Header />
          <Component {...pageProps} />
        </>
      </SessionProvider>
    </Provider>
  );
}

//
export default MyApp;
