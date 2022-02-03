// laoder는 모듈의 내용을 문자열로 입력받는 함수
module.exports = function (source) {
  const result = { header: undefined, rows: [] }; // 모듈을 사용하는 쪽에서 받게 될 데이터
  const rows = source.split('\n');
// 문자열 parsing
  for (const row of rows) {
    const cols = row.split(',');
    if (!result.header) {
      result.header = cols;
    } else {
      result.rows.push(cols);
    }
  }
  return `export default ${JSON.stringify(result)}`;
};
