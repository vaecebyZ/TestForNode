 //追加内容
 const fs = require('fs')//引入

 fs.readFile('233.txt','utf8',(err,data)=>{
     if(err) throw err

     fs.writeFile('233.txt',data+'追加',err=>{
         if(!err) console.log("追加成功");
     })
 })