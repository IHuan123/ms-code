// 手写实现一个new
/* 第一种
 * 1.创建一个空对象
 * 2.链接到原型
 * 3.绑定this值
 * 4.返回新对象
 */

function myNew() {
    let obj = {};
    let constructor = [].shift.call(arguments); // 获取构造函数
    // 函数的prototype.constructor为自己本身
    obj.__proto__ = constructor.prototype; //作用类似const obj = Object.create(fn.prototype)
    // let res = constructor.apply(obj,arguments)
    let res = constructor.call(obj, ...arguments)
    return typeof res === 'object' ? res : obj;
}

function People(name, age) {
    this.name = name
    this.age = age
}
let peo = myNew(People, 'Bob', 22);
console.log('People prototype',People.prototype)
console.log(peo)
console.log(peo.__proto__)
console.log(peo instanceof People)

//第二种
// 上面是本身Dog
function _new(fn,...args){   // ...args为ES6展开符,也可以使用arguments
    // 先用Object创建一个空的对象,
    const obj = Object.create(fn.prototype)  // fn.prototype代表 用当前对象的原型去创建
    // 现在obj就代表Dog了,但是参数和this指向没有修改
    const rel = fn.apply(obj,args)
    // 正常规定,如何fn返回的是null或undefined(也就是不返回内容),我们返回的是obj,否则返回rel
    return rel instanceof Object ? rel : obj
}


