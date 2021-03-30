const mysql = require('mysql')
const moment = require('moment')
const conn = mysql.createConnection({

    host: 'localhost',

    password: '123456',

    user: 'root',

    database: 'sgdb'

})


let selectAll = () => new Promise((success, filed) => conn.query('select * from users', (err, data, flied) => {
    if (err) throw err
    success(data)
}))

let getOne = userId => new Promise((success, failed) => conn.query("select * from users where userId = " + userId, (err, data, flied) => {
    if (err) throw err
    success(data)
}))

let delOne = userId => new Promise((success,failed) =>
    conn.query("delete from users where userId = " + userId, (err, data, fli) => {
        if (err) throw err
        success(data)
    })
)

let getSearch = keyword => new Promise((success, failed) => conn.query("select * from users where userName like '%" + keyword + "%'", (err, data,flied) => {
    if (err) throw err
    success(data)
}))


let editOne = user => new Promise((success, failed) => conn.query(`update users set userName = "` + user.userName +
    `",userNickName="` + user.userNickName +
    `",userGender="` + user.userGender +
    `",userEmail="` + user.userEmail +
    `",userAddress="` + user.userAddress +
    `",userAbout="` + user.userAbout +
    `",isBan="` + user.isBan + `
"where userId=` + user.userId, (err, data, flied) => {
        if (err) throw err
        success(data)
    }))

let addOne = user => new Promise((success, failed) => conn.query(`insert into users(userName,userNickName,userGender,userEmail,userAddress,userAbout,isBan,date ) values( "` + user.userName +
    `","` + user.userNickName +
    `","` + user.userGender +
    `","` + user.userEmail +
    `","` + user.userAddress +
    `","` + user.userAbout +
    `","` + user.isBan +
    `","` + moment().format('YYYY-MM-DD hh:mm:ss') +
    `")`, (err, data,flied) => {
        if (err) throw err
        success(data)
    }))

let upImg = (path,id)=>new Promise((success,failed)=>conn.query(`update users set userAvatar = '${path}' where userId = ${id}`,(err,data,flied)=>{
    if(err) throw err
    success(data)
}))

module.exports = {
    selectAll,
    getOne,
    getSearch,
    addOne,
    editOne,
    delOne,
    upImg
}