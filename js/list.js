var main={};
var oLoading = Query("#loading");
main.init = function(){//页面初始化

  var loading = new MF_Loading({
    LDpage:true,
    LDtween:true,
    LDup:function(v){
      Query(".load_txt").innerHTML = v+"%";
    },
    LDsuccess:function(){
        oLoading.style.display = "none";
        
    }
  });

  loading.add({type:"img",src:"images/icons.png"});
  loading.add({type:"img",src:"images/phone5.png"});
  loading.add({type:"img",src:"images/shelficon.png"});
  loading.add({type:"img",src:"images/icons2.png"});
  loading.add({type:"img",src:"images/icons3.png"});
  loading.add({type:"img",src:"images/cloud1.png"});
  loading.add({type:"img",src:"images/cloud2.png"});
  loading.add({type:"img",src:"images/cloud3.png"});
  loading.add({type:"img",src:"images/cloud4.png"});
  loading.add({type:"img",src:"images/cloud5.png"});
  loading.add({type:"img",src:"images/cloud6.png"});
  loading.add({type:"img",src:"images/sun1.png"});
  loading.add({type:"img",src:"images/sun2.png"});
  loading.add({type:"img",src:"images/money.png"});
  loading.add({type:"img",src:"images/bg1.jpg"});
  loading.add({type:"img",src:"images/bg3.jpg"});
  loading.add({type:"img",src:"images/bg4.jpg"});
  loading.add({type:"img",src:"images/work_app.jpg"});
  loading.add({type:"img",src:"images/work_banner.jpg"});
  loading.add({type:"img",src:"images/work_web.jpg"});
  loading.add({type:"img",src:"images/work_icon.jpg"});
  loading.add({type:"img",src:"images/mobileweb.jpg"});
  loading.add({type:"img",src:"images/shelf.jpg"});
 
  var imgs1=loading.add({type:"img",src:"images/sheets.png"});
  var imgs2=loading.add({type:"img",src:"images/sheets.jpg"});

  loading.addEventListener("complete",function(){
    main.events(); //调用配置事件
    main.text();//调用分布文字
   
   function fly(box){ //蝴蝶飞
    main.animateImg1=new MF_animateSprite({
        parents:document.getElementById(box),
        type:"canvas",
        width:200,
        height:133,
        imgList:imgs1,
        row:6,
        column:6,
        step:1,
        times:80,
        loop:true
    });
    main.animateImg1.play();
   }
   fly("animate1");
   fly("animate2");


     main.animateImg2 = new MF_animateSprite({
        parents:document.getElementById("new_word"),
        type:"canvas",
        width:183,
        height:184,
        imgList:imgs2,
        row:3,
        column:3,
        step:1,
        times:180,
        loop:true
    });
    main.animateImg2.play();









  });

  loading.start();//开始加载
};


//配置事件 
main.events = function(){

  //拉钩
  function getPos(obj){
      var l =0;
      var t =0;
      while(obj){
        l+= obj.offsetLeft;
        t+= obj.offsetTop;
        obj=obj.offsetParent;
      }
      return {left:l,top:t};
 }  
function getDirection(obj,oEvent){ 
  var x = oEvent.clientX - getPos(obj).left - obj.offsetWidth/2;
  var y = getPos(obj).top + obj.offsetHeight/2 - oEvent.clientY;
  return  Math.round((Math.atan2(y,x)*180/Math.PI + 180)/90)%4;
}

function cue(obj){
   obj.onmouseover = function(ev){
     var oEvent = ev || event;
     var oFrom = oEvent.fromElement || oEvent.relatedTarget;
     if(oFrom && obj.contains(oFrom)){return ;}
     var oSpan_c = this.getElementsByTagName('span')[0];
     var n = getDirection(this,oEvent);
     switch(n){
      case 0:
        oSpan_c.style.left = "-325px";
        oSpan_c.style.top  = "0";
        break;
      case 1:
        oSpan_c.style.left = "0";
        oSpan_c.style.top  = "325px";        
        break;
      case 2:
        oSpan_c.style.left = "325px";
        oSpan_c.style.top  = "0";
        break;
      case 3:
        oSpan_c.style.left = "0";
        oSpan_c.style.top  = "-325px";
        break;
     }
     move(oSpan_c,{left:0,top:0},{'duration':400,easing:Tween.Linear});
     };
      
 obj.onmouseout = function(ev){
        var oEvent = ev || event;
        var oTo = oEvent.toElement || oEvent.relatedTarget;
        if(oTo && obj.contains(oTo)){return ;}
        var oSpan_c = this.children[0];
        var n = getDirection(this,oEvent);
        switch(n){
          case 0:
            move(oSpan_c,{left:-325,top:0},{'duration':400,easing:Tween.Linear});
            break;
          case 1:
            move(oSpan_c,{left:0,top:325},{'duration':400,easing:Tween.Linear}); 
            break;
          case 2:
             move(oSpan_c,{left:325,top:0},{'duration':400,easing:Tween.Linear});
            break;
          case 3:
            move(oSpan_c,{left:0,top:-325},{'duration':400,easing:Tween.Linear});
            break;
        }
    };
}

 // 分步文字出现
 main.text = function (){
  var oText = document.getElementById('text');
  var str_T = "活在这个看脸的时代，但最终拼的还是实力，强大自己的技能才是王道！";
  for(var t = 0; t < str_T.length; t++){
    var oSpan_T = document.createElement("span");
    oSpan_T.innerHTML = str_T.charAt(t);
    oText.appendChild(oSpan_T);
  }
  var aSpan_T = oText.children;
  var t = 0;
  var timer_T = null;
  timer_T = setInterval(function(){
   move(aSpan_T[t],{opacity:1},{easing:Tween.Linear});
    t++;
    if(t == aSpan_T.length){
      clearInterval(timer_T);
      setTimeout(function(){
        oText.innerHTML = '';
      },3000);
    } 
  },200);
}
  //划入导航
  var iNow_page = 0;
  var oContainer = document.getElementById('container');
  var aPage = oContainer.getElementsByClassName('page');
  var oNav = document.getElementById('nav');
  var aNavLi = oNav.children;
  var oFixnav= document.getElementById('fixnav');
  var aFixnavLi = oFixnav.children;
  var aB = oFixnav.getElementsByTagName('b');
  var H = document.documentElement.clientHeight;
  var oNav_bg =document.getElementById('li_bg') ;
  for(var i=0;i<aNavLi.length;i++){
    aNavLi[i].onmouseover = function(){
        var L = this.offsetLeft;
        move(oNav_bg,{'left':L});
    };
  }

  //滚动
  addMouseWheel(document,function(down){
      if(down){
        iNow_page++;
        if(iNow_page>4){iNow_page = 4;}
          pageTab()
      }else{
        iNow_page--;
          if(iNow_page<0){iNow_page = 0;}
          pageTab();
      }
      //滚动时导航背景跟着走
     var oNav_L = aNavLi[iNow_page].offsetLeft;
     move(oNav_bg,{'left':oNav_L});

  });
for(var i=0;i<aNavLi.length;i++){
  aNavLi[i].index = i;
  aNavLi[i].onclick = function(){
     iNow_page = this.index;
     pageTab();
  };
  aFixnavLi[i].indexs = i;
  aFixnavLi[i].onclick = function(){
     iNow_page = this.indexs;
     pageTab();
  };

}
  function pageTab(){
     for(var i=0;i<aNavLi.length;i++){
      aNavLi[i].className = '';
      aFixnavLi[i].className = '';
      aB[i].className = '';
      aPage[i].className = 'page';
    }
      aNavLi[iNow_page].className = 'cur';
      aFixnavLi[iNow_page].className = 'cur';
      aB[iNow_page].className = 'cur';
      aPage[iNow_page].className = 'current page';
      move(oContainer,{top:-iNow_page*H},{easing:Tween.Quint.easeInOut})
  }
function addMouseWheel(obj,fn){
  if(window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
    obj.addEventListener("DOMMouseScroll",fnWheel,false); 
  } else {
    obj.onmousewheel = fnWheel;
  }
  function fnWheel(ev){
    var oEvent = ev || event;
    var down = true;
    if(oEvent.wheelDelta){
      down = oEvent.wheelDelta > 0 ? false : true;
    } else {
      down = oEvent.detail > 0 ? true : false;  
    }
    fn && fn(down);
    oEvent.preventDefault && oEvent.preventDefault();
    return false; 
  }
}

//点击 关门
var oLeft_men = document.getElementById('left_men');
var oRight_men = document.getElementById('right_men');
var oNew_word  = document.getElementById('new_word');
var sNew_wordL = document.documentElement.clientWidth/2 - oNew_word.offsetWidth/2;
var sNew_wordT = document.documentElement.clientHeight/2 - oNew_word.offsetHeight/2;

oNew_word.onclick = function(){
    move(oNew_word,{top:sNew_wordT,left:sNew_wordL},{duration:1000,easing:Tween.Linear});
    setTimeout(function(){
       move(oLeft_men,{width:1000},{duration:2000,easing:Tween.Linear});
       move(oRight_men,{width:1000},{duration:2000,easing:Tween.Linear});
         setTimeout(function(){
           window.location.href = 'new_word.html';
         },2000);
    },3000);
};

//鼠标放到旋转图标上出音乐
var oAnniu1 = document.getElementById('anniu1');
var aAnLi1 = oAnniu1.getElementsByTagName('li');
var oAnniu2 = document.getElementById('anniu2');
var aAnLi2 = oAnniu2.getElementsByTagName('li');
var aAudio = document.getElementsByTagName('audio');
for(var i=0;i<aAnLi1.length;i++){
     aAnLi1[i].index = i;
     aAnLi1[i].onmouseover =  function(){
        aAudio[this.index].load();
        aAudio[this.index].play();
     };
}
for(var i=0;i<aAnLi2.length;i++){
     aAnLi2[i].index = i;
     aAnLi2[i].onmouseover= function(){
        aAudio[this.index].load();
        aAudio[this.index].play();
     };
}

//间歇
var oJx = document.getElementById('jianxie');
oJx.innerHTML += oJx.innerHTML;
var now = 0;
setInterval(function(){
    now++;
    if(now == oJx.children.length){
       oJx.style.top = 0;
       now =0;
    }
   var iTarget = -oJx.children[0].offsetHeight*now;
   move(oJx,{'top':iTarget},{'duration':400,easing:Tween.Linear});
},1500);

 //无缝
  var oWf = document.getElementById("wufeng");
  var oUlWf  = oWf.children[0];
  oUlWf.innerHTML += oUlWf.innerHTML;

  oUlWf.style.width = parseInt(getStyle(oUlWf.children[0],'width')) * oUlWf.children.length + "px";
  var w =  parseInt(oUlWf.style.width)/2;
  var Bleft = 0;
  var timer1 =  setInterval(function(){
    Bleft -= 5;
    oUlWf.style.left = (Bleft%w-w)%w +"px"; 
    //oUlWf.style.left = Bleft%w +"px"; 
  },30);  

  oWf.onmouseover = function(){
    clearInterval(timer1);
  };
   oWf.onmouseout = function(){
     timer1 = setInterval(function(){
        Bleft -= 5;
        oUlWf.style.left = (Bleft%w-w)%w +"px"; 
      },30);  
  };

// 划入小图banner
var oCon = document.getElementById('con');
var oBg = document.getElementById('heian');
var oWork_con = oCon.children[0];
var aWork_conLi = oWork_con.children;
var oDatu = oCon.getElementsByClassName('work_datu'); 
var oCha = oCon.getElementsByClassName('close');

aWork_conLi[0].onclick = function(){
  window.open("XY.html","_blank");
  // window.location.href="XY.html";
};


for(var i=1;i<aWork_conLi.length;i++){
     aWork_conLi[i].index = i;
     aWork_conLi[i].onclick = function(){
      oDatu[this.index].style.display = 'block';
      oBg.style.display = 'block';
    };

    oCha[i].onclick = function(){
     this.parentNode.style.display = 'none';
     oBg.style.display = 'none';
   };
}

for(var i=0;i<aWork_conLi.length;i++){
   //点击关闭 
   
   var r=parseInt(Math.random()*256);
   var g=parseInt(Math.random()*256);
   var b=parseInt(Math.random()*256);
   oCha[i].style.backgroundColor  = 'rgb('+r+','+g+','+b+')';
  //划入小图banner 出提示信息
   cue(aWork_conLi[i]);
}

//手风琴
var oSfq = document.getElementById('shoufengqin');
var aDiv = oSfq.children ;
oSfq.style.width = 560 + 20*(aDiv.length - 1) + "px";

  for(var i = 0; i < aDiv.length; i++){
  var oSpan = document.createElement("span");
  oSpan.innerHTML = '第'+(i+1)+'个侧边栏';
  var r = parseInt(Math.random()*256);
  var g = parseInt(Math.random()*256);
  var b = parseInt(Math.random()*256);
 oSpan.style.background = "rgb("+r+","+g+","+b+")";
    aDiv[i].appendChild(oSpan);
}
for(var i=1;i<aDiv.length;i++){
  aDiv[i].style.left = 560 + (i-1)*20 +'px';
}

for(var i=0;i<aDiv.length;i++){
  (function(index){
  aDiv[i].onmouseover = function(){
     for(var i=0;i<aDiv.length;i++){
      if(i <= index){
         move(aDiv[i],{'left':20*i},{'duration':400,easing:Tween.Linear});
      }else{
         move(aDiv[i],{'left':560+20*(i-1)},{'duration':400,easing:Tween.Linear});
      }
     }    
    };
   })(i);
}

 //干蹦
var oPlay = document.getElementById('ganbeng');
var oPrev = oPlay.children[0];
var oNext = oPlay.children[1];
var aHead = oPlay.children[2].children;
var oUlGb = oPlay.children[3];
var aLi =  oUlGb.children;
var aImg =  oUlGb.getElementsByTagName('img');
var iNow =0;
var ready = true;
var timer = null;
oUlGb.innerHTML += oUlGb.innerHTML;
oUlGb.style.width =parseInt(getStyle(aLi[0],'width')) *aLi.length +'px';

var oMaoni = document.getElementById('maoni');
var oMaoniImg = oMaoni.getElementsByTagName('img')[0];
var oFF = true;
for(var i=0;i<aHead.length;i++){
   (function(index){
      aHead[i].onclick = function(){
          if(!oFF){return;}
          oFF = false;
           iNow = index;
           var ImgSrc = aImg[iNow].getAttribute('src');

           oMaoniImg.src = ImgSrc;
        for(var i=0;i<aHead.length;i++){
              aHead[i].className = '';
         }
        aHead[iNow].className = 'active';

         move(oMaoni,{'opacity':1},{'duration':500,easing:Tween.Linear,complete:function(){
             move(oUlGb,{'left':- parseInt(getStyle(aLi[0],'width'))*iNow},{'duration':100,easing:Tween.Linear,complete:function(){
               ready = true;
               if(iNow == aHead.length){
                oUlGb.style.left = 0;
                iNow =0;
               }
               if(iNow == 0){
                   iNow =aHead.length-1;
                   oUlGb.style.left = - oUlGb.offsetWidth/2+'px';
               }
             }});
            setTimeout(function(){
                move(oMaoni,{'opacity':0},{'duration':100,easing:Tween.Linear,complete:function(){
                    oFF = true;
                }});
            },100);
           
         }});
      };
   })(i);
}

oNext.onclick = function(){
   if(!ready){return;}
   ready = false;
   iNow++;
   tab();
};

oPrev.onclick = function(){
if(!ready){return;}
ready = false;

if(iNow == 0){
  iNow =aHead.length-1;
  oUlGb.style.left = - oUlGb.offsetWidth/2+'px';
 }else{
    iNow--;
 }
     tab();
  };

 timer = setInterval(function(){
      oNext.click();
  } , 2000);

 oPlay.onmouseover = function(){
    clearInterval(timer);
 };
 oPlay.onmouseout = function(){
   timer = setInterval(function(){
       oNext.click();
   } , 2000);
 };

 function tab(){
   for(var i=0;i<aHead.length;i++){
     aHead[i].className = '';
   }
   
   if(iNow == aHead.length){
    aHead[0].className = 'active';
   }else{
    aHead[iNow].className = 'active';
   }
   move(oUlGb,{'left':- parseInt(getStyle(aLi[0],'width'))*iNow},{'duration':500,easing:Tween.Linear,complete:function(){
    ready = true;
    if(iNow == aHead.length){
           oUlGb.style.left = 0;
           iNow =0;
         }
   }});
}

function getStyle(obj,name){ 
   return (obj.currentStyle || getComputedStyle(obj,null))[name];
}     

//硬币坠落
   var oMoney=document.getElementById("money");
   var oM_parent = oMoney.parentNode;
   var aFall=oMoney.getElementsByTagName('div');
   var aF_span=oMoney.getElementsByTagName('span');
     for(var i=0;i<aF_span.length;i++){
        (function(index){
         aF_span[i].onmouseover = function(){
             var _this = this;
             move(this,{"height":25},{complete:function(){
                 _this.onmouseover = null;
             }});
             fall(aFall[index]);
         };
        })(i);
     }

function fall(oDiv){
  var speedX=0;
  var speedY=8;
  //var i=0;
  clearInterval(timer_F);
  var timer_F=setInterval(function (){
    speedY+=3;
    var ll=oDiv.offsetLeft+speedX;
    var tt=oDiv.offsetTop+speedY;
    var mW = oM_parent.offsetWidth;
    var mH = oM_parent.offsetHeight;
    if(tt>=mH-oDiv.offsetHeight){
      speedY*=-0.8;
      speedX*=0.8;
      tt=mH-oDiv.offsetHeight;
    }
    else if(tt<=0){
      speedY*=-0.8;
      speedX*=0.8;
      tt=0;
    }
    if(ll>=mW-oDiv.offsetWidth){
      speedX*=-0.8;
      speedY*=0.8;
      ll=mW-oDiv.offsetWidth;
    }
    else if(ll<=0){
      speedX*=-0.8;
      speedY*=0.8;
      ll=0;
    }
    oDiv.style.left=ll+'px';
    oDiv.style.top=tt+'px';

    if(Math.abs(speedX)<1)
      speedX=0;
    if(Math.abs(speedY)<1)
      speedY=0;
    if(speedX==0 && speedY==0 && tt==mH-oDiv.offsetHeight){
      clearInterval(timer_F);
    }
  }, 30);

}


};//配置事件 


function Query(e){
  return document.querySelector(e);
}
function QueryAll(e){
  return document.querySelectorAll(e);
}

 main.init(); 
 