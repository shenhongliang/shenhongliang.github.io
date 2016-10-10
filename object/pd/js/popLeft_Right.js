/// <reference path="popLeft_Right.js" />
 

function Swipe(container, options) {
   
  // utilities
  var noop = function() {}; // 无操作--函数
  var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // offload a functions execution
  
  // 检查浏览器功能 是否支持 TouchEvent事件
  var browser = {
    addEventListener: !!window.addEventListener,
    touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    transitions: (function(temp) {
      var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
      for (var i in props) if (temp.style[props[i]] !== undefined) return true;
      return false;
    })(document.createElement('swipe'))
  };

  // 如果没有根 元素
  if (!container) return;
  var element = container.children[0];
  var slides, slidePos, width, length;
  options = options || {};
  var index = parseInt(options.startSlide, 10) || 0;
  var speed = options.speed || 300;
  options.continuous = options.continuous !== undefined ? options.continuous : true;

  function setup() {

    // 幻灯片缓存
    slides = element.children;
    length = slides.length;
    // 设置连续为  假如只有一个幻灯片
    if (slides.length < 2) options.continuous = false;

      //特殊情况下如果两个幻灯片
    if (browser.transitions && options.continuous && slides.length < 3) {
      element.appendChild(slides[0].cloneNode(true));
      element.appendChild(element.children[1].cloneNode(true));
      slides = element.children;
    }

      // 创建一个数组来存储当前位置的每个幻灯片
    slidePos = new Array(slides.length); 
      // 确定每个幻灯片的宽度
    width = container.getBoundingClientRect().width || container.offsetWidth;

    element.style.width = (slides.length * width) + 'px';

      // 堆--栈元素
    var pos = slides.length;
    while(pos--) {

      var slide = slides[pos];

      slide.style.width = width + 'px';
      slide.setAttribute('data-index', pos);

      if (browser.transitions) {
        slide.style.left = (pos * -width) + 'px';
        move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
      }

    }

      //重新定位元素之前和之后的指数
    if (options.continuous && browser.transitions) {
      move(circle(index-1), -width, 0);
      move(circle(index+1), width, 0);
    }

    if (!browser.transitions) element.style.left = (index * -width) + 'px';

    container.style.visibility = 'visible';

  } 

  function prev() {

    if (options.continuous) slide(index-1);
    else if (index) slide(index-1);

  }   //上一个

  function next() {

    if (options.continuous) slide(index+1);
    else if (index < slides.length - 1) slide(index+1);

  }   //下一个

  function circle(index) {

    // 计算幻灯片长度
    return (slides.length + (index % slides.length)) % slides.length;

  }     // 计算幻灯片长度

  function slide(to, slideSpeed) {
      
      // 如果已经在请求的幻灯片   则 无操作
    if (index == to) return;
    if (browser.transitions) {

      var direction = Math.abs(index-to) / (index-to); // 1: backward, -1: forward 
        // 得到实际的位置,滑
      if (options.continuous) {
        var natural_direction = direction;
        direction = -slidePos[circle(to)] / width; 
          // 如果前进 to < index, 指向的页面 to = slides.length + to
          // 如果倒退   to > index, 指向的页面 to = -slides.length + to
        if (direction !== natural_direction) to =  -direction * slides.length + to;

      }

      var diff = Math.abs(index-to) - 1;

        //所有幻灯片之间索引和正确的方向   调整方向
      while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);
            
      to = circle(to);

      move(index, width * direction, slideSpeed || speed);
      move(to, 0, slideSpeed || speed);

      if (options.continuous) move(circle(to - direction), -(width * direction), 0); // 需要获得下一个位置
    
    } else {     
      
      to = circle(to);
      animate(index * -width, to * -width, slideSpeed || speed);
        //循环连续   如果浏览器不接受过渡
    }

    index = to; 
    offloadFn(options.callback && options.callback(index, slides[index]));
  }

  function move(index, dist, speed) {

    translate(index, dist, speed);
    slidePos[index] = dist; 
  }

  function translate(index, dist, speed) {

    var slide = slides[index];
    var style = slide && slide.style;

    if (!style) return;

    style.webkitTransitionDuration = 
    style.MozTransitionDuration = 
    style.msTransitionDuration = 
    style.OTransitionDuration = 
    style.transitionDuration = speed + 'ms';

    style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
    style.msTransform = 
    style.MozTransform = 
    style.OTransform = 'translateX(' + dist + 'px)';

  }

  function animate(from, to, speed) {

      // 如果不是一个动画,只是重新定位
    if (!speed) {

      element.style.left = to + 'px';
      return;

    }
    
    var start = +new Date;
    
    var timer = setInterval(function() {

      var timeElap = +new Date - start;
      
      if (timeElap > speed) {

        element.style.left = to + 'px';

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

        clearInterval(timer);
        return;

      }

      element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';

    }, 4);

  }

    //设置自动幻灯片
  var delay = options.auto || 0;
  var interval;

  function begin() {

    interval = setTimeout(next, delay);

  }

  function stop() {

    delay = 0;
    clearTimeout(interval);

  }


    // 设置初始var
  var start = {};
  var delta = {};
  var isScrolling;      

    // 设置事件捕获   捕获触摸事件
  var events = {

    handleEvent: function(event) {

      switch (event.type) {
        case 'touchstart': this.start(event); break;
        case 'touchmove': this.move(event); break;
        case 'touchend': offloadFn(this.end(event)); break;
        case 'webkitTransitionEnd':
        case 'msTransitionEnd':
        case 'oTransitionEnd':
        case 'otransitionend':
        case 'transitionend': offloadFn(this.transitionEnd(event)); break;
        case 'resize': offloadFn(setup.call()); break;
      }

      if (options.stopPropagation) event.stopPropagation();

    },
    start: function(event) {

      var touches = event.touches[0];

        //尺寸开始值

      start = {

          // 得到初始触摸坐标
        x: touches.pageX,
        y: touches.pageY,

          // 存储时间确定触摸持续时间
        time: +new Date

      };
      
        // 用于测试的第一步事件
      isScrolling = undefined;

        //测量结束   重置
      delta = {};

        // 附上touchmove和touchend 监听事件
      element.addEventListener('touchmove', this, false);
      element.addEventListener('touchend', this, false);

    },
    move: function(event) {

        // 确保一个触摸  
      if ( event.touches.length > 1 || event.scale && event.scale !== 1) return

      if (options.disableScroll) event.preventDefault();

      var touches = event.touches[0];

        // 测量改变的   x和y  值
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      }

        // 确定测试运行——一个滚动时间测试
      if ( typeof isScrolling == 'undefined') {
        isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
      }

        // 如果用户没有试图垂直滚动
      if (!isScrolling) {

          // 防止本机滚动
        event.preventDefault();

          // 停止幻灯片
        stop();

          //  如果第一或最后一张幻灯片
        if (options.continuous) { //  最后

          translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);

        } else {

          delta.x = 
            delta.x / 
              ((!index && delta.x > 0               // 如果第一张幻灯片和滑动离开
                || index == slides.length - 1        //  如果最后一张幻灯片 滑动正确
                && delta.x < 0                       // 如果滑动
              ) ?                      
              (Math.abs(delta.x) / width + 1)      // 确定水平阻力
              : 1);                                 // 如果没有阻力
          
          // 调用 1:1
          translate(index-1, delta.x + slidePos[index-1], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(index+1, delta.x + slidePos[index+1], 0);
        }

      }

    },
    end: function(event) {

        // 测量持续时间

      var duration = +new Date - start.time;

        // 确定滑动尝试触发下一个/上一页滑动

      var isValidSlide = 
            Number(duration) < 250               //如果幻灯片持续时间少于250 ms
            && Math.abs(delta.x) > 20            // 如果幻灯片amt大于20 px

            || Math.abs(delta.x) > width / 2;      // 或者如果滑amt大于宽度的一半

        // 确定滑动尝试是过去的开始和结束
      var isPastBounds = 
            !index && delta.x > 0                            // 如果第一张幻灯片,幻灯片amt大于0
            || index == slides.length - 1 && delta.x < 0;    // 或者如果最后一张幻灯片,幻灯片amt小于0


      if (options.continuous) isPastBounds = false;
      
        // 确定方向的刷卡(真实:对,假:左)
      var direction = delta.x < 0;
         

        // 如果不垂直滚动
      if (!isScrolling) {

        if (isValidSlide && !isPastBounds) {

          if (direction) {

              if (options.continuous) { // 我们需要获得下一个这个方向
                   
              move(circle(index-1), -width, 0);
              move(circle(index + 2), width, 0);
              //if (options.continuous) slide(index + 1);
                  //else if (index < slides.length - 1) slide(index + 1);
              var test = index + 2; 

            } else {
                  move(index - 1, -width, 0);
                  test = index - 2; 
            }

            move(index, slidePos[index]-width, speed);
            move(circle(index+1), slidePos[circle(index+1)]-width, speed);
            index = circle(index+1);  
                      
          } else {
              if (options.continuous) { // 需要获得下一个这个方向  
              move(circle(index+1), width, 0);
              move(circle(index-2), -width, 0);

            } else {
              move(index+1, width, 0);
            }

            move(index, slidePos[index]+width, speed);
            move(circle(index-1), slidePos[circle(index-1)]+width, speed);
            index = circle(index-1);

          }

          options.callback && options.callback(index, slides[index]);

        } else {

          if (options.continuous) {

            move(circle(index-1), -width, speed);
            move(index, 0, speed);
            move(circle(index+1), width, speed);

          } else {

            move(index-1, -width, speed);
            move(index, 0, speed);
            move(index+1, width, speed);
          }

        }

      }

        // 删除 touchmove和touchend事件监听器,直到touchstart再次调用
      element.removeEventListener('touchmove', events, false)
      element.removeEventListener('touchend', events, false)

    },
    transitionEnd: function(event) {

      if (parseInt(event.target.getAttribute('data-index'), 10) == index) {
        
        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

      }

    }

  }

    // 触发设置
  setup();

    // 开始自动幻灯片
  if (delay) begin();


    // 添加事件监听器
  if (browser.addEventListener) {
    
      // 设置touchstart事件元素

    if (browser.touch) element.addEventListener('touchstart', events, false);

    if (browser.transitions) {
      element.addEventListener('webkitTransitionEnd', events, false);
      element.addEventListener('msTransitionEnd', events, false);
      element.addEventListener('oTransitionEnd', events, false);
      element.addEventListener('otransitionend', events, false);
      element.addEventListener('transitionend', events, false);
    }

      //设置在窗口调整大小事件
    window.addEventListener('resize', events, false);

  } else {

    window.onresize = function () { setup() }; //  

  }

  //  
  return {
    setup: function() {

      setup();

    },
    slide: function(to, speed) {
      
        // 取消幻灯片
      stop();
      
      slide(to, speed);

    },
    prev: function() {

        // 取消幻灯片

      stop();

      prev();

    },
    next: function() {

        // 取消幻灯片

      stop();

      next();

    },
    getPos: function() {

        // 返回当前索引位置
      return index;

    },
    getNumSlides: function() {
      
        // 返回幻灯片总数
      return length;
    },
    kill: function() {

        // 取消幻灯片
      stop();

        // 复位元件
      element.style.width = 'auto';
      element.style.left = 0;

        // 复位幻灯片
      var pos = slides.length;
      while(pos--) {

        var slide = slides[pos];
        slide.style.width = '100%';
        slide.style.left = 0;

        if (browser.transitions) translate(pos, 0, 0);

      }

        //删除事件监听器
      if (browser.addEventListener) {

          // 删除当前的事件监听器

        element.removeEventListener('touchstart', events, false);
        element.removeEventListener('webkitTransitionEnd', events, false);
        element.removeEventListener('msTransitionEnd', events, false);
        element.removeEventListener('oTransitionEnd', events, false);
        element.removeEventListener('otransitionend', events, false);
        element.removeEventListener('transitionend', events, false);
        window.removeEventListener('resize', events, false);

      }
      else {

        window.onresize = null;

      }

    }
  }

}


if ( window.jQuery || window.Zepto ) {
  (function($) {
    $.fn.Swipe = function(params) {
      return this.each(function() {
        $(this).data('Swipe', new Swipe($(this)[0], params));
      });
    }
  })( window.jQuery || window.Zepto )
}
