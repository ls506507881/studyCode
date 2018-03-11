#### AMD与CMD规范
#### 跨规范封装
```
(function (name, definition, context) {
    if (typeof module != 'undefined' && module.exports) {
        // 在 CMD 规范下 (node)
        module.exports = definition();
    } else if (typeof context['define'] == 'function' && (context['define']['amd'] || context['define']['cmd'])  ) {
        //在 AMD 规范下(RequireJS) 或者 CMD 规范下(SeaJS)
        define(definition);
    } else {
        //在浏览器环境下
        context[name] = definition();
    }
})('sample', function () {

    var sample = (function () {
        "use strict";

        var a = 1;

        function inc(){
            a++;
        }

        function get(){
            return a;
        }

        return {
            inc: inc,
            get: get
        }

    })();

    return sample;

}, this);

//最外层
/* (function (name, definition, context) {     //这三个参数哪来的，就是'sample', function () {}, this

   })('sample', function () { }, this);*/
   console.log(this)  //this表示，当前全局作用域，如果这段代码放在浏览器，this代表window
//立即执行函数表达式
//如果当前页面在浏览器中运行，context就是window
//如果在nodejs下运行，nodejs中没有window(window代表窗口，浏览器)，就不代表window了


if (typeof module != 'undefined' && module.exports) {  
//不等于  'undefined' 并且 module.exports
//如果当前代码在node端运行，module.exports是存在的；如果在浏览器下，module.exports不存在
    // 在 CMD 规范下 (node端)
    module.exports = definition();  //definition就是对应的函数
} else if (typeof context['define'] == 'function' && (context['define']['amd'] || context['define']['cmd'])
    //如果是在浏览器下运行，context就是window,全局define；
    //在浏览器控制台输入define.amd有返回，define.cmd没效果。所以属于amd
) {
    //在 AMD 规范下(RequireJS) 或者 CMD 规范下(SeaJS)
    define(definition);
} else {  //如果以上条件都没有，表示代码直接在浏览器运行的。
    //在浏览器环境下
    context[name] = definition();
}

第一种条件返回
module.exports = function(){
    return 1
}

第二种条件返回
define(function(){
    var obj = {a:1,b:2}
    return obj
});

第三种条件返回
window.sample = function(){

}
```

#### 必看文章
[AMD 与 CMD 规范](http://book.jirengu.com/fe/%E5%89%8D%E7%AB%AF%E8%BF%9B%E9%98%B6/%E6%A8%A1%E5%9D%97%E5%8C%96/AMD%E4%B8%8ECMD%E8%A7%84%E8%8C%83.html)

#### RequireJS
第一步加载js
```
<script data-main="script/main.js" src="script/require.min.js"></script>
浏览器不认识data-main(自定义属性),会正常解析src,把requirejs框架加载下来。在requirejs会去执行，执行过程中，回去查找data-main标签，把data-main里面的东西拿出来，当做入口，再去执行它。
```


