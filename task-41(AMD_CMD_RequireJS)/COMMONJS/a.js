var people = {
    name:'Herbert',
    printName: function(){
        console.log(this.name)
    }
}

module.exports = people;
// module.exports = 666;  把666导出去
//module.exports就是commonjs规范,代码执行在node下，天然支持这个
//作用：把当前的代码，导出去。
//module 模块; 组件; 
//exports 出口;输出