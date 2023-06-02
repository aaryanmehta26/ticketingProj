import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import { Header } from "../components/Header";
// Next.js uses the App component to initialize pages.
//Add global CSS

export default function MyApp({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component {...pageProps} currentUser={currentUser} />
      </div>
    </div>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get(
    "/api/users/currentuser"
  );
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }
  return {
    pageProps,
    ...data,
  };
};
