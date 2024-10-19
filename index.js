global.rootdir = __dirname
global.mysqlConn = require(rootdir + '/dao/Mysql')

let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let routes = require(__dirname+'/routes')
let config = require('config')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/rule-engine-ats',routes)
app.use((err,req,res,next)=>{
    const errStatus = err.statusCode || 500
    const errMsg = err.message || 'INTERNAL SERVER ERROR'
    let output = {
        errStatus,
        errMsg
    };
    res.status(500).json(output)
})
let server = app.listen(config.port,function (){
    console.log('Application Running on port : ' + config.port)
})

module.exports = server