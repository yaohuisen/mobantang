function save(){
	
	var form = new FormData();
	form.append("goodName",$(".goodName input").val());
	form.append("goodNum",$(".goodNum input").val());
	form.append("goodPrice",$(".goodPrice input").val());
	form.append("goodLiang",$(".goodLiang input").val());
	form.append("goodXL",$(".goodXL input").val());
	form.append("goodImg",document.getElementById("img").files[0]);
	$.ajax({
		type:"get",
		url:"/api/get",
		async:true,
		data:{
			goodNum:$(".goodNum input").val()
		},
		success:function(res){
			console.log(res);
			if(res.code == 1){
				xhr();
			}else{
				alert(res.message);
			}
		}
	});
	function xhr(){
		var xhr = new XMLHttpRequest();
		xhr.open("POST","/api/ajax4goodInfo");
		xhr.send(form);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				console.log(xhr.responseText);
				var res = xhr.responseText;
				res = JSON.parse(res);
				alert("添加商品成功")
				$(".body").load("/goodList")	
				
			}
		}		
	}

}
function reset(){
	var inps = $(".tabbody-div form input");
	var len = inps.length;
	for(var i = 0;i < len;i ++){
		inps[i].val = '';
	}
}
