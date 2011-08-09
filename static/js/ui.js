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
		cur_wpi=$(this).index();
	})
	
	$(".close_frame").live(  //删除窗口
		"click",function(e){
			if(e && e.stopPropagation){
			  e.stopPropagation();
			}
			var url=$(this).parent().attr("title");
			$("iframe[id='"+url+"']").remove();
			$(this).parent().remove();
			del_window_status(url);
		}
	)
	
	

	
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
			var wpi=is_opening(url).wpi;
			switch_wps(wpi);
			_wsp.eq(wpi).find("iframe").hide();
			$("iframe[id='"+url+"']").show();
			_taskbar.eq(wpi).find("li").removeClass("current");
			_taskbar.eq(wpi).find("li[title='"+url+"']").addClass("current");
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
		//console.log(_frames.status);
	}
	
	/*
	 * 删除窗口的本地存储信息
	 * @param url 窗口所打开页面的名称
	 */
	function del_window_status(url){
		var _status=del_elem(url,JSON.parse(_frames.status));
		_frames.setItem("status",JSON.stringify(_status));
		console.log(JSON.parse(_frames.status));
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
			html:url+'<span class="close_frame" title="关闭">x</span>',
			click:function(){
				var url=$(this).attr("title");
				_wsp.eq(wpi).find("iframe").hide();
				$("iframe[id='"+url+"']").show();
				_taskbar.find("li").removeClass("current");
				_taskbar.eq(wpi).find("li[title='"+url+"']").addClass("current");
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
	
	/*
	 * 切换工作区
	 * @param index 需要的切换工作区的索引值
	 */
	function switch_wps(index){
		var wsp_Height = _wsp.height();
		_wsp.eq(0).stop().animate({"margin-top":-index * wsp_Height},{duration:"speed",easing:"swing"});
		_wsp.css("visibility","hidden").eq(index).css("visibility","visible");
		cur_wpi=index;
	}
	
	/*
	 * 判断元素是否存在数组中
	 * @param elem 需要的元素的值
	 * @param arr 目标数组
	 * @return boolean
	 */
	function is_in_array(elem,arr){
		$.each(arr,function(i,_elem){
			if(elem==_elem){
				return true;
			}
		})
		return false;
	}
	
	/*
	 * 删除数组中某个元素
	 * @param elem 需要删除的元素的值
	 * @param arr 目标数组
	 * @return Array 返回一个新的数组,如果删除元素不在目标数组中则返回目标数组
	 */
	 function del_elem(elem,arr){
	 	var tempa=[];
		$.each(arr,function(i,_item){
			if(typeof(_item)=="object"){
				if(elem!=_item.frame_name)tempa.push(_item);
			}else{
				if(elem!=_item)tempa.push(_item);
			}
		})
		return tempa;
	 }
})