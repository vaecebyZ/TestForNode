const fs = require('fs')
const http = require('http')
const moment = require('moment')

const server = http.createServer()


server.listen(80, err => {
    if (err) throw err
    console.log('连接成功');
})

server.on('request', (req, rsp) => {
    console.log(req.url);
    if (req.method == 'GET' && req.url == '/') { //处理首页访问
        fs.readFile('list.html', 'utf-8', (err, data) => {
            if (err) throw err
            rsp.end(data)
        })
    } else if (req.method == 'POST' && req.url == '/files') { //注意请求格式

        fs.readdir('./', 'utf8', (err, datas) => {

            if (err) throw err

            arrfile = [];

            datas.forEach((element, index) => { //遍历文件名

                fs.stat(element, (err, data) => { //读取文件详情

                    file = {};

                    if (err) throw err

                    //对象数据
                    //判断是否为文件
                    if (data.isFile()) {
                        file.fileType = '-'
                    } else {
                        file.fileType = 'd'
                    }
                    file.name = element;

                    file.addTime = moment(data.birthtime).format('YYYY-MM-DD hh:mm:ss')//使用第三方库格式化时间
                    file.size = (data.size / 1024).toFixed(2) + 'k'
                    arrfile.push(file)

                    if (datas.length == ++index) {
                        console.log(arrfile);
                        rsp.end(JSON.stringify(arrfile))
                    }

                })
            });
        })
    } else { //处理静态文件 不要加utf8
        fs.readFile('.' + req.url, (err, data) => {
            if (err) throw err
            rsp.end(data)
        })
    }
})