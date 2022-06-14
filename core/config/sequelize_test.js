/**
 * Created by Administrator on 2015/5/31.
 */
var Sequelize = require('sequelize')
var db = require('./sequelizeConfig')
var util = require('util')
var Promise = require('promise')

var Sms = db.import('../models/Sms')
var Dianpu = db.import('../models/Dianpu')

var User = db.import('../models/User')
var Youhuiquan = db.import('../models/Youhuiquan')

var User_Dianpu = db.import('../models/User_Dianpu')
var User_Youhuiquan = db.import('../models/User_Youhuiquan')

//associations
User.belongsToMany(Dianpu, {through: User_Dianpu, foreignKey: 'userid_fk'});
Dianpu.belongsToMany(User, {through: User_Dianpu, foreignKey: 'dianpuid_fk'});
User_Dianpu.belongsTo(Dianpu, {foreignKey: 'dianpuid_fk'})
User_Dianpu.belongsTo(User, {foreignKey: 'userid_fk'})

Youhuiquan.belongsTo(Dianpu, {foreignKey: 'dianpuid_fk'})
Dianpu.hasMany(Youhuiquan, {foreignKey: 'dianpuid_fk'})

User.belongsToMany(Youhuiquan, {through: User_Youhuiquan, foreignKey: 'userid_fk'});
Youhuiquan.belongsToMany(User, {through: User_Youhuiquan, foreignKey: 'youhuiquanid_fk'});
User_Youhuiquan.belongsTo(User, {foreignKey: 'userid_fk'})
User_Youhuiquan.belongsTo(Youhuiquan, {foreignKey: 'youhuiquanid_fk'})


db.sync().then(function () {
    console.log('ok ... everything is nice for DB!')
    var curr_dianpu = null;
    var curr_user = null;
    Promise.resolve()
        /*.then(function () {
            return Dianpu.create({name: '祥和饭店', address: '凤翔新城', gzh: 'xianghefandian'})
        })
        .then(function (dianpu) {
            curr_dianpu = dianpu;

            return User.create({phone: '13915974215'})
                .then(function(user){
                    curr_user = user;
                    user.addDianpu(dianpu,{role: 'boss',userphone:'13915974215'})
                    return user.save()
                })
        })*/
        /*.then(function () {
         return Youhuiquan.create({
         title: 'a',
         content: 'a',
         starttime: new Date(),
         endtime:new Date(new Date().getTime() + 36000000),
         isnewuser: true,
         status: 0,
         views: 1,
         hexiaoci: 0,
         type: 'hui',
         dianpuid_fk:curr_dianpu.id
         })

         })
         .then(function (youhuiquan) {
         return User_Youhuiquan.create({youhuiquanid_fk:youhuiquan.id,userid_fk:curr_user.id})
         })
         .then(function () {
         return User_Youhuiquan.findAll({ include: [ { model: Youhuiquan} ] })
         })*/
        .then(function () {
            //return User_Dianpu.findAll({ include: [ { model: User},{model:Dianpu} ] })
        })
        .then(function (user_dianpu) {
            //console.log('11' + util.inspect(user_dianpu[0].User.phone))
            //console.log('22' + util.inspect(user_dianpu.User))
            //console.log('33' + user_dianpu.role)
        })
        .then(function () {
            //return User.findAll({ include: [ { model: Dianpu}] })
            //return User_Dianpu.findOne({here: {phone: '13915974215'}, include: [ { model: User},{model:Dianpu, where: {gzh: 'xianghsefandian'}} ] })

        })
        .then(function () {
            return User_Dianpu.findOne({
                where: {userphone: '13915974214'},
                include: [{model: User}, {model: Dianpu, where: {gzh: 'xianghefandian'}}]
            })
        })
        .then(function(user){
            console.error('11' + util.inspect(user))
            //console.log('22' + util.inspect(user_dianpu.User))
            //console.log('33' + user_dianpu.role)
        })

        .catch(function (err) {
            throw err;
        })


}).catch(function (err) {
    console.error('oooh, did you enter wrong database credentials?')
    throw err;
});