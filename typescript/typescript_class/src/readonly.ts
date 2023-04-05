module.exports = (function app() {
  class Test {
    // 1. 필드에 직접 선언 및 할당
    public readonly CITIES: string[] = ['seoul', 'busan'];

    // 2. 필드 선언 후 생성자 함수에서 초기화
    public readonly MAX_LENGTH: number;

    // 3. 생성자 함수 내부에서 초기화
    // 4. 생성자 함수 파라미터로 초기화
    constructor(
      maxLength: number,
      public readonly MSG: string,
      public readonly MSG_2: string = '행복하세요.',
    ) {
      this.MAX_LENGTH = maxLength;
    }
  }

  const run = () => {
    const t1 = new Test(2, '최대 글자를 넘길 수 없습니다.');
    console.log(t1.CITIES);
    console.log(t1.MAX_LENGTH);
    console.log(t1.MSG);
    console.log(t1.MSG_2);
    // t1.CITIES = [''];
  };
  return {
    run,
  };
})();
