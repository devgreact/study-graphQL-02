# Apollo Server 제작
- 필요 모듈 설치

## Node.js 프로젝트 생성

npm init

## index.js 실행파일 생성

```js
  console.log("hello);
```
```
node index.js 실행 확인
```

## package.json - "scripts" 항목 생성

"start": "nodemon index.js"

## expres 서버 설치
npm i express

## nodemon 설치 (코드가 바뀔 때마다 어플리케이션 재실행)

npm install -g nodemon

## csv json 모듈 설치

npm i convert-csv-to-json

## Apollo Server 모듈 설치

npm i graphql apollo-server

## 프로젝트 실행 명령어 (해당 프로젝트 폴더에서)

npm start

## 브라우저에서 localhost:4000 으로 확인

# 2. Mock Data 제작

## data 폴더 생성 / todo.csv 
- 'Edit csv' Extension 설치

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
console.log(database)
```
- 결과 확인 후 다음 코드를 넣어줌.
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
- 서버 실행 후 기본 query 입력해 봄.

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