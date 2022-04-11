### 按需加载 

设置 webpack chunkFilename，配置publicPath
按需定义 chunkFilename 的名字：import(/* webpackChunkName: "b" */ './b').then

element ui 按需引入

import { Button } from 'components'

使用 babel-plugin-component 插件会把上面这个转换为：

var button = require('components/lib/button')
require('components/lib/button/style.css')

实现：组件的入口文件暴露一个install方法，用来注册组件。然后将每个组件打包


### Tree-Shaking

#### 作用

1. 清除未使用的模块
2. 对多层调用的模块进行重构，提取其中的代码，简化函数的调用结构

1.首先要保证引用的模块都是es规范的，可以静态分析。2.把babel设置{ module: false}, 以避免babel将模块转为commonjs规范。

#### 原理

Tree-shaking 是 DCE(无用代码消除) 的一种新的实现。
无用代码 一般具有以下几个特征

•代码不会被执行，不可到达

•代码执行的结果不会被用到

•代码只会影响死变量（只写不读）

由编译器将Dead Code从AST（抽象语法树）中删除

### 通过Scope Hoisting优化Webpack输出

Scope Hoisting 的实现原理其实很简单：分析出模块之间的依赖关系，尽可能的把打散的模块合并到一个函数中去，但前提是不能造成代码冗余。因此只有那些被引用了一次的模块才能被合并。

由于 Scope Hoisting 需要分析出模块之间的依赖关系，因此源码必须采用 ES6 模块化语句，不然它将无法生效。

这是webpack 内置功能，使用内置的 ModuleConcatenationPlugin 插件

### loader 和 plugin 的区别

、loader就是一个转换器，操作的是文件，单纯的文件转换过程。比如a.sass转成a.css2. 

plugin是一个扩展器，针对的是loader结束后，webpack打包的整个过程。它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛任务。