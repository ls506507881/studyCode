// var p = require('./a');
// console.log(p)
//当需要其他文件模块的时候，只需要require+路径
//require需要; 要求; 想要; 命令;
//require 也是nodejs内部定义好的。
// p.printName();
// console.log('成功了')
//使用方法，命令行执行 node b.js

//require是同步获取数据，调用a,直接拿过来，而不是不去管他，等数据传过来在执行。
//因为服务端都是本地的文件。
//但如果把这一套放在浏览器端就有问题。
//1.路径问题  
//2.同步要把所有require请求都加载完成才执行，如果require数量很大，会加载慢。


var vvv = require('./a.js')
vvv.sayName()
console.log('我学会了commonjs模块引用')