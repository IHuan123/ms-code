Function.prototype.myCall=function(obj,...args){
    if(typeof this !== 'function'){
        throw new TypeError('not funciton')
    }
    //this为调用myCall的function
    obj.fn = this;
    obj.fn(...args);//apply使用[].slice.call(args,1)
    delete obj.fn;
}

function test(){
    console.log(this.name)
}

let obj = {name:'hello'};
test.myCall(obj);


//bind
Function.prototype.myBind = function(obj,...args){
    if(typeof this !== 'function'){
        throw new TypeError('not funciton')
    }
    let fn = this;
    let F = function(){
        fn.call(obj,...args,...arguments)
        // if (this instanceof F) {
        //     return new fn(...args, ...arguments)
        //   } else {
        //     return fn.apply(context,[...args,...arguments])
        //   }
    }
    return F;
}
let obj1 = {name:'lilei'};
function test2(a){
    console.log(this.name,a)
}
let resfn = test2.myBind(obj1);
resfn(12)


function test(){
    console.log(this);
}
let test1 = test.bind(null); //此时this -> window
test1();