import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import type { AppProps } from "next/app";
import "../app/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
