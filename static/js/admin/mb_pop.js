/* mb_pop对象
 * 1.弹出层页面 2.对话框
 * @param options
 * @param callback 回调函数
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
	 	mask='<div class="mask_layer"></div>';//遮罩层
	$(".pop",parent_doc).remove();
	
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
		var mb_pop_window='<div class="pop" style="width:'+width+'px;height:'+height+'px;margin-top:-'+height/2+'px;margin-left:-'+width/2+'px">'+
							'<div class="pop_title">'+
								'<h2 class="pop_hd">'+title+'</h2>'+
								'<span class="pr pop_button"><a title="关闭" class="close" href="#"></a></span>'+
							'</div>'+
							'<div class="pop_cont">'+
								'<div class="pop_cont_c" style="height:'+(height-36)+'px">'+
								'</div>'+
							'</div>'+
						  '</div>';
		if(typeof(data)=="string"){
			$(mb_pop_window).appendTo(parent_doc);
			$(".pop_cont_c",parent_doc).html(data);
			callback();
		}
	}

	function mb_pop_div(){  //弹出类型 div
		if(url==null)return;
		$(mask).addClass("perloading").appendTo(parent_doc);
		var mb_pop_window='<div class="pop" style="display:none;height:'+(h-200)+'px;margin-top:-'+(h-200)/2+'px">'+
							'<div class="pop_title">'+
								'<h2 class="pop_hd">'+title+'</h2>'+
								'<span class="pr pop_button"><a title="全屏" class="fullscreen" href="#"></a><a title="最小化" class="min" href="#"></a><a title="最大化" class="max" href="#"></a><a title="关闭" class="close" href="#"></a></span>'+
							'</div>'+
							'<div class="pop_cont">'+
								'<div class="pop_cont_c" style="height:'+(h-256)+'px;overflow-y:auto;overflow-x:hidden">'+
								'</div>'+
							'</div>'+
						  '</div>';
		$(mb_pop_window).appendTo(parent_doc);
		$(".pop_cont_c",parent_doc).load(url,function(){
			var w=$(this).find("#wrap").outerWidth();
			$(".mask_layer",parent_doc).removeClass("perloading");
			$(".pop",parent_doc).css({"margin-left":-(w+35)/2}).delay(200).fadeIn(300);
		})
	}
	
	function mb_pop_iframe(){  //弹出类型 iframe
		if(url==null)return;
		var mb_pop_window='<div class="pop" style="width:'+width+'px;height:'+height+'px;margin-top:-'+height/2+'px;margin-left:-'+width/2+'px">'+
							'<div class="pop_title">'+
								'<h2 class="pop_hd">'+title+'</h2>'+
								'<span class="pr pop_button"><a title="全屏" class="fullscreen" href="#"></a><a title="最小化" class="min" href="#"></a><a title="最大化" class="max" href="#"></a><a title="关闭" class="close" href="#"></a></span>'+
							'</div>'+
							'<div class="pop_cont">'+
								'<div class="pop_cont_c" style="height:'+(height-56)+'px">'+
								'</div>'+
							'</div>'+
						  '</div>';
		$(mb_pop_window).appendTo(parent_doc);
		$("<iframe/>",{
			src:url,
			style:"border:0;width:100%;height:100%"
		}).appendTo($(".pop_cont_c",parent_doc))
	}
}