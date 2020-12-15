//原生js实现一个路由
// hash路由
class Route{
  mode="";
  routes = [];
  view = null;
  hash = '';
  constructor({routes,mode}){
    this.routes = routes?routes:[];
    this.mode = mode;
    this.init();
    this.routeChange = this.routeChange.bind(this);
  }
  
  init=()=>{
    let that = this;
    window.addEventListener('load',function(){
      that.view = document.querySelector('#router-view');
      let links = document.querySelectorAll('.router');
      links.forEach((item,index)=>{
        item.onclick = function(e){
          e.preventDefault();
          that.hash = item.getAttribute("href");
          window.location.hash = that.hash;
        }
      })
      if(!that.hash) that.hash = '/';
      let index = that.routes.findIndex((item)=>{
        return item.path === that.hash;
      })
      that.view.innerHTML = that.routes[index].component;
      window.addEventListener('hashchange',that.routeChange)  
    })
  }

  routeChange(){
    console.log('hash change')
    let routes = this.routes;
    let index = routes.findIndex((item)=>{
      return item.path === this.hash;
    })
    if(index>=0){
      this.view.innerHTML = routes[index].component;
    }else{
      let errorIndex = routes.findIndex((item)=>{
        return item.path === '*'
      })
      console.log(errorIndex)
      if(errorIndex>=0){
        this.view.innerHTML = routes[errorIndex].component;
      }
    }
  }
}