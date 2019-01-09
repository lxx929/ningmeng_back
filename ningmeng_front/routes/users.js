var express = require('express');
var router = express.Router();

var mongodb = require('mongodb-curd');
var dbBase = 'ningmeng';
var dbColl = 'user';

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//添加用户
router.post('/users/adduser', function(req, res, next) {
    var name = req.body.name;
    mongodb.insert(dbBase, dbColl, { name: name }, function(result) {
        if (result) {
            res.send({ code: 0, message: "success of insert" });
        } else {
            res.send({ code: 1, message: "failure of insert" });
        }
    });
});

router.post('/users/find', function(req, res, next) {

    var name = req.body.name;
    mongodb.find(dbBase, dbColl, { name: name }, function(result) {
        console.log(result);
        if (result) {
            res.send({
                code: 0,
                data: result,
                message: "查询成功"
            });
        } else {
            res.send({
                code: 1,
                message: "查询失败"
            });
        }
    });

});

module.exports = router;