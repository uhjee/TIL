const babel = require('@babel/core');
const fs = require('fs');

// compile할 파일 가져오기
const filename = './src/code.js';
const source = fs.readFileSync(filename, 'utf8');

// babel 설정
const presets = ['@babel/preset-react'];

// code 생성이 아닌, ast만 생성
const { ast } = babel.transformSync(source, {
  filename,
  ast: true,
  code: false,
  presets,
  configFile: false,
});

const { code: code1 } = babel.transformFromAstSync(ast, source, {
  filename,
  plugins: ['@babel/plugin-transform-template-literals'],
  configFile: false,
});

const { code: code2 } = babel.transformFromAstSync(ast, source, {
  filename,
  plugins: ['@babel/plugin-transform-arrow-functions'],
  configFile: false,
});

console.log(code1);
console.log(code2);
