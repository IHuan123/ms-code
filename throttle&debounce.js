const sy = new Set();
let arr = [1,3,4,56,7,3,1,1];
arr.forEach((item,i,arr)=>{
    sy.add(item)
})
console.log(sy)


function throttle(fn,delay){
    let pre = Date.now();
    return function(){
        let that = this;
        let cur = Date.now();
        if(cur-pre>=delay){
            fn.apply(that,[...arguments]);
            pre = Date.now();
        }
    }
}

function debounce(fn,delay){
    let timer = null;
    return function(){
        let that = this;
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(that,[...arguments]);
            clearTimeout(timer);
            timer = null;
        },delay)
    }
}