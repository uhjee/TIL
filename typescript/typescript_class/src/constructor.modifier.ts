module.exports = (function app() {
  class Test {
    // 생성자 함수 내부에 초기화 코드가 없더라도 암묵적으로 초기화
    constructor(public a: string, private b: string) {}

    getB() {
      return this.b;
    }
  }

  const run = () => {
    const t1 = new Test('AA', 'BB');
    console.log(t1.a);
    console.log(t1.getB());
  };
  return {
    run,
  };
})();
