const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    devtool:'source-map',
    //entry里可以配置多个入门,每个入口有一个名称 默认就是main
    //从入门文件出现进行编译,找到它依赖的模块,打包在一起.就会成一个chunk 代块码
    entry:'./src/index.js',
    output:{
        filename:'main.js',
        path:path.resolve(__dirname,'dist')
    },
    devServer:{
        hot:true
    },
    plugins:[
        new HtmlWebpackPlugin(),//用来产出一个html文件,往里面自动插件生成的脚本
        new webpack.HotModuleReplacementPlugin()
    ]
}