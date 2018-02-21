在全局作用域下，this代表window
```
<script>
    console.log(this)
</script>
```
```
//如果在全局下这样写
var a = 1
var b = 2

//就相当于window的属性
window.a
//返回1
window.b
//返回2
window.a === this.a  //true
```
#### 作为函数调用
在函数被直接调用时this绑定到全局对象。在浏览器中，window 就是该全局对象
```
console.log(this);

function fn1(){
    console.log(this);
}

fn1();
//两个this都是window

相当于：
var a = 1
function fn1(){
    console.log(a)
}
fn1()
//调用fn1,输出a,函数中没有a的值，去外面查找，找到了a = 1


function fn1(){
    var b = 2
    console.log(this.b)
}
fn1()
//这样输出undefined，因为全局下没有b
```
#### 内部函数
函数嵌套产生的内部函数的this不是其父函数，仍然是全局变量
```
function fn0(){
    function fn(){
        console.log(this);
    }
    fn();
}

fn0();
```
#### setTimeout、setInterval
这两个方法执行的函数this也是全局对象
```
document.addEventListener('click', function(e){
    console.log(this);  //这个this是document
    setTimeout(function(){
        console.log(this);  //这个this是全局对象
    }, 200);
}, false);

如果想使用上面的this
document.addEventListener('click', function(e){
    console.log(this);  //这个this是document
    var _this = this
    setTimeout(function(){
        console.log(_this);  //就是上面的this了
    }, 200);
}, false);
```
#### 作为构造函数调用
所谓构造函数，就是通过这个函数生成一个新对象（object）。这时，this就指这个新对象

new 运算符接受一个函数 F 及其参数：new F(arguments...)。这一过程分为三步：

- 创建类的实例。这步是把一个空的对象的 __proto__ 属性设置为 F.prototype 。
- 初始化实例。函数 F 被传入参数并调用，关键字 this 被设定为该实例。
- 返回实例。
看例子
```
function Person(name){
    this.name = name;
}
Person.prototype.printName = function(){
    console.log(this.name);
};

var p1 = new Person('Byron');
var p2 = new Person('Casper');
var p3 = new Person('Vincent');

p1.printName();
p2.printName();
p3.printName();
```
#### 作为对象方法调用
在 JavaScript 中，函数也是对象，因此函数可以作为一个对象的属性，此时该函数被称为该对象的方法，在使用这种调用方式时，this 被自然绑定到该对象
```
var obj1 = {
    name: 'Byron',
    fn : function(){
        console.log(this);
    }
};

obj1.fn();  //this是obj1，谁调用，this就是谁

var obj2 = {
    name: 'Byron',
    obj3:{
        fn : function(){
            console.log(this);
        }
    }
}
obj2.obj3.fn();  //this是obj3

//小陷阱
var fn2 = obj1.fn

fn2()  //fn2是全局变量，相当于widow.fn2()，所以this代表window  
```
#### DOM对象绑定事件
在事件处理程序中this代表事件源DOM对象（低版本IE有bug，指向了window）
```
document.addEventListener('click', function(e){
    console.log(this);  //this是document
    var _document = this;
    setTimeout(function(){
        console.log(this);  //window
        console.log(_document);  //document
    }, 200);
}, false);
```
#### Function.prototype.bind
bind，返回一个新函数，并且使函数内部的this为传入的第一个参数
```
var obj1 = {
    name: 'Byron',
    fn : function(){
        console.log(this);
    }
};
var obj3 = { a:3 };
var fn3 = obj1.fn.bind(obj3);
fn3();  //obj3

//改变一下代码，让setTimeout中的this也是document
document.addEventListener('click', function(e){
    console.log(this);  //this是document
    setTimeout(function(){
        console.log(this);  //this是document
    }.bind(this), 200);   //添加bind(this),bind得到一个新的函数,函数里面的this,是传递的对象
}, false);
```
#### 使用call和apply设置this
call apply，调用一个函数，传入函数执行上下文及参数
```
fn.call(context, param1, param2...)

fn.apply(context, paramArray)
```
语法很简单，第一个参数都是希望设置的this对象，不同之处在于call方法接收参数列表，而apply接收参数数组
```
fn2.call(obj1);
fn2.apply(obj1);
```
```
举例 
var value = 100
function fn4(a,b){
    console.log(this.value + a + b) //this是全局的window
}
fn4(3,4)  //107
//----------------------
var obj4 = {
    value: 200
}
function fn4(a,b){
    console.log(this.value + a + b)
}
//call的用法
fn4.call(obj4,3,4)   //this就是obj4,第一个参数
//apply的用法
fn4.apply(obj4,[3,4])  //把后面数组的东西，作为函数的参数
```

求最大值
```
var arr = [1,2,7,4]
Math.max(1,2,7,4)  //这样才能得到最大值
使用apply方法实现
console.log(Math.max.apply(null,arr))
```
#### arguments
arguments是一个类数组对象，不是一个数组，没有数组的方法。
```
[].join()    //数组里面有个join的方法。

如果这样写
function joinStr(){
    return arguments.join('-')
}
joinStr('a','b','c')
会报错，arguments不是一个函数，是一个对象。没有join方法

正确方法在下面
```
在函数调用时，会自动在该函数内部生成一个名为 arguments的隐藏对象

该对象类似于数组，可以使用[]运算符获取函数调用时传递的实参

只有函数被调用时，arguments对象才会创建，未调用时其值为null
```
 function fn5(name, age){
     console.log(arguments);
     name = 'XXX';
     console.log(arguments);
     arguments[1] = 30;
     console.log(arguments);
 }
 fn5('Byron', 20);
```
```
方法一
function joinStr(){
    console.log(Array.prototype.join.call(arguments,'-'))  //join() 将数组转化为字符串
    //[].join.call === Array.prototype.call  没有区别。[]是Array的一个实例。
}
joinStr('a','b','c')   //a-b-c

方法二
function joinStr(){
    var join = Array.prototype.join.bind(arguments)
    console.log(join('-'))
}
joinStr('a','b','c')   //a-b-c
```
#### 函数的执行环境
JavaScript中的函数既可以被当作普通函数执行，也可以作为对象的方法执行，这是导致 this 含义如此丰富的主要原因

一个函数被执行时，会创建一个执行环境（ExecutionContext），函数的所有的行为均发生在此执行环境中，构建该执行环境时，JavaScript 首先会创建 arguments变量，其中包含调用函数时传入的参数

接下来创建作用域链，然后初始化变量。首先初始化函数的形参表，值为 arguments变量中对应的值，如果 arguments变量中没有对应值，则该形参初始化为 undefined。

如果该函数中含有内部函数，则初始化这些内部函数。如果没有，继续初始化该函数内定义的局部变量，需要注意的是此时这些变量初始化为 undefined，其赋值操作在执行环境（ExecutionContext）创建成功后，函数执行时才会执行，这点对于我们理解JavaScript中的变量作用域非常重要，最后为this变量赋值，会根据函数调用方式的不同，赋给this全局对象，当前对象等

至此函数的执行环境（ExecutionContext）创建成功，函数开始逐行执行，所需变量均从之前构建好的执行环境（ExecutionContext）中读取
#### 三种变量
- 实例变量：（this）类的实例才能访问到的变量

- 静态变量：（属性）直接类型对象能访问到的变量

- 私有变量：（局部变量）当前作用域内有效的变量

看个例子
```
function ClassA(){
    var a = 1; //私有变量，只有函数内部可以访问
    this.b = 2; //实例变量，只有实例可以访问
}

ClassA.c = 3; // 静态变量，也就是属性，类型访问

console.log(a); // error
console.log(ClassA.b) // undefined
console.log(ClassA.c) //3

var classa = new ClassA();
console.log(classa.a);//undefined
console.log(classa.b);// 2
console.log(classa.c);//undefined
```
## 更多关于 this 的文章
- [this 是什么，一次说清楚](http://blog.jirengu.com/?p=452)
- [你怎么还没搞懂 this](http://blog.jirengu.com/?p=480)