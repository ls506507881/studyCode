//common写法
//调用一个模块，使用
var carousel = require('./carousel');
new carousel('.ct');

var tab = require('./tab')
tab.init()

var lazy = require('./lazy')
lazy.init('',function(){

})

//------------------
//AMD方法
require(['carousel','tab','lazy'],function(Carousel,Tab,Lazy){
    new Carousel();
    Tab.init();
    Lazy.init();
})


//-----------------
//CMD方法和common方法很类似。需要什么，就require什么

