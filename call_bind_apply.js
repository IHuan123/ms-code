//手写call、apply、bind



Function.prototype.myCall=function(obj,...args){
    if(typeof this !== 'function'){
        throw new TypeError('not funciton')
    }
    //this为调用myCall的function
    obj.fn = this;
    obj.fn(...args);//apply使用[].slice.call(args,1)
    delete obj.fn;
}

// function test(){
//     console.log(this.name)
// }

// let obj = {name:'hello'};
// test.myCall(obj);



// 1.bind方法返回的是一个绑定this后的函数，并且该函数并没有执行，需要手动去调用。(从这一点看bind函数就是一个高阶函数，而且和call，apply方法有区别)。
// 2.bind方法可以绑定this，传递参数。注意，这个参数可以分多次传递。
// 3.如果bind绑定后的函数被new了，那么此时this指向就发生改变。此时的this就是当前函数的实例。
// 4.构造函数上的属性和方法，每个实例上都有。

//bind
Function.prototype.mybind = function(obj,...args){
    if(typeof this !== 'function'){
        throw new TypeError('not funciton')
    }
    let fn = this;
    let F = function(){
        // 检测 New
        // 如果当前函数的this指向的是构造函数中的this 则判定为new 操作
        if (this instanceof F) {
            return new fn(...args, ...arguments)
        } else {
            return fn.apply(obj,[...args,...arguments])
        }
    }
    return F;
}




let obj1 = {name:'lilei'};
function test2(){
    console.log(this)
}

let resfn = test2.mybind(obj1);
let a = new resfn()
resfn.prototype.ccc = 66
console.log(resfn.prototype);