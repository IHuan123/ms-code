//组合继承
// function Person(name){
//   this.name = name;
//   this.sum = function(){
//     alert(this.name)
//   }
// }
// Person.prototype.age = 20;

// function SuperType(name){
//   Person.call(this,name);
// }
// SuperType.prototype = new Person();
// SuperType.prototype.constructor = SuperType;
// var sup = new SuperType('张三');

// console.log(sup)

//寄生继承
//父类
function People(name,age){
  this.name = name || 'wangxiao';
  this.age = age || 27;
  this.sum = function(){
    alert(this.name)
  }
}
//父类方法
People.prototype.eat = function(){
  return this.name + this.age + 'eat sleep'
}
//子类
function Woman(name,age){
  //继承父类属性
  People.call(this,name,age)
  // this.name = name || 'wangxiao'
  // this.age = age || 27
}
//继承父类方法
(function(){
  // 创建空类
  let Super = function(){};
  Super.prototype = People.prototype;
  //父类的实例作为子类的原型
  Woman.prototype = new Super();
})();
//修复构造函数指向问题
Woman.prototype.constructor = Woman;
let womanObj = new Woman();
console.log(womanObj)
for(let key in womanObj){
  console.log('for...in',key)
}
// for(let item of womanObj){
//   console.log('for...of',item)
// }

let obj = {name:'lilei'};
Object.freeze(obj);
obj.name = '6666';


console.log(obj)