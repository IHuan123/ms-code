//设置页面html字体大小 rem适配
function setRem() {
    let html = document.documentElement;
    let clientWidth = html.clientWidth;
    let htmlFontSize = clientWidth / 375 * 50;
    html.style.fontSize = htmlFontSize + 'px';
}
//dom加载完成后再执行setRem
document.addEventListener('DOMContentLoaded', function () {
    setRem();
})
window.onload = function () {
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    //监听窗口变化
    window.addEventListener(resizeEvt, setRem, false)

}