/**
 * 手写setTimeout setInterval
 */
//setTimeout
function mySetTimeout(callback,delay){
    if(typeof callback !== 'function') {
        throw new Error('参数类型错误');
    };
    console.log('*-*-*-')
    //初始当前时间
    const now = new Date().getTime();
    let flag = true;
    let count = 0;
    while(flag){
        count++;
        const after = new Date().getTime();
        if(after-now>=delay){
            console.log(after-now)
            flag = false;
            callback();
        }
    }
}
// mySetTimeout(()=>{console.log(1111)},3000)

//用setTimeout实现setInterval
function mySetTimeout(callback,delay){
    let id = null;
    function interv(){
        setTimeout(interv,delay);
        callback();
    };
    setTimeout(interv,delay);
}

// mySetTimeout(()=>{
//     console.log(11111)
// },1000)



// /**
//  * clearInterval()和clearTimeout()其实是通用的，就是说你可以用 clearInterval() 取消 setTimeout() 执行，clearTimeout()同样可以取消 setInterval() 执行。
//  * setTimeout和setInterval会返回一个id，清理定时器或时通过id清除
//  */
// let timer = setTimeout(() => {
//     console.log("timer")
// }, 3000);
// let timer1 = setTimeout(() => {
//     console.log("timer1")
// }, 3000);
// console.log(timer, timer1); //1,2
// let interval = setInterval(() => {
//     console.log("interval", this);
//     clearInterval(interval)
// }, 2000)
// let interval1 = setInterval(() => {
//     console.log("interval1");
//     clearTimeout(interval1)
// }, 2000)
// console.log(interval, interval1)

// function func1() {
//     console.log('func1')
// }

// function func2() {
//     console.log('func2')
// }
// //0秒延迟，此回调将会放到一个能立即执行的时段进行触发。javascript代码大体上是自顶向下的，但中间穿插着有关DOM渲染，事件回应等异步代码，他们将组成一个队列，零秒延迟将会实现插队操作。
// //不写第二个参数，浏览器自动配置时间，在IE，FireFox中，第一次配可能给个很大的数字，100ms上下，往后会缩小到最小时间间隔，Safari，chrome，opera则多为10ms上下。
// setTimeout(function () {
//     func1()
// }, 0)
// setTimeout(() => {
//     func2()
// })
// func2()