//Object.create实现
function createObj(proto){
    function F(){}
    F.prototype = proto;
    return new F();
}
