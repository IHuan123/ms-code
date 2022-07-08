//手写实现instanceof
function _instanceof(constructor, obj) {
//   let proto = obj.__proto__;
  let proto = Object.getPrototypeOf(obj)
  let proptotype = constructor.prototype;
  while (true) {
    // 当proto为null时，就已经到了原型链顶端
    if (proto === null || proto === undefined) {
      console.log("not exist");
      return false;
    }
    if (proto === proptotype) {
      console.log("exist");
      return true;
    }
    proto = proto.__proto__;
  }
}

console.log(_instanceof(Object, {}));
