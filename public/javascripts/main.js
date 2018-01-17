$(".silder ul>li a").click(function(){
	if($(this).parent().find("ol").css("display") == "none"){
		$(this).parent().find("ol").css("display","block")
		$(this).parent().find("span").css("background","url(/images/menu1_1.png)")
	}else{
		$(this).parent().find("ol").css("display","none")
		$(this).parent().find("span").css("background","url(/images/menu_1.png)")
	}
})
$(".silder ul>li").eq(0).find("ol li").eq(0).click(function(){
	$(".body").load("/goodList")	
})
$(".silder ul>li").eq(0).find("ol li").eq(1).click(function(){
	$(".body").load("/goodInfo")	
})


