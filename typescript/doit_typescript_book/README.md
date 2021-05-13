# **typescript**

## **ch_001**  / ch_002
### 개발환경 설정

 - typescript package 설치

   ```shell
   npm i -g typescript
   ```

    -  `tsc`  키워드를 통해  `.js` 파일로 변환해주는 compiler

 - ts-node package 설치

   ```shell
   npm i -g ts-node
   ```

    -  `ts-node` 키워드를 통해 `.ts` 를 `.js` 로 변환해주고, node 환경에서 실행까지 시켜준다.

- 둘 다 개발환경 위에 설치하기 위해, `npm init` 후  `--save-dev` 또는 `-D` 로 재설치
- ts는 Promise 같은 개체도 알고 있지 않기 때문에 , `@types/node` 를 설치해야 한다.

### tsconfig.json : TS compiler config file  만들기

```shell
tsc --init
```

### package.json > script 추가

```json
  "scripts": {
    "dev": "ts-node src",
    "build" : "tsc && node dist"
  },
```

- dev: src/index.ts 를 컴파일 후 실행하는 역할
- build: 배포라기 위해, dist 디렉토리에 ES5 js file을 만들 때 사용(트랜스파일러 사용, babel)
- `npm run [script]` 형태로 사용

### module system

외부 패키지 import 하기

- 아래 package install

  ```shell
  > npm i -S chance ramda
  > npm i -D @types/chance @types/ramda
  ```

  - chance package : 가짜 데이터를 만들어주는데 사용
  - ramda: 함수형 유틸리티 패키지

- 크게 다를 게 없다. default로 제공하는 것은 전체로, export로 개체를 쪼개서 제공하는 것은 * 과 `as` 를 이용해 별칭을 주어서 전체를 받아 사용.

  ```javascript
  import Person, { makePerson } from './person/Person';
  import IPerson from './person/IPerson';
  import Chance from 'chance'; // export default 형태로 제공
  import * as R from 'ramda'; // 여러개의 export 문으로 제공
  
  const chance = new Chance();
  
  let persons: IPerson[] = R.range(0, 2).map((n: number) => new Person(chance.name(), chance.age()));
  
  console.log(persons);
  ```

p.53 부터 시작 tsconfig.json 살펴보기



