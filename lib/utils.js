/**
 * Created by Administrator on 2015/4/22.
 */
var promise = require('promise')
var exports = module.exports = {};
var crypto = require('crypto')

exports.errors = function (errors) {
    var keys = Object.keys(errors)
    var errs = []

    // if there is no validation error, just display a generic error
    if (!keys) {
        return ['Oops! There was an error']
    }

    keys.forEach(function (key) {
        if (errors[key]) errs.push(errors[key].message)
    })

    return errs
};

exports.encryptPassword = function (password, salt) {

    if (!password) return '';
    try {
        return crypto
            .createHmac('sha1', salt + '!@#$%^&*')
            .update(password)
            .digest('hex');

    } catch (err) {
        return '';
    }
}

exports.findDianpuById = function (dianpuArr, gzh) {
    for (var i = 0; i < dianpuArr.length; i++) {
        var dianpu = dianpuArr[i];
        if (dianpu.gzh == gzh) return dianpu;
    }
    return null;
}

exports.genSmsCodeExpires = function () {
    var d = new Date();
    d.setHours(d.getHours() + 1);
    return d;
}

exports.formartExpires = function (value) {
    var year = value.substring(0, 4);
    var month = value.substring(4, 6)
    var day = value.substring(6, 8)

    return new Date(year + '-' + month + '-' + day)
}
exports.formartDate2YMDstr = function (date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString();
    if(month.length < 2) month = "0" + month;

    var day = date.getDate().toString()
    if(day.length < 2) day = "0" + day;

    var result = (year + month + day);
    return result
}
exports.formartDate2YMDstr_line = function (date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString();
    if(month.length < 2) month = "0" + month;

    var day = date.getDate().toString()
    if(day.length < 2) day = "0" + day;

    var result = (year + '-'+ month + '-' + day);
    return result
}
exports.genYouhuiquanNumber = function () {
    var min = 1, max = 1000;
    var Range = max - min;
    var Rand = Math.random();
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var res = "";
    for (var i = 0; i < 8; i++) {
        var id = Math.ceil(Math.random() * 9);
        res += chars[id];
    }
    return parseInt(res) + (min + Math.round(Rand * Range));
}
exports.genSmsCode = function () {
    var min = 1, max = 1000;
    var Range = max - min;
    var Rand = Math.random();
    var chars = ['1', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var res = "";
    for (var i = 0; i < 5; i++) {
        var id = Math.ceil(Math.random() * 9);
        res += chars[id];
    }
    return parseInt(res) + (min + Math.round(Rand * Range));
}
var getCurrYMDdate = exports.getCurrYMDdate = function(){
    var d = new Date()
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)
    d.setMilliseconds(0)
    return d;
}
exports.getNotExpiresYhq = function(endtime){
    endtime.setHours(0)
    endtime.setMinutes(0)
    endtime.setSeconds(0)
    endtime.setMilliseconds(0)
    return endtime >= getCurrYMDdate()
}