/* mb_pop对象
 * 1.弹出层页面 2.对话框
 * @param options 设置参数。 默认类型为alert,此时data为必须项；类型为div和iframe时,url为必须项。
 * @param callback 回调函数
 * author:shaman
 */
function mb_pop(options,callback){
	if(typeof(options)!="object")return;

	var default_setting={  //默认设置
			title:"未命名标题",
			url:null,
			type:"alert",
			data:null,
			width:300,
			height:150
		}
	var opt=$.extend(default_setting,options), //扩展默认设置
		title=opt.title,
		url=opt.url,
		type=opt.type,
		data=opt.data,
		width=opt.width,
		height=opt.height;
		
	var parent=window.parent.document;
		h=parent.documentElement.clientHeight,
		w=parent.documentElement.clientWidth,
		parent_doc=$(parent).find("body"),//父级窗口
	 	mask='<div class="mask_layer"></div>',//遮罩层
	$(".pop",parent_doc).remove();
	$(".fullscreen",parent_doc).live("click",function(){
		$(this).attr("class","nomarlscreen").parents(".pop").css({
			height:h,
			width:w,
			top:0,
			left:0,
			marginTop:0,
			marginLeft:0
		}).find(".pop_cont_c").css({height:h-36});
		window.parent.drop_pop();
	});
	$(".nomarlscreen",parent_doc).live("click",function(){
		$(this).attr("class","fullscreen").parents(".pop").css({
			height:height,
			width:width,
			top:"50%",
			left:"50%",
			marginTop:-height/2,
			marginLeft:-width/2
		}).find(".pop_cont_c").css({height:height-36});
		window.parent.drag_pop();
	});
	$(".close",parent_doc).live("click",function(){
		$(this).parents(".pop").remove();
		$(".mask_layer",parent_doc).remove();
	});
	$(window).resize(function(){
		h=parent.documentElement.clientHeight,
		w=parent.documentElement.clientWidth;
		if($(".pop",parent_doc).find(".nomarlscreen").length>0){
			$(".pop",parent_doc).css({
				height:h,
				width:w,
				top:0,
				left:0,
				marginTop:0,
				marginLeft:0
			}).find(".pop_cont_c").css({height:h-36});
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
		var mb_pop_window='<div class="pop" style="width:'+width+'px;height:'+height+'px;margin-top:-'+height/2+'px;margin-left:-'+width/2+'px">'+
							'<div class="pop_title">'+
								'<h2 class="pop_hd">'+title+'</h2>'+
								'<span class="pr pop_button"><a title="关闭" class="close" href="#"></a></span>'+
							'</div>'+
							'<div class="pop_cont">'+
								'<div class="pop_cont_c" style="height:'+(height-56)+'px";padding:0>'+
								'</div>'+
							'</div>'+
						  '</div>';
		$(mb_pop_window).appendTo(parent_doc);
		$(".pop_cont_c",parent_doc).html(data);
		window.parent.drag_pop();
		callback();
	}

	function mb_pop_div(){  //弹出类型 div
		if(url==null)return;
		var mb_pop_window='<div class="pop" style="width:'+width+'px;height:'+height+'px;margin-top:-'+height/2+'px;margin-left:-'+width/2+'px">'+
							'<div class="pop_title">'+
								'<h2 class="pop_hd">'+title+'</h2>'+
								'<span class="pr pop_button"><a title="最大化" class="fullscreen" href="#"></a><a title="关闭" class="close" href="#"></a></span>'+
							'</div>'+
							'<div class="pop_cont">'+
								'<div class="pop_cont_c perloading" style="height:'+(height-36)+'px;padding:0">'+
								'</div>'+
							'</div>'+
						  '</div>';
		$(mb_pop_window).appendTo(parent_doc);
		window.parent.drag_pop();
		$(".pop_cont_c",parent_doc).load(url,function(){
			$(this).removeClass("perloading");
		})
	}
	
	function mb_pop_iframe(){  //弹出类型 iframe
		if(url==null)return;
		var mb_pop_window='<div class="pop" style="width:'+width+'px;height:'+height+'px;margin-top:-'+height/2+'px;margin-left:-'+width/2+'px">'+
							'<div class="pop_title">'+
								'<h2 class="pop_hd">'+title+'</h2>'+
								'<span class="pr pop_button"><a title="最大化" class="fullscreen" href="#"></a><a title="关闭" class="close" href="#"></a></span>'+
							'</div>'+
							'<div class="pop_cont">'+
								'<div class="pop_cont_c" style="height:'+(height-36)+'px;padding:0;overflow:hidden">'+
								'</div>'+
							'</div>'+
						  '</div>';
		$(mb_pop_window).appendTo(parent_doc);
		window.parent.drag_pop();
		$("<iframe/>",{
			src:url,
			class:"perloading",
			style:"border:0;width:100%;height:100%"
		}).appendTo($(".pop_cont_c",parent_doc))
	}
}