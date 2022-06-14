/**
 * Created by Administrator on 2015/4/22.
 */
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize')
var Promise = require('promise')
var util = require('util')
var utils = require('../../lib/utils')
var db = require('./sequelizeConfig')

//import models
db.import('../models/Project')
db.import('../models/ProjectPlan')

//初始化表
db.sync({force: false});
