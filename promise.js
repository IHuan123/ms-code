//手写实现一个promise
// 未添加异步处理等其他边界情况
// ①自动执行函数，②三个状态，③then
class myPromise{
    state = 'pending'
    value = undefined
    reason = undefined
    constructor(fn){
        fn(this.resolve,this.reject);
        // 自动执行函数
        try {
            fn(this.resolve, this.reject)
        } catch (e) {
            this.reject(e);
        }
    }
    //成功处理
    resolve=(res)=>{
        if(this.state==='pending'){
            this.state='fulfilled'
            this.value = res
        }
    }
    //失败处理
    reject=(err)=>{
        if(this.state==='pending'){
            this.state='rejected'
            this.reason = err;
        }
    }
    then(onFulfilled, onRejected) {
        switch (this.state) {
          case 'fulfilled':
            onFulfilled(this.value)
            break
          case 'rejected':
            onRejected(this.value)
            break
          default:
        }
    }
}


function test(){
    return new myPromise((resolve,reject)=>{
        resolve('success')
    })
}
test().then(res=>console.log(res))