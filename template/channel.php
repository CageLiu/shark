<?php
	$login_info=array(); //登录信息 
	$channel_list=array(); //频道列表
	if($_POST["name"]=="admin" && $_POST["pwd"]=="abc123"){
		$login_info[0]=1;
	}else{
		$login_info[0]=0;
	}
	
	if($login_info[0]){
		$channel_list[0]=array("channel_name"=>"财经频道","url"=>"third.html","icon"=>"cj.png");
		$channel_list[1]=array("channel_name"=>"理财频道","url"=>"third.html","icon"=>"lc.png");
		$channel_list[2]=array("channel_name"=>"行情资讯","url"=>"third.html","icon"=>"hq.png");
		$channel_list[3]=array("channel_name"=>"股票频道","url"=>"third.html","icon"=>"gp.png");
		$channel_list[4]=array("channel_name"=>"期货频道","url"=>"third.html","icon"=>"qh.png");
		$channel_list[5]=array("channel_name"=>"基金频道","url"=>"third.html","icon"=>"jj.png");
		$channel_list[6]=array("channel_name"=>"新闻源","url"=>"third.html","icon"=>"xw.png");
		$channel_list[7]=array("channel_name"=>"视讯中心","url"=>"third.html","icon"=>"sx.png");
		$login_info[1]=$channel_list;
	}
	
	echo json_encode($login_info);
/*[
	{
		channel_name:"财经频道",
		url:"third.html"
	},
	{
		channel_name:"理财频道",
		url:"third.html"
	},
	{
		channel_name:"行情资讯",
		url:"third.html"
	},
	{
		channel_name:"股票频道",
		url:"third.html"
	},
	{
		channel_name:"期货频道",
		url:"third.html"
	},
	{
		channel_name:"基金频道",
		url:"third.html"
	},
	{
		channel_name:"新闻源",
		url:"third.html"
	},
	{
		channel_name:"视讯中心",
		url:"third.html"
	}
]*/
?>