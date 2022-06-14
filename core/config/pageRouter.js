var express = require('express');
var router = express.Router();
var pageMaps = [
    {path:'/project',      view:'projects'},
    {path:'/projectPlan',      view:'projectPlan'}
]
pageMaps.forEach(function (page) {
    router.get(page.path,function (req,res,next){
        res.render(page.view);
    })
})

module.exports = router;
