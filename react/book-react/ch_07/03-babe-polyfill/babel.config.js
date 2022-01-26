const presets = [
  [
    '@babel/preset-env', // 폴리필을 모아놓은 preset
    {
      targets: {
        chrome: '40',
      },
      useBuiltIns: 'usage', // polyfill 관련 설정 - 코드에서 사용된 기능의 폴리필만 추가

      corejs: { version: 3, proposals: true },
    },
  ],
];

module.exports = { presets };
