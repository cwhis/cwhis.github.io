/*
    选择控件（单选多选等）
*/
; (function ($) {
    $.extend({
        imgSwitch: function (options) {
            options = $.extend({
                data: [], //数据源（数组）,包含内容有：value为图片内容，isSelect为tab当前选中
                container: {} //承载控件的容器（jquery对象）
            }, options);
            var tabObj = {
                //初始化控件
                selectedData: [],
                init: function () {
                    var _this = this;
                    //1.加载dom
                    options.container.html('<div class="hiddenWrap"><div class="leftBtn btn"><</div><div class="rightBtn btn">></div><ul id="switch"></ul><ul id="switchCopy"></ul></div>');
                    //2.绑定数据源
                    _this.bindData();
                    return _this;
                }
                //绑定数据源
                , bindData: function () {
                    var _this = this;
                    if (options.data.length == 0) {
                        return;
                    }
                    var htmlStr = '';
                    //加载数据
                    for (var i = 0; i < options.data.length; i++) {
                        htmlStr += '<li><a href="javascript:;"><img src="../scripts/plugins/imgSwitch/'+options.data[i]+'" alt=""></a></li>';
                    }
                    $('ul#switch', options.container).html(htmlStr);
                    //3.绑定事件
                    _this.bindEvents($('.hiddenWrap'));
                },
                //绑定事件
                bindEvents: function (oDiv) {
                    var that = this;
                    this.oUl = $('ul#switch',oDiv);
                    this.leftBtn = $('.leftBtn',oDiv);
                    this.rightBtn = $('.rightBtn',oDiv);
                    this.oUlCopy = $('switchCopy',oDiv);
                    this.oLi = $('li',this.oUl);
                    this.oImg = $('li img',this.oUl);
                    this.len = this.oLi.length;
                    this.oWidth = parseInt(this.oImg.css('width')) + 2*parseInt(this.oLi.css('padding'));
                    this.oUl.css('width',this.len*this.oWidth);
                    this.index = 0;
                    this.oUl.css('left',this.index);
                    this.switchs = true;
                    this.move(this.oUl);
                },
                getLiWidth : function(obj){
                    var that = this,
                    oWidth = 2*parseInt(that.oLi.css('padding'))+parseInt(that.oImg.css('width'));
                    return oWidth;
                },
                move : function(obj){
                    var that = this,
                    wrapWidth = parseInt($('.hidden').css('width'));
                    that.leftBtn.click(function(){
                        that.index--;
                        if(!parseInt(obj.css('left'))){
                            that.index = that.index+1;
                            return that.index;
                        }
                        that.startMove(obj,that.index);
                    });
                    that.rightBtn.click(function(){
                        that.index++;
                        if(-parseInt(obj.css('left'))+5 > wrapWidth){
                            that.index = that.index-1;
                            return that.index;
                        }
                        that.startMove(obj,that.index);
                    });

                },
                startMove : function(obj,indx){
                    var that = this;
                    window.setTimeout(function(){
                        obj.animate({
                            left : -indx * that.oWidth + 'px'
                        }, 500);
                    }, 50);
                }
            }
            return tabObj.init();
        }
    });
})(jQuery);