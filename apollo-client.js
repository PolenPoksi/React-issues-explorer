import { ApolloClient, InMemoryCache } from "@apollo/client";

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default client;
