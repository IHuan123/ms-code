/** 数组去重**/
let arr = [1,13,464,1311,3,4,1,1,474,6,4,317,3335,4,444,55,55];
let arr2 =[1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN','NaN', 0, 0, 'a', 'a',{name:'zhangsan'}, {name:'zhangsan'},{name:'李四'}]
/**一 */
// 通过arr.indexOf === i来判断
function unique1(arr){
    let res = [];
    for(let i=0;i<arr.length;i++){
        if(arr.indexOf(arr[i])===i){
            res.push(arr[i])
        }
    }
    return res;
}
//2 arr.indexOf(NaN)总是-1 ，不能找到数组中的NaN
//[1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {…}, {…}]     //NaN和object没有去重


/**二 */
// 通过es6 Set
function unique2(arr){
    return Array.from(new Set(arr));
}
//在Set中NaN===NaN
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]  //object没有去重

/**三 */
// 利用for嵌套for，然后splice去重（ES5中最常用）
function unique3(arr){
    for(var i=0;i<arr.length;i++){
        for(var j = i+1;j<arr.length;j++){
            if(arr[i]===arr[j]){
                arr.splice(j,1)
                j--
            }
        }
    }
    return arr
}
// [0, 1, 15, "NaN", NaN, NaN, {…}, {…}, "a", false, null, true, "true", undefined]      //NaN、object没有去重


/**四 */
//利用对象的属性不能相同的特点进行去重（这种数组去重的方法有问题，不建议用，有待改进）
function unique4(arr){
    if(!Array.isArray(arr)) return arr;
    var res = [],obj = {};
    for(var i = 0;i<arr.length;i++){
        if(!obj[arr[i]]){
            res.push(arr[i]);
            obj[arr[i]] = true;
        }
    }
    return res;
}

/**五 */
//利用includes
function unique5(arr){
    let res = [];
    for(var i=0;i<arr.length;i++){
        if(!res.includes(arr[i])){
            res.push(arr[i])
        }
    }
    return res;
}// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]     //object没有去重

/**六 */
//利用hasOwnProperty
function unique6(arr){
    let res = [],obj = {};
    for(var i=0;i<arr.length;i++){
        if(!obj.hasOwnProperty(typeof arr[i] + arr[i])){
            obj[typeof arr[i] + arr[i]] = true;
            res.push(arr[i])
        }
    }
    return res
}// 所有的都去重了（问题：object不管相不相等都会去重）


let res = unique6(arr2)
console.log(res,arr2.length,res.length)


