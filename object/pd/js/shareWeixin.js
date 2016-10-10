window.shareData = {
    "imgUrl": "http://exp.lomark.cn/show/images/ico16.png",
    "timeLineLink": "http://exp.lomark.cn/show/dtModel7/index.html",
    "tTitle": document.title + " — 点媒Lomark",
    "tContent": "领衔行业新技术  创意广告引导者——点媒广告模板库",
};
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 发送给好友;
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": window.shareData.imgUrl,
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent || window.location.href,
            "title": window.shareData.tTitle || document.title,
        }, function (res) {
        })
    });
    // 分享到朋友圈;
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": window.shareData.imgUrl,
            "img_width": "240",
            "img_height": "240",
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent || window.location.href,
            "title": window.shareData.tTitle || document.title,
        }, function (res) {
        });
    });
}, false);