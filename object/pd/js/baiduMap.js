//------------------------------------------
//名称: 百度地图自定义接口
//版本: v1.2
//时间: 2014年10月16日16:27:10
//作者: Leon
//------------------------------------------

//调用: lbs(113.958765, 22.539492, "深圳市东信时代信息技术有限公司", "地址:深圳市南山区豪威科技大厦22楼",260,50);//前4项必填
//      html中须有id为mapArea的div,引入<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.4"></script>,宽度调节

var heigth = $(window).height();
$("#mapArea").css("height", heigth * 1 + "px");

function lbs(x, y, t, c, w, h) {
    var lbsX = x,
        lbsY = y,
        title = t,
        content = c,
        width = w || 140,
        height = h || 60;
    creatMap(lbsX, lbsY, title, content, width, height);
    addDriver(lbsX, lbsY);
}
function creatMap(lbsX, lbsY, title, content, width, height) {
    var map = new BMap.Map("mapArea");//生成Map对象，指定显示区域的容器，在百度地图容器中创建一个地图
    map.enableScrollWheelZoom();

    var point = new BMap.Point(lbsX, lbsY);//定义一个中心点坐标
    map.centerAndZoom(point, 17); //以坐标点为中心显示地图，并设定缩放级别，范围3-19
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);

    var opts = {
        width: width,     // 信息窗口宽度
        height: height,     // 信息窗口高度
        title: title, // 信息窗口标题
    }
    var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象

    marker.addEventListener("click", function () {
        marker.openInfoWindow(infoWindow);
    });
    marker.openInfoWindow(infoWindow);


    return window.map = map;//将map变量存储在全局
}

//绘制用户当前位置至目标位置的路线
function addDriver(lbsX, lbsY) {
    var origin = "0,0";
    var origin_region = "";
    var gectrl = new BMap.GeolocationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        enableAutoLocation: true
    });

    //map.addControl(gectrl); //添加定位控件 

    var myCity = new BMap.LocalCity();
    myCity.get(function (result) { origin_region = result.name; });
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            origin = r.point.lng + "," + r.point.lat;
            var p1 = new BMap.Point(r.point.lng, r.point.lat);
            var p2 = new BMap.Point(lbsX, lbsY);
            var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } });
            driving.search(p1, p2);
        }
    })
}
