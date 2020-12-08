// 原生js图片懒加载
window.onload = function () {
    let imgs = document.querySelectorAll('img')
    // 可视区高度
    let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

    function lazyLoad() {
        // 滚动卷去的高度
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        for (let i = 0; i < imgs.length; i++) {
            // 图片在可视区冒出的高度
            let y = clientHeight + scrollTop - imgs[i].offsetTop;
            // y表示图标顶部距屏幕底部的高度
            // 图片在可视区内(y < 0图片在屏幕下方未显示区域，y - imgs[i].height > clientHeight图片在屏幕上方未显示区域)
            if (y > 0 && y - imgs[i].height < clientHeight) {
                setTimeout(()=>{
                    imgs[i].src = imgs[i].dataset['src']
                },500)
            }
        }
    }
    lazyLoad()
    window.onscroll = function(){
        lazyLoad()
    }
}