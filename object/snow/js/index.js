var oMusic = document.getElementById("music");
var oMp3 = document.getElementById("mp3");
var oArrow = document.getElementById("arrow");
var ON = true;

var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical',
        onSlideChangeStart: function(swiper,even){
        	//console.log(swiper.activeIndex);
        	if(swiper.activeIndex ==0 || swiper.activeIndex ==1 || swiper.activeIndex ==6 || swiper.activeIndex ==7){
        		if(ON){
        		oMusic.src = "images/music3.png";	
        		}else{
        	     oMusic.src = "images/music4.png";
        		}
        	}else{
        		if(ON){
        		oMusic.src = "images/music1.png";	
        		}else{
        	     oMusic.src = "images/music2.png";
        		}
        	}

        	if(swiper.activeIndex ==8){
        		oArrow.style.display = "none";
        	}else{
        		oArrow.style.display = "block";
        	}
        }
    });

oMusic.addEventListener("touchstart",function(){
    if(ON){
      oMp3.pause();
      oMusic.className = "music";
        if(oMusic.getAttribute('src') == "images/music3.png"){
              oMusic.src = "images/music4.png";
        }else if(oMusic.getAttribute('src') == "images/music1.png"){
               oMusic.src = "images/music2.png";
        }
      ON = false;
    }else{
    	oMp3.play();
    	oMusic.className = "music music_rotate";
          if(oMusic.getAttribute('src') == "images/music4.png"){
          	 oMusic.src = "images/music3.png";
          }else if(oMusic.getAttribute('src') == "images/music2.png"){
             oMusic.src = "images/music1.png";
          }
      ON = true;
    }
},false);