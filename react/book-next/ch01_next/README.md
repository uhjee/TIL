# 1장. Next.js

## 1.1 Next.js란

### 1.1.1 React 단점

1. SPA(CSR)의 전체 번들 로딩 -> 첫 요청시 느린 렌더링
2. SPA(CSR)이기 때문에 SEO 최적화 불가

## 1.2 Next.js 의 특징

1. 사전 렌더링 및 SSR
2. Hot Code Reloading 지원 개발 환경
3. 자동 코드 분할 -> 가져오기 모듈들이 번들로 묶여 제공(불필요한 코드가 페이지에 로드 X)
4. webpack 및 babel 설정 간략화
5. Typescript 내장
6. 파일 기반 네비게이션
7. styled-jsx 지원: CSS-in-JS 