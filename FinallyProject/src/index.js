const express = require('express')

const router  = require('./router')

const app = express()


app.engine('html',require('express-art-template'))

//静态文件托管
app.use(express.static('static'))
//路由引入
app.use(router)

app.listen(80,(err)=>{
    if(err)throw err
    console.log('服务启动成功');
})