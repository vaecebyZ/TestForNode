const fs = require('fs')
const conn = require('./conn')
const template = require('art-template')
const moment = require('moment')
const queryString = require('querystring') //处理中文编码

template.defaults.root = './'

module.exports = (req, res) => {

    let url = new URL('http://localhost' + req.url)

    let urls = url.pathname


    if (req.method == 'GET') {

        if (urls == '/') {

            conn.connect('select * from users', () => {
                // console.log(conn.result);
                let result = conn.result

                if (result.err == null) {

                    result.data.forEach(e => {
                        e.date = moment(e.date).format('YYYY-MM-DD hh:mm:ss')
                    })

                    let htmls = template('./viwes/index.html', {
                        value: result.data
                    })

                    res.end(htmls)
                }
            })

        } else if (urls == "/add") {

            let htmls = template('./viwes/edit.html', {
                value: '{}'
            })

            res.end(htmls)

            //console.log(url);

        } else if (urls == "/edit") {

            let userId = url.searchParams.get('id')

            if (userId != null) {
                conn.connect('select * from users where userId = ' + userId, () => {
                    let result = conn.result

                    if (result.err == null) {

                        result.data.forEach(e => {
                            e.date = moment(e.date).format('YYYY-MM-DD hh:mm:ss')
                        })

                        let htmls = template('./viwes/edit.html', {
                            value: result.data[0]
                        })

                        res.end(htmls)
                    }
                })
            }
        } else if (urls == "/search") {
            let keyword = url.searchParams.get('keyword')
            if (keyword != '') {


                conn.connect("select * from users where userName like '%" + keyword + "%'", () => {
                    // console.log(conn.result);
                    let result = conn.result

                    if (result.err == null) {

                        result.data.forEach(e => {
                            e.date = moment(e.date).format('YYYY-MM-DD hh:mm:ss')
                        })

                        let htmls = template('./viwes/index.html', {
                            value: result.data
                        })

                        res.end(htmls)
                    }
                })

            } else {

                conn.connect('select * from users', () => {
                    // console.log(conn.result);
                    let result = conn.result

                    if (result.err == null) {

                        result.data.forEach(e => {
                            e.date = moment(e.date).format('YYYY-MM-DD hh:mm:ss')
                        })

                        let htmls = template('./viwes/index.html', {
                            value: result.data
                        })

                        res.end(htmls)
                    }
                })

            }

            //console.log(url);
        } else if (urls == "/del") {

            let id = url.searchParams.get('id')

            if (id != '') {
                conn.connect('delete from users where userId = ' + id, () => {
                    let result = conn.result

                    if (result.err == null) {

                        conn.connect('select * from users', () => {
                            // console.log(conn.result);
                            let result = conn.result

                            if (result.err == null) {

                                result.data.forEach(e => {
                                    e.date = moment(e.date).format('YYYY-MM-DD hh:mm:ss')
                                })

                                let htmls = template('./viwes/index.html', {
                                    value: result.data
                                })

                                res.end(htmls)
                            }
                        })
                    }
                })
            }

        } else {
            fs.readFile('.' + urls, (err, data) => {
                if (err) throw err
                res.end(data)
            })
        }

    } else if (req.method == 'POST') {
        if (urls == "/edit") {

            let data = ''

            //获取Post数据 绑定data事件
            req.on('data', che => {
                data += che

            })
            //结束数据获取
            req.on('end', () => {
                let user = queryString.parse(data)
                if (user.userId != '') {

                    let sql =
                        `update users set userName = "` + user.userName +
                        `",userNickName="` + user.userNickName +
                        `",userGender="` + user.userGender +
                        `",userEmail="` + user.userEmail +
                        `",userAddress="` + user.userAddress +
                        `",userAbout="` + user.userAbout +
                        `",isBan="` + user.isBan + `
                        "where userId=` + user.userId

                    conn.connect(sql, () => {
                        let result = conn.result
                        if (result.err == null) {
                            let htmls = template('./viwes/edit.html', {
                                value: user
                            })
                            res.end(htmls)
                        }
                    });
                } else {

                    let sql =
                        `insert into users(userName,userNickName,userGender,userEmail,userAddress,userAbout,isBan,date ) values( "` + user.userName +
                        `","` + user.userNickName +
                        `","` + user.userGender +
                        `","` + user.userEmail +
                        `","` + user.userAddress +
                        `","` + user.userAbout +
                        `","` + user.isBan +
                        `","` + moment().format('YYYY-MM-DD hh:mm:ss') +
                        `")`

                    conn.connect(sql, () => {
                        let result = conn.result
                        if (result.err == null) {
                            let htmls = template('./viwes/edit.html', {
                                value: user
                            })
                            res.end(htmls)
                        }
                    });

                }
            })
        }
    } else {
        res.end(JSON.stringify('下次一定'))
    }

}