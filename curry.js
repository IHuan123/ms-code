//函数柯里化
//参数数量确定
function curry(fn,...args){
    let fnLength = fn.length;
    let argsArr = args;
    return function(){
        argsArr = [...argsArr,...arguments];
        if(argsArr.length<fnLength){
            return curry(fn,...argsArr)
        }else{
            return fn(...argsArr)
        }
    }
}

function sum(a,b,c,d){
    return a+b+c+d
}
var sumPlus = curry(sum)
let a = sumPlus(1)(2)(3)(4)
// let b = sumPlus(1, 2)(3)(4)
// let c = sumPlus(1, 2, 3)(4);
console.log(a)

//参数数量不确定
function curry2(fn,...args){
    let argsArr = [];
    return function(){
        let len = [...arguments].length;
        argsArr = [...args,...arguments]
        if(len!==0){
            return curry2(fn,...argsArr)
        }else{
            return fn(...argsArr)
        }
    }
}
var sum1 = curry2(sum);
console.log(sum1(1)(2,3)(4)())