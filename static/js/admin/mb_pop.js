/* mb_pop方法
 * 1.弹出层页面 2.对话框
 * @param options 设置参数。 
 * ----参数使用说明：
 * ----属性名     属性说明               是否必须                       默认值  
 * ----title     弹出窗标题				否                          untitled
 * ----type      弹出类型  				否							alert
 * ----url       弹出窗加载的页面url     当类型为div或者iframe时为必须项   null   
 * ----data      弹出窗信息               否							no data
 * ----width     弹出窗宽度				否							300
 * ----height    弹出窗高度				否							150
 * ----allowmax   是否允许最大化			否							false(不允许)
 * ----button	 按钮参数					否							见button参数设置
 * button参数具体值设置:
 * ----disabled  是否不使用按钮			否							true(不使用)
 * ----custom	 自定义按钮				否							null
 * @param callback 回调函数
 * author:shaman
 */
if(!pop_ok)var pop_ok;
if(!pop_cannel)var pop_cannel;
function mb_pop(options,callback){
	if(typeof(options)!="object")return;
	var default_setting={  //默认设置
			title:"untitled",
			url:null,
			type:"alert",
			data:"no data",
			width:300,
			height:150,
			allowmax:false,
			button:{
				disabled:true,
				custom:null
			}
		}
	var opt=$.extend(default_setting,options), //扩展默认设置
		title=opt.title,
		url=opt.url,
		type=opt.type,
		data=opt.data,
		width=opt.width,
		height=opt.height,
		pop_bh=opt.button.disabled?36:66;
		allowmax=opt.allowmax;
		
	var parent=window.parent.length>0?window.parent.document:window.document;
		h=parent.documentElement.clientHeight,
		w=parent.documentElement.clientWidth,
		parent_doc=$(parent).find("body"),//父级窗口
	 	mask='<div class="mask_layer" style="position:fixed"></div>',//遮罩层
		resize_btn=allowmax?'<a class="fullscreen" href="#"></a>':'', //最大化窗口
		bottom_btn=opt.button.disabled?'':opt.button.custom!=null?
			'<div class="pop_bottom">'+opt.button.custom+'</div>':  //自定义按钮
			'<div class="pop_bottom"><a id="pop_btn_ok" class="pop_btn" href="javascript:"><span>确定</span></a>'+'<a id="pop_btn_cannel" class="pop_btn" href="javascript:"><span>取消</span></a></div>', //默认的连个按钮
		mb_pop_window='<div class="pop" style="position:fixed;width:'+width+'px;height:'+height+'px;top:'+(h-height)/2+'px;left:'+(w-width)/2+'px">'+
							'<div class="pop_title">'+
								'<h2 class="pop_hd">'+title+'</h2>'+
								'<span class="pr pop_button">'+resize_btn+'<a title="关闭" class="close" href="#"></a></span>'+
							'</div>'+
							'<div class="pop_cont">'+
								'<div class="pop_cont_c" style="height:'+(height-pop_bh)+'px;padding:0">'+
								'</div>'+
							'</div>'+
								bottom_btn+
						  '</div>';
	$(".pop",parent_doc).remove();
	$(".fullscreen",parent_doc).live("click",function(){
		var h=parent.documentElement.clientHeight,
			w=parent.documentElement.clientWidth;
		$(this).attr("class","nomarlscreen").parents(".pop").css({
			height:h-2,
			width:w-2,
			top:0,
			left:0,
			opacity:1,
			marginTop:0,
			marginLeft:0
		}).find(".pop_cont_c").css({height:h-pop_bh});
		window.parent.drop_pop();
	});
	$(".nomarlscreen",parent_doc).live("click",function(){
		var h=parent.documentElement.clientHeight,
			w=parent.documentElement.clientWidth;
		$(this).attr("class","fullscreen").parents(".pop").css({
			height:height,
			width:width,
			top:(h-height)/2,
			left:(w-width)/2
		}).find(".pop_cont_c").css({height:height-pop_bh});
		window.parent.drag_pop();
	});
	$(".close,#pop_btn_cannel",parent_doc).live("click",function(){
		$(this).parents(".pop").remove();
		$(".mask_layer",parent_doc).remove();
	});
	$(window).resize(function(){
		var h=parent.documentElement.clientHeight,
			w=parent.documentElement.clientWidth,
			pop_win=$(".pop",parent_doc);
		if(pop_win.find(".nomarlscreen").length>0){
			pop_win.css({
				height:h-2,
				width:w-2,
				top:0,
				left:0,
				opacity:1,
				marginTop:0,
				marginLeft:0
			}).find(".pop_cont_c").css({height:h-pop_bh});
		}else{
			pop_win.css({
				top:(h-height)/2,
				left:(w-width)/2
			})
		}
	});
	switch(type){
		case "alert":
			mb_pop_alert();
			break;
		case "div":
			mb_pop_div();
			break;
		case "iframe":
			mb_pop_iframe();
			break;
		default:
			alert("弹出层类型错误!");
			return;
	}
	
	function mb_pop_alert(){  //弹出类型 alert
		if(data==null)return;
		$(mask).appendTo(parent_doc);
		$(mb_pop_window).appendTo(parent_doc);
		$(".pop_cont_c",parent_doc).html(data);
		init();
		if(!!callback)callback();
	}

	function mb_pop_div(){  //弹出类型 div
		if(url==null)return;
		$(mb_pop_window).appendTo(parent_doc);
		init();
		$(".pop_cont_c",parent_doc).load(url,function(){
			$(this).removeClass("perloading");
			if(!!callback)callback();
		})
	}
	
	function mb_pop_iframe(){  //弹出类型 iframe
		if(url==null)return;
		$(mb_pop_window).appendTo(parent_doc);
		init();
		var pop_cont_c=$(".pop_cont_c",parent_doc);
		pop_cont_c.css({"overflow":"hidden"})
		$("<iframe/>",{
			src:url,
			class:"perloading",
			style:"border:0;width:100%;height:100%;overflow:auto",
			load:function(){
				$(this).removeClass("perloading");
				if(!!callback)callback();
			}
		}).appendTo(pop_cont_c);
	}
}
function init(){
	//window.parent.length>0?window.parent.drag_pop():drag_pop();
	if(window.parent.length>0){
		pop_ok=$("#pop_btn_ok",window.parent.document);
		pop_cannel=$("#pop_btn_cannel",window.parent.document);
		window.parent.drag_pop();
	}else{
		pop_ok=$("#pop_btn_ok");
		pop_cannel=$("#pop_btn_cannel");
		drag_pop();
	}
}
function drag_pop(){
	$(".pop").draggable({
		disabled:false,
		handle:".pop_title",
		containment:'document',
		opacity:0.7
	})
}
function drop_pop(){
	$(".pop").draggable({disabled:true})
}