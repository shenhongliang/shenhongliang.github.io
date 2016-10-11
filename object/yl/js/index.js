//音乐开关
var oMusic = document.getElementById("music");
var oFF = true;
oMusic.onclick = function(){
	if(oFF){
	  this.children[0].pause();
		this.children[1].src="img/music_off.png";
		oFF = false;
	}else{
		this.children[0].play();
		this.children[1].src="img/music_on.png";
		oFF = true;
	}
};



//换背景图
var oImg = document.getElementById('img');
var oTxt_box1 = document.getElementById('txt_box1');
var oTxt_box2 = document.getElementById('txt_box2');
var oTxt_box3 = document.getElementById('txt_box3');
var oTxt_box4 = document.getElementById('txt_box4');
var oTxt_box5 = document.getElementById('txt_box5');
var oTxt_box6 = document.getElementById('txt_box6');
var oTxt_box6_5 = document.getElementById('txt_box6_5');
var oTxt_box7 = document.getElementById('txt_box7');
var oTxt_box8 = document.getElementById('txt_box8');



var now_1 = 0;
var arr_1 = ["img/_000.jpg","img/_001.jpg","img/_002.jpg","img/_003.jpg","img/_004.jpg","img/_005.jpg","img/_006.jpg","img/_007.jpg","img/_008.jpg","img/_009.jpg","img/_010.jpg","img/_011.jpg","img/_012.jpg","img/_013.jpg","img/_014.jpg","img/_015.jpg","img/_016.jpg","img/_017.jpg","img/_018.jpg","img/_019.jpg","img/_020.jpg","img/_021.jpg","img/_022.jpg","img/_023.jpg","img/_024.jpg","img/_025.jpg","img/_026.jpg","img/_027.jpg","img/_028.jpg","img/_029.jpg","img/_030.jpg","img/_031.jpg","img/_032.jpg","img/_033.jpg","img/_034.jpg","img/_035.jpg","img/_036.jpg","img/_037.jpg","img/_038.jpg","img/_039.jpg","img/_040.jpg","img/_041.jpg","img/_042.jpg","img/_043.jpg","img/_044.jpg","img/_045.jpg","img/_046.jpg","img/_047.jpg","img/_048.jpg","img/_049.jpg","img/_050.jpg","img/_051.jpg","img/_052.jpg","img/_053.jpg","img/_054.jpg","img/_055.jpg","img/_056.jpg","img/_057.jpg","img/_058.jpg","img/_059.jpg","img/_060.jpg","img/_073.jpg","img/_074.jpg","img/_075.jpg","img/_076.jpg","img/_077.jpg","img/_078.jpg","img/_079.jpg","img/_080.jpg","img/_081.jpg","img/_082.jpg","img/_083.jpg","img/_084.jpg","img/_085.jpg","img/_086.jpg","img/_087.jpg","img/_088.jpg","img/_089.jpg","img/_090.jpg","img/_091.jpg","img/_092.jpg","img/_093.jpg","img/_094.jpg","img/_095.jpg","img/_096.jpg","img/_097.jpg"];


function home_img(){  
  var	timer_1=setInterval(function(){ 
 	      oImg.src=arr_1[now_1%arr_1.length];
         now_1++; 
         if(now_1 == arr_1.length) {
         	oTxt_box1.className='fadeOut animated';
           setTimeout(function(){
             oTxt_box2.style.display = 'block';
             oTxt_box2.className='fadeIn animated';
          } , 1000);
          clearInterval(timer_1);
        }

        setTimeout(function(){
             oTxt_box1.style.display = 'none';
             oTxt_box1.className='fadeOut animated';
        } , 6000);
  },100);
} 
var now_2 = 0;
var arr_2 = ["img/_098.jpg","img/_099.jpg","img/_100.jpg","img/_101.jpg","img/_102.jpg","img/_103.jpg","img/_104.jpg","img/_105.jpg","img/_106.jpg","img/_107.jpg","img/_108.jpg","img/_109.jpg","img/_110.jpg","img/_111.jpg","img/_112.jpg","img/_113.jpg","img/_114.jpg","img/_115.jpg","img/_116.jpg","img/_117.jpg","img/_118.jpg","img/_119.jpg","img/_120.jpg","img/_121.jpg","img/_122.jpg","img/_123.jpg","img/_124.jpg","img/_125.jpg","img/_126.jpg","img/_127.jpg","img/_128.jpg","img/_129.jpg","img/_130.jpg","img/_131.jpg","img/_132.jpg","img/_133.jpg","img/_134.jpg","img/_135.jpg","img/_136.jpg","img/_137.jpg","img/_138.jpg","img/_139.jpg","img/_140.jpg","img/_141.jpg","img/_142.jpg","img/_143.jpg","img/_144.jpg","img/_145.jpg","img/_146.jpg","img/_147.jpg","img/_148.jpg","img/_149.jpg","img/_150.jpg","img/_151.jpg","img/_152.jpg","img/_153.jpg","img/_154.jpg","img/_155.jpg","img/_156.jpg","img/_157.jpg","img/_158.jpg","img/_159.jpg","img/_160.jpg","img/_161.jpg","img/_162.jpg","img/_163.jpg","img/_164.jpg","img/_165.jpg","img/_166.jpg","img/_167.jpg","img/_168.jpg","img/_169.jpg","img/_170.jpg","img/_171.jpg","img/_172.jpg","img/_173.jpg","img/_174.jpg","img/_175.jpg","img/_176.jpg","img/_177.jpg","img/_178.jpg","img/_179.jpg","img/_180.jpg","img/_181.jpg","img/_182.jpg","img/_183.jpg","img/_184.jpg","img/_185.jpg","img/_186.jpg","img/_187.jpg","img/_188.jpg","img/_189.jpg","img/_190.jpg","img/_191.jpg","img/_192.jpg","img/_193.jpg"];

var now_3 = 0;
var arr_3 = ["img/_194.jpg","img/_195.jpg","img/_196.jpg","img/_197.jpg","img/_198.jpg","img/_199.jpg","img/_200.jpg","img/_201.jpg","img/_202.jpg","img/_203.jpg","img/_204.jpg","img/_205.jpg","img/_206.jpg","img/_207.jpg","img/_208.jpg","img/_209.jpg","img/_210.jpg","img/_211.jpg","img/_212.jpg","img/_213.jpg","img/_214.jpg"];

var timer_3 = null;
var setTimer = null;
 var senceFlag=0;
 var ft1=new FaceTouch('txt_box2');
  ft1.ontouchend=function(obj){
      if (Math.abs(obj.offsetx) < Math.abs(obj.offsety)) {
         if(obj.offsety > 10){
           if(senceFlag==0){
               senceFlag=-1;
              box2();
           }
         }
      }
  }

function  box2(){
   setTimeout(function(){
     oTxt_box2.className='fadeOut animated';
     oTxt_box2.style.display = 'none';
   } , 2000);
   setTimeout(function(){
     oTxt_box3.className='fadeIn animated';
     oTxt_box3.style.display = 'block';
   } , 4000);

  var timer_2=setInterval(function(){ 
        oImg.src=arr_2[now_2%arr_2.length];
        now_2++;  
        if(now_2 == arr_2.length) {
          oTxt_box3.className='fadeOut animated';
          oTxt_box3.style.display = 'none';
          senceFlag=1;
          clearInterval(timer_2);
        }
  },100);

 setTimer =  setTimeout(function(){
     oTxt_box4.style.display = 'block';
     oTxt_box4.className='fadeIn animated';
      timer_3=setInterval(function(){ 
        oImg.src=arr_3[now_3%arr_3.length];
        now_3++;  
    },100);
   } , 9900);
 
};


var now_4 = 0;
var arr_4 = ["img/_241.jpg","img/_242.jpg","img/_243.jpg","img/_244.jpg","img/_245.jpg","img/_246.jpg","img/_247.jpg","img/_248.jpg","img/_249.jpg","img/_250.jpg","img/_251.jpg","img/_252.jpg","img/_253.jpg","img/_254.jpg","img/_255.jpg","img/_256.jpg","img/_257.jpg","img/_258.jpg","img/_259.jpg","img/_260.jpg","img/_261.jpg","img/_262.jpg","img/_263.jpg","img/_264.jpg","img/_265.jpg","img/_266.jpg","img/_267.jpg","img/_268.jpg","img/_269.jpg","img/_270.jpg","img/_271.jpg","img/_272.jpg","img/_273.jpg","img/_274.jpg","img/_275.jpg","img/_276.jpg","img/_277.jpg","img/_278.jpg","img/_279.jpg","img/_280.jpg","img/_281.jpg","img/_282.jpg","img/_283.jpg","img/_284.jpg","img/_285.jpg","img/_286.jpg","img/_287.jpg","img/_288.jpg","img/_289.jpg","img/_290.jpg","img/_291.jpg","img/_292.jpg","img/_293.jpg","img/_294.jpg","img/_295.jpg","img/_296.jpg","img/_297.jpg","img/_298.jpg","img/_299.jpg","img/_300.jpg","img/_301.jpg","img/_302.jpg","img/_303.jpg","img/_304.jpg","img/_305.jpg","img/_306.jpg","img/_307.jpg","img/_308.jpg","img/_309.jpg","img/_310.jpg","img/_311.jpg","img/_312.jpg","img/_313.jpg","img/_314.jpg","img/_315.jpg","img/_316.jpg","img/_317.jpg","img/_318.jpg","img/_319.jpg","img/_320.jpg","img/_321.jpg","img/_322.jpg","img/_323.jpg","img/_324.jpg","img/_325.jpg","img/_326.jpg","img/_327.jpg","img/_328.jpg","img/_329.jpg","img/_330.jpg","img/_331.jpg","img/_332.jpg","img/_333.jpg","img/_334.jpg","img/_335.jpg","img/_336.jpg","img/_337.jpg","img/_338.jpg","img/_339.jpg","img/_340.jpg","img/_341.jpg","img/_342.jpg","img/_343.jpg","img/_344.jpg","img/_345.jpg","img/_346.jpg","img/_347.jpg","img/_348.jpg","img/_349.jpg","img/_350.jpg","img/_351.jpg","img/_352.jpg","img/_353.jpg","img/_354.jpg","img/_355.jpg","img/_356.jpg","img/_357.jpg","img/_358.jpg","img/_359.jpg","img/_360.jpg","img/_361.jpg","img/_362.jpg","img/_363.jpg","img/_364.jpg","img/_374.jpg"];

/* */
var ft2=new FaceTouch('txt_box4');
ft2.onrotate=function(obj){ 
    if(obj.scale > 0){
      if(senceFlag==1){
          senceFlag=-1;
         box4();
      }
  }
}

//oTxt_box4.onclick = function(){
function box4(){
   clearTimeout(setTimer);
   clearInterval(timer_3);
   oTxt_box4.style.display = 'none';
   oTxt_box4.className='fadeOut animated';
   setTimeout(function(){
       oTxt_box5.style.display = 'block';
       oTxt_box5.className='fadeIn animated';
   } , 4000);

   var timer_4=setInterval(function(){ 
        oImg.src=arr_4[now_4%arr_4.length];
        now_4++;  
        if(now_4 == arr_4.length) {
          oTxt_box5.style.display = 'none';
          oTxt_box5.className='fadeOut animated';
          oTxt_box6.style.display = 'block';
          oTxt_box6.className='fadeIn animated';
          senceFlag=2;
          clearInterval(timer_4);
        }
  },100);
 
};


var now_5 = 0;
var arr_5 = ["img/_375.jpg","img/_376.jpg","img/_377.jpg","img/_378.jpg","img/_379.jpg","img/_380.jpg","img/_381.jpg","img/_382.jpg","img/_383.jpg","img/_384.jpg","img/_385.jpg","img/_386.jpg","img/_387.jpg","img/_388.jpg","img/_389.jpg","img/_390.jpg","img/_391.jpg","img/_392.jpg","img/_393.jpg","img/_394.jpg","img/_395.jpg","img/_396.jpg","img/_397.jpg","img/_398.jpg","img/_399.jpg","img/_400.jpg","img/_401.jpg","img/_402.jpg","img/_403.jpg","img/_404.jpg","img/_405.jpg","img/_406.jpg","img/_407.jpg","img/_408.jpg","img/_409.jpg","img/_410.jpg","img/_411.jpg","img/_412.jpg","img/_413.jpg","img/_414.jpg","img/_415.jpg","img/_416.jpg","img/_417.jpg","img/_418.jpg","img/_419.jpg","img/_420.jpg","img/_421.jpg","img/_422.jpg","img/_423.jpg","img/_424.jpg","img/_425.jpg","img/_426.jpg","img/_427.jpg","img/_428.jpg","img/_429.jpg","img/_430.jpg","img/_431.jpg","img/_432.jpg","img/_433.jpg","img/_434.jpg","img/_435.jpg","img/_436.jpg","img/_437.jpg","img/_438.jpg","img/_439.jpg","img/_440.jpg","img/_441.jpg","img/_442.jpg","img/_443.jpg","img/_444.jpg","img/_445.jpg","img/_446.jpg","img/_447.jpg","img/_448.jpg","img/_449.jpg","img/_450.jpg","img/_451.jpg","img/_452.jpg","img/_453.jpg","img/_454.jpg","img/_455.jpg","img/_456.jpg","img/_457.jpg","img/_458.jpg","img/_459.jpg","img/_460.jpg","img/_461.jpg","img/_462.jpg","img/_463.jpg","img/_464.jpg","img/_465.jpg","img/_466.jpg","img/_467.jpg","img/_468.jpg","img/_469.jpg","img/_470.jpg","img/_471.jpg","img/_472.jpg","img/_473.jpg","img/_474.jpg","img/_475.jpg","img/_476.jpg","img/_477.jpg","img/_478.jpg","img/_479.jpg","img/_480.jpg","img/_481.jpg","img/_482.jpg","img/_483.jpg","img/_484.jpg","img/_485.jpg","img/_486.jpg","img/_487.jpg","img/_488.jpg"];

 var ft3=new FaceTouch('txt_box6');
  ft3.ontouchend=function(obj){
    if (Math.abs(obj.offsetx) > Math.abs(obj.offsety)) {
        if(obj.offsetx < 10){
          if(senceFlag==2){
              senceFlag=-1;
              box6();
          }
        }
    }
  }

function box6(){
     oTxt_box6_5.style.display = 'none';
    setTimeout(function(){
       oTxt_box6.style.display = 'none';
       oTxt_box6.className='fadeOut animated';
       oTxt_box7.style.display = 'block';
       oTxt_box7.className='fadeIn animated';
   } , 2000);

    var timer_5=setInterval(function(){ 
        oImg.src=arr_5[now_5%arr_5.length];
        now_5++;  
        if(now_5 == arr_5.length) {
          //oTxt_box8.style.display = 'block';
          // if(oFF == true){ oMusic.click();}

           window.location.href = 'weixin.html';
           clearInterval(timer_5);
        }
  },100);
};


//loading
var oLoading  = document.getElementById('loading');
var oLoad_txt  = document.getElementById('loading_txt');
var oLine  = document.getElementById('line');
var loads = loadIMG(oLoad_txt,homeShow);
//loading 消失 
function homeShow(){
  oLoading.style.display = 'none';
  home_img();
  oMusic.children[0].play();
}

//加载进度
function loadIMG(_Numobj,callback){
  var loadArr=[];
  loadArr=loadArr.concat(arr_1);
  loadArr=loadArr.concat(arr_2);
  loadArr=loadArr.concat(arr_3);
  loadArr=loadArr.concat(arr_4);
  loadArr=loadArr.concat(arr_5);
  var _lgh=0;
  var speed=0;
  var num = 0;

  var load_ary=new Array();
  for(var n=0; n<loadArr.length; n++){
    if(!load_ary[n]){
      (function(){
        var _n=n;
        var n_img=new Image();
        n_img.onload=function(e){
          //console.log(_n/loadArr.length)
            _lgh++;
          }
          n_img.src=loadArr[_n];
        
      })(n);
    }
  }
  var setLD=setInterval(function(){
      if(speed<parseInt(_lgh/loadArr.length*100)){
         ++speed;
      }
      _Numobj.innerHTML =speed+1+"%";
      if(speed==100){
        clearInterval(setLD);
        if(callback){callback();}
      }
    },30);
}
















