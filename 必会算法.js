/** 判断回文字符串**/
let str = 'abcba';
//join()不传参数默认以逗号隔开
function checkPalindrom(str){
    return str.split('').reverse().join('') === str;
}
// console.log(checkPalindrom(str));



/** 统计出字符串中出现最多次数的字符;**/
function findMaxDuplicateChar(str){
    let obj = {};
    let len = str.length;
    for(var i=0;i<len;i++){
        if(!obj[str[i]]){
            obj[str[i]] = 1;
        }else{
            obj[str[i]] += 1;
        }
    }
    let maxCount = 0;
    let k = '';
    for(var key in obj){
        if(obj[key]>maxCount){
            maxCount = obj[key];
            k = key;
        }
    }
    return k;
}
// console.log(findMaxDuplicateChar('afjghdfraaaasdenas'));


/** 不借助临时变量，进行两个整数的交换 **/
function swap(a,b){
    b = b - a;
    a = a + b;
    b = a - b;
    return [a,b];
}
console.log(swap(7,1));




/***斐波那契数列***/
function getFibonacci(n) {  
    var fibarr = []; 
    var i = 0; 
    while(i<n) { 
        if(i<=1) { 
            fibarr.push(i); 
        }else{ 
            fibarr.push(fibarr[i-1] + fibarr[i-2]) 
        } 
        i++; 
    } 
    return fibarr; 
} 
// console.log(getFibonacci(30))


/** 找出下列正数组的最大差值比如 **/
//es6
function getMaxProfit(arr){
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    return max-min;
}
console.log(getMaxProfit(arr))
//es5
function getMaxProfit2(arr) {
    var minPrice = arr[0]; 
    var maxProfit = 0; 
    for (var i = 0; i < arr.length; i++) { 
        var currentPrice = arr[i]; 
        minPrice = Math.min(minPrice, currentPrice); 
        var potentialProfit = currentPrice - minPrice; 
        maxProfit = Math.max(maxProfit, potentialProfit); 
    } 
    return maxProfit; 
}