# REST-API 복습

## Node.js 프로젝트 생성

npm init

## index.js 실행파일 생성

```js
  console.log("hello);
```

## expres 서버 설치

npm i express

## nodemon 설치 (코드가 바뀔 때마다 어플리케이션 재실행)

npm install -g nodemon

## csv json 모듈 설치

npm i convert-csv-to-json

## Apollo Server 모듈 설치

npm i graphql apollo-server

## package.json - "scripts" 항목 생성

"start": "nodemon index.js"

## 프로젝트 실행 명령어 (해당 프로젝트 폴더에서)

npm start

## 브라우저에서 localhost:4000 으로 확인

# Mock Data 제작

## data/todo.csv ('Edit csv' Extension 설치)

```csv
id,title,completed,date,weather
1,공부중입니다.,false,2023-04-01,1
2,리액트공부,false,2023-04-02,2
3,html 공부,true,2023-04-03,2
4,css 공부,true,2023-04-04,3
5,js 공부,false,2023-04-05,3
6,git공부,true,2023-04-06,5
7,서버공부,true,2023-04-07,4
```

## index.js

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

# 정보활용

## 정보 받아오기

```
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

# 이론 공부

## Apollo GraphQL

- GraphQL은 명세, 즉 형식일 뿐
- GrpahQL 구현할 솔루션 필요

  - 백엔드에서 정보를 제공 및 처리
  - 프론트엔드에서 요청 전송
  - GraphQL.js, GraphQL Yoga, AWS Amplify, Relay ...
  - [기타솔루션](https://graphql.org/code/)

- 백엔드와 프론트엔드 모두 제공
- 간편하고 쉬운 설정
- 풍성한 기능들 제공
- Apollo Server 를 활용한 백엔드 서버 제작
- Apollo Client 와 React를 활용한 프론트엔드 웹 제작

## Apollo Server 제작

- 필요 모듈 설치

```
npm i graphql apollo-server
```

- 아폴로 서버 실행

```js
const database = require("./database");
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    teams: [Team]
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
  }
`;
const resolvers = {
  Query: {
    teams: () => database.teams,
  },
};

// typeDef 와 resolver 를 인자로 받아 서버 생성
/* 
  typeDef 
  : GraphQL 명세에서 사용될 데이터, 요청의 타입 지정
  : gql(template literal tag) 로 생성됨

  resolver
  : 서비스의 액션들을 함수로 지정
  : 요청에 따라 데이터를 반환, 입력, 수정, 삭제
*/
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

- 서버 실행

```
npm start
```

- 쿼리 테스트

```
query {
  teams {
    id
    manager
    office
    extension_number
    mascot
    cleaning_duty
    project
  }
}
```

- GraphQL Playground
  - 작성한 GraphQL type, resolver 명세 확인
  - 데이터 요청 및 전송 테스트
