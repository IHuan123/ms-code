//让js脚本暂停一定时间，进入休眠状态。
//使用while循环来阻塞后面程序的执行


//        第一种实现方法
//        function sleep(numberMillis) {
//            var now = new Date();
//            var exitTime = now.getTime() + numberMillis;
//            while (true) {
//                now = new Date();
//                if (now.getTime() > exitTime){
//                     break;
//                }
//            }
//        }
//        第二种实现方法
function sleep(numberMillis) {
    var start = new Date().getTime();
    while (true) {
        if (new Date().getTime() - start > numberMillis) {
            console.log('等待了'+numberMillis/1000+'s')
            break;
        }
    }
}

sleep(3000)