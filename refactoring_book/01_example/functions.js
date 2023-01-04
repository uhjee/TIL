const { plays } = require('./datas');

const statement = (invoice, plays) => {
  const statementData = {}; // 중간 구조 데이터
  return renderPlainText(statementData, invoice, plays);

  function renderPlainText(data, invoice, plays) {
    let result = `청구 내역 (고객명: ${invoice.customer}\n`;

    for (let perf of invoice.performances) {
      // 청구 내역 출력
      result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
        perf.audience
      }석)\n`;
    }

    result += `총액: ${usd(totalAmount(invoice))}\n`;
    result += `적립 포인트: ${totalVolumeCredits(invoice)}점\n`;
    return result;
  }

  function amountFor(aPerformance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
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
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function usd(aNumber) {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    // 포인트 적립
    result += Math.max(aPerformance.audience - 30, 0);
    if ('comedy' === playFor(aPerformance).type)
      // 희극 관객 5명 마다 추가 포인트 제공
      result += Math.floor(aPerformance.audience / 5);

    return result;
  }

  function totalVolumeCredits(invoice) {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function totalAmount(invoice) {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }
};

module.exports = {
  statement,
};
