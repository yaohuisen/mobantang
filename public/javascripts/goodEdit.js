var goodName,goodNum,goodPrice,goodLiang,goodXL
$.ajax({
		type:"get",
		url: 'api/getData',
		success:function(res){
			console.log(res);
			 goodName = $(".goodName input")
			 goodNum = $(".goodNum input")
			 goodPrice = $(".goodPrice input")
			 goodLiang = $(".goodLiang input")
			 goodXL = $(".goodXL input")
			goodName.val(res[0].goodName);
			goodNum.val(res[0].goodNum);
			goodPrice.val(res[0].goodPrice);
			goodLiang.val(res[0].goodLiang);
			goodXL.val(res[0].goodXL);
		}
	})

	function get(){
		$.ajax({
			type:"get",
			url:"/api/update",
			async:true,
			data:{
				goodName : goodName.val(),
				goodNum : goodNum.val(),
				goodPrice:goodPrice.val(),
				goodLiang:goodLiang.val(),
				goodXL : goodXL.val()
			},
			success:function(res){
				if(res == "ok"){
					alert("商品修改成功")
					$(".body").load("/goodList")
				}
			}
		});
	}
	

function reset(){
	var inps = $(".tabbody-div form input");
	var len = inps.length;
	for(var i = 0;i < len;i ++){
		inps[i].val = '';
	}
}

 