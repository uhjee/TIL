// babel 설정 파일 (babel7 이후로 js 파일로 관리)

const presets = ['@babel/preset-react'];
const plugins = [
  '@babel/plugin-transform-template-literals',
  '@babel/plugin-transform-arrow-functions',
];

module.exports = { presets, plugins };
