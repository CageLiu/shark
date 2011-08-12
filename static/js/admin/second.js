$(document).ready(function(){
	var $body = $("body");
	var $header = $("#header");
	var $curposit = $("#cur_posit");
	var $frame = $("#frame");

	$frame.css("height",$body.height() - 89 + "px");

	$(window).resize(function(){
		$frame.css("height",$body.height() - 89 + "px");
	});
});
