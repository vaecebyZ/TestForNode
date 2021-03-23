//简单的http服务器
let http =  require('http');
let fs = require('fs')
let datas = ''
//创建服务
let server = http.createServer()

//启动监听
server.listen(80,()=>{
    console.log("服务启动成功：localhost");
})

//服务绑定事件  res客户端发送的所有信息。rs为服务端处理返回数据
server.on('request',(res,rs)=>{

    console.log('收到请求惹~')

    console.log('请求方法：'+res.method)
    
    //阅读文件
    fs.readFile('233.txt','utf8',(err,data)=>{

        if (err) throw err
        
        datas = data
        
    })
    

    //返回数据
    rs.write(datas)

    //断开连接
    rs.end()
})