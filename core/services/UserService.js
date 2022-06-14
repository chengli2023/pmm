/**
 * Created by Administrator on 2015/5/15.
 */
var Promise = require('promise')
var util = require('util')
var utils = require('../../lib/utils')
var status = require('../config/status')
var grantConfig = require('../config/grantConfig')
var db = require('../config/sequelizeConfig')

var Sms = db.import('../models/Sms')
var Dianpu = db.import('../models/Dianpu')
var User = db.import('../models/User')
var Youhuiquan = db.import('../models/Youhuiquan')
var User_Dianpu = db.import('../models/User_Dianpu')
var User_Youhuiquan = db.import('../models/User_Youhuiquan')

var exports = module.exports = {}

exports.userLogin = function (options) {
    var phone = options.phone, gzh = options.gzh, req = options.req;
    var user_Dianpu = null;

    var curr_dianpu = null;
    var curr_user = null;
    return db.transaction(function (t) {


        return Promise.resolve().then(function () {
            return User_Dianpu.findOne({
                where: {userphone: phone},
                include: [{model: User}, {model: Dianpu, where: {gzh: gzh}}]
            })
        })
            .then(function (userDianpu) {
                //如果没有，就创建这个新用户
                if (userDianpu) {
                    user_Dianpu = userDianpu
                    return userDianpu;
                }

                /***************************以下是针对刚关注的用户，即注册用户***************************/
                isNewUser = true;
                return Promise.resolve().then(function () {
                    //创建用户
                    return User.create({phone: phone}, {transaction: t}).then(function (user) {
                        curr_user = user;
                    })
                }).then(function () {
                    //创建用户店铺关系
                    return Dianpu.findOne({where: {gzh: gzh}}).then(function (dianpu) {
                        curr_dianpu = dianpu
                        return curr_user.addDianpu(dianpu, {
                            role: grantConfig.roles.customer,
                            userphone: phone,
                            transaction: t
                        })
                    })
                }).then(function () {
                    //把该店铺中所有‘关注即送’的保存到“用户—优惠券”关联表中
                    return Youhuiquan.findAll({
                        where: {
                            dianpuid_fk: curr_dianpu.id,
                            isnewuser: true,
                            endtime: {$gt: new Date()}
                        }
                    }).then(function (youhuiquan_newUser_Arr) {
                        youhuiquan_newUser_Arr.forEach(function(y){
                            curr_user.addYouhuiquan(y,{
                                userphone: phone,
                                status: status.youhuiquanStatus.default,
                                logicnumber:utils.genYouhuiquanNumber(),
                                transaction: t
                            })
                        })
/*
                        return curr_user.addYouhuiquans(youhuiquan_newUser_Arr, {
                            userphone: phone,
                            status: status.youhuiquanStatus.default,
                            //logicnumber:utils.genYouhuiquanNumber(),
                            transaction: t
                        })*/
                    })
                })
            })
    }).then(function () {
        if (user_Dianpu) return user_Dianpu;
        return User_Dianpu.findOne({
            where: {userphone: phone},
            include: [{model: User}, {model: Dianpu, where: {gzh: gzh}}]
        })
    }).then(function (userDianpu) {
        req.session.dianpus = req.session.dianpus || [];
        req.session.dianpus.push({
            gzh: gzh,
            dianpuid:userDianpu.Dianpu.id,
            userid: userDianpu.User.id,
            phone: phone,
            rolename: userDianpu.role
        });
        return userDianpu;
    })
}