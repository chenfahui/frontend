
  /*拖动*/ 
  var $handle = $('.plus-btn'),/*拖动对象*/
      isClick = false,/*左键是否按住*/
      defaultX,/*拖动前的x坐标*/
      defaultY,/*拖动前的y坐标*/
      mouseX,/*拖动后的x坐标*/
      mouseY,/*拖动后的y坐标*/
      divTop,/*弹窗拖动前的x坐标*/
      divLeft,/*弹窗拖动前的y坐标*/
      moved = false;/*是否移动过*/
  $handle.on('mousedown touchstart',function(e){/*PC\移动*/
      if($handle.parent('.plus-on').length) return;
      isClick = true;
      moved = false;
      defaultX = e.pageX ? e.pageX : e.touches[0].pageX;
      defaultY = e.pageY ? e.pageY : e.touches[0].pageY;
      divTop = $handle.offset().top;
      divLeft = $handle.offset().left;
      $handle.removeClass('transition');
  });
  $handle.on('touchmove',function(e){/*移动*/
      e.preventDefault();
      if(!isClick) return false;
      mouseX = e.touches[0].pageX;
      mouseY = e.touches[0].pageY;
      plusmove(isClick,mouseX,mouseY);        
  });
  $handle.on('touchend',function(e){/*移动*/
      isClick = false;
  });
  $(document).on('mousemove',function(e){/*PC*/
      e.preventDefault();
      if(!isClick) return false;
      mouseX = e.pageX;
      mouseY = e.pageY;
      plusmove(isClick,mouseX,mouseY);
  });
  $(document).on('mouseup',function(e){/*PC*/
      e.preventDefault();
      isClick = false;
  });
  $handle.on('click',function(){
      if(!moved) $handle.css({top:'',left:'',bottom:'',right:'',opacity:1});
      clearTimeout(plusHideAuto);
  });
  function plusmove(isClick,mouseX,mouseY){
      var left = parseInt(mouseX-defaultX)+divLeft;
      var top = parseInt(mouseY-defaultY)+divTop - $(window).scrollTop();
      moved = true;
      clearTimeout(plusHideAuto);
      if(left < 0)/*防止拖动出左边*/
        left = 0;
      if(top < 0)/*防止拖动出顶部*/
        top = 0;
      if(left+$handle.width() > $(window).width())/*防止拖动出右边*/
        left = $(window).width() - $handle.width();
      if(top+$handle.height() > $(window).height())/*防止拖动出底边*/
        top = $(window).height() - $handle.height();
      if(isClick){/*确认鼠标按住*/
          /*对象被缩放，修正*/
          left -= $handle.width();
          top -= $handle.height();
          /*对象被缩放，修正 end*/
        $handle.css({top:top,left:left,bottom:'auto',right:'auto',opacity:1});
      }
  };
  /*拖动 end*/   
