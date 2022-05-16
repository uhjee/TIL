module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    quotes: ['error', 'double'], // 더블 쿼터 사용
    '@typescript-eslint/quotes': ['error', 'double'],
    'no-used-vars': 'off', // 사용 안한 변수 경고 중복
    '@typescript-eslint/no-used-vars': 'warn',
    'jsx-ally/control-has-associated-label': 'off', // 상호 작용 엘리먼트에 label을 넣는다
    'react/no-array-index-key': 'off', // key 값으로 index 사용 가능 여부
    'comma-dangle': 'on', // 마지막에 , 넣어주기 여부
    'arrow-body-style': 'as-needed', // 화살표 함수안에 return 사용 가능
    'react/no-unescaped-entities': 'off', // 문자열 내에서 " ' > } 허용 여부
    'react/prop-types': 'off', // proptypes를 사용하지 않는다
    'object-curly-neline': 'off', // 다음 줄 바꿈 강제 사용 X
    'react/jsx-one-expression-per-line': 'off', // 한 라인에 여러 JSX 사용 가능
    'implicit-arrow-linebreak': 'off', // 화살표 함수 다음에 줄 바꿈 사용 가능
    'no-shadow': 'off', // 파일 내에서 중복 이름 사용 가능
    'spaced-comment': 'off', // 주석을 뒤에 달 수 있다
    'operator-linebreak': 'off', // 연산자 다음 줄 바꿈 사용 가능
    'react/react-in-jsx-scope': 'off', // jsx를 사용해도 React를 꼭 import하지 않아도 됨
    'react/jsx-props-no-spreading': 'off', // props를 spread 할 수 있다.
    'jsx-ally/anchor-is-valid': 'off', // next js 에서는 a 에 href 속성 없이 사용
    'global-require': 'off', // 함수 내에서 require 사용 가능
    'jsx-ally/label-has-associated-control': 'off', // label htmlFor 을 사용하지 않아도 된다
    'import/prefer-default-export': 'off', // export default 를 사용
    'no-param-ressign': 'off',
    'react/jsx-curly-newline': 'off', // jsx 안에 } 를 새로운 라인에 사용 가능
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'], // jsx 사용 가능 확장자
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'nevet',
        ts: 'nevet',
        tsx: 'nevet',
      }, // import 시 확장자명 사용 X
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
};
