var main={};
var oNew_words = Query("#new_words");
var oLeft_men =  Query('#left_men');
var oRight_men = Query('#right_men');
var oLoading = Query("#loading");
main.init = function(){//页面初始化
  var load = new MF_Loading({
    LDpage:false,
    LDtween:false,
    LDsuccess:function(){
       main.loading_page(); 
    }
  });

  var imgs2=load.add({type:"img",src:"images/sheets.jpg"});

  load.addEventListener("complete",function(){
     main.animateImg2 = new MF_animateSprite({//拼图神器
        parents:document.getElementById("new_words"),
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

  load.start();//开始加载
};

    
    
main.loading_page = function(){
  var loading = new MF_Loading({
    LDpage:true,
    LDtween:true,
    LDup:function(v){
      Query(".load_txt").innerHTML = v+"%";
    },
    LDsuccess:function(){
          main.animateImg2.stop();
          Query(".new_txt").style.display = "none";
          move(oLeft_men,{width:0},{duration:2000,easing:Tween.Linear});
          move(oRight_men,{width:0},{duration:2000,easing:Tween.Linear,complete:function(){
            oLoading.style.display = "none";
            main.Listshow();//九宫格出现
          }});
    }
  });

    loading.add({type:"img",src:"images/clock_box.png"});
    loading.add({type:"img",src:"images/sechand.png"});
    loading.add({type:"img",src:"images/Basketball.png"});
    loading.add({type:"img",src:"images/icons.png"});
    loading.add({type:"img",src:"images/clock_bg.jpg"});
    loading.add({type:"img",src:"images/list1.jpg"});
    loading.add({type:"img",src:"images/list2.jpg"});
    loading.add({type:"img",src:"images/list3.jpg"});
    loading.add({type:"img",src:"images/list4.jpg"});
    loading.add({type:"img",src:"images/list5.jpg"});
    loading.add({type:"img",src:"images/list7.jpg"});
    loading.add({type:"img",src:"images/list8.jpg"});
    loading.add({type:"img",src:"images/list9.jpg"});
    loading.add({type:"img",src:"images/piano.jpg"});
    loading.add({type:"img",src:"images/icon/icon_bg.jpg"});
    var list1=loading.addImgSheet({imgPrefix:"images/1/",imgType:"jpg",start:1,length:55,step:1});

  loading.addEventListener("complete",function(){
     var oGame= Query("#Game");
     var oBtn= Query(".single em");
     var oP = Query("#Game p");

     // 图片帧 1 
      var animateImg1=new MF_animateSheet({
        parents:document.getElementById("animate1"),
        type:"canvas",
        imgList:list1,
        step:1,
        times:100,
        loop:false
      });

      oBtn.onclick =function(){
         oBtn.style.display = "none";
         animateImg1.play();
      };
      animateImg1.addEventListener("complete",function(){
          oP.style.display = "block";
      });

    main.events(); //调用配置事件
  });

  loading.start();//开始加载
};


//配置事件 
main.events = function(){
   //九宫格出现
    var oNew_list=document.getElementById('new_list');
    var aLi_work = oNew_list.children;
    var len = aLi_work.length;
    var aPos = [];
    for(var i = 0; i < len; i++){
      aPos[i] = {
        left:aLi_work[i].offsetLeft,top:aLi_work[i].offsetTop,
          width:aLi_work[i].offsetWidth,height:aLi_work[i].offsetHeight,
          opacity:1
      };
      aLi_work[i].style.left = aPos[i].left + "px";
      aLi_work[i].style.top  = aPos[i].top + "px";
    }
    for(var i = 0; i < len; i++){
      aLi_work[i].style.position = "absolute";
      aLi_work[i].style.margin  = "0";
    }
    init();
    function init(){
      for(var i = 0; i < len; i++){
        aLi_work[i].style.left = 0;
        aLi_work[i].style.top  = 0;
        aLi_work[i].style.width= 0;
        aLi_work[i].style.height= 0;
        aLi_work[i].style.opacity= 0;
      }
    } 
    //收起来
    var timer = null;
    var bClick=true;
   main.Listshow = function (){
      var i = 0;
      if(bClick){
        bClick=false;
        clearInterval(timer);
        timer = setInterval(function(){
          (function(index){
            move(aLi_work[i],{left:0,top:0,width:50,height:50,opacity:0},{complete:function(){
              if(index == len - 1){
                i = index;
                clearInterval(timer);
                timer = setInterval(function(){
                  move(aLi_work[i],aPos[i]);
                  i--;
                  if(i == -1){
                    bClick=true;
                    i=0;
                    clearInterval(timer);
                  }
                },100);}
            }});
          })(i);
          i++;
          if(i == len){clearInterval(timer)}
        },100);
      }
    } //九宫格出现 结束


  //GaGa
  var oGaGa = document.getElementById("GaGa");
  var oBtn_G = oGaGa.getElementsByTagName('input')[0];
  var aLi_G = oGaGa.getElementsByTagName('li');
  var lens = aLi_G.length;
  var oClose1 = oGaGa.getElementsByClassName('close')[0];
  var zIndex = 1;
  var aPos_G = [];
  for(var i = 0; i < lens; i++){
    aPos_G[i] = {left:aLi_G[i].offsetLeft,top:aLi_G[i].offsetTop};
    aLi_G[i].style.left = aPos_G[i].left + "px";
    aLi_G[i].style.top  = aPos_G[i].top + "px";
  }
  for(var i = 0; i < lens; i++){
    aLi_G[i].style.position =  "absolute";
    aLi_G[i].style.margin   =  "0";
    
    drag(aLi_G[i]);
    aLi_G[i].index = i;
  }
  
  //随机换
  oBtn_G.onclick = function(){
    aPos_G.sort(function(){
      return Math.random() - 0.5  
    });
    for(var i = 0; i < lens; i++){
      aLi_G[i].index = i;
      move(aLi_G[i],aPos_G[i]);
    }
  };

function getDis(obj1,obj2){
  var a = obj1.offsetLeft - obj2.offsetLeft;
  var b = obj1.offsetTop - obj2.offsetTop;
  return Math.sqrt(a*a + b*b);
}

function findNear(obj){
  var iMin = 9999999;
  var iMinIndex = -1;
  for(var i = 0; i < lens; i++){
    if(obj == aLi_G[i]){
      continue;
    }
    if(collTest(obj,aLi_G[i])){
      var dis = getDis(obj,aLi_G[i]);
      if(iMin > dis){
        iMin = dis;
        iMinIndex = i;
      }
    }
  }
  if(iMinIndex == -1){
    return null;
  }
  return aLi_G[iMinIndex];
}
function collTest(obj1,obj2){
  var l1 = obj1.offsetLeft;
  var t1 = obj1.offsetTop;
  var r1 = l1 + obj1.offsetWidth;
  var b1 = t1 + obj1.offsetHeight;
  var l2 = obj2.offsetLeft;
  var t2 = obj2.offsetTop;
  var r2 = l2 + obj2.offsetWidth;
  var b2 = t2 + obj2.offsetHeight;
  
  if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2){//没碰到
    return false;
  } else {
    return true;
  }
}
  
function drag(obj){
  obj.onmousedown = function(ev){
    var oEvent = ev || event;
    var disX = oEvent.clientX - obj.offsetLeft;
    var disY = oEvent.clientY - obj.offsetTop;
    obj.style.zIndex = zIndex++;
    document.onmousemove = function(ev){
      var oEvent = ev || event;
      obj.style.left = oEvent.clientX - disX + "px";
      obj.style.top  = oEvent.clientY - disY + "px"; 
      for(var i = 0; i < lens; i++){
        aLi_G[i].className = "";
      }
      var oNear = findNear(obj);
      if(oNear){
        oNear.className = "box";
      }
    };
    document.onmouseup = function(){
      document.onmousemove = null;
      document.onmouseup = null;
      obj.releaseCapture && obj.releaseCapture(); 
      var oNear = findNear(obj);
      if(oNear){
         var tmp = obj.index
         obj.index = oNear.index;
         oNear.index = tmp;
         move(oNear,aPos_G[oNear.index]);
      }
      move(obj,aPos_G[obj.index]);
    };
    obj.setCapture && obj.setCapture();
    return false;
  };
}
oClose1.onclick =function(){
   move(oGaGa,{"top":800},{easing:Tween.Linear,duration:1500,complete:function(){
             oGaGa.className = 'leave2 abs';
             //move(oGaGa,{"top":0});
   }});
};
//GaGa结束
   
   //钢琴
    var oPiano=document.getElementById('piano');
    var myspans = oPiano.getElementsByTagName("span");
    var myaudios = oPiano.getElementsByTagName("audio");
    var aEm = oPiano.getElementsByTagName("em");
    var aPili=oPiano.getElementsByTagName("li");
    var oClose2 = oPiano.getElementsByClassName('close')[0];
    var oldTop = oPiano.offsetTop;
    var pNow = 0;
    for(var i=0;i<aPili.length;i++){
      aPili[i].index = i;
      aPili[i].onmouseover=function(){
        pNow = this.index;
        var oEm=this.children[1];
        move(oEm,{'height':36},{duration:200});
        myaudios[pNow].load();
        myaudios[pNow].play();  

      };  
      aPili[i].onmouseout=function(){
        var oEm=this.children[1];
        move(oEm,{'height':0},{duration:200});  
      };  
      document.onkeydown = function(event){
      var m = event.keyCode - 49;
      if(oPiano.offsetTop != oldTop){
          if(m>=0 && m<=7){
            move(aEm[m],{'height':36},{duration:200,complete:function(){
              move(aEm[m],{'height':0},{duration:200});
              }});
              myaudios[m].load();
              myaudios[m].play();
          }
      }
     }
    }
    oClose2.onclick =function(){
       move(oPiano,{"top":oldTop,opacity:0},{'duration':400,easing:Tween.Linear});
    };

  //拖拽相册
  var oDiv_Box=document.getElementById('Darg1');
  var oDiv_D=oDiv_Box.getElementsByClassName('Darg')[0];
  var oUl_D=oDiv_D.getElementsByTagName('ul')[0];
  var aLi_D=oDiv_D.getElementsByTagName('li');  
  var aImg_D=oDiv_D.getElementsByTagName('img');
  var oClose3 = oDiv_Box.getElementsByClassName('close')[0];

  var oldLeft_D = oDiv_Box.offsetLeft;
  var oldTop_D = oDiv_Box.offsetTop;
  oUl_D.style.width=aLi_D[0].offsetWidth*aLi_D.length+'px'; 
  oUl_D.onmousedown=function(ev){
    var oEvt=ev||event;
    var disX=oEvt.clientX-oUl_D.offsetLeft;
    document.onmousemove=function(ev){
      var oEvt=ev||event;
      var l=oEvt.clientX-disX;
      if(l>oDiv_D.offsetWidth/2-(0+0.5)*aLi_D[0].offsetWidth)
        l=oDiv_D.offsetWidth/2-(0+0.5)*aLi_D[0].offsetWidth;
      if(l<oDiv_D.offsetWidth/2-(aLi_D.length-1+0.5)*aLi_D[0].offsetWidth)
        l=oDiv_D.offsetWidth/2-(aLi_D.length-1+0.5)*aLi_D[0].offsetWidth;
      oUl_D.style.left=l+'px';
      setSize();
    };
    document.onmouseup=function(){
      document.onmousemove=document.onmouseup=null; 
      oUl_D.releaseCapture && oUl_D.releaseCapture();
    };
    oUl_D.setCapture && oUl_D.setCapture();
    return false;
  }
  function setSize(){
    for(var i=0;i<aLi_D.length;i++){
      var dis=oDiv_D.offsetWidth/2-(oUl_D.offsetLeft+aLi_D[i].offsetLeft+aLi_D[0].offsetWidth/2);
      dis=Math.abs(dis);
      var scale=1-dis/800;
      if(scale<0.5) scale=0.5;
      aImg_D[i].style.width=scale*520+'px';
      aImg_D[i].style.height=scale*358+'px';
      aImg_D[i].style.marginLeft=-(aImg_D[i].offsetWidth-aLi_D[i].offsetWidth)/2+'px';
      aImg_D[i].style.marginTop=-(aImg_D[i].offsetHeight-aLi_D[i].offsetHeight)/2+'px';
      aImg_D[i].style.zIndex=parseInt(scale*10000);
      aImg_D[i].style.opacity=scale;
    }
  }
  setCenter(2);
  setSize();
  function setCenter(n){
    oUl_D.style.left=oDiv_D.offsetWidth/2-(n+0.5)*aLi_D[0].offsetWidth+'px';
  }  

 oClose3.onclick =function(){
    Darg1.className = 'leave1 abs_D';
     move(Darg1,{"top":oldTop_D,"left":oldLeft_D,"opacity":0},{'duration':400,easing:Tween.Linear});
  };

  //iPad APP 
  var oIPad_box = document.getElementById("iPad_box");
  var oIp_Ul = document.getElementById("iPad_ul");
  var aIcon = oIp_Ul.children;
  var oClose4 = oIPad_box.getElementsByClassName('close')[0];
  var zIndexs = 1;
  var aPosition = [];
  for(var i = 0; i < aIcon.length; i++){
    aPosition[i] = {left:aIcon[i].offsetLeft, top: aIcon[i].offsetTop};
    aIcon[i].style.left = aPosition[i].left + "px";
    aIcon[i].style.top  = aPosition[i].top  + "px";
  }
  for(var i = 0; i < aIcon.length; i++){
    aIcon[i].style.position = "absolute";
    aIcon[i].style.margin  = "0";
    aIcon[i].index = i;
    Drag(aIcon[i]);
  }
  function Drag(obj){
    obj.onmousedown = function(ev){
      var oEvent = ev || event;
      var disX = oEvent.clientX - obj.offsetLeft;
      var disY = oEvent.clientY - obj.offsetTop;
      obj.style.zIndex = zIndexs++;
      clearInterval(obj.timer);
      document.onmousemove = function(ev){
        var oEvent = ev || event;
        var l = oEvent.clientX - disX;
        var t = oEvent.clientY - disY;
        if(l < 0){
          l = 0;
        } else if(l > oIp_Ul.offsetWidth - 50){
          l = oIp_Ul.offsetWidth - 50;
        }
        if(t < 0){
          t = 0;
        } else if(t > oIp_Ul.offsetHeight - 50){
          t = oIp_Ul.offsetHeight - 50;
        }
        obj.style.left = l + "px";
        obj.style.top  =  t+ "px";
        var oNear = findNearest(obj);
        if(oNear && oNear != obj){
          var n = obj.index;
          var m = oNear.index;
          if(n < m ){
            for(var i = 0; i < aIcon.length; i++){
              if(aIcon[i].index >= n + 1&& aIcon[i].index <= m){
                aIcon[i].index--;
                move(aIcon[i],aPosition[aIcon[i].index]);
              }
            }
          } else if(n > m){
            for(var i = 0; i < aIcon.length; i++){
              if(aIcon[i].index >= m&& aIcon[i].index <= n - 1){
                aIcon[i].index++;
                move(aIcon[i],aPosition[aIcon[i].index]);
              }
            }
          }
          obj.index = m;    
        }
      };
      document.onmouseup = function(){
        document.onmousemove = null;
        document.onmouseup = null;
        obj.releaseCapture && obj.releaseCapture();
        move(obj,aPosition[obj.index]);
      };
      
      obj.setCapture && obj.setCapture();
      return false; 
    };
  }
  function findNearest(obj){
    var iMin = 999999999;
    var iMinIndex = -1;
    for(var i = 0; i < aIcon.length; i++){
      if(collTests(obj,aIcon[i])){
        var dis = getDisd(obj,aIcon[i]);
        if(iMin > dis){
          iMin = dis;
          iMinIndex = i;
        }
      }
    }
    if(iMinIndex == -1){
      return null;
    }
    return aIcon[iMinIndex];
  }
  function getDisd(obj1,obj2){
    var a = obj1.offsetLeft - aPosition[obj2.index].left;
    var b = obj1.offsetTop - aPosition[obj2.index].top;
    return Math.sqrt(a*a + b*b);
  }
  function collTests(obj1,obj2){
    var l1 = obj1.offsetLeft;
    var t1 = obj1.offsetTop;
    var r1 = l1 + obj1.offsetWidth;
    var b1 = t1 + obj1.offsetHeight;
    var l2 = aPosition[obj2.index].left;
    var t2 = aPosition[obj2.index].top;
    var r2 = l2 + obj2.offsetWidth;
    var b2 = t2 + obj2.offsetHeight;
    if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2){
      return false;
    } else {
      return true;
    }
  }
oClose4.onclick =function(){
     oIPad_box.style.zIndex = -1;
     move(oIPad_box,{"opacity":0},{'duration':400,easing:Tween.Linear});
  };
  //iPad APP 结束  百达翡丽怀表 开始
  var oClock = document.getElementById("Clock");
  var oH   = document.getElementById("hours");
  var oM   = document.getElementById("minutes");
  var oS   = document.getElementById("seconds");
  function clock(){
    var oDate = new Date();
    var TH = oDate.getHours();
    var TM = oDate.getMinutes();
    var TS = oDate.getSeconds();
    var TMs = oDate.getMilliseconds();
    oH.style.transform = "rotate("+(TH*30 + TM/60*30)+"deg)";
    oM.style.transform = "rotate("+(TM*6 + TS/60*6)+"deg)";
    oS.style.transform = "rotate("+(TS*6+ TMs/1000*6)+"deg)";
  }
  clock();
  setInterval(clock,30);
  for(var i = 0; i < 60; i++){
    var oSpan_t = document.createElement("span");
    if(i%5 == 0){
      oSpan_t.classList.add("on");
      if(i == 0){
        oSpan_t.innerHTML = "<em>12</em>";
      } else {
        oSpan_t.innerHTML = "<em>"+i/5+"</em>";
      }
      oSpan_t.children[0].style.transform = "rotate(-"+i*6+"deg)";
    }
    
    oSpan_t.style.transform = "rotate("+i*6+"deg)";
    oClock.appendChild(oSpan_t);
  }
  var oTime = document.getElementById('year_day');
  var oWeek = document.getElementById('week');
     upDate();
     setInterval(upDate, 1000);
      function upDate(){
        var oDate = new Date();
        var oY = oDate.getFullYear();
        var oMo =fillZero(oDate.getMonth()+1);
        var oTian =fillZero(oDate.getDate());
        var oH = fillZero(oDate.getHours());
        var oMi = fillZero(oDate.getMinutes());
        var oS = fillZero(oDate.getSeconds());
        var oDay = oDate.getDay();
        switch(oDay){
         case 0:
             oDay = '周 日';
             break;  
         case 1:
             oDay = '周 一';
             break;
         case 2:
             oDay = '周 二';
             break;
         case 3:
             oDay = '周 三';
             break;  
         case 4:
             oDay = '周 四';
             break;
         case 5:
             oDay = '周 五';
             break;
         case 6:
             oDay = '周 六';
             break;
        }
        oTime.innerHTML = oY+'年'+oMo+'月'+oTian+'日'+oH+'点'+oMi+'分'+oS+'秒';
        oWeek.innerHTML = oDay;
      }
      
      function fillZero(n){  
         return n < 10 ? '0'+n : ''+n ;
      } 
  //篮球
  var oBas = document.getElementById("Basketball");
  var speedX = 0;
  var speedY = 0;
  var lastX = 0;
  var lastY = 0;
  var timer = null;
  oBas.onmousedown = function(ev){
    var oEvent = ev || event;
    var disX = oEvent.clientX - oBas.offsetLeft;
    var disY = oEvent.clientY - oBas.offsetTop; 
    clearInterval(timer);
    document.onmousemove = function(ev){
      var oEvent = ev || event;
      oBas.style.left = oEvent.clientX  - disX + "px";
      oBas.style.top   = oEvent.clientY - disY + "px";
      speedX = oBas.offsetLeft - lastX;
      speedY = oBas.offsetTop - lastY;
      lastX = oBas.offsetLeft;
      lastY = oBas.offsetTop;
    };
    document.onmouseup = function(){
      document.onmousemove = null;
      document.onmouseup = null;
      oBas.releaseCapture && oBas.releaseCapture();
    //move
        clearInterval(timer);
    timer = setInterval(function(){
      speedY += 3;
      var l = oBas.offsetLeft + speedX;
      var t = oBas.offsetTop + speedY;
      if(t >= document.documentElement.clientHeight - oBas.offsetHeight){
        speedY *= -0.8;
        speedX *= 0.8;
        t = document.documentElement.clientHeight - oBas.offsetHeight;
      } else if(t <= 0){
        speedY *= -0.8;
        speedX *= 0.8;
        t = 0;
      }
      
      if(l >= document.documentElement.clientWidth - oBas.offsetWidth){
        speedX *= -0.8;
        speedY *= 0.8;
        l = document.documentElement.clientWidth - oBas.offsetWidth;
      } else if(l <= 0){
        speedX *= -0.8;
        speedY *= 0.8;
        l = 0;
      }
      
      oBas.style.left = l+ "px";
      oBas.style.top  = t + "px";
      
      if(Math.abs(speedX) < 1){speedX = 0;}
      
      if(Math.abs(speedY) < 1){speedY = 0;}
      
      if(speedX == 0 && speedY == 0 && t == document.documentElement.clientHeight - oBas.offsetHeight){
        clearInterval(timer);
      }
      },30);  
      };
    oBas.setCapture && oBas.setCapture(); 
    return false; 
  };

  //点击九宫格
  var clientWidth=document.body.clientWidth;;
  var clientHeight=document.body.clientHeight;
  window.onresize=function(){
      clientWidth=document.body.clientWidth;
      clientHeight=document.body.clientHeight;
  }
   var oContainer = document.getElementsByClassName('container')[0];
   var oPage1 = document.getElementsByClassName('page1')[0];
   var oPage2 = document.getElementsByClassName('page2')[0];
   var oPage3 = document.getElementsByClassName('page3')[0];
   var oPage4 = document.getElementsByClassName('page4')[0];
   var oNew_list = document.getElementById('new_list');
   var oNo1_li = oNew_list.children[0];
   var oNo2_li = oNew_list.children[1];
   var oNo3_li = oNew_list.children[2];
   var oNo4_li = oNew_list.children[3];
   var oNo5_li = oNew_list.children[4];
   var oNo6_li = oNew_list.children[5];
   var oNo7_li = oNew_list.children[6];
   var oNo8_li = oNew_list.children[7];
   

    oNo1_li.onclick = function(){
        oGaGa.className = 'enter2';
        move(oGaGa,{"top":0,"left":0});
    };
    oNo2_li.onclick = function(){
        move(oPiano,{"top":0,'opacity':1},{'duration':400,easing:Tween.Linear});
    };
    oNo3_li.onclick = function(){
        Darg1.className = 'enter1';
        move(Darg1,{"top":0,"left":0,"opacity":1},{'duration':600,easing:Tween.Linear});
    };
    oNo4_li.onclick = function(){
        oIPad_box.style.zIndex = 2;
        move(oIPad_box,{"opacity":1},{'duration':400,easing:Tween.Linear});
    };

    oNo5_li.onclick = function(){move(oContainer,{"top":0,"left":("-"+(1.2)*clientWidth)},{'duration':1000,easing:Tween.Linear});};
    oNo6_li.onclick = function(){
        move(oContainer,{"top":("-"+(1.1)*clientHeight),"left":("-"+(0.1)*clientWidth)},{'duration':1000,easing:Tween.Linear});};
    oNo6_li.onclick = function(){
        move(oContainer,{"top":("-"+(1.1)*clientHeight),"left":("-"+(0.1)*clientWidth)},{'duration':1000,easing:Tween.Linear});};
    oNo7_li.onclick = function(){
        move(oContainer,{"top":("-"+(1.3)*clientHeight),"left":("-"+(1.2)*clientWidth)},{'duration':1000,easing:Tween.Linear});};
    var oBtn_page2   = document.getElementById("btn_p2");
    var oBtn_page3   = document.getElementById("btn_p3");
    var oBtn_page4   = document.getElementById("btn_p4");

    oBtn_page2.onclick = function(){
       move(oContainer,{"top":("-"+(1.1)*clientHeight),"left":("-"+(0.1)*clientWidth)},{'duration':1000,easing:Tween.Linear});
    };
    oBtn_page3.onclick = function(){
        move(oContainer,{"top":("-"+(1.3)*clientHeight),"left":("-"+(1.2)*clientWidth)},{'duration':1000,easing:Tween.Linear});
    };
    oBtn_page4.onclick = function(){move(oContainer,{"top":0,"left":0},{'duration':1000,easing:Tween.Linear});};


 };//配置事件 



function Query(e){
  return document.querySelector(e);
}
function QueryAll(e){
  return document.querySelectorAll(e);
}

main.init(); 
