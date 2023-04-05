module.exports = (function app() {
  class ModifierTest {
    public name: string;
    protected protectedName: string;
    private privateName: string;

    constructor(name: string, protectedName: string, privateName: string) {
      // 클래스 내부에서는 모두 접근 가능
      this.name = name;
      this.protectedName = protectedName;
      this.privateName = privateName;
    }
  }

  class ModifierTestChildren extends ModifierTest {
    constructor(name: string, protectedName: string, privateName: string) {
      super(name, protectedName, privateName);
      // 자식 클래스에서는 private 접근 불가
      this.name = `자식 생성자 - ${name}`;
      this.protectedName = `자식 생성자 - ${protectedName}`;
    }
  }

  const run = () => {
    const m1 = new ModifierTest('퍼블릭', '프로텍틷', '프라이빗');
    console.log(m1.name); // public만 직접 접근 가능
  };
  return {
    run,
  };
})();
