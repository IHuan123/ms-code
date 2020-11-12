//判断是否为function
const isFunction = fn => typeof fn === 'function';
// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MyPromise {
    //Promise三种状态 Pending(进行中) Fulfilled(已成功) Rejected(已失败)
    status = PENDING;
    value = null;
    // 添加成功回调函数队列
    fulfilledQueues = []
    // 添加失败回调函数队列
    rejectedQueues = []
    constructor(fn) {
        if (!isFunction(fn)) throw new Error('Promise must pass a function as a parameter')
        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }
    //成功  (没有处理此处传入的时MyPromise情况)
    resolve(value) {
        const run = () => {
            if (this.status !== PENDING) return
            this.status = FULFILLED;
            // 依次执行成功队列中的函数，并清空队列
            let runFulfill = (res) => {
                let cb = null;
                //先进先出
                while (cb = this.fulfilledQueues.shift()) {
                    cb(res)
                }
            }
            // 依次执行失败队列中的函数，并清空队列
            let runReject = (err) => {
                let cb = null;
                //先进先出
                while (cb = this.rejectedQueues.shift()) {
                    cb(err)
                }
            }
            if (value instanceof MyPromise) {
                value.then((res) => {
                    this.value = res;
                    runFulfill()
                }, (err) => {
                    this.value = err;
                    runReject(err)
                })
            } else {
                this.value = value;
                runFulfill(value)
            }
        }
        //将同步转换为异步
        setTimeout(run, 0)
    }
    //失败 (没有处理此处传入的时MyPromise情况)
    reject(err) {
        const run = () => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.value = err;
                let cb = null;
                while (cb = this.rejectedQueues.shift()) {
                    cb(err)
                }
            }
        }
        //将同步转换为异步
        setTimeout(run, 0)
    }
    /**
     * Promise then函数会返回一个Promise
     * 如果 onFulfilled 或 onRejected 不是函数，其必须被忽略
     * @param {*} onFulfilled 如果 onFulfilled 是函数：
     * 当 promise 状态变为成功时必须被调用，其第一个参数为 promise 成功状态传入的值（ resolve 执行时传入的值）
     * 在 promise 状态改变前其不可被调用
     * 其调用次数不可超过一次
     * @param {*} onRejected 如果 onRejected 是函数：
     * 当 promise 状态变为失败时必须被调用，其第一个参数为 promise 失败状态传入的值（ reject 执行时传入的值）
     * 在 promise 状态改变前其不可被调用
     * 其调用次数不可超过一次
     */
    then(onFulfilled, onRejected) {
        //返回一个MyPromise
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            //成功时执行的函数 封装onFulfilled
            let fulfilled = value => {
                try {
                    //如何then参数不为函数就忽略参数
                    if (isFunction(onFulfilled)) {
                        let res = onFulfilled(value); //计算当前then中的第一个函数参数返回的值
                        //如何then中是一个MyPromise 执行then
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res)
                        }
                    } else {
                        //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                        onFulfilledNext(value)
                    }
                } catch (e) {
                    onRejectedNext(e)
                }
            }

            //失败时执行的函数 封装onRejected
            let rejected = err => {
                try {
                    //如何then参数不为函数就忽略参数
                    if (isFunction(onRejected)) {
                        let res = onRejected(err);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res)
                        }
                    } else {
                        onRejectedNext(err)
                    }
                } catch (e) {
                    onRejectedNext(e)
                }
            }
            // 这里为同步执行resove reject为异步函数， 所以先添加事件队列再会执行resolve/reject
            switch (this.status) {
                case PENDING:
                    this.fulfilledQueues.push(fulfilled)
                    this.rejectedQueues.push(rejected)
                    break;
                case FULFILLED:
                    onFulfilled(this.value);
                    break;
                case REJECTED:
                    onRejected(this.value)
                    break;
            }
        })
    }
    catch (onReject) {
        return this.then(null, onReject)
    } finally(cb) {
        return this.then(
            value => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => {
                throw reason
            })
        );
    }
    static resolve(value) {
        return value instanceof MyPromise ? value : new MyPromise((resolve) => {
            resolve(value)
        })
    }
    static reject(err) {
        return new MyPromise((resolve, reject) => {
            reject(err)
        })
    }
    // 添加静态all方法
    static all(list) {
        return new MyPromise((resolve, reject) => {
            /**
             * 返回值的集合
             */
            let values = []
            let count = 0
            for (let [i, p] of list.entries()) {
                // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
                this.resolve(p).then(res => {
                    values[i] = res
                    count++
                    // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
                    if (count === list.length) resolve(values)
                }, err => {
                    // 有一个被rejected时返回的MyPromise状态就变成rejected
                    reject(err)
                })
            }
        })
    }
    // 添加静态race方法
    static race(list) {
        return new MyPromise((resolve, reject) => {
            for (let p of list) {
                // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }
}


function test() {
    return new MyPromise((resolve, reject) => {
        console.log(6666)
        resolve('resolve调用返回结果------------------')

        // reject('reject调用返回结果-------------')
    })
}

function test2(res) {
    return new MyPromise((resolve, reject) => {
        resolve('test2 resolve' + res)
    })
}


test()
    .then(test2)
    .then(res => {
        console.log('第一个then', res)
        return res
    })
    .then(res => {
        console.log('第二个then', res)
    })
    .then(res => {
        console.log('第三个then', res)
    })
    .catch(e => {
        console.log(e)
    })
console.log('1111111111111111111')

new MyPromise(resolve => {
    console.log(1);
    resolve(3);
    MyPromise.resolve().then(() => console.log(4)).then(() => console.log(5))
}).then(num => {
    console.log(num)
}).then(() => {
    console.log(6)
});
console.log(2)


// new Promise(resolve => {
//     console.log(1);
//     resolve(3);
//     Promise.resolve().then(() => console.log(4)).then(() => console.log(5))
// }).then(num => {
//     console.log(num)
// }).then(() => {
//     console.log(6)
// });
// console.log(2)