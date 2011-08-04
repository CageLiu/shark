$(document).ready(
	function(){
		var $t = $(".menu dt");
		$("i.hide").eq(0).css("display","block");
		$t.siblings("dd").eq(0).css("display","block");
		$t.click(function(){
			if($(this).next("dd").css("display") == "none"){
				$(this).next("dd").slideDown("speed");
				$(this).find("i.show").css("display","none");
				$(this).find("i.hide").css("display","block");
			}
			else{ 
				$(this).next("dd").slideUp("speed");
				$(this).find("i.show").css("display","block");
				$(this).find("i.hide").css("display","none");
			}
		});
		var $m = $(".menu dd li");
		$m.click(function()
			{
			$m.removeClass();
			$(this).addClass("current");
		});
		var $b = $(".toggle_btn");
		$b.toggle(function(){
			$("#page").css("margin-left","4px");
			$(".user").css("width",0);
		},
		function(){
			$("#page").css("margin-left","200px");
			$(".user").css("width","196px");
		}
		);

	/*
	 * demo page js start
	 */

	

	/*
	 * demo page js end
	 */
	}
);
