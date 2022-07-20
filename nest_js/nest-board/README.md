# 00. Nest.js란

Nest.js란 효율적이고 확장 가능한 Node.js 서버 애플리케이션을 구축하기 위한 프레임워크입니다. Typescirpt로 빌드되고, 완벽하게 지원합니다. 물론 순수 Javascript 만으로도 구현이 가능합니다. OOP, FP, FRP를 지원한다고 합니다. 그리고 그 구조는 Angular에서 많은 영향을 받았다고 합니다.

## Nest.js의 구성

Nest.js는 내부적으로 sxpress를 기본값으로 사용합니다. 또 선택적으로 fastify를 사용할 수도 있습니다.

## Providers

Nest.js의 개념을 접하면서 Java 프레임워크인 Spring과 참 닮아있다는 생각이 들었습니다. Spring을 처음 배울 때 의존성의 주입이라는 개념이 어렵게 다가왔던 기억이 있습니다. Nest.js도 그 의존성 관리 기능을 구현해 놓았습니다.

Nest.js의 Provider는 의존성을 주입당할 수 있는 대상들입니다. service, repository, factory, helper 등이 이에 해당됩니다. 이들은 Nest runtime 시스템에 각자의 의존성을 위임하고, Nest runtime은 이들의 인스턴스간 의존성을 주입하며 객체간 다양한 관계를 맺을 수 있도록 합니다.

컨트롤러는 HTTP 요청을 다룰 때, 다른 Provider들에게 작업을 위임합니다.

# 01. First Step

## 01-1.src

```
├─ src
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  └─ main.ts
```

- app.controller.spec.ts
  컨트롤러 unit test

- app.controller.ts
  하나의 route가 있는 기본 컨트롤러

- app.module.ts
  app의 root 모듈

- app.service.ts
  하나의 method가 있는 기본 서비스

- main.ts
  `NestFactory`를 사용해 nest app 인스턴스를 만드는 entry 파일

## 01-2. main.ts

main.ts는 어플리케이션을 실행시키는 async 함수를 갖고 있습니다.
해당 함수 내부에서는 `NestFactory` 클래스를 사용해 nest 인스턴스를 생성합니다.
static mehtod인 create()는 `INestApplication` 이라는 인터페이스의 어플리케이션 객체를 반환하고 이 객체는 HTTP request가 올 때까지 대기합니다.

> `NestFactory`의 `create()`함수는 제네릭으로 HTTP 플랫폼 타입을 입력받을 수 있습니다.
> 기본값은 `NestExpressApplication` 입니다.

## 01-3. Controllers

**컨트롤러**는 request와 response를 다루는 역할을 합니다.

컨트롤러의 메소드들은 **리퀘스트 핸들러(request hanlder)** 역할을 하며 각자의 route를 갖고 있습니다.

컨트롤러는 이러한 핸들러들을 그룹핑하는 역할도 합니다. 따라서 다루는 책임과 역할에 따라 개수가 늘어날 수 있고 요청에 따라 어느 컨트롤러에서 요청을 받을지 정해지게 됩니다.(**Route Handler**)

`@Controller()` 라는 데코레이터를 사용합니다. 파라미터는 route 경로를 받습니다.

# Project Tree

```
nest-starter
├─ .eslintrc.js
├─ .git
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  └─ update.sample
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     └─ tags
├─ .gitignore
├─ .prettierrc
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  └─ main.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
└─ tsconfig.json

```
