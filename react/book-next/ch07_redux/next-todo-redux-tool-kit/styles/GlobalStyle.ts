import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

// styled-componet의 css 함수 사용 - 변수로 할당 가능
const globalStyle = css`
  /* 모든 스타일 초기화 */
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;

export default GlobalStyle;
