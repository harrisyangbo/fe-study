/**
 * 代理是为了控制对对象的访问，不让外部直接访问到对象。在现实生活中，也有很多代理的场景。比
 * 如你需要买一件国外的产品，这时候你可以通过代购来购买产品。
 * 
*/

// 事件代理用的就是代理模式

let ul = document.querySelector('#ul')
ul.addEventListener('click', (event) => {
  console.log(event.target);
})