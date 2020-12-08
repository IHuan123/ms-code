//闭包实现私有属性 

//缺点：是真正的私有，但是实例无法共享方法，浪费内存空间
function Person(name) {
  this.getName = function () {
    return name;
  }
}
// var person = new Person('Joe');
// console.log(person)



//使用Symbol实现私有属性 
//缺点：会被Object.getOwnPropertySymbols获取到属性，进而修改该属性对应的值（Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，
//也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。）
var User = (function () {
  var nameSymbol = Symbol('name');

  function User(name) {
    this[nameSymbol] = name;
  }
  User.prototype.getName = function () {
    return this[nameSymbol]
  }
  return User;
})()

console.log(new User('lilei'))

//使用Map实现私有属性 
var User1 = (function () {
  var map = new Map();

  function User1(name) {
    map.set(this, name)
  }
  User1.prototype.getName = function () {
    return map.get(this)
  }
  return User1
})()


let obj = new User1('lilei');
console.log(obj.getName())