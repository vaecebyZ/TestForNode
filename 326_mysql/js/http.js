const http = require('http')
const server = http.createServer()
const router = require('./router')

module.exports =()=>{
    server.listen(80,err=>{
        if(err)throw err
        console.log("服务成功在80端口启动》》》》》");
    })
} 

router(server)