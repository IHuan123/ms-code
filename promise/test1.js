// function test(){
//     return new Promise((resolve,reject)=>{
//         reject('err')
//     })
// }
// test().then('6666666').then(res=>{
//     console.log('第二个then',res)
// },err=>{console.log(err);return err}).then(res=>{
//     console.log('-------',res)
// },err=>{console.log(err)})

function test1(res){
    console.log(res)
}
Promise.resolve(()=>{return 6}).then(test1)