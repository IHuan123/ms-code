//Object.create实现
function ObjectCreate(proto, propertiesObject){
    if (![ 'object', 'function' ].includes(typeof proto)) {
        throw new TypeError(`Object prototype may only be an Object or null: ${proto}`)
    }
    let Ctor = new Function()
    Ctor.prototype = proto
    const res = new Ctor()
    // 支持第二个参数
    if (propertiesObject) {
        // Object.defineProperty的批量处理方法
        Object.defineProperties(res, propertiesObject)
    }
      // 支持空原型
    if (proto === null) {
        res.__proto__ = null
    }
    return res
}
