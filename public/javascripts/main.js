var ua = navigator.userAgent.toLowerCase();
/*if(ua.match(/MicroMessenger/i)=='micromessenger') {
    //
} else {
    window.location.href='/client_error?gzh=' + getQueryString('gzh');
}*/
jQuery.validator.messages = {
    required: "必填项",
    phone:"手机号码格式错误",
    maxlength: $.validator.format("最多输入 {0} 个字符"),
    minlength: $.validator.format("最少输入 {0} 个字符"),
    rangelength: $.validator.format("字符长度介于 {0} 到 {1} 之间"),
    range: $.validator.format("值大小介于 {0} 到 {1}之间"),
    max: $.validator.format("最大值不超过 {0}"),
    min: $.validator.format("最小值不小于 {0}")
};
jQuery.validator.addMethod("youhuiquanNumber",function(value, element){
    return /^\d{7,10}$/.test(value);
},'优惠券编号格式错误。')
jQuery.validator.addMethod("hexiaoyuanArr",function(value, element){
    if(value && value.length > 0){
        var phone_arr = value.split(',');
        for(var i = 0;i < phone_arr.length; i ++){
            if(!verifyPhone(phone_arr[i])) return false;
        }
    }

    return true;
},'手机号码格式错误。')
jQuery.validator.addMethod("starttime",function(value, element){
    if(!/\d{8}/.test(value)){
        return false
    }
    value = formartExpires(value)
    if(value < getCurrYMDdate()){
        return false;
    }
    return true;
},"请认真填写活动期限。");

jQuery.validator.addMethod("endtime",function(value, element){
    if(!/\d{8}/.test(value)){
        return false
    }
    var starttime = formartExpires($('#starttime_ymd_str').val())
    var endtime = formartExpires(value);
    if(endtime < starttime){
        return false;
    }
    return true;
},"请认真填写活动期限。");

jQuery.validator.addMethod("phone",function(value, element){
    return verifyPhone(value);
},"手机号码格式错误。")
function verifyPhone(value){
    if(value && value.length > 0){
        return /^[1][358][0-9]{9}$/.test(value);
    }
    return false;
}
function formartExpires(value){
    var year = value.substring(0,4);
    var method = value.substring(4,6)
    var day = value.substring(6,8)

    var d = new Date(year + '-' + method + '-' + day);
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)
    d.setMilliseconds(0)
    return d.getTime();
}
function formartDate2YMDstr(date) {
    if(!(date instanceof Date)) date = new Date(date);
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString();
    if(month.length < 2) month = "0" + month;

    var day = date.getDate().toString()
    if(day.length < 2) day = "0" + day;

    var result = (year + month + day);
    return result
}

/**
 * Created by Administrator on 2015/4/7.
 */
function regNS(nsStr) {
    var o, d, v2;
    d = nsStr.split(".");
    o = window[d[0]] = window[d[0]] || {};
    var arr = d.slice(1);
    for (index in arr) {
        (function () {
            o = o[arr[index]] = o[arr[index]] || {};
        })();
    }
    return o;
}
regNS("iae.common");
/********************* validate form ******************************/
iae.common.form = function (formId) {
    var jq_form = $("#" + formId);


    var roles = {
        phone: {
            role: {required: false,phone:false}
        },
        login_phone: {
            role: {required: true,phone:true}
        },
        hexiaoyuanArr : {
            role: {required: false,hexiaoyuanArr:true}
        },
        smscode: {
            role: {required: true, minlength: 5, maxlength: 5}
        },
        dianpu_title:{
            role: {required: true, minlength: 3, maxlength: 15}
        },
        dianpu_address:{
            role: {required: true, minlength: 3, maxlength: 50}
        },
        youhuiquan_title: {
            role: {required: true, minlength: 5, maxlength: 25}
        },
        youhuiquan_content: {
            role: {required: true, minlength: 30, maxlength: 80}
        },
        youhuiquan_starttime: {
            role: {required: true, starttime:true }
        },
        youhuiquan_endtime: {
            role: {required: true, endtime:true }
        },
        youhuiquan_isnewuser: {
            role: {required: false}
        },
        youhuiquanNumber:{
            role: {required: true, youhuiquanNumber:true }
        },
        youhuiquanType:{
            role: {required: true}
        },
        acceptZengsongTerm:{
            role: {required: true}
        }

    };

    function setupForm(){
        jq_form.validate({
            debug: false,
            rules: {
                phone: roles.phone.role,
                hexiaoyuanArr : roles.hexiaoyuanArr.role,
                address:roles.dianpu_address.role,
                title:roles.dianpu_title.role
            },
            errorClass: "formErrorMessage",
            submitHandler: function (form) {
                var param = $(form).serialize();
                $.ajax({
                    type: "post",
                    url: "?gzh=" + getQueryString('gzh') ,
                    dataType: "json",
                    data: param,
                    success: function (res) {
                        iae.common.dialog.tips(true,'保存成功。');
                    },
                    error: function (err) {
                        //$(".res_error").html(err.responseJSON.errors)
                        iae.common.dialog.tips(false,err.responseJSON.errors);
                    }
                });
                return false;
            }
        });
    }
    function hexiaoForm() {
        jq_form.validate({
            debug: false,
            rules: {
                quanBianhao: roles.youhuiquanNumber.role
            },
            errorClass: "formErrorMessage",
            submitHandler: function (form) {
                var param = $(form).serialize();
                $.ajax({
                    type: "post",
                    url: "?gzh=" + getQueryString('gzh') ,
                    dataType: "json",
                    data: param,
                    success: function (res) {
                        iae.common.dialog.tips(true,'核销成功。');
                    },
                    error: function (err) {
                        //$(".res_error").html(err.responseJSON.errors)
                        iae.common.dialog.tips(false,err.responseJSON.errors);
                    }
                });
                return false;
            }
        });
    }

    function zengsongForm() {
        return jq_form.validate({
            debug: false,
            rules: {
                accept: roles.acceptZengsongTerm.role,
                phone: roles.phone.role
            },
            errorClass: "formErrorMessage",
            submitHandler: function (form) {
                var param = $(form).serialize();
                $.ajax({
                    type: "post",
                    url: "?gzh=" + getQueryString('gzh') ,
                    dataType: "json",
                    data: param,
                    success: function (res) {
                        iae.common.dialog.tips(true,'赠送成功。');

                    },
                    error: function (err) {
                        //$(".res_error").html(err.responseJSON.errors)
                        iae.common.dialog.tips(false,err.responseJSON.errors);
                    }
                });
                return false;
            }
        });
    }

    function createyouhuiquanForm(isEdit) {
        jq_form.validate({
            debug: false,
            rules: {
                title: roles.youhuiquan_title.role,
                content: roles.youhuiquan_content.role,
                starttime_ymd_str: roles.youhuiquan_starttime.role,
                endtime_ymd_str: roles.youhuiquan_endtime.role,
                isnewuser: roles.youhuiquan_isnewuser.role,
                type:roles.youhuiquanType.role
            },
            errorClass: "formErrorMessage",
            submitHandler: function (form) {
                var param = $(form).serialize();
                $.ajax({
                    type: "post",
                    url: "?gzh=" + getQueryString('gzh') ,
                    dataType: "json",
                    data: param,
                    success: function (res) {
                        window.location.href = res.redirect
                    },
                    error: function (err) {
                        //$(".res_error").html(err.responseJSON.errors)
                        iae.common.dialog.tips(false,err.responseJSON.errors);
                    }
                });
                return false;
            }
        });
    }

    function loginForm() {

        jq_form.validate({
            debug: false,
            rules: {
                phone : roles.login_phone.role,
                smscode: roles.smscode.role
            },
            messages: {},
            errorClass: "formErrorMessage",
            submitHandler: function (form) {
                var param = $(form).serialize();
                $.ajax({
                    type: "post",
                    url: "?gzh=" + getQueryString('gzh') ,
                    dataType: "json",
                    data: param,
                    success: function (res) {
                        window.location.href = res.redirect
                    },
                    error: function (err) {
                        //$(".res_error").html(err.responseJSON.errors)
                        iae.common.dialog.tips(false,err.responseJSON.errors);
                    }
                });
                return false;
            }
        });
    }

    var validate = function () {
        var formValidator = null;
        switch (formId) {
            case 'loginForm':
                loginForm();
                break;
            case 'createyouhuiquanForm':
                createyouhuiquanForm();
                break;
            case 'edityouhuiquanForm':
                createyouhuiquanForm('edit');
                break;
            case 'zengsongForm':
                formValidator = zengsongForm();
                break;
            case 'hexiaoForm':
                hexiaoForm();
                break;
            case 'setupForm':
                setupForm();
                break;
            default :
            //Ignore
        }
        return formValidator;
    };

    return {validate: validate};
};
function getSmsCode() {
    var phone = $('#phone').val()
    if($("#loginForm").validate().element("#phone")){
        $.ajax({
            type: "get",
            url: '/smscode?p=' + phone + '&gzh=' + getQueryString('gzh') ,
            dataType: "json",
            data: '',
            success: function (res) {
                iae.common.dialog.tips(true,res.msg);
            },
            error: function (err) {
                //$(".res_error").html(err.responseJSON.errors)
                iae.common.dialog.tips(false,err.responseJSON.errors);
            }
        });
    }

}
iae.common.dialog = {
    tips: function (isOk, msg) {
        var tipsModal = document.getElementById('tipsModal');
        if (!tipsModal) {
            $("body").append('<div class="modal fade bs-example-modal-sm" id="tipsModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="modal-body" style="text-align: center"></div>' +
            '</div>' +
            '</div>' +
            '</div>');
        }
        $('#tipsModal .modal-body').html('<div style="color: ' + (isOk?'#336699' :'red') +'">' + msg + '</div>');
        $('#tipsModal').modal();
    }
}

iae.common.loading = {
    show: function (options) {
        var loadingModal = document.getElementById('loadingModal');
        if (!loadingModal) {
            $("body").append('<div class="modal fade bs-example-modal-sm" id="loadingModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="modal-body" style="text-align: center"><img src="/public/images/loading2.gif"/> loading...</div>' +
            '</div>' +
            '</div>' +
            '</div>');
        }
        //$('#tipsModal .modal-body').html(msg);
        $('#loadingModal').modal({backdrop:'static'});
    },
    hide: function () {
        $('#loadingModal').modal('hide')
    }
};

/*(function () {
    $.ajaxSetup({
        global: true,
        timeout: 30000,
        beforeSend: function () {
            iae.common.loading.show();
        },
        complete: function () {
            iae.common.loading.hide();
        }
    });
})();*/



function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}

function goHomePage(gzh){
    window.location.href='/boss?gzh=' + gzh;
}
function getCurrYMDdate(){
    var d = new Date()
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)
    d.setMilliseconds(0)
    return d;
}


function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}