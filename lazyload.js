/*图片延迟加载
 * 
 * 标签 <img data-src="" />
 * 初始化执行 global.lazyload(范围对象);
 * 
 * */
lazyload = function(range){
    if(typeof range != "object") range = $('body');
    function lazyload() {
        this.config = {'attrName': 'data-src','nodeName': 'img'};
        this.lazyloader = function() {
            var a = $('img['+this.config.attrName+']',range),
                len = a.length,
                node = null;
            if (len == 0) {
                $(window).off('scroll',$.proxy(this.lazyloader,this));
                $(window).off('resize',$.proxy(this.lazyloader,this));
                $(document.body).off('touchmove',$.proxy(this.lazyloader,this));
                return;
            }
            var height = $(document.body).scrollTop() + document.documentElement.clientHeight;
            for (var i = 0; i < len; ++i) {
                node = $(a[i]);
                var nodeTop = node.offset().top;
                if (height >= nodeTop) {
                    var src = node.attr(this.config.attrName);
                    node.attr({'src':src,'data-src':''});
                    node.removeAttr(this.config.attrName);
                }
            }
        };
        this.bindEvent = function() {
            $(window).on('scroll',$.proxy(this.lazyloader,this));
            $(window).on('resize',$.proxy(this.lazyloader,this)); 
            $(document.body).on('touchmove',$.proxy(this.lazyloader,this));
        }
    };

    var loader = new lazyload();
    loader.lazyloader();
    loader.bindEvent();
};
