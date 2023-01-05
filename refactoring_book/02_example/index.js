import { plays, invoices } from './datas.js';
import { htmlStatement } from './statement.js';

export const run = () => {
  invoices.forEach((invoice) => {
    console.log(htmlStatement(invoice, plays));
  });
};
