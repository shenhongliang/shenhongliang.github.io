
//create time:2015-12-22
//参数{LDpage,LDdom,LDtween,LDup,LDsuccess}
//对象加载状态0:未开始加载，1：加载完成，2：加载失败，3：加载失败结束加载

function EventDispatcher()
{
    var registorPool={};
    var registorPoolvision="1.0";
    var self=this;
    this.addEventListener=function(eventtype,fun) {
        if(!registorPool[eventtype]) {
            registorPool[eventtype]=new Array();
        }
		var arr=registorPool[eventtype];
		var isContain=false;
		for(var i=0;i<arr.length;i++)
		{
			if(arr[i]==fun)
			{
				isContain=true;
				break;
			}
		}
		
		
		if(!isContain && fun && typeof fun == 'function') registorPool[eventtype].push(fun);
		//console.log(registorPool[eventtype]);
		
    }
    this.dispatchEvent=function(event,fn)
    {
        if(registorPool[event.type]) {
            var arr=registorPool[event.type];
			var isMatch = false;
			
            for(var i=0;i<arr.length;i++) {
				event.target=self;
				if(fn && fn==arr[i]){
					isMatch = true;
				}
            }
			if(isMatch){
				 fn(event.data);
			}else if(fn && !isMatch){
				 alert("未先监听"+fn.getName()+"方法");
			}else{
				for(var i=0;i<arr.length;i++) {
					arr[i](event.data);
				}
			}
        }
    }
    this.removeEventListener=function(eventtype,fun) {
        if(registorPool[eventtype]) {
            var arr=registorPool[eventtype];
            for(var i=0;i<arr.length;i++) {
                if(arr[i]==fun) {
                    arr.splice(i,1);
                }
            }
        }
    }
}

function Event(type,data){
    this.type=type;
    this.data=data;
    this.target=null;
}

Function.prototype.getName = function(){
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}

//是否安卓
var isAndroid=(function(){
	return /(Android)/i.test(navigator.userAgent);
})();

//是否是dom对象
var isDom=function(e){
	if(typeof(e)=="object"&&e instanceof HTMLElement){
		return true;
	}
	return false;
};

//是否是JQdom对象
var isJQ=function(e){
	if(window.jQuery && typeof(e)=="object"&&e instanceof jQuery){
		return true;
	}
	return false;
};

//是否是加载dom对象
var isLdDom=function(e){
	if(typeof(e)=="object"&&e instanceof HTMLElement){
		var type=e.nodeName.toLowerCase();
		if(type=="img"||type=="video"||type=="audio"){
			return true;
		}
	}
	return false;
};

//是否是加载完成对象
var isLdCompleteList=function(e){
	if(typeof(e)=="object"&&"sort" in e){
		var _obj=e[0];
		if("src" in _obj&&"e" in _obj){
			return true;
		}
	}
	return false;
};

//获取dom类型
var getDomType=function(e){
	return e.nodeName.toLowerCase();
};

Array.prototype.getImgList=function(){
	var _imgList=[];
	for(val in this){
		var _obj=this[val];
		if("src" in _obj&&"e" in _obj)
		_imgList.push(_obj.e);
	}
	return _imgList;
};

var MF_Loading=(function(){

	function MF_Loading(p){
		EventDispatcher.call(this);
		
		function setDomList(domlist,type){
			var stack=[];
			for(var m=0; m<domlist.length; m++){
				var _src=domlist[m].getAttribute(_s.srcNames);
				if(_src){
					stack.push(_s.addLDstack({type:type,src:_src,e:domlist[m]}));
				}
			};
			return stack;
		};
		
		function setAddList(arry){
			var stack=[];
			for(var n=0; n<arry.length; n++){
				stack.push(_s.addLDstack(arry[n]));
			};
			return stack;
		};
		
		//获取dom所有加载对象
		function getDomList(o){
			var imglist=o.getElementsByTagName("img");
			var vdlist=o.getElementsByTagName("video");
			var adlist=o.getElementsByTagName("audio");
			var data1=setDomList(imglist,"img");
			var data2=setDomList(vdlist,"video");
			var data3=setDomList(adlist,"audio");
			return data1.concat(data2,data3);
		};
		
		//获取jq对象所有加载对象
		function getJqList(o,list){
			var data=[];
			var imglist=o.find("img");
			var vdlist=o.find("video");
			var adlist=o.find("audio");
			var data1=setDomList(imglist,"img");
			var data2=setDomList(vdlist,"video");
			var data3=setDomList(adlist,"audio");
			return data1.concat(data2,data3);
		};
		
		var _s=this;
		var addLoadObject=function(o){
			if(isDom(o)){
				if(isLdDom(o)){
					var type=getDomType(o);
					if(type=="img"||type=="video"||type=="audio"){
						return setDomList([o],type);
					}
				}else{
					return getDomList(o);
				}
			}else if(isJQ(o)){
				var type=getDomType(o[0]);
				if(type=="img"||type=="video"||type=="audio"){
					return setDomList(o,type);
				}else{
					return getJqList(o);
				}
			}else if(typeof o === 'object'){
				if(o.src&&o.type){
					return [_s.addLDstack(o)];
				}else if(typeof o.sort == 'function'){
					return setAddList(o);
				}
			}
		};
		var init=function(){//加载对象初始化
			
			for(var m=0; m<_s.list.length; m++){
				(function(){
					var n=m;
					var _LDobj=_s.list[n];
					_LDobj.status=0;
					_LDobj.count=0;
					if(_LDobj.type=="img"){//图片加载
						if(!_LDobj.e){
							_LDobj.e=new Image();
						};
						
						_LDobj.e.onload=function(){
								_LDobj.status=1;
								_s.removeLD(_LDobj);
							};
						
					}else if(_LDobj.type=="audio"||_LDobj.type=="video"){//音、视频加载
						if(!_LDobj.e){
							if(_LDobj.type=="audio"){
								_LDobj.e=document.createElement("audio");
							}else{
								_LDobj.e=document.createElement("video");
							}
						}
						
						if (!isAndroid||_LDobj.type!="video"){
							_LDobj.e.addEventListener("canplaythrough", function(){
								_LDobj.status=1;
								_s.removeLD(_LDobj);
							});
						}
					}

					_LDobj.load=function(){
						_LDobj.count++;
						_LDobj.e.src=_LDobj.src;
						if(_LDobj.type=="video"||_LDobj.type=="audio"){
							_LDobj.e.load();
						};
					};
					_LDobj.e.onerror=function(){
						if(_LDobj.count<_s.errorCount){
							_LDobj.status=2;
							_LDobj.load();
						}else{
							_LDobj.status=3;
							_s.removeLD(_LDobj);
						}
					};
					
				})();
			};
		};
		
		var upDate=function(val){
			if(_s.loadUp)
			_s.loadUp(val);		
			_s.dispatchEvent(new Event("update",val));
		};

		this.srcNames=p.srcNames?p.srcNames:"alts";
		this.loadUp=typeof(p.LDup)==="function"?p.LDup:null;
		this.callback=typeof(p.LDsuccess)==="function"?p.LDsuccess:null;//加载完成回调
		
		this.list=[];//需要加载列表
		this.suclist=[];//加载成功列表
		this.set=null;
		this.timers=30;
		this.length=null;
		this.errorCount=3;
		this.start=function(){//加载开始
			init();
			_s.length=_s.getLength();
			_s.loads();
			
			var	speed=0,
				up=function(){
					var LDprogress=parseInt(_s.suclist.length/_s.length*100);
					if(LDprogress<=100){
						if(p.LDtween&&speed<LDprogress){
							speed++;
						}else{
							speed=LDprogress;
						}
						
						//加载更新
						upDate(speed);
						
						//加载成功
						if(speed==100){
							clearInterval(_s.set);

							if(_s.callback)
							_s.callback();
							
							_s.dispatchEvent(new Event("complete",speed));
						}
					};
				};
			this.set=setInterval(up,_s.timers);
		};
		
		this.add=function(o){
			if(o){
				return addLoadObject(o);
			}
		};
		
		this.addLDstack=function(o){
			var isLD=_s.isLoad(o.e);
			if(isLD){
				return isLD;
			}else{
				var length=_s.list.push(o);
				return _s.list[length-1];
			}
		};
		
		this.addImgSheet=function(){//添加图片动画帧 参数imgPrefix,imgType,start,length,step
			var arg=arguments[0],
				_list=[];
			for(var i=arg.start; i<arg.length; i+=arg.step){
				_list.push({type:"img",src:arg.imgPrefix+(i<10?"0"+i:i)+"."+arg.imgType});
			};
			return setAddList(_list);
		};
		
		this.isLoad=function(e){//判断是否load
			for(var m=0; m<_s.list.length; m++){
				if(e&&_s.list[m].e==e){
					return _s.list[m];
				}
			}
			return false;
		};
		
		this.loads=function(){
			for(var m=0; m<_s.list.length; m++){
				_s.list[m].load();
				if (isAndroid&&_s.list[m].type=="video"){
					_s.list[m].status=1;
					_s.removeLD(_s.list[m]);
					m--;
				};
			}
		};
		
		this.getLength=function(){//获取加载长度
			return _s.list.length;
		};
		
		this.removeLD=function(o){//移除加载队列
			var n=0;
			while(n<_s.list.length){
				if(_s.list[n]==o){
					_s.suclist.push(o);
					_s.list.splice(n,1);
					break;
				}
				n++;
			};
		};
		
		this.main=function(){
			if(p.LDpage){//加载页面所有加载对象
				getDomList(document);
				return false;
			};
			
			if(p.LDdom){
				addLoadObject(p.LDdom);
			};
			
			upDate(0);
				
		};
		
		this.main();
		
	};
	return MF_Loading;
}());


//参数说明,parents:目标对象，type：播放类型；widht:宽，height:高，imgList：加载完成图片数组，step：播放序列帧步长，times：播放间隔时间,loop:循环播放boolean类型
var MF_animateImages=(function(){
	
	var rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
		fcamelCase = function( all, letter) {
			return letter.toUpperCase();
		},
		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
	
	function camelCase(string) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	}
	
	function vendorPropName( style, name ) {
		if ( name in style ) {
			return name;
		}
		var capName = name.charAt(0).toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}
	
		return origName;
	}
	
	var setOp=function(o,_v){
		if(o.runtimeStyle) { //ie
			if(typeof o.runtimeStyle["opacity"] === "undefined"){
				o.style.filter="alpha(opacity="+_v*100+")";
			}
			else{
				o.runtimeStyle["opacity"]=_v;
			}
		} else{
			o.style["opacity"]=_v;
		}
	};
	
	function animateImages(p){
		EventDispatcher.call(this);
		var self=this;
		if(p.imgList.length>0){
			this.width=p.width?p.width:p.imgList[0].width;//宽
			this.height=p.height?p.height:p.imgList[0].height;//高
		}
		if(isDom(p.parents))
		this.parents=p.parents;//显示对象
		else if(isJQ(p.parents))
		this.parents=p.parents[0];
		this.anmtList=p.imgList;//加载的图片数组
		this.type=p.type?p.type:"canvas";//播放类型
		this.step=p.step;//播放跳屏次数
		this.times=p.times;//播放时间
		this.ITV=null;
		this.startIndex=0;//起始帧数
		this.endIndex;//结束帧数
		this.progress=0;//播放进度
		this.loop=p.loop;//是否循环
		this.up=null;//播放更新
		this.drawImages=function(){};
		this.clear=function(){};//清空
		
		this.toProgress=function(n){//设置播放进度
			this.progress=n;
			this.drawImages(n);
		};
		
		this.setStart=function(n){//设置播放起始帧数
			self.startIndex=n;
			self.toProgress(n);
		};
		
		this.setEnd=function(n){//设置结束帧数
			if(n>self.length)
			self.endIndex=self.length
			else
			self.endIndex=n;
		};
		
		this.play=function(){//播放
			self.ITV=setInterval(function(){
				self.progress+=self.step;     
				if(self.progress>=self.endIndex)
					if(self.loop)
					self.progress=self.startIndex;
					else{
					self.stop();
					
					self.dispatchEvent(new Event("complete",self.progress));
					return;
				}
				
				self.toProgress(self.progress);
				self.dispatchEvent(new Event("update",self.progress));
				self.dispatchEvent(new Event(self.progress,self.progress));

			},self.times);
		};
		
		this.stopActivity=function(){
			if(self.ITV){
				clearInterval(self.ITV);
				self.ITV=null;
			}
		};
		
		this.pause=function(){//暂停
			self.stopActivity();
		};
		
		this.stop=function(){//停止
			self.stopActivity();
			self.progress=self.startIndex;
		};
		
		this.creatElment=function(name){
			return document.createElement(name);
		}
		
		this.setCssObj=function(o,jsons){
			for(name in jsons){
				self.css(o,name,jsons[name]);
			}
		};
		
		this.css=function(obj,_s,_v){
			
			if(typeof _s==="undefined"||!_s)
			return false;
			
			if(typeof _s==="object"){
				self.setCssObj(obj,_s);
				return false;
			};
			
			var origName = camelCase(_s);
			var style = obj.style;
			var name = vendorPropName( style, origName );
			
			if(name == "opacity"){
				setOp(obj,_v);
				return ;
			}
			
			if(typeof _v==="undefined"){
				if(obj.style[name]!=""){
					return obj.style[name];
				}else if(window.getComputedStyle){
					return window.getComputedStyle(obj , null)[name];
				}else if(obj.currentStyle){
					return obj.currentStyle[name];
				}else{
					return "auto";
				}
			}else{
				if(obj.runtimeStyle) { //ie
					obj.runtimeStyle[name]=_v;
				} else{
					obj.style[name]=_v;
				}
			}
		}
		
		this.remove=function(){
			while(self.parents.hasChildNodes()){
				self.parents.removeChild(self.parents.firstChild);
			}
		};

	}
	
	return animateImages;

})();


function MF_animateSheet(p){
	if(isLdCompleteList(p.imgList)){
		p.imgList=p.imgList.getImgList();
	}else{
		p.imgList=[];
	}
	this.length=p.imgList.length;
	MF_animateImages.call(this,p);
	var self=this;
	if(self.type=="canvas"){
		this.canvas=self.creatElment("canvas");
		this.canvas.width=this.width;
		this.canvas.height=this.height;
		this.parents.appendChild(this.canvas);
		var ctx=self.canvas.getContext("2d");
		this.drawImages=function(n){
			self.clear();
			ctx.drawImage(self.anmtList[n],0,0);
		};
		this.clear=function(){
			ctx.clearRect(0,0,self.width,self.height);
		};
	}else if(self.type=="img"){
		this.drawImages=function(n){
			self.clear();
			self.parents.appendChild(self.anmtList[n]);
		};
		this.clear=function(){
			while(self.parents.hasChildNodes()){
				self.parents.removeChild(self.parents.firstChild);
			}
		};
	}
	
	this.main=function(){
		self.endIndex=self.length;
		self.toProgress(self.progress);
	};
		
	this.main();
}
//参数：row：行数，column：列数；
function MF_animateSprite(p){
	
	if(isDom(p.imgList)){
		p.imgList=[p.imgList];
	}else if(isLdCompleteList(p.imgList)){
		p.imgList=p.imgList.getImgList();
	}else if(!isJQ(p.imgList)){
		p.imgList=[];
	}
	this.length=p.row*p.column;
	MF_animateImages.call(this,p);
	var self=this;
	var _img=self.anmtList[0];
	this.getPosition=function(n){
		return {
			x:-(n%p.column*self.width),
			y:-(parseInt(n/p.column)*self.height)
		};
	};
	if(self.type=="canvas"){
		this.remove();
		this.canvas=self.creatElment("canvas");
		this.canvas.width=this.width;
		this.canvas.height=this.height;
		this.parents.appendChild(this.canvas);
		var ctx=self.canvas.getContext("2d");
		var imgW=_img.width;
		var imgH=_img.height;
		this.drawImages=function(n){
			self.clear();
			var _position=self.getPosition(n);
			ctx.drawImage(_img,_position.x,_position.y,imgW,imgH);
		};
		this.clear=function(){
			ctx.clearRect(0,0,self.width,self.height);
		};
	}else if(self.type=="img"){
		var box=self.creatElment("div");
		self.css(box,{position:"absolute",top:0,left:0,width:self.width+"px",height:self.height+"px",overflow:"hidden"});
		self.parents.appendChild(box);
		box.appendChild(_img);
		self.css(_img,{position:"absolute",top:0,left:0});
		this.drawImages=function(n){
			var _position=self.getPosition(n);
			self.css(_img,{top:_position.y+"px",left:_position.x+"px"});
		};
		this.clear=function(){
			while(self.parents.hasChildNodes()){
				self.parents.removeChild(self.parents.firstChild);
			}
		};
	}
	this.main=function(){
		self.endIndex=self.length;
		self.toProgress(self.progress);
	};
	
	this.main();
}

