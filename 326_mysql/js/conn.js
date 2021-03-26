const mysql = require('mysql')

//执行sql //错误信息，结果集,连接信息
module.exports.connect = (sql, func) => {


    //创建连接字符串
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'sgdb'
    })


    //打开连接
    conn.connect();

    let result = {
        err: '',
        data: [],
        fie: []
    }
    // console.log(sql);
    conn.query(sql, (err, res, fie) => {
        if (err) throw err
        //console.log(res);
        //console.log(fie);
        result.err = err
        result.data = res
        result.fie = fie

        //结束连接
        conn.end();

        exports.result = result

        func();

    })
}