# Query 구현하기

## Query Root Type
- 자료요청에 사용될 쿼리들을 정의
- 쿼리 명령문마다 반환될 데이터 형태를 지정
- todos 라는 쿼리가 전송되면 [] 형태에 Todo 가 여러개가 온다.
```
type Query {
  todos: [Todo]
}
```

## Type 살펴보기
- 반환될 데이터의 형태를 지정
- 자료형을 가진 필드로 구성

```js
 type Todo {
    id: Int
    title: String
    date: String
    complete: Boolean
    weather: Int
  }
  ```

  ## Resolver 살펴보기
  - Query 란 object의 항목들로 데이터를 반환하는 함수 선언
  - 실제 프로젝트에서는 MySql 조회 코드 등..
  ```js
  const resolvers = {
    Query: {
      todos: () => database.todos,
    },
  };
```

# database 의 타입 파악

```js
const database = require("./database");
console.log(database.todos);
``
- 위 실행 결과로 json 확인
- 위의 결과를 바탕으로 Todo 타입이 만들어짐.

- 크롬 테스트에서 아래처럼 확인 가능함.
```js
query {
  todos {
    id
    title
    date
    complete
    weather
  }
}
```

## 특정 todo 만 받아오기
```js
const database = require("./database");
// console.log(database.todos);

const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    todos: [Todo]



// 추가쿼리
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
    //  추가코드
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
```
- 크롬에서 실행
```
query {
  todo(id: 1) {
    id
  }
}
```
