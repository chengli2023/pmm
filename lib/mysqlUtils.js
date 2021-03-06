/**
 * Created by Administrator on 2015/5/26.
 */
var Promise = require('promise');
module.exports = mysqlUtils;

function mysqlUtils(connectionPool){
    this.connectionPool = connectionPool;
}

mysqlUtils.prototype.query = function(connection, sql, values) {
    var _self = this;
    if (!values) values = sql, sql = connection, connection = null;
    if(connection == null){
        return new Promise(function (resolve, reject) {
            console.log(sql + ' ' + values)
            _self.connectionPool.query(sql, values, function (err, result) {
                if (err) return reject(err)
                resolve(result);
            })
        })
    }

    var promise = new Promise(function (resolve, reject) {
        connection.query(sql, values, function (err, result) {
            if (err) return reject(err)
            resolve(result);
        })
    })
    return promise
};

mysqlUtils.prototype.beginTransaction = function(){
    var _self = this;

    var promise = new Promise(function (resolve, reject) {
        _self.connectionPool.getConnection(function(err,connection){
            if (err) return reject(err)
            connection.beginTransaction(function(err) {
                if (err) return reject(err)
                resolve(connection);
            })
        })
    })
    return promise
}