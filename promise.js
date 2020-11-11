const isFunction = (fn) => typeof fn === 'function';
//手写实现一个promise
// 未添加异步处理等其他边界情况
// ①自动执行函数，②三个状态，③then
//class中的function的prototype为undefind(箭头函数prototype也为undefind,普通声明函数prototype为{constructor:函数自身})
class myPromise{
    state = 'pending'
    value = undefined
    reason = undefined
    constructor(fn){
        // 自动执行函数
        try {
            // class中的function的prototype为undefind，需要bind处理
            fn(this.resolve.bind(this),this.reject.bind(this))
        } catch (e) {
            this.reject(e);
        }
    }
    //成功处理
    resolve(res){
        setTimeout(()=>{
            console.log('resolve this',this)
            if(this.state==='pending'){
                this.state='fulfilled'
                this.value = res
            }
        },0)
    }
    //失败处理
    reject(err){
        setTimeout(()=>{
            if(this.state==='pending'){
                this.state='rejected'
                this.reason = err;
            }            
        },0)
    }
    then(onFulfilled, onRejected) {
        setTimeout(()=>{
            switch (this.state) {
            case 'fulfilled':
                if(isFunction(onFulfilled)){
                    onFulfilled(this.value)
                }
                break
            case 'rejected':
                if(isFunction(onRejected)){
                    onRejected(this.value)
                }
                break
            default:
            }            
        },0)
    }
}


function test(){
    return new myPromise((resolve,reject)=>{
        resolve('success')
    })
}
test().then(res=>console.log('res',res))