import { createStatementData } from './createStatementData.js';

function usd(aNumber) {
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function renderHtml(data) {
  console.log({ data });

  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;

  result += '<table>\n';
  result += '<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n';

  // 청구 내역 출력
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }

  result += '</table>\n';

  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점<p>\n`;
  return result;
}

// 최상위 호출
export const htmlStatement = (invoice, plays) => {
  return renderHtml(createStatementData(invoice, plays));
};
