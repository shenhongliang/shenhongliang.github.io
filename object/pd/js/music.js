//音乐
var musicOpen = true;
var audio = document.createElement('audio');
var source = document.createElement('source');
source.type = "audio/mpeg";
source.type = "audio/mpeg";
source.src = "audio/music.mp3";
source.autoplay = "autoplay";
source.controls = "controls";
source.loop="loop";
audio.appendChild(source);
audio.play();
$(".icon-music").click(function () {
    if (musicOpen) {
        musicOpen = false;
        if ($(this).hasClass("turn")) {
            $(this).removeClass("turn");
            $(".music-tip").text("关闭").addClass("music-tip-animate");
            audio.pause();
            setTimeout(function () {
                $(".music-tip").text("").removeClass("music-tip-animate");
                musicOpen = true;
            }, 701);
        } else {
            $(this).addClass("turn");
            $(".music-tip").text("开启").addClass("music-tip-animate");
            audio.play();
            setTimeout(function () {
                $(".music-tip").text("").removeClass("music-tip-animate");
                musicOpen = true;
            }, 701);
        }
    } else {
    }
});