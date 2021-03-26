const dodata = require('./doData')

module.exports=(server)=>{
    server.on('request',(req,res)=>{
        dodata(req,res)
    })
}