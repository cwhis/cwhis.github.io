/*
    选择控件（单选多选等）
*/
; (function ($) {
    $.extend({
        tabSwitch: function (options) {
            options = $.extend({
                data: [], //数据源（数组）,包含内容有：text，tab标题，value为tab内容，isSelect为tab当前选中
                container: {}, //承载控件的容器（jquery对象）
                type : 'line',//tab样式类型，line线性，box边框
                afterSelect: function (data, selectedData) { },  //选中后执行的事件
            }, options);
            var tabObj = {
                //初始化控件
                selectedData: [],
                init: function () {
                    var _this = this;
                    //1.加载dom
                    if(options.type == "line"){
                        options.container.html('<ul class="nav-line-tabs"></ul><div class="tab-content"></div>');
                    }else{
                        options.container.html('<ul class="nav-box-tabs"></ul><div class="tab-content"></div>');
                    }
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
                    var htmlStrT = '',htmlStrC = '';


                    //加载数据
                    if(options.data.length>0){
                        for (var i = 0; i < options.data.length; i++) {
                            if (options.data[i].isSelect) {
                                htmlStrT += '<li class="active" data-index="'+i+'"><a href="javascript:;" >'+options.data[i].text+'</a></li>';
                                htmlStrC += '<div class="tab-pane" style="display:block;" data-index="'+i+'">'+options.data[i].value+'</div>'
                            } else {
                                htmlStrT += '<li data-index="'+i+'"><a href="javascript:;" >'+options.data[i].text+'</a></li>';
                                htmlStrC += '<div class="tab-pane" data-index="'+i+'">'+options.data[i].value+'</div>';
                            }
                        }
                        $('ul', options.container).html(htmlStrT);
                        $('.tab-content', options.container).html(htmlStrC);
                    }
                    //3.绑定事件
                    _this.bindEvents($('ul'),$('.tab-content'));
                }
                //绑定事件
                , bindEvents: function (oTabT,oTabC) {
                    var _this = this;
                    var oDiv = $('.tab-pane',oTabC);
                    //选中事件
                    oTabT.delegate('li', 'click', function () {
                        $('li',oTabT).removeClass('active');
                        $(this).addClass('active');
                        oDiv.removeClass('active').hide();
                        $(oDiv[$(this).attr('data-index')]).show('1000');
                    });
                }
            }
            return tabObj.init();
        }
    });
})(jQuery);