/**
 * Created by Administrator on 2015/6/5.
 */
var http = require('http')
var Promise = require('promise')
var exports = module.exports = {};

exports.sendSMS = function (phone, smscode) {
    var sign = encodeURIComponent('我的南京')
    var smsAPI = 'http://sms.1xinxi.cn/asmx/smsservice.aspx?name=feng&pwd=9FA6EB4D075A98F84F896CF0D451&mobile=' + phone + '&content=' + smscode + '&sign=' + sign +'&stime=&type=pt&extno='
    var p = new Promise(function (resolve, rejected) {
        http.get(smsAPI, function (res) {
            console.log("短信接口返回http状态码: ", res.statusCode);
            console.log('短信API：' + smsAPI)
            if (res.statusCode == 200) {
                return resolve();
            }
            return rejected(new Error('验证码发送失败'));
        }).on('error', function (e) {
            console.error('验证码发送失败：' + e);
            return rejected(e);
        });
    })
    return p;
}
