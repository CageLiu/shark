/*
 * ui operation for sharkcms
 * author shaman
 * last edit on 2011-08-09
 */

$(function(){
	//初始化界面
	if(window.localStorage){
		var _frames=window.localStorage,_status=new Array();
			_frames.setItem("status",JSON.stringify(_status));
	}else{
		alert("您的浏览器不支持本地存储！请使用火狐或者谷歌浏览器！")
	}
	var _wsp=$(".workspace"),
		_mc=$(".main_cont"),
		_taskbar=$(".taskbar"),
		cur_wpi=0; //全局当前工作区索引
	
	$("#left_nav a").click(function(){
		var wpi=cur_wpi,url=$(this).attr("href");
		if(url!="#"){
			open_iframe(wpi,url);
		}
		return false;
	})
	$(".switch_workspace span").click(function(){
		switch_wps();
		cur_wpi=$(this).index();
	})
	
	
	
	
	
	
	
	
	
	
	
	
	/*
	 * 打开新窗口
	 * @param wpi 当前所属的workspace区索引
	 * @param url 新窗口所打开页面的名称
	 */
	function open_iframe(wpi,url){
		if(!is_opening(url).is_open){
			var cur_mc=_mc.eq(wpi);
			cur_mc.find("iframe").hide();
			$("<iframe/>",{
				"id":url,
				"src":url,
			}).appendTo(cur_mc);
			creat_taskbar(wpi,url); //创建任务栏
			set_window_status(wpi,url); //设置新窗口的本地存储信息
		}else{
			console.log(is_opening(url).wpi)
		}
	}
	
	/*
	 * 设置新窗口的本地存储信息
	 * @param wpi 当前所属的workspace区索引
	 * @param url 新窗口所打开页面的名称
	 */
	function set_window_status(wpi,url){ 
		var _status=JSON.parse(_frames.status),
			new_frame={
				frame_name:url,
				wpi:wpi
			};
		_status.push(new_frame);
		_frames.setItem("status",JSON.stringify(_status));
		console.log(_frames.status);
	}
	
	/*
	 * 创建任务栏
	 * @param wpi 当前所属的workspace区索引
	 * @param url 新窗口所打开页面的名称
	 */
	function creat_taskbar(wpi,url){
		var taskbar=_taskbar.eq(wpi);
		taskbar.find("li").removeClass("current");
		$("<li/>",{
			"title":url,
			"class":"current",
			html:url+'<span title="关闭">x</span>',
			click:function(){
				var url=$(this).attr("title");
				alert(url)
			}
		}).appendTo(taskbar);
	}
	
	/*
	 * 判断当前页是否打开引
	 * @param url 需要判断的页面名称
	 * @return JSON, is_open为是否打开, wpi为打开所在工作区的索引
	 */
	function is_opening(url){
		var status=JSON.parse(_frames.status),
			open_info={
				is_open:false,
				wpi:null
			};
		if(status.length==0){
			return open_info;
		}else{
			for(var i=0;i<status.length;i++){
				if(url==status[i].frame_name){
					open_info.is_open=true;
					open_info.wpi=status[i].wpi;
					return open_info;
				}
			}
			return open_info;
		}
	}
	
	function switch_wps(){
		
	}
	
	/*
	 * 判断元素是否存在数组中
	 * @param elem 需要的元素的值
	 * @param arr 目标数组
	 * @return boolean
	 */
	function is_in_array(elem,arr){
		for(var i=0;i<arr.length;i++){
			if(elem==arr[i]){
				return true;
			}
		}
		return false;
	}
})