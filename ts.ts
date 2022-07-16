let arr2 = [1,2,3,4,5,56], arr3 = [2,4,5,6,7]
function getCommon<T>(arr1:Array<T>,arr2:Array<T>):Array<T>{
    let res:Array<T> = [], len1:number = arr1.length
    for(let i=0;i<len1;i++){
        let item = arr1[i]
        if(arr2.includes(item)) res.push(item)
    }
    return res
}
console.log(getCommon(arr2,arr3))