const http = require('http')
const router = require('./router')
const server = http.createServer();

router.server(server)

module.exports =()=>{
    server.listen('80',(err)=>{
        if(err)throw err
        console.log('服务已在80端口启动成功:>');
    })
} 
