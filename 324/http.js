const http = require('http')

const fs = require('fs')

const server = http.createServer()

server.listen(80, () => {
    console.log('start successful');
})

server.on('request', (res, rs) => {

    let urls = res.url;

    //设置返回头
    rs.setHeader('Content-Type', 'text/html;charset=utf-8')

    if (res.method == 'GET' && urls == '/') {
        fs.readFile('1.html', 'utf8', (err, data) => {
            if (err) throw err
            console.log(urls);
            rs.end(data)
        })
    } else { //相应所有静态资源
        fs.readFile('.' + urls, (err, data) => {
            if (err) throw err
            console.log(urls);
            rs.end(data)
        })
    }
})