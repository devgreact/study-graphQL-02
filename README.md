# 코드 리뷰

```js
const database = require("./database");
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    todos: [Todo]
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
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```
- 아폴로 서버 클래스는 typeDefs 와 resolvers 를 전달받아서 서버를 생성한다. 이후 listen 명령을 실행한다.
const server = new ApolloServer({ typeDefs, resolvers });

- typeDefs 는 위에서 왔고, resolovers 도 위에서 왔다.

## 1. typeDef
- GraphQL 명세에서 사용될 데이터, 요청의 타입을 지정
- gpl은 (template literal tag) 로 생성됨.

```js
const typeDefs = gql`
  type Query {
    todos: [Todo]
  }
  type Todo {
    id: Int
    title: String
    date: String
    complete: Boolean
    weather: Int
  }
`;
```

## 2. resolver 
- 서비스의 액션들을 함수로 지정
- 요청에 따라 데이터를 반환, 입력, 수정, 삭제
- 함수 형태로 지정