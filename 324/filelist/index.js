const fs = require('fs')
const http = require('http')
const server = http.createServer()


server.listen(80, err => {
    if (err) throw err
    console.log('连接成功');
})

server.on('request', (req, rsp) => {
    console.log(req.url);
    if (req.method == 'GET' && req.url == '/') {//处理首页访问
        fs.readFile('list.html', 'utf-8', (err, data) => {
            if (err) throw err
            rsp.end(data)
        })
    } else if (req.method=='POST'&&req.url == '/files') { //注意请求格式
        fs.readdir('./', 'utf8', (err, data) => {
            if (err) throw err
            rsp.end(JSON.stringify(data))
        })
    } else { //处理静态文件 不要加utf8
        fs.readFile('.' + req.url, (err, data) => {
            if (err) throw err
            rsp.end(data)
        })
    }
})