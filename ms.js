//判断js类型
let data = undefined;
let type1 = typeof data;
let type2 = Object.prototype.toString.call(data);
console.log(type1,type2)

function A(name) {
    this.name = name||'hello';
}
let a = new A();
let b = new A();
let t = a instanceof A ;
console.log(a.__proto__,{}==={},a===b)
console.log(t, A.prototype===Object.getPrototypeOf(a))  


//深拷贝(es6)
// function cloneObject(obj){
//     var newObj = {};
//     if(typeof obj!=='object') return obj;
//     for(let key in obj){
//         if(Object.prototype.toString.call(obj[key]) ==='[object Object]'&&obj[key]!==null){
//             newObj[key] = cloneObject(obj[key])
//         }else if(Object.prototype.toString.call(obj[key]) ==='[object Array]'){
//             newObj[key] = [];
//             for(let i=0;i<obj[key].length;i++){
//                 newObj[key].push(obj[key][i])
//             }
//         }else{
//             newObj[key] = obj[key]
//         }
//     }
//     return newObj;
// }
function cloneObject(obj){
    var newObj = Array.isArray(obj) ? [] : {};;
    if(typeof obj!=='object') return obj;
    for(let key in obj){
        if(typeof obj==='object'&&obj[key]!==null){
            newObj[key] = cloneObject(obj[key])
        }else{
            newObj[key] = obj[key]
        }
    }
    return newObj;
}
// 测试用例
var a1 = {
    name: "muyiy",
    book: {
        title: "You Don't Know JS",
        price: "45"
    },
    arr:[1,2,3],
    a1: undefined,
    a2: null,
    a3: 123
};
let obj = cloneObject(a1);
console.log(obj)