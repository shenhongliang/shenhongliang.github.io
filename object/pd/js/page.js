
/*-------------------- 游戏初始化 --------------------*/
var innerHeight = $(window).height(),
    innerWidth = $(window).width(),
    firstShowSetInt, fsTemp = 0,
    clicked = false;

var phoneX = 5,//触摸X轴移动距离设置
    ua = navigator.userAgent;
if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) { phoneX = 56 }
else if (ua.indexOf('iPhone') > -1) { phoneX = 45 }
else if (ua.indexOf('Windows Phone') > -1) { phoneX = 15 }

//随机函数
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
//url获取传参
function getRequestReg(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//刷新监听函数
//window.onbeforeunload = onbeforeunload_handler;
//function onbeforeunload_handler() {
//    var isJump = getRequestReg("jump")? true : false;
//    alert("isJump" + isJump);
//    if (isJump) {
//        setItem("Reset", false);
//    } else {
//       setItem("Reset", true);
//    }
//    return;
//}
//window.onunload = onunload_handler;
//function onunload_handler(){
//        setItem("Reset", true);
//}

//加载初始化
window.onload = function () {
     firstLoad();
}

//初始化内容
function firstLoad() {
    document.getElementById("container").style.height = window.innerHeight+"px";
    innerHeight = $(window).height(), innerWidth = $(window).width();
    
    $(".container", ".coverPage").css({
        width: innerWidth + "px",
        height: innerHeight + "px",
    });
    //判定是否显示开场秀
    var reset = getItem("Reset") == "true" ? true : false;
    var hasShowed = getRequestReg("hasShowed") == "true" ? true : false;
    var isJump = getRequestReg("jump") > "0" ? true : false;
    var show = true;
  	/*    if (reset) {
        show = true;
    }*/
    if (isJump) {
        if (hasShowed) {
            show = false;
        } else {
            show = true;
        }
    } else {
        show = true;
    }
    if (show) {
        setItem("hasShowed",true)
        firstShow();
    } else {
        $(".firstShow").hide();
    }
}

//开场秀
function firstShow() {
    fsTemp = 0;
    for (var i = 1; i < 11; i++) {
        if (i % 2 == 1) {
            setTimeout(function () {
                $(".firstShow .white").hide();
                $(".firstShow .black").show();
            }, i * 150);
        } else {
            setTimeout(function () {
                $(".firstShow .black").hide();
                $(".firstShow .white").show();
            }, i * 150);
        }
    }
    setTimeout(function () {
        $(".firstShow .white").delay(500).fadeOut(1000);
        $(".firstShow .black").fadeOut();
        $(".firstShow .end").fadeIn();
    }, 1600);
    setTimeout(function () {
        $(".firstShow .end .top").addClass("firstShowTop");
    }, 3800);
    setTimeout(function () {
        $(".firstShow .end .bottom").addClass("firstShowBottom");
    }, 4000);
    setTimeout(function () {
        $(".firstShow .end").delay(3000).fadeOut(500, function () {
            $(".firstShow .end .top").removeClass("firstShowTop");
            $(".firstShow .end .bottom").removeClass("firstShowBottom");
            $(".firstShow").hide();
        });
    }, 4000);
}
//彩色缪斯跳转
function menu_color() {
    location.href = "show1.html";
}
//黑白缪斯跳转
function menu_bw() {
    location.href = "show3.html";
}
//特别缪斯跳转
function menu_special() {
    location.href = "show2.html";
}
//拨打电话
function call() {
    location.href = "tel:88888888";
}
//lbs跳转
function lbs() {
    location.href = "lbs.html";
}


/*-------------------------------------------------------------------------------------------------*/
//图片展示部分

var setPlay,
    doing = true,
    arr = [2, 2], /*模块矩阵横竖数量*/
    speed = 800; /*切换速度*/
    delayTime = 3000;

var playImg = { "play": "images/icon_play.png", "stop": "images/icon_stop.png" };

//下一张
function stageGo(){
    $(".stage .showstage").eq(0).delay(1).animate({"width":"0","left":"50%","opactiy":"0",},speed,function(){$(this).css({"width":"50%","height":"50%","left":"0","top":"0%",})});
    $(".stage .showstage").eq(1).delay(2).animate({"height":"0","top":"50%","opactiy":"0",},speed,function(){$(this).css({"width":"50%","height":"50%","left":"50%","top":"0%",})});
    $(".stage .showstage").eq(2).delay(3).animate({ "height": "0", "opactiy": "0", }, speed, function () { $(this).css({ "width": "50%", "height": "50%", "left": "0", "top": "50%", }) });
    $(".stage .showstage").eq(3).delay(4).animate({ "width": "0", "opactiy": "0", }, speed, function () { $(this).css({ "width": "50%", "height": "50%", "left": "50%", "top": "50%", }) });
}

//自动播放执行函数
function goNext() {
    stage_liLength = $(".showList li").length, active_index = $(".showList .active").index();
    var stageImg = img[active_index], nextImg; nextImg = img[active_index + 1];
    setTimeout(function () {
        if (active_index == stage_liLength - 1) { $(".showList ul li").removeClass("active").eq(0).addClass("active") } else { $(".showList ul li").removeClass("active").eq(active_index + 1).addClass("active") }
    }, 100);
    if (doing) {
        doing = false; $(".stage .showstage").css({ "background": "url(" + stageImg + ")", "backgroundSize": " 200% 200%", });
        for (var i = 0; i < arr[0] * arr[1]; i++) {
            if (i == 0) { $(".stage .showstage").eq(i).css({ "backgroundPosition": " 0% 0%", }) }
            else if (i == 1) { $(".stage .showstage").eq(i).css({ "backgroundPosition": " 100% 0%", }) }
            else if (i == 2) { $(".stage .showstage").eq(i).css({ "backgroundPosition": " 0% 100%", }) }
            else if (i == 3) { $(".stage .showstage").eq(i).css({ "backgroundPosition": " 100% 100%", }) }
        }
        setTimeout(function () { stageShowFunc() }, 5);
    } else { }
}
function goBack() {
    stage_liLength = $(".showList li").length, active_index = $(".showList .active").index();
    var stageImg = img[active_index], nextImg; nextImg = img[active_index - 1];
    setTimeout(function () {
        if (active_index ==0) { $(".showList ul li").removeClass("active").eq(stage_liLength - 1).addClass("active") } else { $(".showList ul li").removeClass("active").eq(active_index -1).addClass("active") }
    }, 100);
    if (doing) {
        doing = false; $(".stage .showstage").css({ "background": "url(" + stageImg + ")", "backgroundSize": " 200% 200%", });
        for (var i = 0; i < arr[0] * arr[1]; i++) {
            if (i == 0) { $(".stage .showstage").eq(i).css({ "backgroundPosition": " 0% 0%", }) }
            else if (i == 1) { $(".stage .showstage").eq(i).css({ "backgroundPosition": " 100% 0%", }) }
            else if (i == 2) { $(".stage .showstage").eq(i).css({ "backgroundPosition": " 0% 100%", }) }
            else if (i == 3) { $(".stage .showstage").eq(i).css({ "backgroundPosition": " 100% 100%", }) }
        }
        setTimeout(function () { stageShowFunc() }, 5);
    } else { }
}

//手动切换
function stageShowFunc() {
    $(".stage").show();
    stageGo();
    setTimeout(function () {
        $(".stage").css({ "display": "none", }).find(".showstage").css({ "opactiy": "1", });
        $(".backHome").show(); doing = true
    }, speed - 1);
}


//自动播放按钮监听
$(".showBtn").click(function () {
    if ($(this).hasClass("play")) {//播放
        $(this).removeClass("play").find("img").attr("src", playImg.stop);
        setPlay = setInterval(function () { goNext() }, delayTime);
    } else {//停止
        $(this).addClass("play").find("img").attr("src", playImg.play);
        clearInterval(setPlay);
    }
});

//监听左右切换
touch.on($(".showList"), "swipeleft swiperight", function (ev) {
    ev.preventDefault();
    stage_liLength = $(".showList li").length,
    active_index = $(".showList .active").index();

    var stageImg = img[active_index],
        nextImg;
    if (ev.type == "swipeleft") {
        nextImg = img[active_index + 1];
        setTimeout(function () {
            if (active_index == stage_liLength - 1) { $(".showList ul li").removeClass("active").eq(0).addClass("active") }
            else { $(".showList ul li").removeClass("active").eq(active_index + 1).addClass("active") }
        }, 100)
    } else if (ev.type == "swiperight") {
            nextImg = img[active_index - 1]; setTimeout(function () { if (active_index == 0) { $(".showList ul li").removeClass("active").eq(stage_liLength - 1).addClass("active") } else { $(".showList ul li").removeClass("active").eq(active_index - 1).addClass("active") } }, 100)
    } else { return }
    if (doing) {
        doing = false;
        $(".stage .showstage").css({ "background": "url(" + stageImg + ")", "backgroundSize": " 200% 200%", });
        for (var i = 0; i < arr[0] * arr[1]; i++) {
            if (i == 0) { $(".stage .showstage").eq(i).css({ "backgroundPosition": " 0% 0%", }) }
            else if (i == 1) { $(".stage .showstage").eq(i).css({ "backgroundPosition": " 100% 0%", }) }
            else if (i == 2) { $(".stage .showstage").eq(i).css({ "backgroundPosition": " 0% 100%", }) }
            else if (i == 3) { $(".stage .showstage").eq(i).css({ "backgroundPosition": " 100% 100%", }) }
        } setTimeout(function () { stageShowFunc() }, 5)
    } else { }
    ev.stopPropagation();
});
/*-------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------*/
//中间判定
function inANDout(way) {
    var length = $(".perfume .goods").length - 1,
        now =  parseInt(indexActive),
        next = now + 1;
    if (way == "go") {
        
        if (now == length) {
            next = 0;
        } else {
            next = now + 1;
        }
    } else if (way == "back") {
        if (now ==0) {
            next = length;
        } else {
            next = now - 1;
        }
    }
    animate(now, next);
}

//左右滑动判定
touch.on($(".perfume"), "swipe", function (ev) {
    //changed判断变化中
    console.log(ev);
    if (changed) {
        changed = false;
        if (ev.direction == "left") {
            inANDout("go");
        } else if (ev.direction == "right") {
            inANDout("back");
        }
    } else {
    }
});



//二维码点击事件
    
