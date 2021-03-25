const template = require('art-template')
const http = require('http')
const fs = require('fs')
const moment = require('moment')

const server = http.createServer()
template.defaults.root = './' //设置项目路径


server.listen(80, (err) => {
    if (err) throw err
    console.log("服务启动成功");
})

server.on('request', (res, rs) => {

    if (res.method == 'GET' && res.url == '/') {

        fs.readdir('./', (err, data) => {
            if (err) throw err
            let arr = []
            let datas = data
            data.forEach((element, index) => {
                let obj = {}
                fs.stat(element, (err, data) => {
                    if (err) throw err
                    // console.log(data);
                    obj.name = element
                    obj.size = (data.size / 1024).toFixed(2) + 'k'
                    obj.addtime = moment(data.birthtime).format('YYYY-MM-DD hh-mm-ss')


                    if (data.isFile(element)) {//判断是否为文件
                        obj.isfile = 'f'
                    } else {
                        obj.isfile = 'd'
                    }

                    arr.push(obj)

                    if (datas.length == ++index) {    
                        // console.log(arr);
                        let htmls = template('1.html', {
                            data: arr,
                            values: '使用art-template返回数据',
                            img: './img/Saika0.png'
                        })
                        rs.end(htmls)
                    }
                })
            })
        })
    } else {
        fs.readFile('.' + res.url, (err, data) => {
            if (err) throw err
            rs.end(data)
        })
    }
})