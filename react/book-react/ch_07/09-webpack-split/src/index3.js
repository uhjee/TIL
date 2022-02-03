async function myFunc() {
  await new Promise((res) => setTimeout(res, 1000)); // 1초 지연
  const [{ add }, { default: _ }] = await Promise.all([
    import(/* webpackPreload: true */ './util'),
    import(/* webpackPrefetch: true */ 'lodash'),
  ]);
  console.log('value', _.fill(new Array(3).fill(1), add(30, 20)));
}
myFunc();
