let test = {name:'hello'};
let proxy = new Proxy(test,{
    get(target,key){
        console.log('触发了get')
        return key === 'name' ? 'Hello '+target[key] : target[key]
    },
    set(target,key,value){
        console.log('触发了set')
        target[key]='set:'+value
    }
})
console.log(proxy.name)
proxy.age = 20;
console.log(proxy)