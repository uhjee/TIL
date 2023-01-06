export function createStatementData(invoice, plays) {
  const result = {}; // 중간 구조 데이터
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) {
    const caculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance),
    );

    const result = Object.assign({}, aPerformance); // 얕은 복사
    result.play = caculator.play;
    result.amount = caculator.amount;
    result.volumeCredits = caculator.volumeCredits;
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
}

/**
 * 생성자 역할을 하는 팩토리 함수
 * play.type에 따른 분기처리 로직을 다형성으로 해결하기 위해 class로 각각 반환한다.
 *
 * @param   {[type]}  aPerformance  [aPerformance description]
 * @param   {[type]}  aPlay         [aPlay description]
 *
 * @return  {[type]}                [return description]
 */
function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

/**
 * 공연료 계산기 클래스
 */
class PerformanceCaculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error('오류 발생, 서브 클래스에서 처리하세요.');
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCaculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCaculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    // 희극 관객 5명 마다 추가 포인트 제공
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
