/*
    选择控件（单选多选等）
*/
; (function ($) {
    $.extend({
        selector: function (options) {
            options = $.extend({
                data: [], //数据源（数组），{ value: "1", text: "数据项", isSelect: true },参数：value数据的值，text数据的显示文本，isSelect是否为选中项
                container: {}, //承载控件的容器（jquery对象）
                max: -1, //最多允许的选择个数，小于等于0代表不限制
                afterSelect: function (data, selectedData) { },  //选中后执行的事件，参数data为数组：数组中的每一项包括：value数据的值，text数据的显示文本，格式为[{value: '',text: ''}],selectedData为当前点击项的text和value
                cancelSelect: function (data, canceledData) { }     //取消选中后执行的事件，参数data为数组：数组中的每一项包括：value数据的值，text数据的显示文本，格式为[{value: '',text: ''}],canceledData为当前点击项的text和value
            }, options);
            var selectObj = {
                canSelectAll: true,    //全选用到的标记位,true为全选，false为全不选
                selectedData: [],  //选中数据
                //初始化控件
                init: function () {
                    var _this = this;
                    //1.加载html内容
                    options.container.html('<div class="plugin-selectorOptions"><span class="selectall" style="display:none">全选</span><ul></ul></div>');
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
                    //计算初始选中几个选项
                    var selectedNum = 0;
                    //加载数据
                    for (var i = 0; i < options.data.length; i++) {
                        if (options.data[i].isSelect) {
                            selectedNum++;
                            htmlStr += '<li class="selected" data-value="' + options.data[i].value + '" title="' + options.data[i].text + '">' + options.data[i].text + '</li>';
                            _this.selectedData.push({ value: options.data[i].value, text: options.data[i].text });
                        } else {
                            htmlStr += '<li title="' + options.data[i].text + '" data-value="' + options.data[i].value + '">' + options.data[i].text + '</li>';
                        }
                    }
                    $('ul', options.container).html(htmlStr);
                    
                    //如果是单选，则选中项cursor为default
                    if (options.max == 1) {
                        $('ul', options.container).find(".selected").css("cursor", "default");
                    }
                    //判断是否需要显示 全选
                    if ((options.max > 1 && options.max >= options.data.length) || options.max < 1) {
                        $('ul', options.container).parent().css('position', 'relative');
                        $('ul', options.container).css({ 'margin-left': '50px' });
                        $('.selectall', options.container).show();
                        //如果初始选中的个数和传进来的数据长度是一样的
                        if(selectedNum==options.data.length){
                            $('.selectall', options.container).text('取消全选');
                            _this.canSelectAll = false;
                        }
                    }
                }
                //绑定事件
                , bindEvents: function () {
                    var _this = this;
                    //选中事件
                    if (options.max == 1) {
                        $('ul', options.container).delegate('li', 'click', function () {
                            _this.doLiClickRadio($(this));
                        });
                    } else {
                        $('ul', options.container).delegate('li', 'click', function () {
                            _this.doLiClickCheck($(this));
                        });
                        options.container.find('.selectall').click(function () {
                            _this.doSelectAll($(this));
                        });
                    }
                }
                //选项点击事件（单选）
                , doLiClickRadio: function (ele) {
                    var _this = this;
                    if (ele.hasClass('selected')) return;
                    ele.siblings(".selected").removeClass('selected').css("cursor", "pointer");
                    ele.addClass('selected').css("cursor", "default");
                    _this.selectedData = [];
                    _this.selectedData.push({ value: ele.data('value'), text: ele.text() });
                    if (typeof options.afterSelect == 'function') {
                        options.afterSelect(_this.selectedData, { value: ele.data('value'), text: ele.text() });
                    }
                }
                //选项点击事件（多选）
                , doLiClickCheck: function (ele) {
                    var _this = this;
                    var ul = ele.closest('ul');
                    //如果该项已被选择，则取消选择
                    if (ele.hasClass('selected')) {
                        ele.removeClass('selected');
                        if($('.selectall',options.container).is(':visible')){
                            $('.selectall',options.container).text('全选'); 
                            _this.canSelectAll = true;    
                        }
                        var iPos = _this.getPos(ele.data('value'), _this.selectedData);
                        if (iPos != -1) {
                            //更新已选数据
                            _this.selectedData.splice(iPos, 1);
                        }
                        if (typeof options.cancelSelect == 'function') {
                            options.cancelSelect(_this.selectedData, { value: ele.data('value'), text: ele.text() });
                        }
                    } else {
                        //如果已经达到最大选择数，则提示并返回
                        if (ele.siblings('.selected').length >= options.max && options.max >= 0) {
                            alert('已经超过最大选择数目');
                            /*$.showInfo({
                                content: '最多允许选择 '+ options.max +' 项！'
                            });*/
                            return;
                        }
                        ele.addClass('selected');
                        if($('.selectall',options.container).is(':visible') && ul.find('.selected').length==ul.find('li').length){
                            $('.selectall',options.container).text('取消全选'); 
                            _this.canSelectAll = false;  
                        }                        
                        //保存已选数据
                        _this.selectedData = [];
                        $('li.selected',ul).each(function(){
                            _this.selectedData.push({ value: $(this).data('value'), text: $(this).text() });    
                        });
                        if (typeof options.afterSelect == 'function') {
                            options.afterSelect(_this.selectedData, { value: ele.data('value'), text: ele.text() });
                        }
                    }
                }
                //全选
                , doSelectAll: function (selectall) {
                    var _this = this;
                    //全选操作
                    if (_this.canSelectAll) {
                        if (options.max != 1) {
                            $('li', options.container).addClass('selected');
                        }
                        selectall.text('取消全选');
                        _this.canSelectAll = false;
                        //已选数据为全部数据
                        _this.selectedData = [];
                        for(var i=0;i<options.data.length;i++){
                            _this.selectedData.push({value:options.data[i].value,text:options.data[i].text});   
                        }
                 
                        if (typeof options.afterSelect == 'function') {
                            options.afterSelect(_this.selectedData);
                        }
                    }
                    //取消全选
                    else {
                        $('li', options.container).removeClass('selected');
                        selectall.text('全选');
                        _this.canSelectAll = true;
                        //已选数据为空
                        _this.selectedData = [];
                        if (typeof options.cancelSelect == 'function') {
                            options.cancelSelect(_this.selectedData);
                        }
                    }
                }
                //找到字符串在数组中对应的位置
                , getPos: function (val, arr) {
                    var result = -1;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i]['value'] == val) {
                            result = i;
                            break;
                        }
                    }
                    return result;
                }
            }
            return selectObj.init();
        }
    });
})(jQuery);