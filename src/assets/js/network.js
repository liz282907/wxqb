var $ = require("jquery");
var d3 = require("d3");

/*
Create By JiangJun.
2016.7.14
*/

/*undo right click*/
document.oncontextmenu = function(){
	return false;
}
	

/*network Class*/
var network = function(options){
	var _container = options.container;
	$(_container).empty();
	var _width = $(_container).width();
	var _height = $(_container).height();
	var _center = [_width/2,_height/2];
	var _data = options.d;
	
	var _nodeNum = 0;
	
	var _svg = d3.select(_container).append("svg")
				.attr("width",_width)
				.attr("height",_height);
				
	var _net_g = _svg.append("g");

	var tooltip = d3.select("body").append("div")
			.attr("class","tooltip")
			.style("opacity",0.0);
	
	var _nodeClick = function(e){
		var _xy = d3.select(e).attr("xy").split(",");
		var _r = 100;

		if(d3.select(e).attr("isShow") == "1"){
			var _target = FindTarget(d3.select(e).attr("id"));
			if(_target){
				var _angle = 360/_target[1].length;

				for(var i=0;i<_target[1].length;i++){
					move("#" + _target[0][i],CaculateXY(_xy,_angle*i,_r));		
					$("#" + _target[0][i]).show();
				}
			}

			d3.selectAll(".link")
				.filter(function(){
					if(($("#" + d3.select(this).attr("source")).is(":hidden") != "none") && ($("#" + d3.select(this).attr("target")).css("display") != "none")){
						$(this).show();
					}else{

					}
				});	
		}else{
			$.ajax({
				url:"/wxqb/search/searchAsso",
				type:"get",
				datatype:'json',
				data:{
					id:e.__data__.id
				},
				success:function(d){
					var _data = d;
			
					var _nodeOptionsTemp = {
						g:_net_g,
						clickFunction:_nodeClick,
						hideFunction:_nodeHide,
					};
					_nodeOptionsTemp.id = d3.select(e).attr("id");
					_nodeOptionsTemp.d = e.__data__;
					_nodeOptionsTemp.xy = _xy;
								
					var _angle = 360/_data.length;
					
					if(_data.length < 1){
						alert("no data!");
						return;
					}
					
					for(var i=0;i<_data.length;i++){
						var exist_num = 0;
						var tempId = findSame(_data[i].id);
						if(tempId != ""){
							_nodeOptions.id = tempId;
							_nodeOptions.d = _data[i];
							_nodeOptions.xy = d3.select("#"+tempId).attr("xy").split(",");	

							_linkOptions.xy = [d3.select("#"+tempId).attr("xy").split(","),_xy];
							_linkOptions.source = tempId;
							_linkOptions.target = d3.select(e).attr("id");

							new nodeLink(_linkOptions);

							if(d3.select("#"+tempId).length != 0)
								d3.select("#"+tempId).remove();
							new node(_nodeOptions);

							exist_num++;
						}else{
							_nodeOptions.id = "node" + (_nodeNum + i + 1 - exist_num);
							_nodeOptions.d = _data[i];
							_nodeOptions.xy = CaculateXY(_xy,_angle*i,_r);
							
							_linkOptions.xy = [_xy,_nodeOptions.xy];
							_linkOptions.source = d3.select(e).attr("id");
							_linkOptions.target = "node"+(_nodeNum + i + 1);

							new nodeLink(_linkOptions);
							new node(_nodeOptions);
						}						
					}
					_nodeNum = _nodeNum + i - exist_num;
					e.remove();
					new node(_nodeOptionsTemp).attr("isShow",1);
				},
				error:function(e){
					console.log(e);
				}
			});
		}
	}
	
	var _nodeHide = function(e){
		if(d3.select(e).attr("isShow") != "1"){
			return ;
		}

		var _node = d3.select(e).attr("id");
		var _target = FindTarget(_node);
		
		if(_target)
			_hide(_target);
		
		function _hide(_target){
			for(var i=0;i<_target[1].length;i++){
				var temp_target = FindTarget(_target[0][i]);
				if(temp_target != null)
					_hide(temp_target);

				$(_target[1][i]).hide();
				if(FindSource(_target[0][i]).length == 0){
					$("#" + _target[0][i]).hide();					
				}		
			}			
		}		
	}
	
	var _nodeOptions = {
		g:_net_g,
		clickFunction:_nodeClick,
		hideFunction:_nodeHide,
		d:_data,
		xy:_center,
		id:"node"+_nodeNum
	};
	var _linkOptions = {
		g:_net_g
	};
	new node(_nodeOptions);
	
	function CaculateXY(xy,angle,r){
		var _temp = [];
		_temp[0] = parseFloat(xy[0]) + Math.sin(2*Math.PI / 360 * angle) * r;
		_temp[1] = parseFloat(xy[1]) + Math.cos(2*Math.PI / 360 * angle) * r;		
		return _temp;
	}

	/*node Class*/
	function node(options){
		var _g = options.g;
		var _data = options.d;
		var _class = _data.nodeClass;
		var _id = options.id;
		var _xy = options.xy;
		
		var _nodeClick = options.clickFunction;
		var _nodeHide = options.hideFunction;

		var color_gray = radius_color(_g,"color_gray",{beginColor:"gray",endColor:"white"});
		var color_green = radius_color(_g,"color_green",{beginColor:"green",endColor:"white"});
		var color_blue = radius_color(_g,"color_blue",{beginColor:"#426ab3",endColor:"white"});
		var color_yellow = radius_color(_g,"color_yellow",{beginColor:"#fcaf17",endColor:"white"});
		var color_red = radius_color(_g,"color_red",{beginColor:"red",endColor:"white"});
		
		var addDiv = function(e){
			if(d3.event.which == 3){
				if($("#network_tip").length > 0)
					$("#network_tip").remove();
				
				var _x = d3.event.clientX;
				var _y = d3.event.clientY;
				
				var _tip = $('<div id="network_tip" style="position:fixed;width:100px;"></div>');
				_tip.append('<div id="network_tip1" class="network_tip" style="width:100%;height:30px;border:1px solid black">展开</div>');
				_tip.append('<div id="network_tip2" class="network_tip" style="width:100%;height:30px;border:1px solid black">隐藏</div>');

				$("body").append(_tip);
				_tip.css("top",_y);
				_tip.css("left",_x);
				
				d3.select("#network_tip1").on("click",function(){
					return _nodeClick(e);
				});
				d3.select("#network_tip2").on("click",function(){
					return _nodeHide(e);
				});
				
				document.onclick = function(){
					$(_tip).remove();
					document.onclick = function(){
						
					}
				}
			}
		}
		
		var _drag = d3.drag()  
					.on("drag", function(e){
						if(d3.event.sourceEvent.which == 3)
							return;
						_nodeHide("#"+d3.select(this).attr("id"));
						move(this,[d3.event.x,d3.event.y]);
					});
		
		var _node = _g.append("circle")
					.datum(_data)
					.attr("class","node")
					.attr("id",_id)
					.attr("cx",_xy[0])
					.attr("cy",_xy[1])
					.attr("r",10)
					.attr("fill",function(d){
						return colorClass(d);
					})
					.attr("xy",_xy)
					.attr("opacity",1)
					.on("mousedown",function(){
						addDiv(this);
					})
					.on("mouseover",function(d){
						tooltip
							.style("left", (d3.event.pageX) + "px")
							.style("top", (d3.event.pageY + 20) + "px")
							.style("opacity",1.0);
						
						tooltip.text(d.name);

						var _node = d3.select(this).attr("id");
						toInitSource("",_node,"red");					
						d3.select(this)
							.attr("fill","url(#"+color_red.attr("id")+")");					
					})
					.on("mouseout",function(){
						tooltip.style("opacity",0.0)
							.style("left", -100 + "px")
							.style("top", -100 + "px");

						d3.selectAll(".link")
							.attr("flag",false);	
						var _node = d3.select(this).attr("id");
						toInitSource("",_node,"steelblue");					
						d3.select(this)
							.attr("fill",function(d){
								return colorClass(d);
							});
						d3.selectAll(".link")
							.attr("flag",false);
					})
					.call(_drag);

		function toInitSource(init_node,_node,color){
			var tempResult = FindSource(_node);
			init_node = _node;
			for(var i = 0;i<tempResult.length;i++){
				if(tempResult[i][0] != init_node){
					var _source = tempResult[i][0];
					var _link = tempResult[i][1];
					
					// d3.select("#" + _source)
					// 	.attr("fill","red");
					d3.select(_link)
						.attr("stroke",color);
						// .attr("stroke-width",5);
					_node = _source;
					toInitSource(init_node,_node,color);
				}
			}								
		}

		function colorClass(d){
			if(d.nodeClass == "IP"){
				return "url(#"+color_green.attr("id")+")"
			}			
			else if(d.nodeClass == "URL")
				return "url(#"+color_blue.attr("id")+")"
			else if(d.nodeClass == "DNS")
				return "url(#"+color_yellow.attr("id")+")"
			else if(d.nodeClass == "MD5")
				return "url(#"+color_gray.attr("id")+")"
		}
					
		return _node;
	}

	/*link Class*/
	function nodeLink(options){
		var _g = options.g;
		var _sourceXY = options.xy[0];
		var _targetXY = options.xy[1];
		var _source = options.source;
		var _target = options.target;
		
		var _link = _g.append("line")
					.attr("class","link")
					.attr("stroke","steelblue")
					.attr("source",_source)
					.attr("target",_target)
					.attr("x1",_sourceXY[0])
					.attr("y1",_sourceXY[1])
					.attr("x2",_targetXY[0])
					.attr("y2",_targetXY[1]);
					
		return _link;	
	}
}

function FindSource(target){
	var source = [];
	d3.selectAll(".link")
		.filter(function(){
			if(d3.select(this).attr("flag") != "true" && d3.select(this).attr("target") == target){
				var temp = [];
				temp[0] = d3.select(this).attr("source");
				temp[1] = this;
				source.push(temp);
				return true;
			}else
				return false;
		})
		.attr("flag",true);
	return source;
}

function FindTarget(source){
	var target = null;
	d3.selectAll(".link")
		.filter(function(){
			if(d3.select(this).attr("flag") != "true" && d3.select(this).attr("source") == source){
				if(target == null){
					target = [];
					target[0] = [];
					target[1] = [];
				}
								
				target[0].push(d3.select(this).attr("target"));
				target[1].push(this);
				return true;
			}else
				return false;
		})
		.attr("flag",true);
	return target;
}

function radius_color(c,id,options={}){
	var defs = c.append("defs");  
	
	var radiaGradient = defs.append("radialGradient")  
							.attr("id",id)  
							.attr("x1",options.x1 || "0%")  
							.attr("y1",options.y1 || "0%")  
							.attr("x2",options.x2 || "100%")  
							.attr("y2",options.y2 || "0%");  
	
	var stop1 = radiaGradient.append("stop")  
					.attr("offset","30%")  
					.style("stop-color",options.beginColor || "red");  
	
	var stop2 = radiaGradient.append("stop")  
					.attr("offset","100%")  
					.style("stop-color",options.endColor || "green");

	return radiaGradient;
}

function move(el,xy){
	var _temp = d3.select(el).attr("id");
		
	d3.select(el)
		.attr("cx",xy[0])
		.attr("cy",xy[1])
		.attr("xy",xy);
	d3.selectAll(".link")
		.filter(function(){
			if(d3.select(this).attr("source") == _temp)
				return true;
			else
				return false;
		})
		.attr("x1",xy[0])
		.attr("y1",xy[1]);
	d3.selectAll(".link")
		.filter(function(){
			if(d3.select(this).attr("target") == _temp)
				return true;
			else
				return false;
		})
		.attr("x2",xy[0])
		.attr("y2",xy[1]);
}

function findSame(node){
	var flag = "";
	d3.selectAll(".node")
		.filter(function(d){
			if(d.id == node){
				flag = d3.select(this).attr("id");
				return true;
			}				
			else
				return false;
		});
		
	return flag;
}

export {network};