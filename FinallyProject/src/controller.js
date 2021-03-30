const moment = require('moment');
const db = require('./db')
const formidable = require('formidable')
const fs = require('fs')

function toMain(req, res) {

    db.selectAll().then(data => {

        data.forEach(element => {
            element.date = moment(element.date).format('YYYY-MM-DD hh:mm:ss')
        });

        res.render('index.html', {
            value: data
        })
    });

}

function toAdd(req, res) {

    res.render('edit.html', {
        value: {}
    })

}

function toEdit(req, res) {

    let url = new URL('http://localhost' + req.url)

    let userId = url.searchParams.get('id')

    if (userId != null) {
        db.getOne(userId).then(data => res.render('edit.html', {
            value: data[0]
        }))
    }

}

function getSearch(req, res) {

    let url = new URL('http://localhost' + req.url)
    let keyword = url.searchParams.get('keyword')

    if (keyword != "") {


        db.getSearch(keyword).then(data => {
            data.forEach(element => {
                element.date = moment(element.date).format('YYYY-MM-DD hh:mm:ss')
            });
            res.render('index.html', {
                value: data
            })
        })


    } else {
        db.selectAll().then(data => {
            data.forEach(element => {
                element.date = moment(element.date).format('YYYY-MM-DD hh:mm:ss')
            });
            res.render('index.html', {
                value: data
            })
        })
    }

}

function getDel(req, res) {


    let url = new URL('http://localhost' + req.url)

    let userId = url.searchParams.get('id')

    if (userId != null) {

        db.delOne(userId).then(data => {

            res.setHeader('Content-type', 'text/html;charset=utf8')
            let htmls =
                `
             <script>
             alert('删除成功${userId}');
             window.location="./"
             </script>
                `
            res.end(htmls)

        })

    }

}

function getPost(req, res) {

    //使用formdata
    let form = new formidable.IncomingForm();

    //设置临时得上传路径
    form.uploadDir = './static/temp'

    form.parse(req, (err, fileds, files) => {
        if (err) throw err

        if (fileds.userId != '') {
            db.editOne(fileds).then(() => {
                upAvtar(fileds.userId)
                res.setHeader('Content-type', 'text/html;charset=utf8')
                res.end("<script>alert('修改成功');window.location='../'</script>")
            })
        } else {
            db.addOne(fileds).then((data) => {
                //console.log(data);
                upAvtar(data.insertId)
                res.setHeader('Content-type', 'text/html;charset=utf8')
                res.end("<script>alert('添加成功');window.location='../'</script>")
            })
        }

        function upAvtar(userId) {
            if (files.userAvatar.size > 0) {
                let filepath = './static/img/' + files.userAvatar.name
                fs.rename(files.userAvatar.path, filepath, (err) => {
                    if (err) throw err

                    db.upImg(filepath.slice(8, filepath.length), userId)
                })
            } else {
                fs.rm(files.userAvatar.path, (err) => {
                    if (err) throw err
                })
            }
            //console.log(files);
        }

    })
}

module.exports = {
    toMain,
    toAdd,
    toEdit,
    getSearch,
    getDel,
    getPost
}