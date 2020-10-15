function ajax({
    url,
    method,
    params,
    timeout
}) {
    let xhr = null;
    if (window.ActiveXObject) {
        // code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
    } else {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest()
    };
    if (method === 'GET' && params) {
        url = url + '?' + handleParams(params);
    }
    if(!!timeout&&timeout>0){
        xhr.timeout = timeout;
    }
    return new Promise((resolve, reject) => {
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status <= 300) {
                    let data = xhr.responseText;
                    resolve(data)
                } else if (xhr.status >= 400) {
                    console.log("错误信息：" + xhr.status)
                    reject(xhr.status)
                }
            }
        }
        xhr.onerror = err => reject(err);
        if (method === 'POST') {
            //post方式需要自己设置http的请求头，来模仿表单提交。
            //放在open方法之后，send方法之前。
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(handleParams(params)); //post方式将数据放在send()方法里
        } else {
            xhr.send(null); //get方式则填null
        }
    })
}
//名值对转换为字符串
function handleParams(data) {
    var arr = [];
    if (data instanceof Object) {
        for (var i in data) {
            //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    } else {
        console.error('params not is Object')
    }

}




ajax({
    url: 'http://localhost:8012/login',
    method: 'POST',
    params: {
        username: 'zhangsan',
        password: 100000,
    }
}).then(res => {
    console.log(res)
    document.documentElement.innerHTML = res;
});
