//查询所有的icon
var mongodb = require('mongodb-curd');
var dbBase = 'ningmeng';
var dbiconColl = 'icons';
var dbclassifyColl = 'classify';


//查看所有icon
var iconlist = function(req, res, next) {
    mongodb.find(dbBase, dbiconColl, {}, function(result) {
        if (result.length > 0) {
            res.send({ code: 0, data: result, message: "查询成功" });
        } else {
            res.send({ code: 1, message: "查询失败" });
        }
    });
};

// 添加分类的接口
var classifylist = function(req, res, next) {
    var params = req.body,
        iname = params.iname,
        cname = params.cname,
        type = params.type,
        uid = params.uid;
    if (!iname || !cname || !type || !uid) {
        res.send({ code: 2, message: "缺少参数" });
    } else {
        getIsClassify();
    }

    function getIsClassify() {
        mongodb.find(dbBase, dbclassifyColl, {
            cname: cname,
            type: type,
            uid: {
                $in: ['*',
                    uid
                ]
            }
        }, function(result) {
            if (result.length > 0) {
                res.send({ code: 0, message: "该用户已经存在" });
            } else {
                add();
            }
        });

        // 添加分类
        function add() {
            mongodb.insert(dbBase, dbclassifyColl, {
                iname: iname,
                cname: cname,
                type: type,
                uid: uid
            }, function(result) {
                if (result) {
                    res.send({ code: 0, message: "分类添加成功" });
                } else {
                    res.send({ code: 1, message: "分类添加失败" });
                }
            });
        }
    }


};

//查询分类的接口
var serachlist = function(req, res, next) {
    var params = req.body,
        type = params.type,
        uid = params.uid;

    mongodb.find(dbBase, dbclassifyColl, {
        type: type,
        uid: {
            $in: ['*',
                uid
            ]
        }
    }, function(result) {
        if (result.length > 0) {
            res.send({ code: 0, data: result });
        } else {
            res.send({ code: 1, message: "无查询分类" });
        }
    });
};

module.exports = {
    icons: iconlist,
    addclassify: classifylist,
    serachclassify: serachlist
};