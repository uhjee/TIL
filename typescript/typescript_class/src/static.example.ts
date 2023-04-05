module.exports = (function app() {
  class Test {
    public static msg: string = '스태틱 프로퍼티입니다.';
    public static instanceCount = 0;

    public static isInstanceOf(instance: unknown) {
      return instance instanceof this;
    }
    constructor() {
      Test.instanceCount += 1;
    }
  }
  class Test1 {}

  const run = () => {
    const t1 = new Test1();
    const t2 = new Test();
    console.log(Test.isInstanceOf(t1));
    console.log(Test.isInstanceOf(t2));

    const t3 = new Test();
    const t4 = new Test();
    console.log(Test.msg);
    console.log(Test.instanceCount);
  };
  return {
    run,
  };
})();
