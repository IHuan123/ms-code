//接受实现私有属性（未完成）
function Person(name){
    var _name = name;
    this.getName = function(){
      return _name;
    }
  }
  
  var person = new Person('Joe');
  console.log(person)