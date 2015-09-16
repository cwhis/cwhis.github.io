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
                    options.container.html('<div class="hiddenWrap"></div><ul id="imgTab"></ul>');
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
                        if(options.data[i].isSelect){
                            $('div.hiddenWrap', options.container).html('<img src="../scripts/plugins/imgSwitch/'+options.data[i].img+'" alt="" />');
                            htmlStr += '<li class="cur"><a href="javascript:;"><img src="../scripts/plugins/imgSwitch/'+options.data[i].img+'" alt=""></a></li>';
                        }else{
                            htmlStr += '<li><a href="javascript:;"><img src="../scripts/plugins/imgSwitch/'+options.data[i].img+'" alt=""></a></li>';

                        }
                    }
                    $('ul#imgTab', options.container).html(htmlStr);
                    //3.绑定事件
                    _this.bindEvents($('div.hiddenWrap', options.container),$('ul#imgTab', options.container));
                }
                //绑定事件
                , bindEvents: function (oImgW,oImgC) {
                    var that = this;
                    this.oUl = oImgC;
                    this.oImg = $('img',oImgW);
                    this.oLi = $('li',this.oUl);
                    this.switchs(this.oImg);
                    this.index = 0;
                }
                ,switchs : function(objImg){
                    var that = this;
                    for(var i=0;i<that.oLi.length;i++){
                        that.oLi.index = i;
                        $(that.oLi[i]).click(function(){
                            $(that.oLi).removeClass('cur');
                            $(this).addClass('cur');
                            objImg.attr('src',$('img',this).attr('src'));
                        });
                    }
                }
            }
            return tabObj.init();
        }
    });
})(jQuery);