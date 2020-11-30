// //callee 这个属性，在非严格模式下使用
// function test(){
//     console.log(arguments.callee) //arguments.callee当前arguments所在函数
// }
// test(1,2,6)
// let obj = {
//     [Symbol('name')]:1,
//     [Symbol('name')]:1,
//     [Symbol('lilei')]:1,
//     [Symbol('wmz')]:1,
//     [Symbol('zs')]:1,
// }
// console.log(obj)
// console.log(Object.getOwnPropertySymbols(obj))

//全局注册并登记的方法：Symbol.for()
// let name1 = Symbol.for('name');
// let name2 = Symbol.for('name');
// console.log(name1 === name2)


//Set Map

// 在创建Set 对象的时候，还可以传递一个数组（或者具有iterable接口其他数据类型）作为参数，因为Set数据接口不会有重复的值，所以会自动去掉数组中重复的值。
let arr = [1,2,3,6,5,4];
let setArr = new Set(arr);
console.log('setArr',setArr)

//在创建Set 对象的时候， 传递给构造函数的初始值是不会发生类型转换的，所以数字3和字符3是不同的，
//Set内部判断两个值是否相同时使用的算法是“Same-value equality”，它类似精确相等（===），（主要区别是NaN等于自身），而精确相同NaN是不等于自身的。

// setArr.add(99)
// console.log(setArr)
// setArr.add([6,43,4,434,4343,44])
// console.log(setArr)
// console.log([...setArr])// 转化为数组

// size	获取当前Set对象的长度
// add(value)	向当前Set对象中添加一个值，返回的是Set对象，所以支持链式写法
// delete(value)	删除当前Set对象中的一个值，返回一个布尔值，表示是否删除成功
// has(value)	检测这个value是否是当前Set对象的一个元素，通过返回的布尔值表示
// clear()	清除当前Set对象所有元素，没有返回值


// console.log('Set属性:',setArr.size,setArr.has(99))

// keys()	返回该Set对象键名的遍历器
// values()	返回该Set对象键值的遍历器
// entries()	返回该Set对象键值对的遍历器
// forEach()	使用回调函数遍历该Set对象的每个元素

// console.log('keys',setArr.keys());
// console.log('values',setArr.values());
// console.log('entries',setArr.entries());
// setArr.forEach((item,key,arr)=>{
//     console.log('forEach',key,item)
// })


// WeakSet的概述：
// WeakSet数据结构是一种类似于Set的数据结构，因此也不可以重复
// WeakSet的成员只能是对象，不能是其他值，并且对象都是弱引用
// 因为成员都是对象的弱引用，所以随时都可能会被垃圾回收，因此是不能遍历的
// WeakSet相对于Set的属性和方法而言，没有size， 也没有clear


//Map
let log=console.log;
let array=[["姓名", "小王"],["年龄","23"]];
let m = new Map(array);



// size	获取当前Map对象的长度
// set(key,value)	向当前Map对象中添加一个值，返回的Map对象，所以支持链式写法
// get(key)	通过key找到value，如果找不到，返回undefined
// delete(key)	删除当前Map对象中的一个值，返回一个布尔值，表示是否删除成功
// has(key)	检测这个value是否是当前Map对象的一个元素，通过返回的布尔值表示
// clear()	清除当前Map对象所有元素，没有返回值

let obj = {info:{}}
m.set('性别','男')
m.set(obj,'其他信息')
log(m,m.size,m.has('姓名'));
log(m.get(obj))

// keys()	返回该Map对象键名的遍历器
// values()	返回该Map对象键值的遍历器
// entries()	返回该Map对象键值对的遍历器
// forEach()	使用回调函数遍历该Map对象的每个元素

console.log('keys',m.keys());
console.log('values',m.values());
console.log('entries',m.entries());
// m.forEach((value,index)=>{
//     log(value,index)
// })


let test = {count:11,num:22};
//赋值重新命名
const {count:as_count,num:as_num} = test;
console.log(as_count,as_num)




// 箭头函数的 this 永远指向其上下文的 this ，任何方法都改变不了其指向，如 call() , bind() , apply()
// 普通函数的this指向调用它的那个对象

//箭头函数
//箭头函数不能作为构造函数（不能new）
//箭头函数没有arguments 可以使用es6解构(...args)
//函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
//不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
//call,apply,bind不能改变箭头函数this的指向
//箭头函数没有原型，不能继承
function testF(){
    console.log('testF',this)
}
var testF1 = ()=>{
    //console.log(arguments)// Uncaught ReferenceError: arguments is not defined
    console.log('testF1',this)
}
var testF2 = function(){
    console.log('testF2',this)
}
testF();//testF Window {window: Window, self: Window, document: document, name: "", location: Location, …}
testF1();//testF2 Window {window: Window, self: Window, document: document, name: "", location: Location, …}
testF2()//testF2 Window {window: Window, self: Window, document: document, name: "", location: Location, …}


let obj1 = {
    testF:function testF(){
        console.log('obj2.obj1.testF',this)
    },
    testF1:()=>{
        console.log('obj2.obj1.testF1',this)
    },
    testF2:function(){
        console.log('obj2.obj1.testF2',this)
    }
}
obj2={name:'obj2',obj1}
obj2.obj1.testF();//obj2.obj1.testF {testF: ƒ, testF1: ƒ, testF2: ƒ}
obj2.obj1.testF1();//obj2.obj1.testF1 Window {window: Window, self: Window, document: document, name: "", location: Location, …}
obj2.obj1.testF2()//obj2.obj1.testF2 {testF: ƒ, testF1: ƒ, testF2: ƒ}


// new testF1() //common_test.js:137 Uncaught TypeError: testF1 is not a constructor


function testF3(){
    this.fnName = 'testF3'
    this.testFun = ()=>{
        console.log('testFun',this)
    }
}
let obj3 = new testF3(); //testFun testF3 {fnName: "testF3", testFun: ƒ}
obj3.testFun()

class Test4{
    name='Test4';
    constructor(){
        this.testFn = ()=>{
            console.log(this)
        }
    }
    h=()=>{
        console.log(this)
    }
}

let obj5 = new Test4();
obj5.testFn();
obj5.h()