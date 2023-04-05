# Mutation 구현하기
## 1. 데이터 삭제하기
### Mutaion 삭제 루트 타입

 ```js

  type Mutation {
    deleteTodo(id:Int): Todo
  }
 ```
 - String 인자 id 를 받는 deleteTodo: 삭제된 todo를 반환

### 삭제 resolver

```js
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
    }
```


index.js
```js
const database = require("./database");
// console.log(database.todos);

const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    todos: [Todo]
    todo(id: Int): Todo    
  }

  type Mutation {
    deleteTodo(id:Int): Todo
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
    }
}
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

위처럼 작성하고 실행해본다.

```js
mutation {
  deleteTodo(id: 1) {
    id
  }
}


guery {
  todos {
    id
  }
}
```
## 2. 데이터 추가하기
### Mutaion 추가 루트 타입
```js
addTodo(
        id: Int
        title: String
        date: String
        complete: Boolean
        weather: Int
    ): Todo
```

### 추가 resolver
```js
addTodo: (parent, args, context, info) => {
      database.todos.push(args)
      return args
    },
```

index.js
```js
const database = require("./database");
// console.log(database.todos);

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
  }
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```
위 문장을 작성후 테스트
```js
mutation {
  addTodo (
    id: 100,
      title: "추가",
      date: "2023-04-06",
      complete: true,
      weather: 5
  ) {
    id
    title
    date
    complete
    weather
  }
}
```

## 3. 데이터 수정하기
### Mutaion 추가 루트 타입
```js
updateTodo(
        id: Int
        title: String
        date: String
        complete: Boolean
        weather: Int
    ): Todo
```

### 추가 resolver
```js
updateTodo: (parent, args, context, info) => {
        return database.todos.filter((item) => {
            return item.id === args.id
        }).map((item) => {
            Object.assign(item, args)
            return item
        })[0]
    },
```

index.js
```js
const database = require("./database");
// console.log(database.todos);

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
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

```
위 문장을 작성후 테스트
```js
mutation {
  addTodo (
    id: 100,
      title: "수정이요",
      date: "2023-04-06",
      complete: true,
      weather: 5
  ) {
    id
    title
    date
    complete
    weather
  }
}

```
