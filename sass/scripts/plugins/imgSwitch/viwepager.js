/*
    选择控件（单选多选等）
*/
; (function ($) {
    $.extend({
        imgSwitch: function (options) {
            options = $.extend({
                data: [], //数据源（数组）,包含内容有：text，tab标题，value为tab内容，isSelect为tab当前选中
                container: {} //承载控件的容器（jquery对象）
            }, options);
            var tabObj = {
                //初始化控件
                selectedData: [],
                init: function () {
                    var _this = this;
                    //1.加载dom
                    options.container.html('<div class="hiddenWrap"><ul id="slide"></ul><ul id="slideCopy"></ul></div>');
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
                    $('ul#slide', options.container).html(htmlStr);
                    $('ul#slideCopy', options.container).html(htmlStr);
                    //3.绑定事件
                    _this.bindEvents($('ul#slide', options.container),$('ul#slideCopy', options.container));
                }
                //绑定事件
                , bindEvents: function (oTabT,oTabC) {
                    var that = this;
                    this.oUl = oTabT;
                    this.oUlCopy = oTabC;
                    this.oLi = $('li',this.oUl);
                    this.oImg = $('li img',this.oUl);
                    this.oWidth = this.getLiWidth(oTabT);
                    this.len = this.oLi.length;
                    oTabT.css('width',this.len*this.oWidth);
                    oTabC.css('width',this.len*this.oWidth);
                    oTabC.css('left',this.len*this.oWidth);
                    this.index = 0;
                    this.maxMove = false;
                    this.minIndex = 0;
                    this.timer = null;
                    that.move(that.oUl);
                }
                ,getLiWidth : function(obj){
                    var that = this,
                    oWidth = 2*parseInt(that.oLi.css('padding'))+parseInt(that.oImg.css('width'));
                    return oWidth;
                },
                move : function(obj){
                    var that = this,
                    index = 0,
                    moveObj = $(obj);
                    window.clearInterval(that.timer);
                    that.oUlCopy.innerHTML = obj.innerHTML;
                    that.timer = window.setInterval(function(){
                        index = that.index--;
                        that.startMove(moveObj,index);  
                    },100);
                },
                startMove : function(obj,index){
                    var that = this;
                    obj.css('left',index);
                    $(that.oUlCopy).css('left',that.len*that.oWidth+index);
                    if(-index >= parseInt(obj.css('width'))){
                        that.index = 0;
                    }
                }
            }
            return tabObj.init();
        }
    });
})(jQuery);