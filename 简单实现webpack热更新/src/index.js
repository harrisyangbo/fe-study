let input = document.createElement('input');
document.body.appendChild(input);

let div = document.createElement('div');
document.body.appendChild(div);

let render = ()=>{
    let title = require('./title.js');
    div.innerHTML = title;
}
render();
//如果当前模块支持热更新的话
if(module.hot){
    //注册回调 当前index.js模 块可以接收title.js的变更,当title.js变更后可以重新调用render方法
  module.hot.accept(['./title.js'],render);
}