const a = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('A');
    resolve('resolve A');
  }, 1000);
})
const b = (str) => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('B');
    resolve(str + ' resolve B');
  }, 1000);
})
const c = (str) => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('C');
    resolve(str + ' resolve C');
  }, 1000);
})

const test = async () => {
  const Ares = await a();
  console.log(Ares);
  const Bres = await b(Ares);
  console.log(Bres);
  const Cres = await c(Bres);
  console.log(Cres);
}

test();

