const { ApolloServer } = require("apollo-server");
const graphqlConfig = require("./graphql");
const context = require("./graphql/context");

const PORT = process.env.PORT || 5000;
const server = new ApolloServer(Object.assign({}, graphqlConfig, { context }));

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
