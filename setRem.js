//设置页面html字体大小 rem适配
function setRem() {
    let html = document.documentElement;
    let clientWidth = html.clientWidth;
    let htmlFontSize = clientWidth / 375 * 50;
    html.style.fontSize = htmlFontSize + 'px';
}
document.addEventListener('DOMContentLoaded', function () {
    setRem();
})
window.onload = function () {
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvt, setRem, false)

}