const babel = require('@babel/core');
const fs = require('fs');

// compile할 파일 가져오기
const filename = './src/code.js';
const source = fs.readFileSync(filename, 'utf8');

// babel 설정
const presets = ['@babel/preset-react'];
const plugins = [
  '@babel/plugin-transform-template-literals',
  '@babel/plugin-transform-arrow-functions',
];

// @babel/core의 함수 사용
const { code } = babel.transformSync(source, {
  filename,
  presets,
  plugins,
  configFile: false,
});

console.log(code);
