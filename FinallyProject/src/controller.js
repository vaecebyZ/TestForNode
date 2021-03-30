const moment = require('moment');
const db = require('./db')
const querystring = require('querystring');


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

        db.getSearch(keyword).then(data => res.render('index.html', {
            value: data
        }))


    } else {
        db.selectAll().then(data => res.render('index.html', {
            value: data
        }))
    }

}

function getDel(req, res) {


    let url = new URL('http://localhost' + req.url)

    let userId = url.searchParams.get('id')

    if (userId != null) {


        db.delOne(userId).then(data=>{

            console.log(data);

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

    // res.setHeader('Content-type', 'text/html;charset=utf8')
    // let htmls =
    //     `
    //  <script>
    //  alert('删除成功${userId}');
    //  window.location="./"
    //  </script>
    //     `
    // res.end(htmls)

}

function getPost(req, res) {


    data = ""

    req.on('data', che => data += che)



    new Promise((success, faild) => req.on('end', () => success(querystring.parse(data))))
        .then((user) => {
            if (user.userId != '') {
                db.editOne(user).then((data) => {
                    res.setHeader('Content-type', 'text/html;charset=utf8')

                    res.end("<script>alert('修改成功');window.location='../'</script>")
                })
            } else {
                db.addOne(user).then((data) => {
                    res.setHeader('Content-type', 'text/html;charset=utf8')

                    res.end("<script>alert('添加成功');window.location='../'</script>")
                })
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