const database = require("./database");
// console.log(database.todos);
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    todos: [Todo]
    todo(id: Int): Todo    
  }

  type Mutation {

    deleteTodo(id:Int): Todo

    addTodo(
        id: Int
        title: String
        date: String
        complete: Boolean
        weather: Int
    ): Todo

    
    updateTodo(
        id: Int
        title: String
        date: String
        complete: Boolean
        weather: Int
    ): Todo

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
  Mutation: {
    deleteTodo: (parent, args, context, info) => {
        const deleted = database.todos
            .filter((item) => {
                return item.id === args.id
            })[0]
        database.todos = database.todos
            .filter((item) => {
                return item.id !== args.id
            })
        return deleted
    },
    addTodo: (parent, args, context, info) => {
      database.todos.push(args)
      return args
    },
    updateTodo: (parent, args, context, info) => {
        return database.todos.filter((item) => {
            return item.id === args.id
        }).map((item) => {
            Object.assign(item, args)
            return item
        })[0]
    },
  }
};
const server = new ApolloServer({ typeDefs, resolvers,plugins: [
  ApolloServerPluginLandingPageGraphQLPlayground(),
], });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
