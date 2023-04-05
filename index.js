const database = require("./database");
// console.log(database.todos);

const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    todos: [Todo]

    todo(id: Int): Todo

    
  }
  type Todo {
    id: Int
    title: String
    date: String
    complete: Boolean
    weather: Int
  }
`;
const resolvers = {
  Query: {
    todos: () => database.todos,
    
    todo: (parent, args, context, info) => database.todos
        .filter((team) => {
            return team.id === args.id
        })[0],

  },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
