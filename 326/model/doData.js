const template = require('art-template')
const fs = require('fs')
module.exports = (res, rs) => {

    template.defaults.root = './'

    if (res.method == 'GET' && res.url == '/') {
        let htmls = template('1.html', {
            value: '你好Node'
        })
        rs.end(htmls)
    } else {
        fs.readFile('./' + res.url, (err, data) => {
            if (err) throw err
            rs.end(data)
        })
    }
}