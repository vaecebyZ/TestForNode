 //使用node中的核心模块

 const fs = require('fs')//引入

//读取内容

fs.readFile('233.txt','UTF-8',(err,data)=>{
    if(err) throw err
    console.log(data)

})

//写入内容
fs.writeFile('233.txt','你好Node',(err)=>{
    if(err) throw err
    console.log('------------');
    console.log('|文件已经保存|');
    console.log('------------');
})
