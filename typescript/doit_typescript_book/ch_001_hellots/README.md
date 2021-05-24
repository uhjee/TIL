## **ch_001/ch_002** 

### <a id="ch_001">개발환경 설정</a>

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

- dev: `src/index.ts` 를 컴파일 후 실행하는 역할
- build: 배포하기 위해, dist 디렉토리에 ES5 js file을 만들 때 사용(트랜스파일러 사용, babel)
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

### tsconfig.json 내부 살펴보기

**tsc 명령어**: ''옵션''과 ''대상파일''로 구성

```shell
Syntax:   tsc [options] [file...]
```

```json
{
  "compilerOptions": {
    "module": "commonjs", // browser: amd or node.js : commonjs
    "esModuleInterop": true, // amd 방식을 전제로 하는 라이브러리를 동작시키기 위한 플래그
    "target": "es5", // 트랜스파일할 대상의 js version(보통 es5)
    "moduleResolution": "node", // module이 commonjs : node or amd : classic
    "outDir": "dist", // 트랜스파일된 es5 js파일이 저장되는 디렉토리
    "baseUrl": ".", // 트랜스파일 후 디렉토리, tsconfig.json 파일 존재 디렉토리 기준
    "sourceMap": true, // 트랜스파일 디렉토리에 ".js.map" 파일 생성. 디버깅 용
    "downlevelIteration": true, // Generator 동작을 위한 플래그
    "noImplicitAny": false, // type을 지정하지 않으면 any 타입으로 간주하는 지 여부
    "paths": { "*": ["node_modules/*"] } // module -import 시 참조할 경로, 외부 패키지인 경우도 포함시키기 위해 node_modules 포함
  },
  "include": ["src/**/*"]
}

```

- `compilerOprions`: tsc 명령 형식의 옵션을 나타냄

- `include`: 대상파일 목록을 나타냄

  src 디렉토리와  src 하위 디렉토리의 모든 파일을 컴파일 대상으로 포함한다는 의미
  
- 아래는 멋쟁이 분께서 `tsconfig.json` 컴파일 옵션을 정리한 것

  ```json
  {
  "compilerOptions": {
  /* https://aka.ms/tsconfig.json 를 방문하면 해당 파일에 대한 더 많은 정보를 얻을 수 있습니다. */
  // 옵션은 아래와 같은 형식으로 구성되어 있습니다.
  // "모듈 키": 모듈 값 /* 설명: 사용가능 옵션 (설명이 "~ 여부"인 경우 'true', 'false') */
  /* 기본 옵션 */
  // "incremental": true, /* 증분 컴파일 설정 여부 */
  "target": "es5", /* 사용할 특정 ECMAScript 버전 설정: 'ES3' (기본), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 혹은 'ESNEXT'. */
  "module": "commonjs", /* 모듈을 위한 코드 생성 설정: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
  // "lib": [], /* 컴파일에 포함될 라이브러리 파일 목록 */
  // "allowJs": true, /* 자바스크립트 파일 컴파일 허용 여부 */
  // "checkJs": true, /* .js 파일의 오류 검사 여부 */
  // "jsx": "preserve", /* JSX 코드 생성 설정: 'preserve', 'react-native', 혹은 'react'. */
  // "declaration": true, /* '.d.ts' 파일 생성 여부. */
  // "declarationMap": true, /* 각 '.d.ts' 파일의 소스맵 생성 여부. */
  // "sourceMap": true, /* '.map' 파일 생성 여부. */
  // "outFile": "./", /* 단일 파일로 합쳐서 출력합니다. */
  // "outDir": "./", /* 해당 디렉토리로 결과 구조를 보냅니다. */
  // "rootDir": "./", /* 입력 파일의 루트 디렉토리(rootDir) 설정으로 --outDir로 결과 디렉토리 구조를 조작할 때 사용됩니다. */
  // "composite": true, /* 프로젝트 컴파일 여부 */
  // "tsBuildInfoFile": "./", /* 증분 컴파일 정보를 저장할 파일 */
  // "removeComments": true, /* 주석 삭제 여부 */
  // "noEmit": true, /* 결과 파일 내보낼지 여부 */
  // "importHelpers": true, /* 'tslib'에서 헬퍼를 가져올 지 여부 */
  // "downlevelIteration": true, /* 타겟이 'ES5', 'ES3'일 때에도 'for-of', spread 그리고 destructuring 문법 모두 지원 */
  // "isolatedModules": true, /* 각 파일을 분리된 모듈로 트랜스파일 ('ts.transpileModule'과 비슷합니다). */
  /* 엄격한 타입-확인 옵션 */
  "strict": true, /* 모든 엄격한 타입-체킹 옵션 활성화 여부 */
  // "noImplicitAny": true, /* 'any' 타입으로 구현된 표현식 혹은 정의 에러처리 여부 */
  // "strictNullChecks": true, /* 엄격한 null 확인 여부 */
  // "strictFunctionTypes": true, /* 함수 타입에 대한 엄격한 확인 여부 */
  // "strictBindCallApply": true, /* 함수에 엄격한 'bind', 'call' 그리고 'apply' 메소드 사용 여부 */
  // "strictPropertyInitialization": true, /* 클래스의 값 초기화에 엄격한 확인 여부 */
  // "noImplicitThis": true, /* 'any' 타입으로 구현된 'this' 표현식 에러처리 여부 */
  // "alwaysStrict": true, /* strict mode로 분석하고 모든 소스 파일에 "use strict"를 추가할 지 여부 */
  /* 추가적인 확인 */
  // "noUnusedLocals": true, /* 사용되지 않은 지역 변수에 대한 에러보고 여부 */
  // "noUnusedParameters": true, /* 사용되지 않은 파라미터에 대한 에러보고 여부 */
  // "noImplicitReturns": true, /* 함수에서 코드의 모든 경로가 값을 반환하지 않을 시 에러보고 여부 */
  // "noFallthroughCasesInSwitch": true, /* switch문에서 fallthrough 케이스에 대한 에러보고 여부 */
  /* 모듈 해석 옵션 */
  // "moduleResolution": "node", /* 모듈 해석 방법 설정: 'node' (Node.js) 혹은 'classic' (TypeScript pre-1.6). */
  // "baseUrl": "./", /* non-absolute한 모듈 이름을 처리할 기준 디렉토리 */
  // "paths": {}, /* 'baseUrl'를 기준으로 불러올 모듈의 위치를 재지정하는 엔트리 시리즈 */
  // "rootDirs": [], /* 결합된 컨텐츠가 런타임에서의 프로젝트 구조를 나타내는 루트 폴더들의 목록 */
  // "typeRoots": [], /* 타입 정의를 포함할 폴더 목록, 설정 안 할 시 기본적으로 ./node_modules/@types로 설정 */
  // "types": [], /* 컴파일중 포함될 타입 정의 파일 목록 */
  // "allowSyntheticDefaultImports": true, /* default export이 아닌 모듈에서도 default import가 가능하게 할 지 여부, 해당 설정은 코드 추출에 영향은 주지 않고, 타입확인에만 영향을 줍니다. */
  "esModuleInterop": true, /* 모든 imports에 대한 namespace 생성을 통해 CommonJS와 ES Modules 간의 상호 운용성이 생기게할 지 여부, 'allowSyntheticDefaultImports'를 암시적으로 승인합니다. */
  // "preserveSymlinks": true, /* symlik의 실제 경로를 처리하지 않을 지 여부 */
  // "allowUmdGlobalAccess": true, /* UMD 전역을 모듈에서 접근할 수 있는 지 여부 */
  /* 소스 맵 옵션 */
  // "sourceRoot": "", /* 소스 위치 대신 디버거가 알아야 할 TypeScript 파일이 위치할 곳 */
  // "mapRoot": "", /* 생성된 위치 대신 디버거가 알아야 할 맵 파일이 위치할 곳 */
  // "inlineSourceMap": true, /* 분리된 파일을 가지고 있는 대신, 단일 파일을 소스 맵과 가지고 있을 지 여부 */
  // "inlineSources": true, /* 소스맵과 나란히 소스를 단일 파일로 내보낼 지 여부, '--inlineSourceMap' 혹은 '--sourceMap'가 설정되어 있어야 한다. */
  /* 실험적 옵션 */
  // "experimentalDecorators": true, /* ES7의 decorators에 대한 실험적 지원 여부 */
  // "emitDecoratorMetadata": true, /* decorator를 위한 타입 메타데이터를 내보내는 것에 대한 실험적 지원 여부 */
  /* 추가적 옵션 */
  "skipLibCheck": true, /* 정의 파일의 타입 확인을 건너 뛸 지 여부 */
  "forceConsistentCasingInFileNames": true /* 같은 파일에 대한 일관되지 않은 참조를 허용하지 않을 지 여부 */
  }
  }
  
  출처: https://geonlee.tistory.com/214 [빠리의 택시 운전사]
  ```

  

**javascript 환경**

- 웹 브라우저 환경과 node.js 환경으로 분류
- 물리적으로 동작하는 방법이 다르기 때문에 , 모듈화된 javascript 또한 두 환경에서 다르게 동작
  - 웹 브라우저 : **AMD**(asynchronous module definition) 방식
  - node.js: **CommonJS** 방식

#  