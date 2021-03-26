const fs = require('fs')
let conn = require('./conn')
const template = require('art-template')
const moment = require('moment')

template.defaults.root = './'

module.exports = (req, res) => {

    if (req.method == 'GET' && req.url == '/') {

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


    } else if (req.method == 'POST' && req.url == "/add") {
        console.log(req);

    } else if (req.method == 'POST' && req.url == "/search") {
        console.log(req);
    } else {
        fs.readFile('.' + req.url, (err, data) => {
            if (err) throw err
            res.end(data)
        })
    }
}