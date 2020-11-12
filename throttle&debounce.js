
const sy = new Set();
let arr = [1,3,4,56,7,3,1,1];
arr.forEach((item,i,arr)=>{
    sy.add(item)
})
console.log(sy)

// 节流

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
// 防抖
// 应用场景
// 滚动加载，加载更多或滚到底部监听
// 谷歌搜索框，搜索联想功能
// 高频点击提交，表单重复提交
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