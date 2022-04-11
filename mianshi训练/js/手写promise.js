class Promise {
  constructor(fn) {
    this.states = 'pending';
    this._result = undefined;

    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    const resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      let _self = this;
      setTimeout(() => {
        if (_self.states === 'pending') {
          _self.states = 'resolved';
          _self._result = value;
          _self.resolveCallbacks.forEach(cb => cb(_self._result));
        }
      })
      
    }
    const reject = (value) => {
      let _self = this;
      setTimeout(() => {
        if (_self.states === 'pending') {
          _self.states = 'rejected';
          _self._result = value;
          _self.rejectCallbacks.forEach(cb => cb(_self._result));
        }
      },0)
    }
    try {
      fn(resolve, reject)
    } catch(e) {
      reject(e.message)
    }
  }

  static all() {

  }

  static race() {

  }

  static resolutionProcedure(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('Error'))
    }
    if (x instanceof Promise) {
      
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : r => {
      throw r;
    }
    if (this.states === 'pending') {
      this.resolveCallbacks.push(onFulfilled);
      this.rejectCallbacks.push(onRejected);
    }
    if (this.states === 'resolved') {
      onFulfilled(this._result)
    }
    if (this.states === 'rejected') {
      onRejected(this._result)
    }
  }

  catch(onRejection) {
    return this.then(null, onRejection);
  }

  finally() {

  }
}

// test

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  },4000)
})

promise.then((res) => {
  console.log(res)
})