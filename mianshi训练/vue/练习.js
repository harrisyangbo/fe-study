// 响应式
let active = null;
let states = { 
  a: 1, 
  b: {
    c: 2,
    e: 3
  },
  f: [1,2,3,4]
}

const watcher = (fn) => {
  active = fn;
  fn();
  active = null;
}

function defineReactive(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && !(obj[key] instanceof Array)) {
      defineReactive(obj[key]);
    } else if (obj[key] instanceof Array) {
      defineArray(obj[key]);
    } else {
      let value = obj[key]
      let dep = [];
      Object.defineProperty(obj, key, {
        get() {
          if (active) {
            dep.push(active);
          }
          return value;
        },
        set(newVal) {
          value = newVal;
          dep.forEach((watch) => {
            watch();
          })
        }
      })
    }
  }
}
// 把数组变为响应式
let originArray = Array.prototype;
let arrayMethod = Object.create(originArray);
function defineArray(arr) {
  // 仅实现了 push 的响应式
  arrayMethod.push = function(...args) {
    originArray.push.call(this, ...args);
    render();
  };
  arr.__proto__ = arrayMethod;
}
defineReactive(states);

watcher(() => {
  console.log('a' + states.a)
})
watcher(() => {
  console.log('c' + states.b.c)
})
function render() {
  console.log(states.f)
}
render();
states.a = 99;
states.b.c = 88;
states.f.push(5);

let state = {a: 1}
let active = null;
let watcher = (fn) => {
  active = fn;
  fn()
  active = null;
}
function defineReactive(obj) {
  for(let key in obj) {
    if (typeof obj[key] === 'object' && !(obj[key] instanceof Array)) {
      defineReactive(obj[key])
    } else {
      let value = obj[key]
      let deep = []
      Object.defineProperty(obj, key, {
        get() {
          if(active) {
            deep.push(active);
          }
          return value
        },
        set(val) {
          value = val
          deep.forEach((watch) => {
            watch()
          })
        }
      })
    }
  }
}