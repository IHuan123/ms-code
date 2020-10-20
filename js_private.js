function Person(name){
    var _name = name;
    this.getName = function(){
      return _name;
    }
  }
  
  var person = new Person('Joe');
  console.log(person)