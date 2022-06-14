process.env.NODE_ENV = "development";
//process.env.PORT = "3000";


//process.env.NODE_ENV = "production";
process.env.PORT = "8080";


var express = require('express');

var app = express();

//Express setting
require('./core/config/appSetting')(app);

//Authority filter
app.use(require('./core/config/authorization')());

//pages router
app.use(require('./core/config/pageRouter'))

//actions router
require('./core/config/routerConfig')(app);


module.exports = app;
