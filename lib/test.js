/**
 * Created by Administrator on 2015/4/30.
 */
var fs = require('fs'),
    path = require('path');
var promise = require('promise')
var http = require('http')
var util = require('util')

promise.resolve()
    .then(function(){
        return promise.resolve()
            .then(function(){
                throw Error('1111111111111111')
            })
    })
    .then(function(){
        console.log('ddddddddddddddddddd');

    })
    .catch(function(err){
        console.log(err)
    })
/*

http.get("http://www.baidu.com", function(res) {
    console.log("Got response: " + res.statusCode);console.log("Got response: " + console.log(util.inspect(res)));
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});*/
