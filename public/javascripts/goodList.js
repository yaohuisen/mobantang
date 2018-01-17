

	var num = -1;
	var index = $(".body table").length;
	if(index == 1){
		num = 0;
		console.log(num)
	}else{
		num = $(".body table tr").eq(index-1).find("span").val()
		console.log(num)
	}
	$.ajax({
		type:"get",
		url:"/api/getTable",
		async:true,
		data : {
			num : num
		},
		success:function(res){
			console.log(res)
			for(var i = 0;i < res.length;i ++){
				var tr = $("<tr></tr>")				
				$(".body table").append(tr);
				var td = $("<td><input type='checkbox'/><span>"+res[i].num+"</span></td>")
				tr.append(td);
				var td = $("<td>"+res[i].goodName+"</td>")
				tr.append(td);
				var td = $("<td>"+res[i].goodNum+"</td>")
				tr.append(td);
				var td = $("<td>"+res[i].goodPrice+"</td>")
				tr.append(td);
				var td = $("<td><img src='../images/yes.gif'/></td>")
				tr.append(td);
				var td = $("<td><img src='../images/yes.gif'/></td>")
				tr.append(td);
				var td = $("<td><img src='../images/yes.gif'/></td>")
				tr.append(td);
				var td = $("<td><img src='../images/yes.gif'/></td>")
				tr.append(td);
				var td = $("<td>"+100+"</td>")
				tr.append(td);
				var td = $("<td>"+res[i].goodLiang+"</td>")
				tr.append(td);
				var td = $("<td>"+res[i].goodXL+"</td>")
				tr.append(td);
				var td = $("<td><a href='javascript:;'><img src='/images/icon_view.gif'/></a><a href='javascript:;'><img src='/images/icon_edit.gif'</a><a href='javascript:;'><img src='/images/icon_copy.gif'</a><a href='javascript:;'><img src='../images/icon_trash.gif'</a></td>")
				tr.append(td);
			}
			
			
		}
	});

setTimeout(function(){
	$.each($(".body table tr"),function(index,value){
		$(this).find("td").eq(11).find("a").eq(3).click(function(){
			$(this).parents("tr").remove()
			var goodNum = $(this).parent().siblings("td").eq(2).html();
			$.ajax({
				type:"get",
				url:"/api/del",
				data:{
					goodNum : goodNum
				},
				success:function(res){
					console.log(res);
				}
			})
		})
		$(this).find("td").eq(11).find("a").eq(1).click(function(){
			var num = $(this).parent().siblings("td").eq(0).find("span").html();
			var data = null;
			$.ajax({
				type:"get",
				url:"/api/getNum",
				data : {
					num : num
				},
				success:function(res){
					console.log(res);
				}
			});
			
			$(".body").load("/goodEdit");
		})
	})
},1000)


$(".a3").click(function(){
	$(".body").load("/goodInfo")
})
