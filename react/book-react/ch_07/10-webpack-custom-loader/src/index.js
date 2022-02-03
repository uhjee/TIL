import members from './member.csv'; // my-csv-loader를 통해 읽어들인다.

for (const row of members.rows) {
  const name = row[1];
  const age = row[2];
  console.log(`${name} is ${age} years old`);
}
