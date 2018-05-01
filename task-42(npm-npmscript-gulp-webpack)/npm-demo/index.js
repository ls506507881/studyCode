var a = 1;
console.log(a)

var sayHello = require('./a').sayHello
sayHello('jack')

var marked = require('marked')
var str = marked('# hello')
console.log(str)