//compose
let fn1 = function (x) {
    console.log('fn1');
    return x + 10;
};
let fn2 = function (x) {
    console.log('fn2');
    return x * 10;
};
let fn3 = function (x) {
    console.log('fn3');
    return x / 5;
};
let fn4 = function (x) {
    console.log('fn4');
    return x / 5;
};
let fn5 = function (x) {
    console.log('fn5');
    return x / 5;
};


/********************************************** */
//第一种
function compose(...funcs){
    let len = funcs.length;
    return function f(...args){
        if(!len) return args;
        if(len===1) return funcs[0](...args);
        return funcs.reduce((x,y,i,arr)=>{
            return typeof x ==='function' ? y(x(...args)) : y(x)
        })
    }
}
let res = compose(fn1,fn2,fn3,fn4,fn5)(6);
console.log(res)