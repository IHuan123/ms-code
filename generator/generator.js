let yieldVal;
// Generator 函数为异步函数
function* foo() {
    yield 'a';
    yield 'b';
    return 'foo'
  }

function* test(a,b){
    console.log('this test function*')
    let sum = a+b;
    yieldVal = yield sum;
    console.log('yieldVal',yieldVal)
    let c = a - b;
    // 语法角度看，如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。
    // 这被称为yield表达式（个人理解yield 主要用作遍历具有遍历器（Iterator）接口的对象或函数）。
    let fooVal = yield* foo(); // 如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。
    console.log('fooVal',fooVal)
    //     ||
    //     \/
    // for(let item of foo()){ //可以用for ... of循环迭代generator对象，这种方式不需要我们自己判断done：
    //     yield item;
    // }
    yieldVal =yield c;
    console.log('yieldVal',yieldVal)
    let d = a * b;
    yieldVal = yield d;
    // yield表达式本身没有返回值(就是说let a=yield ;会返回undefined)，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值 
    console.log('yieldVal',yieldVal)
    let e = a / b;
    yieldVal =yield e;
    console.log('yieldVal',yieldVal)
    return 'ok'
}

let generator = test(4,2);
console.log('测试function*异步')
// 会调用5次next 第五次获取的function* return出的值 generator.js:18 {value: "ok", done: true} 函数末尾如果没有return，就是隐含的return undefined;

//next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
// 由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。
// V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。
function next(generator){
    let res = null;
    let count = 0;
    // if(!res.done) next(generator)
    do {
        res = generator.next(count);
        console.log(res,count)
        count++;
    }while(!res.done)
}
next(generator)


//使用场景 : ES6 中的async 函数语法就是使用了Generator 函数的语法糖
