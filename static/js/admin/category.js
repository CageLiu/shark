$(document).ready(function(){
	var $onOff = $("#dir_tree .on_off");
	var $dirItem = $onOff.parent("span").siblings("ul");
	var $i = $("#dir_tree i[status]");

	//读取cookie
	if(!$.cookie("dir_tree")){
		var $iStatus = [];
		$i.each(function(){
			$iStatus.push($(this).attr("status"));
		})
		$.cookie("dir_tree",$iStatus.join(":"));
	}
	else{
		var $iStatus = $.cookie("dir_tree").split(":");
		$.each($iStatus,function(i,n){
			if(n == 0){
				if($i.eq(i).hasClass("on_off")){
					$i.eq(i).removeClass("on").addClass("off");
					$i.eq(i).parent("span").parent("li").addClass("hide");
				}
				else if($i.eq(i).hasClass("icon")){
					$i.eq(i).removeClass("folder_on").addClass("folder_off");
				}
			}	
			else{
				if($i.eq(i).hasClass("on_off")){
					$i.eq(i).removeClass("off").addClass("on");
					$i.eq(i).parent("span").parent("li").removeClass("hide");
				}
				else if($i.eq(i).hasClass("icon")){
					$i.eq(i).removeClass("folder_off").addClass("folder_on");
				}
			}
		})
	}

	//折叠事件，并写入cookie
	$onOff.click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on").addClass("off");
			$(this).siblings(".icon").removeClass("folder_on").addClass("folder_off");
			$(this).parent("span").siblings("ul").css("display","none");
			$iStatus[$(this).index("#dir_tree i[status]")] = 0;
			$iStatus[$(this).siblings(".icon").index("#dir_tree i[status]")] = 0;
		}	
		else{
			$(this).removeClass("off").addClass("on");
			$(this).siblings(".icon").removeClass("folder_off").addClass("folder_on");
			$(this).parent("span").siblings("ul").css("display","block");
			$iStatus[$(this).index("#dir_tree i[status]")] = 1;
			$iStatus[$(this).siblings(".icon").index("#dir_tree i[status]")] = 1;
		}
		$.cookie("dir_tree",$iStatus.join(":"));
	})


})
