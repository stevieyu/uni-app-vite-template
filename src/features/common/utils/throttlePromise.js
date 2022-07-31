

const throttleQueue = {};
export default (promiseFunction) => (...args) => new Promise((resolve, reject)=> {
  const key = args.join('');
  if (throttleQueue[key]) {
    throttleQueue[key].resolves.push(resolve);
    throttleQueue[key].rejects.push(reject);
    return;
  }
  throttleQueue[key] = {resolves: [resolve], rejects: [reject]};
  promiseFunction(...args)
      .then((...res) => {
        throttleQueue[key].resolves.forEach((i) => i(...res));
      })
      .catch((...res) => {
        throttleQueue[key].rejects.forEach((i) => i(...res));
      })
      .finally(() => {
        delete throttleQueue[key];
      });
});
