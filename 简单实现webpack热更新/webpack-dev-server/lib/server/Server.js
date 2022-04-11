
const express = require('express');
const http = require('http');
const path = require('path');
const MemoryFS = require('memory-fs');
const mime  = require('mime');
const socketIO = require('socket-io');
const updateCompiler = require('./updateCompiler');
class Server {
  constructor(compiler){
    this.compiler = compiler;//保存编译器对象
    updateCompiler(compiler);
    this.setupApp();//创建app
    this.currentHash;//当前的hash值 ,每次编译都会产生一个hash值 
    this.clientSocketList = [];//存放着所有的通过websocket连接到服务器的客户端
    this.setupHooks();//建立钩子
    this.setupDevMiddleware();
    this.routes();//配置路由
    this.createServer();//创建HTTP服务器,以app作为路由
    this.createSocketServer();//创建socket服务器
  }
  createSocketServer(){
      //websocket协议握手是需要依赖http服务器的
      const io  = socketIO(this.server);
      //服务器要监听客户端的连接,当客户端连接上来后 socket代表跟这个客户端连接对象
      io.on('connection',(socket)=>{
        console.log('一个新的客户端已经连接上了');
        this.clientSocketList.push(socket);//把这个新的socket放到数组里去
        socket.emit('hash',this.currentHash);//把最新的hash值 发给客户端
        socket.emit('ok');//给客户发一个ok
        //如果此客户端断开连接了,要把它从数组中删除掉
        socket.on('disconnect',()=>{
            let index = this.clientSocketList.indexOf(socket);
            this.clientSocketList.splice(index,1);
        });
      });
  }
  routes(){
    let {compiler} = this;
    let config = compiler.options;
    this.app.use(this.middleware(config.output.path));
  }
  setupDevMiddleware(){
      this.middleware = this.webpackDevMiddleware();//返回一个express中间件
  }
  webpackDevMiddleware(){
    let {compiler} = this;
    //以监听模式启动编译,如果以后文件发生变更了,会重装编译
    compiler.watch({},()=>{
        console.log('监听模式编译成功');
    });
    let fs = new MemoryFS();//内存文件系统实例
    //以后打包后文件写入内存文件系统,读的时候也要从内存文件系统里读
    this.fs = compiler.outputFileSystem = fs;
    //返回一个中间件,用来响应客户端对于产出文件的请求 index.html main.js .json .js
    return (staticDir)=>{//静态文件根目录,它其实就是输出目录 dist目录
        return (req,res,next)=>{
            let {url} = req;//得到请求路径
            if(url === '/favicon.ico'){
                return res.sendStatus(404);
            }
            url === '/'?url = '/index.html':null;
            //得到要访问的静态路径  /index.html /main.js
            let filePath = path.join(staticDir,url);
            //filePath C:\aproject\zhufeng_webpack_hmr_2020-ok\dist\index.html
            console.log('filePath',filePath);
            //C:\aproject\zhufeng_webpack_hmr_2020-ok\dist\main.js
            try{
                //返回此路径上的文件的描述对象,如果此文件不存在,会抛异常
                let statObj = this.fs.statSync(filePath);
                console.log('statObj',statObj);
                if(statObj.isFile()){
                    let content = this.fs.readFileSync(filePath);//读取文件内容
                    res.setHeader('Content-Type',mime.getType(filePath));//设置响应头告诉 此浏览器此文件内容是什么?
                    res.send(content);//把内容发送给浏览器
                }else{
                    return res.sendStatus(404);
                }
            }catch(error){
                console.log(error);
                return res.sendStatus(404);
            }
        }
    }
  }
  setupHooks(){
    let {compiler} = this;
    //监听编译完成事件,当编译完成之后会调用此钩子函数
    compiler.hooks.done.tap('webpack-dev-server',(stats)=>{
        //stats是一个描述对象,里面放着打包后的结果hash chunkHash contentHash 产生了哪些代码块 产出哪些模块
        console.log('hash',stats.hash);
        this.currentHash = stats.hash;
        //会向所有的客户进行广播 ,告诉客户我已经编译成功了,新的模 块代码已经生成,快来拉我的新代码啊
        this.clientSocketList.forEach(socket=>{
            socket.emit('hash',this.currentHash);//把最新的hash值 发给客户端
            socket.emit('ok');//给客户发一个ok
        });
    });
  }
  setupApp(){
      this.app = express();//执行express函数得到this.app  代表http应用对象
  }
  createServer(){
      //通过http模 块创建一个普通的http服务器
      //this.app是一个路由中间件
      this.server = http.createServer(this.app);
  }
  listen(port,host,callback){
    this.server.listen(port,host,callback);
  }
}
module.exports = Server;