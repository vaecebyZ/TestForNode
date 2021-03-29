const express = require('express')

const app = express()

app.get('/',(rep,res)=>{
    res.send('hello express')
})

app.listen(80,(err)=>{
    if(err)throw err
    console.log('服务启动成功');
})