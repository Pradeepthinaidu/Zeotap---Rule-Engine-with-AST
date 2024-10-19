let Client = require('mysql2');
let config =  require('config');

const dbConfig = config.dbConfig;

var pool = Client.createPool({
    host:dbConfig.host,
    user:dbConfig.user,
    password:dbConfig.password,
    database:dbConfig.db 
})

module.exports = pool;