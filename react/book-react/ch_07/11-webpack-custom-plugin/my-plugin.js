// plugin 은 class 로 정의 가능
class MyPlugin {
  // webpack.config.js 에서 설정한 옵션이 생성자 매개변수로 넘어옴
  constructor(options) {
    this.options = options;
  }

  // webpack의 각 처리 단계에서 호출될 콜백함수 등록
  apply(compiler) {
    // webpack 실행 완료시
    compiler.hooks.done.tap('MyPlugin', () => {
      console.log('bundling complted!');
    });

    // webpack이 결과 파일을 생성하기 직전에 호출
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      let result = '';
      for (const filename in compilation.assets) {
        if (this.options.showSize) {
          const size = compilation.assets[filename].size();
          result += `${filename}(${size})\n`;
        } else {
          result += `${filename}\n`;
        }
      }

      // webpack이 생성할 파일들의 목록
      compilation.assets['fileList.txt'] = {
        source: function () {
          return result;
        },
        size: function () {
          return result.length;
        },
      };
    });
  }
}

module.exports = MyPlugin;
