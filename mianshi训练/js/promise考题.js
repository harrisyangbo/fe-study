const promise = new Promise((resolve, reject) => {
  console.log(1);
  reject();
  console.log(2);
});
setTimeout(()=> { console.log(3)}, 0)
promise.then(() => {
  console.log(4);
}).catch(e => {
      console.log(5);
}).then(data => {
      console.log(6, data);
  return 'aa';
}).then(Promise.resolve('bb'))
  .then((data) => {
    console.log(7, data)
})

console.log(8);