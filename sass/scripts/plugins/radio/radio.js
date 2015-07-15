/*
    选择控件（单选多选等）
*/
; (function ($) {
    $.extend({
        radioSelect: function (options) {
            options = $.extend({
                skin: 'blue',//默认皮肤
                data: [], //数据源（数组），{ value: "1", text: "数据项", isSelect: true },参数：value数据的值，text数据的显示文本，isSelect是否为选中项
                container: {}, //承载控件的容器（jquery对象）
                max: -1, //最多允许的选择个数，小于等于0代表不限制
                afterSelect: function (data, selectedData) { },  //选中后执行的事件，参数data为数组：数组中的每一项包括：value数据的值，text数据的显示文本，格式为[{value: '',text: ''}]
                cancelSelect: function (data, canceledData) { }     //取消选中后执行的事件，参数data为数组：数组中的每一项包括：value数据的值，text数据的显示文本，格式为[{value: '',text: ''}]
            }, options);
            var radioObj = {
                //初始化控件
                selectedData: [],
                init: function () {
                    var _this = this;
                    //1.加载dom
                    options.container.html('<ul class="plugin-radioOptions"></ul>');
                    //2.绑定数据源
                    _this.bindData();
                    //3.绑定事件
                    _this.bindEvents();
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
                        if (options.data[i].isSelect) {
                            htmlStr += '<li class="active" value="' + options.data[i].value + '" title="' + options.data[i].text + '"><span><i></i></span>' + options.data[i].text + '</li>';
                            _this.selectedData.push({ value: options.data[i].value, text: options.data[i].text });
                        } else {
                            htmlStr += '<li title="' + options.data[i].text + '" value="' + options.data[i].value + '"><span><i></i></span>' + options.data[i] .text + '</li>';
                        }
                    }
                    $('ul', options.container).html(htmlStr);
                }
                //绑定事件
                , bindEvents: function () {
                    var _this = this;
                    //选中事件
                    $('ul', options.container).delegate('li', 'click', function () {
                        _this.doLiClickRadio($(this));
                    });
                }
                //选项点击事件（单选）
                , doLiClickRadio: function (ele) {
                    var _this = this;
                    if (ele.hasClass('active')) return;
                    ele.siblings(".active").removeClass('active').css("cursor", "pointer");
                    ele.addClass('active').css("cursor", "default");
                    _this.selectedData = [];
                    _this.selectedData.push({ value: ele.attr('value'), text: ele.text() });
                    if (typeof options.afterSelect == 'function') {
                        options.afterSelect(_this.selectedData);
                    }
                }
            }
            return radioObj.init();
        }
    });
})(jQuery);