/*
    下拉列表
*/
; (function ($) {
    $.extend({
        dropdownlist: function (config) {
            config = config == undefined || config == null ? {} : config;
            var dropObj = {
                //初始化控件
                init: function (config) {
                    config = $.extend({
                        container: {},  //承载下拉列表的容器（jquery对象）
                        value: { value: "", text: "请选择" },   //当前的值
                        width: 140,//选择框的宽和高，包括边框
                        height: 32,
                        autoShow: false,    //是否自动显示下拉项
                        data: [], //数据源（数组）,value是下拉项的值，text是下拉项的显示文本
                        afterSelect: function (value, text) { } //下拉选中后执行的事件，参数：value选中项的值，text选中的项的文本
                    }, config);
                    var thiz = this;
                    thiz.config = config;
                    //1.加载dom
                    thiz.config.container.html('<div class="plugin-dropdownlist"><label></label><i class="arrow"></i><ul></ul></div>');
                    //2.绑定数据源
                    thiz.bindData();
                    //3.绑定事件
                    thiz.bindEvents();
                    return thiz;
                }
                //绑定数据源
                , bindData: function () {
                    var thiz = this;
                    /* 设置下拉框高度和行高及ul距父元素的top值 */
                    var iHeight = thiz.config.height - 2;
                    var ul = thiz.config.container.find("ul");
                    thiz.config.container.find(".plugin-dropdownlist").css({ height: iHeight + 'px', 'line-height': iHeight + 'px',width: (thiz.config.width-2)+'px'});

                    //绑定数据源
                    if (thiz.config.data.length == 0) {
                        //当下拉数据为0时，增加不可用的状态
                        thiz.config.container.find("label").text('没有可选项').attr("title", '没有可选项');
                        $('.plugin-dropdownlist', thiz.config.container).addClass('plugin-disable');
                        return;
                    }

                    ul.css({ "top": iHeight + 'px'});
                    var lis = "";
                    //大于6个数据的话会两列显示，否则一列显示
                    thiz.config.data.length > 6 ? ul.attr('class', 'cols2') : ul.attr('class', '');
                    for (var i = 0; i < thiz.config.data.length; i++) {
                        lis += "<li val='" + thiz.config.data[i].value + "' title='" + thiz.config.data[i].text + "'>" + thiz.config.data[i].text + "</li>";
                    }
                    ul.html(lis);
                    //显示当前值
                    if (thiz.config.value) {
                        thiz.config.container.find("label").text(thiz.config.value.text).attr("val", thiz.config.value.value);
                    }
                }
                //绑定事件
                , bindEvents: function () {
                    var thiz = this;
                    //下拉事件
                    thiz.config.container.find(".plugin-dropdownlist").click(function () { thiz.doDropDown(); }).mouseleave(function () { thiz.doHideDropDown(); });
                    //选择事件
                    thiz.config.container.delegate("li", "click", function () { thiz.doSelect($(this)); });

                    if (thiz.config.autoShow) {
                        thiz.config.container.find(".plugin-dropdownlist").click();
                    }
                }
                //下拉事件
                , doDropDown: function () {
                    var thiz = this;
                    if ($('.plugin-dropdownlist', thiz.config.container).hasClass('plugin-disable')) return;
                    var ul = thiz.config.container.find("ul");
                    if(parseInt(ul.css('max-height'))==24){
                        ul.css({ "top": -ul.outerHeight() + 'px'});    
                    }
                    $('.plugin-dropdownlist', thiz.config.container).removeClass('plugin-disable');
                    $('.arrow', thiz.config.container).addClass('hover');
                    if (ul.is(":visible")) {
                        ul.hide();
                    } else {
                        ul.show();
                        //判断是否超过可视区
                        if((ul.offset().top+ul.outerHeight(true))>($(window).scrollTop()+$(window).height())){
                            ul.css({ "top": -ul.outerHeight() + 'px'});
                        }
                        //选中当前值
                        ul.find("[val='" + thiz.config.container.find("label").attr("val") + "']").addClass("active");
                    }

                }
                //收起下拉事件
                , doHideDropDown: function () {
                    var thiz = this;
                    var ul = thiz.config.container.find("ul");
                    ul.hide();
                    $('.arrow', thiz.config.container).removeClass('hover');
                }
                //选择下拉项
                , doSelect: function (li) {
                    var thiz = this;
                    li.siblings(".active").removeClass("active");
                    thiz.config.container.find("label").text(li.text()).attr("val", li.attr("val"));
                    if (typeof (thiz.config.afterSelect) == "function") {
                        thiz.config.afterSelect(li.attr("val"), li.text());
                    }
                }
            };
            dropObj.init(config);
        }
    });
})(jQuery)