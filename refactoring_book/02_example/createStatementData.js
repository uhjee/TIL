export function createStatementData(invoice, plays) {
  const statementData = {}; // 중간 구조 데이터
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;

  function enrichPerformance(aPerformance) {
    const caculator = new PerformanceCaculator(
      aPerformance,
      playFor(aPerformance),
    );

    const result = Object.assign({}, aPerformance); // 얕은 복사
    result.play = caculator.play;
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;

    switch (aPerformance.play.type) {
      case 'tragedy': // 비극
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case 'comedy': // 희극
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
    }
    return result;
  }
}
function volumeCreditsFor(aPerformance) {
  let result = 0;
  // 포인트 적립
  result += Math.max(aPerformance.audience - 30, 0);
  if ('comedy' === aPerformance.play.type)
    // 희극 관객 5명 마다 추가 포인트 제공
    result += Math.floor(aPerformance.audience / 5);

  return result;
}

function totalVolumeCredits(data) {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function totalAmount(data) {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}

/**
 * 공연료 계산기 클래스
 */
class PerformanceCaculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }
}
