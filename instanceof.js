//手写实现instanceof
function _instanceof(constructor,obj){
    let proto = obj.__proto__;
    let proptotype = constructor.prototype;
    while(true){
        if(proto===null||proto===undefined){
            console.log('1111')
            return false;
        }
        if(proto===proptotype){
            console.log('22222')
            return true;
        }
        proto = proto.__proto__
    }
}

console.log(_instanceof(Object,{}))