# media query

[미디어쿼리 초보자 안내서](https://developer.mozilla.org/ko/docs/Learn/CSS/CSS_layout/Media_queries) (쪼렙이니까 우선 이걸 참고하자 나는)

단말기의 유형, 특성이나 수치(화면 해상도, 뷰포트 너비) 등에 따라 웹 또는 앱의  스타일을 수정할 때 유용

미디어 유형, 미디어 기능에 따라 조건을 걸 수 있다.

## 논리연산자

- and

  미디어 유형과 미디어 특성 모두 사용 가능

- not

  미디어 유형 반드시 지정

- only

  전체 쿼리가 일치할 때 스타일 적용

  ```css
  screen and (max-width: 500px)
  ```

  위의 상황에 구형 브라우저는 앞의 조건만 일치하면 스타일을 적용할 수도 있다. 따라서 only 명시

  미디어 유형 반드시 지정

  ```css
  @media only screen and (min-width: 0) and (max-width: 1500px) {...}
  ```

  

- `,` 쉼표

  or 처럼 동작 (level4 부터 `or` 연산자 별도 제공)

  



## 미디어 유형

- all
- print: 인쇄 결과물 및 출력 미리보기 화면 등
- screen: 주로 화면
- speech

```css
@media print { ... }
```

```css
@media screen or print { ... }
```



## 미디어  특성(기능)

### hover 할 수 있다면 스타일 적용

hover할 수 있는 기능이 있는지 판단

- 마우스: true
- 터치스크린, 키보드 네비게이션: false

```css
@media (hover: hover) { ... }
```

### min, max 사용

- 최대, 최소 조건을 줄 수 있다.
- 아래 예제는 모바일 환경의 미디어 쿼리(최소 스마트폰, 최대 태블릿)

```css
@media (min-width: 335px) and (max-width: 758px -1) { ... } 
```

### 값 없이 사용 

- 미디어 특성 쿼리에 값이 없다면, 주어진 기능의 값이 `0`과 `none`이 아닐 때, 적용

```css
@media (color) { ... }
```



- 자세한 목록은 아래에서 확인하자

[mdn_media_query](https://developer.mozilla.org/ko/docs/Web/CSS/Media_Queries/Using_media_queries#%EB%AF%B8%EB%94%94%EC%96%B4_%ED%8A%B9%EC%84%B1)

