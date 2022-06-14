/**
 * Created by Administrator on 2015/4/22.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var ejs = require('ejs');
var mongoStore = require('connect-mongo')(session);
//加载ORM配置
require('./ORMConfig')

var SequelizeStore = require('connect-sequelize')(session)

module.exports = function (app) {
    // view engine setup
    app.set('views', path.resolve('core/views'));
    app.engine('html', ejs.__express);
    app.set('view engine', 'html');

    app.use(favicon(path.resolve('public/favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    // 设置允许跨域访问该服务
    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");//前端域名
        res.header("Access-Control-Allow-Credentials",'true');
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        next();
    });
    /*
    app.use(session({
        cookie :{maxAge:36000000000},
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        store: new SequelizeStore(require('./sequelizeConfig'), {}, 'session')
    }));
*/
    /*
    app.use(session({
        cookie :{maxAge:36000000000},
        secret: 'keyboard cat',
        saveUninitialized: false,
        resave: true,
        store: new mongoStore({
            url: 'mongodb://localhost/gzh003_db',
            collection: 'sessions'
        })
    }));
     */
    app.use('/public', express.static(path.resolve('public')));
};
