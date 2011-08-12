$(document).ready(function(){
	var $body = $("body");
	var $header = $("#header");
	var $curposit = $("#cur_posit");
	var $frame = $("#frame");
	var setting={
		top_nav:false,  //是否关闭
		left_nav:false  //是否关闭
	}
	
	$frame.css("height",$body.height() - 98 + "px");

	$(window).resize(function(){
		$frame.css("height",$body.height() - 98 + "px");
	});
	
	left_nav()
	$("#spl").click(function(){
		setting.left_nav=setting.left_nav?false:true;
		left_nav();
	})
	
	$("#spt").click(function(){
		setting.top_nav=setting.top_nav?false:true;
		top_nav();
	})
	
	function top_nav(){
		if(setting.top_nav){
			$header.css("margin-top","-60px");
			$frame.css("height",$frame.height()+60+"px");
		}else{
			$header.css("margin-top","0");
			$frame.css("height",$frame.height()-60+"px");
		}
	}
	function left_nav(){
		if(setting.left_nav){
			$frame.css("margin-left","0px")
		}else{
			$frame.css("margin-left","200px")
		}
	}
});
