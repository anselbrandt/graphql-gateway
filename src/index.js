const { ApolloServer, gql } = require("apollo-server");
const fetch = require("node-fetch");

const typeDefs = gql`
  type QuoteResponse {
    quote: String!
  }

  type KanyeResponse {
    quote: String!
  }

  type ChuckNorrisResponse {
    quote: String!
  }

  type Advice {
    kanye: QuoteResponse!
    chuckNorris: QuoteResponse!
  }

  type Query {
    advice: Advice!
  }
`;

const resolvers = {
  Advice: {
    kanye: async () => {
      const response = await fetch("https://api.kanye.rest/");
      const data = await response.json();
      return data;
    },
    chuckNorris: async () => {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();
      return {
        quote: data.value,
      };
    },
  },
  Query: {
    advice: () => ({}),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
