// function test(){
//     return new Promise((resolve,reject)=>{
//         resolve('6666')
//     })
// }

// test().then(res=>{
//     console.log('1',res)
// },err=>{
//     console.log(err)
// }).then(res=>{
//     console.log('2',res)
// }).then(res=>{
//     console.log('3',res)
// }).catch(e=>console.log('******',e))

function myPromise(fn){
    var value = null,
        callbacks = [];
    this.then = function(onFulfilled){
        callbacks.push(onFulfilled)
    }
    function resolve(value){
        callbacks.forEach(fn=>{
            fn(value)
        })
    }
    fn(resolve);
}