module.exports = {
  // webpack 설정을 변경하기 위한 함수
  webpack: config => {
    // module 에 file-loader 추가
    config.module.rules.push({
      test: /.(png|jpg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            // 쿼리 파라미터 부분에 해시 추가해 파일의 내용이 변경될 때마다 파일 경로가 변경되도록 처리
            name: '[path][name].[ext]?[hash]',
            // next는 static 폴더의 정적파일을 그대로 서비스하기 때문에 복사필요 X
            emitFile: false,
            publicPath: '/',
          },
        },
      ],
    });
    return config;
  },
  // next version 10 이후로 Image component가 내장되어 있기 때문에... 별도 설정
  //  next@canary 설치 필요
  images: {
    disableStaticImages: true,
  },
  // next export 명령을 실행할 때, exportPathMap 옵션 사용
  exportPathMap: function () {
    return {
      '/page1': { page: '/page1' },
      '/page2-hello': { page: '/page2', query: { text: 'hello' } }, // 쿼리 파라미터
      '/page2-world': { page: '/page2', query: { text: 'world' } },
    };
  },
};
