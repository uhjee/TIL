const { plays, invoices } = require('./datas');
const { statement } = require('./functions');

const run = () => {
  invoices.forEach((invoice) => {
    console.log(statement(invoice, plays));
  });
};

module.exports = {
  run,
};
