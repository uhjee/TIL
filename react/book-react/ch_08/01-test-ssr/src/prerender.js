import fs from 'fs';
import path from 'path';
import { renderPage, prerenderPages } from './common';

for (const page of prerenderPages) {
  const result = renderPage(page);
  // 페이지를 미리 렌더링해서 dist 폴더 밑에 저장
  fs.writeFileSync(path.resolve(__dirname, `../dist/${page}.html`), result);
}
