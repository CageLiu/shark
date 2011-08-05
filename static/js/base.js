$(document).ready(
	function(){

		if($.browser.msie){
			document.write("<div style='font-size:30px;color:#f00;line-height:15em;font-weight:bold;text-align:center'>用IE，要枪毙！</div>");
		}



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
	var $mOnff = $(".menu_onff");
	var $mainMenu = $(".main_menu");
	var $menuBox = $(".main_menu dl");
	var $workspace = $(".workspace");
	var $userBox = $(".user");
	var $mainCont = $(".main_cont");
	var $panle = $(".panle");

	
	$menuBox.css("height",$mainMenu.height() - $userBox.outerHeight() + "px");
	$mainCont.css("height",$workspace.height()-$panle.outerHeight()*2 + "px");
	$(window).resize(
		function(){
			$menuBox.css("height",$mainMenu.height() - $userBox.outerHeight() + "px");
			$mainCont.css("height",$workspace.height()-$panle.outerHeight()*2 + "px");
		}
	);

		$mOnff.toggle(
		function(){
			$mainMenu.stop().animate({"left":0},{duration:"fast",easing:"linear"});
			$workspace.stop().animate({"marginLeft":"200px"},{duration:"fast",easing:"linear"});

		},
		function(){
			$mainMenu.stop().animate({"left":"-195px"},{duration:"fast",easing:"linear"});
			$workspace.stop().animate({"marginLeft":"5px"},{duration:"fast",easing:"linear"});
		}
	);

	/*
	 * demo page js end
	 */
	}
);
