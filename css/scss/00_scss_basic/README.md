scss

## npm install

```sh
npn i node-sass
```

## cli 명령어

`package.json` script 추가

- 공부할 때 나 편하자고 만든 스크립트 명령어

- scss 파일을 css로 트랜스 컴파일해준다.
  - `--watch` option : scss 파일 변경을 감지해 변경되면 css로 자동 컴파일

```sh
node-sass --watch [변경할파일scss] [변경후css파일]
```

```json
  "scripts": {
    "css": "node-sass --watch scss/main.scss css/main.css"
  },
```

## 변수 variables

- `$` 심볼을 사용해  css 속성의 값을 변수처리할 수 있음

```scss
// VARIABLES
$color--black: #000;
$color--white: #fff;

.test-wrapper {
  // 변수 사용
  background-color: $color--black;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## Nesting

hieararchy 구조가 없는 css를 HTML처럼 hieararchy 구조로 사용할 수 있다.

vs-code의 다음 익스텐션은 html 구조에 따라 클래스명을 추출해 scss hieararchy 구조를 자동으로 생성해준다.

[vscode_extension__BEN helper](https://marketplace.visualstudio.com/items?itemName=Box-Of-Hats.bemhelper)

main.scss

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

컴파일 후 main.css

```scss
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

## 모듈 Modules

@use 를 쓰라는데, 그러면 트랜스파일이 안되고, @import 일 때만 된다. 흠....

`_variables.scss` 생성

- 파일명 앞의 언더스코어는 파일 단위(파일 자체)로써  css 컴파일되지 않도록 함

```scss
// 변수 처리
$color--black: #000;
$color--white: #fff;
```

main.scss

```scss
@import 'variables';

.test-wrapper {
  background-color: $color--black;
  display: flex;
  justify-content: center;
  align-items: center;

  .header {
    color: $color--white;
    font-weight: 700;
    text-decoration: underline;
  }
  .content {
    color: $color--white;
  }
}

```

## mixin

- 재사용이 가능한 속성들
- 파라미터처럼 사용 가능

_mixin.scss 생성

```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, 0.25);
  color: #fff;
}
```

main.scss

- `@include` 로 사용

```scss
@import '_mixin';

.info {
  @include theme;
}
.alert {
  // 파라미터처럼 전달
  @include theme($theme: DarkRed);
}
.success {
  // 파라미터처럼 전달
  @include theme($theme: DarkGreen);
}
```