define("com/com1",[],function(){return console.log("com1..."),1}),define("app/messages",["require","com/com1"],function(e){var t=e("com/com1");return console.log(t+"   111"),{getHello:function(){return"Hello World"}}}),define("print",[],function(){return function(t){console.log(t)}}),define("app/main",["require","./messages","com/com1","print"],function(e){var t=e("./messages"),n=e("com/com1");console.log(n);var r=e("print");r(t.getHello())});