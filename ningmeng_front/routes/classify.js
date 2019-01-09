var express = require('express');
var router = express.Router();



var dbBase = 'ningmeng';
var dbColl = 'icons';

var classify = require('./classifyApi/index.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//查看所有icon
router.get('/classify/icons', classify.icons);

// 添加分类的接口
router.post('/classify/addclassify', classify.addclassify);

//查询分类的接口
router.post('/classify/serachclassify', classify.serachclassify)

module.exports = router;