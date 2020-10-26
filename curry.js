//函数柯里化
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