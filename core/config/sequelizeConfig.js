/**
 * Created by Administrator on 2015/5/31.
 */
//DB config
var Sequelize = require('sequelize')
/*
var exports = module.exports = new Sequelize('gzh003_db', 'root', 'lincel+', {
    host: '121.40.119.230',
    dialect: 'mysql',
    pool: {
        max: 8,
        min: 0,
        idle: 10000
    }
});
*/


var exports = module.exports = new Sequelize('gzh003_db', 'root', 'rootroot', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

