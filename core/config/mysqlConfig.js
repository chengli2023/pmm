/**
 * Created by Administrator on 2015/5/31.
 */
var mysql = require('mysql');
var Promise = require('promise')
module.exports = mysql.createPool({
    connectionLimit: 3, //important
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'gzh003_db',
    debug: false
});