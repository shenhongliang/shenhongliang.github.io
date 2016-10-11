var oChooseMen = document.getElementById('chooseMen');
var oChooseWoman = document.getElementById('chooseWoman');
var oChooseCont = document.getElementById('chooseCont');

var oMenCont = document.getElementById('menCont');
var oMenBtn = document.getElementById('menBtn');
var oWomanBtn = document.getElementById('womanBtn');

var oUl_1 = document.getElementById('tFocus-pic');
var oUl_2 = document.getElementById('tFocus_ul');

var oMusic = document.getElementById("music");
var oFF = false;

 var arr1 = ['img/m/1.jpg','img/m/2.jpg','img/m/3.jpg','img/m/4.jpg','img/m/5.jpg','img/m/7.jpg','img/m/8.jpg','img/m/9.jpg'];
 var arr2 = ['img/m/sm1.jpg','img/m/sm2.jpg','img/m/sm3.jpg','img/m/sm4.jpg','img/m/sm5.jpg','img/m/sm7.jpg','img/m/sm8.jpg','img/m/sm9.jpg'];

var arr3 = ['img/w/1.jpg','img/w/2.jpg','img/w/3.jpg','img/w/4.jpg','img/w/5.jpg','img/w/6.jpg','img/w/7.jpg','img/w/8.jpg','img/w/9.jpg','img/w/10.jpg','img/w/11.jpg'];
var arr4 = ['img/w/sm1.jpg','img/w/sm2.jpg','img/w/sm3.jpg','img/w/sm4.jpg','img/w/sm5.jpg','img/w/sm6.jpg','img/w/sm7.jpg','img/w/sm8.jpg','img/w/sm9.jpg','img/w/sm10.jpg','img/w/sm11.jpg'];

var arr_a = [];
var arr_b = [];

oChooseMen.onclick = function(){
	 oUl_1.innerHTML = '';
	 oUl_2.innerHTML = '';
	 arr_a = arr1;
	 arr_b = arr2;
   create_Li();
   oMenCont.style.display = 'block';
   oMusic.children[0].play();
   oFF = true;
   oWomanBtn.className = '';
   oMenBtn.className = 'cur';
};


oChooseWoman.onclick = function(){
	 oUl_1.innerHTML = '';
	 oUl_2.innerHTML = '';
	 arr_a = arr3;
	 arr_b = arr4;
	 create_Li();
   oMenCont.style.display = 'block';
   oMusic.children[0].play();
   oFF = true;
   oWomanBtn.className = 'cur';
   oMenBtn.className = '';
};

oMenBtn.onclick = function(){
	 oUl_1.innerHTML = '';
	 oUl_2.innerHTML = '';
	 arr_a = arr1;
	 arr_b = arr2;
   create_Li();
   oWomanBtn.className = '';
   this.className = 'cur';
   oMenCont.style.display = 'block';
   chooseCont.style.display = 'none';
   oMusic.children[0].play();
   oFF = true;
};

oWomanBtn.onclick = function(){
	 oUl_1.innerHTML = '';
	 oUl_2.innerHTML = '';
	 arr_a = arr3;
	 arr_b = arr4;
   create_Li();
   oMenBtn.className = '';
   this.className = 'cur';
   oMenCont.style.display = 'block';
   chooseCont.style.display = 'none';
   oMusic.children[0].play();
   oFF = true;
};



function create_Li(){
   //大图添加 li
   for(var i=0;i<arr_a.length;i++){
   	   var oLi_1 = document.createElement('li');
   	   oLi_1.innerHTML = "<img src="+arr_a[i]+" />"
       oUl_1.appendChild(oLi_1);
   }
   
   //小图添加 li
   for(var i=0;i<arr_b.length;i++){
   	   var oLi_2 = document.createElement('li');
   	   oLi_2.innerHTML = "<img src="+arr_b[i]+" />"
       oUl_2.appendChild(oLi_2);
   }
}



//音乐开关
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