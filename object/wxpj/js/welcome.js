var haha = document.getElementById('welcome');
window.mySwipe = Swipe(
	haha, 
	{	
		startSlide:0,		//表示轮播开始的图片编号
		/*auto: 3000,  */       //表示自动轮播的间隔
		continuous: false,   //表示是否再来一轮
		disableScroll: true,  //表示是否在上面阻止默认的滚轮事件，不用改
		stopPropagation: true,   //表示是否组织冒泡，不用改。

		/*callback:function(index){
			switch(index){
     			case 0:
     				 return false;
     			break;
     			case 1:
     				if($(".nth1 .tu").hasClass("animated")){
     						$(".nth1").children(".tu").removeClass("animated swing");
     					}else{
     						$(".nth1").children(".tu").addClass("animated swing");
     					}

     			break;
     			case 2:
     			       if($(".nth2 .tu").hasClass("animated")){
	
     						$(".nth2").children(".tu").removeClass("animated swing");
     					}else{
     						$(".nth2").children(".tu").addClass("animated swing");
     					}
     			break;
			}

			
		}*/
	}
);




