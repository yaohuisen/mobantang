function f(res){
				$(".body table tbody tr:not(.tr1)").remove()
				
				
					var len = res.length;
				
					for(var i = len-1;i >= 0;i --){
						var tr = $("<tr></tr>")				
						$(".body table").append(tr);
					
						var str = "<td><input type='checkbox'/><span>"+res[i].num+"</span></td>"+
						"<td>"+res[i].goodName+"</td>"+
						"<td>"+res[i].goodNum+"</td>"+
						"<td>"+res[i].goodPrice+"</td>"+
						"<td><img src='../images/yes.gif'/></td>"+
						"<td><img src='../images/yes.gif'/></td>"+
						"<td><img src='../images/yes.gif'/></td>"+
						"<td><img src='../images/yes.gif'/></td>"+
						"<td>"+100+"</td>"+
						"<td>"+res[i].goodLiang+"</td>"+
						"<td>"+res[i].goodXL+"</td>"+
						"<td><a href='javascript:;'><img src='/images/icon_view.gif'/></a><a href='javascript:;'><img src='/images/icon_edit.gif'</a><a href='javascript:;'><img src='/images/icon_copy.gif'</a><a href='javascript:;'><img src='../images/icon_trash.gif'</a></td>"
						
						
						$(str).appendTo(tr)
					
					
					}
		
				
			}
getAjax2()
function getAjax2(){
	$.ajax({
		type:"get",
		url:"/api/getTable1",
		async:true,
		data : {
			num : 0
		},
		success:function(res){
			f(res);
			var inp = $("#txtBot .left input");
				var sum = res.length 
				$("#txtBot .left .sum").html(sum)
				inp.val(sum)
				$("#txtBot .left .page").html("1")

		}
	});
}
	
	setTime()
function setTime(){
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
						getAjax()
						getAjax2()
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
}



$(".a3").click(function(){
	$(".body").load("/goodInfo")
})

getAjax()
$("#txtBot .left input").blur(function(){
	getAjax()
	
	
})
function getAjax(){
		var num = parseInt($("#txtBot .left input").val());
		
		if(num<=0 ){
			$("#txtBot .left input").val(1)
		}
		$.ajax({
			type:"get",
			url:"/api/getTable",
			async:true,
			data : {
				num : 0
			},
			success:function(res){
				var sum = res
				$("#txtBot .left .sum").html(sum)
				var page = Math.ceil(sum/num);
		
				$("#txtBot .left .page").html(page)
				var index = 1;
				getAjax1(index,num)
				$("#txtBot .right .pre").click(function(){	
					
					index --;
					if(index<=0){
						index = 1;					
					}
					$("#txtBot .left .cur").html(index);
					getAjax1(index,num)
					setTime()
				})
				$("#txtBot .first").click(function(){
					index = 1;
					$("#txtBot .left .cur").html(index);
					getAjax1(index,num)
					setTime()
				})
				$("#txtBot .last").click(function(){
					index = page;
					$("#txtBot .left .cur").html(index);
					getAjax1(index,num)
					setTime()
				})
				$("#txtBot .right .next").click(function(){
					index ++;
					if(index>=page){
						index = page;	
					}
					$("#txtBot .left .cur").html(index);
					getAjax1(index,num)
					setTime()
				})
			}
		})
	}

	function getAjax1(index,num){
		
		$.ajax({
			type:"get",
			url:"/api/getFenye",
			data:{
				page:index,
				num:num
			},
			success:function(res){
				console.log(res);
				f(res)
				 setTime()
			}
		})
	}

$("#search").click(function(){
	var goodName = $("#txt").val();
	$.ajax({
		type:"get",
		url:"/api/search",
		data :{
			goodName : goodName
		},
		success:function(res){
			f(res)
		}
	})
})
