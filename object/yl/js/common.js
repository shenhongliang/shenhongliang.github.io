//移动端版本兼容 START
var phoneWidth = parseInt(window.screen.width);
var phoneScale = phoneWidth/750;

var ua = navigator.userAgent;
if (/Android (\d+\.\d+)/.test(ua)){
	var version = parseFloat(RegExp.$1);
	// andriod 2.3
	if(version>2.3){
		document.write('<meta name="viewport" content="width=750, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
	// andriod 2.3以上
	}else{
		document.write('<meta name="viewport" content="width=750, target-densitydpi=device-dpi">');
	}
	// 其他系统
} else {
	document.write('<meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi">');
}
//移动端版本兼容 END