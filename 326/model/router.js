const dodata = require('./doData')
module.exports.server = (server)=>{
    server.on('request',(res,rs)=>{
            dodata(res,rs)
    })
}