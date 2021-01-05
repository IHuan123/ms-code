//手写实现instanceof
function _instanceof(constructor,obj){
    let proto = obj.__proto__;
    let proptotype = constructor.prototype;
    while(true){
        if(proto===null||proto===undefined){
            console.log('not exist')
            return false;
        }
        if(proto===proptotype){
            console.log('exist')
            return true;
        }
        proto = proto.__proto__
    }
}

console.log(_instanceof(Object,{}))