var express = require('express');
var router = express.Router();
var UserModel = require("../model/User")
var GoodModel = require("../model/Goods")
var multiparty = require("multiparty");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/login",function(req,res,next){
	res.render("login",{});
})
var num1 = 0
router.get("/api/getNum",function(req,res,next){
 num1 = req.query.num;
	console.log(num1)
	
})
router.get("/api/getData",function(req,res,next){
		console.log(num1)
		GoodModel.find({num:num1,flag:1},function(err,docs){
				console.log(docs);
				res.json(docs);
		})
	})
router.get("/api/update",function(req,res,next){
	var goodName = req.query.goodName;
	var goodNum = req.query.goodNum;
	var goodPrice = req.query.goodPrice;
	var goodLiang = req.query.goodLiang;
	var goodXL = req.query.goodXL;
	var Num = num1;
	GoodModel.update({num:num1,flag:1},{$set:{goodName:goodName,goodNum:goodNum,goodPrice:goodPrice,goodLiang:goodLiang,goodXL:goodXL}},function(err){
		res.send("ok")
	})
})
var num = 0
router.post("/api/ajax4goodInfo",function(req,res,next){
	console.log(1)
	
		var form = new multiparty.Form({
			uploadDir:"public/imgs"
		})
		
		var result = {
			code : 1,
			message : "商品信息保存成功"
		};
		form.parse(req,function(err,body,files){
			var goodName = body.goodName[0];
			var goodNum = body.goodNum[0];
			var goodPrice = body.goodPrice[0];
			var goodXL = body.goodXL[0];
			var goodLiang = body.goodLiang[0];
			var goodImg = files["goodImg"][0].path.replace("pubic\\","");
			var gm = new GoodModel();
			num++;
			gm.num = num;
			gm.goodName = goodName;
			gm.goodNum = goodNum;
			gm.goodPrice = goodPrice;
			gm.goodXL = goodXL;
			gm.goodLiang = goodLiang;
			gm.goodImg = goodImg
			gm.flag = 1;
			
			gm.save(function(err){
				if(err){
					result.code = -110;
					result.message = "存取失败"
				}
				res.json(gm)
			})
 		})
		
})

router.get("/api/getTable",function(req,res,next){
	var num = req.query.num;
	GoodModel.find({num:{$gt:num},flag:1},function(err,docs){
		res.json(docs)
	})
})
router.get("/goodList",function(req,res,next){
	res.render("goodList",{});
})
router.get("/goodEdit",function(req,res,next){
	res.render("goodEdit",{});
})
router.get("/goodInfo",function(req,res,next){
	res.render("goodInfo",{});
})

router.get("/api/del",function(req,res,next){
	var goodNum = req.query.goodNum;
	GoodModel.update({goodNum:goodNum},{$set:{flag:0}},{multi:true},function(){
		res.send("ok")
	})
})

router.get("/api/get",function(req,res,next){
	var goodNum = req.query.goodNum;
	var result = {
		code : -100,
		message : "商品货号已存在请重新输入"
	}
	GoodModel.find({goodNum:goodNum,flag:1},function(err,docs){
		if(docs.length>0){
			res.json(result)
		}else{
			result.code = 1;
			result.message="ok";
			res.json(result)
		}
	})
})
router.get("/main",function(req,res,next){
	if(req.session == null ||req.session.username == null){
		res.redirect("/login");
		return;
	}else{
		res.render("main",{});
	}
})

router.post("/api/ajax4login",function(req,res,next){
	var username = req.body.username;
	var psw = req.body.psw;
	
	var result = {
		code : 1,
		message : '登录成功'
	}
	UserModel.find({username:username,psw:psw},function(err,docs){
		console.log(docs)
		if(docs.length == 0){
			result.code = -100;
			result.message = "用户名和密码输入不一致";
			res.json(result)
			return;
		}else{
			console.log(username)
			req.session.username = username;
			res.json(result)
		}
		
		
	})
})

module.exports = router;
