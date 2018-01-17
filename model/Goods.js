var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Good = new Schema({
	goodName : String,
	goodNum : String,
	goodPrice : String,
	goodLiang : Number,
	goodXL : Number,
	goodImg : String,
	flag:Number,
	num:Number,
	create_date : {type : Date,default : Date.now}
})
var GoodModel = mongoose.model("gooder",Good);
module.exports = GoodModel;
