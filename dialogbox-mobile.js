
/* 对话弹窗
 * 1.htm内容：
 * $.dialogbox('html','class','function','title');
 *
 * 2.alert对话框：
 * $.dialogbox.msg({
 *         title:,
 *         content:'',
 *         klass:'',
 *         time:3000,
 *         btn:['确定','取消'],
 *         call:[
 *             function(){
 *                  //do something 
 *             },
 *             function(){
 *                   //do something     
 *             }
 *         ],
 *         closeCall:function(){
 *                     //do something     
 *         }
 * });
 *
 * 3.提示：
 * $.dialogbox.prompt({
 *      content:'请填写账号！',
 *      time:2000 //自动延迟隐藏时间
 * });
 *
 * 4.遮盖提示：
 * $.dialogbox.mark({
 *      content:'',
 *      callback:function(){
 *          //do something     
 *      }
 * });
 */
 var promptAuto;
(function($){
    $.dialogbox = function(data, klass, callback, title){
            $.dialogbox.loading();
            $.dialogbox.init();
            $.dialogbox.reveal(data, klass, callback, title);
            $.dialogbox.callback=callback;
    };
    $.extend($.dialogbox,{
        settings:{
            dialogboxHtml :'\
            <div id="dialogbox" class="dialogbox" style="display:none;">\
                <div class="dialogbox-main">\
                    <div class="dialogbox-wrap">\
                        <div class="dialogbox-title">提示</div>\
                        <div class="dialogbox-body"></div>\
                    </div>\
                </div>\
            </div>'
        },
        msg:function(data,always){
            var tipsHtml = btnHtml = '';
            if(data && data.time) {
                setTimeout(function(){
                    $.dialogbox.close();
                },data.time);
            }
            if(data && data.content){
                tipsHtml = '<div class="dialogbox-tips">'+data.content+'</div>';
            }
            if(data && data.btn && data.btn instanceof Array){
                btnHtml ='<div class="dialogbox-btn g-border g-border-t">';
                for (var lenBtn = 0; lenBtn < data.btn.length; lenBtn++) {
                    var btnName = data.btn[lenBtn];
                    btnHtml += '<a class="g-border g-border-l">'+btnName+'</a>';
                }
                btnHtml += '</div>';
            }
            if(!$('.dialogbox').length) $('body').append($.dialogbox.settings.dialogboxHtml);
            $(".dialogbox-body").html(tipsHtml + btnHtml);
            if(data && data.title){
                $('.dialogbox-title').html(data.title);
            }else{
                $('.dialogbox-title').remove();
            }
            $('.dialogbox').on('click','.dialogbox-btn a',function(){
                var aIndex = $(this).index();
                if(data.call && data.call instanceof Array && data.call.length>=aIndex){
                    var callback = data.call[aIndex];
                    if(callback instanceof Function)
                        $.dialogbox.callback = callback;
                }
                $.dialogbox.close();
            });            
            if(data && data.klass) $(".dialogbox").addClass(data.klass);
            if(data && data.closeCall instanceof Function){
                $.dialogbox.callback=data.closeCall;
            }
            $.dialogbox.init();
        },
        prompt:function(data){
            var content = data ? data.content ? data.content : '' : '',
                time = data ? data.time ? data.time : 2000 : '';
            $(".dialogPrompt").remove();
            $('body').append('<div class="dialogPrompt">'+content+'</div>');
            $('.dialogPrompt').css({marginLeft:($(window).width()  - $('.dialogPrompt').width())/2}).addClass('dialogPromptIn');
            if(time){
                clearTimeout(promptAuto);
                promptAuto = setTimeout(function(){
                    $('.dialogPrompt').removeClass('dialogPromptIn');
                    setTimeout(function(){
                        $('.dialogPrompt').remove();
                    },500);
                },time);
            }
        },
        mark:function(data){
            var content =''
            if(data && data.content) content = data.content;
            if(!$('.dialogbox').length) $('body').append($.dialogbox.settings.dialogboxHtml);
            $('.dialogbox-wrap').html(content).addClass('dialogbox-wrap-free');
            $('.dialogbox').on('click',function(){
                if(data && data.callback instanceof Function)
                    $.dialogbox.callback = data.callback;
                $.dialogbox.close();
            });
            $.dialogbox.init();
            $('.dialogbox-overlay').css({'background':'rgba(0,0,0,.8)'});
        },
        init:function(){
            $(".dialogbox").show().addClass('dialogbox-show');
            if(!$(".dialogbox-overlay").length) $("body").append('<div class="dialogbox-overlay"></div>');
        },
        loading:function(){
            if(!$(".dialogbox").length) $('body').append($.dialogbox.settings.dialogboxHtml);
            $(".dialogbox-body").html('<div class="dialogbox-loading"></div>');
        },
        reveal:function(data,klass,callback,title){
            $(".dialogbox-body").html(data);
            if(title) {
                $('.dialogbox-title').html(title);
            }else{
                $('.dialogbox-title').remove();
            }
            if(klass) $(".dialogbox").addClass(klass);
        },
        close:function(){
            $(".dialogbox,.dialogbox-overlay").remove();
            if($.dialogbox.callback){
                $.dialogbox.callback();
                $.dialogbox.callback = null;
            }
        }
    });
})(Zepto);
