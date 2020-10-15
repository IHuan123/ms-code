// 组件通信，一个触发与监听的过程
class EventEmitter {
    constructor() {
        this.events = this.events || new Map();
    }
    addListener(eventName,callback){
        this.events.set(eventName,callback);
    }
    emit(eventName,value){
        let callback = this.events.get(eventName);
        callback(value)
    }
    off(eventName){
        this.events.delete(eventName)
    }
}
  
  // 测试
  let emitter = new EventEmitter()
  // 监听事件
  emitter.addListener('ages', age => {
    console.log(age)
  })
  // 触发事件
  emitter.emit('ages', 18)  // 18
  emitter.emit('ages', 20)  // 18
  console.log(emitter.events.keys())