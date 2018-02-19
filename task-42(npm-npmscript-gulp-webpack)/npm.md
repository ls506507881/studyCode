### npm是什么
NPM(node package manager)，通常称为node包管理器。  
顾名思义，他的主要功能就是管理node包，包括：**安装、卸载、更新、查看、搜索、发布**等。

node包是什么？  
可以把node包当成一个软件。如360软件工具，就是一个软件管理器。npm就类似这种软件管理器，只不过没有界面，都是通过命令行做的。

npm的背后，是基于couchdb的一个数据库，详细记录了每个包的信息*(作者、版本、依赖、授权信息等)*。  
他的一个很重要的作用就是：将开发者从繁琐的包管理工作*(版本、依赖等)*中解放出来，更加专注于功能的开发。

npm官网：https://npmjs.org/
npm官方文档：https://npmjs.org/doc/README.html

### npm的安装
安装node后，npm会自动被安装。  
node的下载安装地址：https://nodejs.org/download/  
安装完成后，在终端输入：  
```
node -v
```
查看node版本，输入`npm -v`查看npm版本。  
npm版本应该大于2.1.8，输入`sudo npm install npm -g`可更新npm的版本。  
### npm包管理
node包的安装分为两种：本地安装、全局安装。两者的区别如下，后面会通过简单例子说明  
- 本地安装：package会被下载到当前所在目录(当前文件夹下的node_modules),也只能在当前目录下使用。
- 全局安装：package会被下载到特定的系统目录下(系统目录下)，安装的package能够在所有目录下使用。
#### 本地安装 npm install pkg/easytpl
运行如下命令，就会在当前目录下安装grunt-cli(grunt命令行工具)
```
npm install grunt-cli 或
npm install easytpl  //使用什么工具  安装  安装easytpl
会在当前文件夹下创建一个node_modules <== easytpl文件夹
```
安装结束后，当前目录下会多出一个node_modules目录，grunt-cli就安装在里面。同时注意控制台输出的信息：
```
grunt-cli@0.1.9 node_modules/grunt-cli
resolve@0.3.1
nopt@1.0.10(abbrev@1.0.4)
findup-sync@0.1.2(lodash@1.0.1,glob@3.1.21)
```
grunt-cli@0.1.9:当前安装的package为grunt-cli,版本为0.19  
node_modules/grunt-cli: 安装目录  
resolve@0.3.1：依赖的包有resolve、nopt、findup-sync,它们各自的版本、依赖在后面的括号里列出来  
#### 全局安装 npm install -g pkg
运行如下命令，就会在当前目录下安装grunt-cli(grunt命令行工具)
```
npm install grunt-cli
```

