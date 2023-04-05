# GraphQL
- 필요한 정보들만 선택하여 받아올 수 있음(Overfetching 문제 해결/데이터 전송량 감소)
- 여러 계층의 정보들을 한 번에 받아올 수 있음.(Underfetching 문제 해결/요청 횟수 감소)
- 하나의 endpoint 에서 모든 요청을 처리(하나의 URI에서 POST 로 모든 요청 가능)

## Apollo GraphQL(https://www.apollographql.com/)
- GraphQL 로 서비스를 만들려면 Server 와 Client 가 필요
- GraphQL은 명세, 즉 형식일 뿐
- GrpahQL 구현할 솔루션 필요
  - 백엔드에서 정보를 제공 및 처리
  - 프론트엔드에서 요청 전송
  - GraphQL.js, GraphQL Yoga, AWS Amplify, Relay ...
  - [기타솔루션](https://graphql.org/code/)

- 백엔드와 프론트엔드 모두 제공
- 간편하고 쉬운 설정
- 풍성한 기능들 제공

## 실습해 볼 내용
- Apollo Server 를 활용한 백엔드 서버 제작
- Apollo Client 와 React를 활용한 프론트엔드 웹 제작
