/*
    选择控件（单选多选等）
*/
; (function ($) {
    $.extend({
        checkbox: function (options) {
            options = $.extend({
                data: [], //数据源（数组），{ value: "1", text: "数据项", isSelect: true },参数：value数据的值，text数据的显示文本，isSelect是否为选中项
                container: {}, //承载控件的容器（jquery对象）
                max: -1, //最大选择限制
                isNeedSelectAll: true,
                afterCheck: function (data, selectedData) { },  //选中后执行的事件，参数data为数组：数组中的每一项包括：value数据的值，text数据的显示文本，格式为[{value: '',text: ''}],selectedData为当前点击项的text和value
                cancelCheck: function (data, canceledData) { }     //取消选中后执行的事件，参数data为数组：数组中的每一项包括：value数据的值，text数据的显示文本，格式为[{value: '',text: ''}],canceledData为当前点击项的text和value
            }, options);
            var checkObj = {
                canSelectAll: true,    //全选用到的标记位,true为全选，false为全不选
                selectedData: [],  //选中数据
                //初始化控件
                init: function () {
                    var _this = this;
                    //1.加载html内容
                    options.container.html('<ul class="plugin-CheckOptions"></ul>');
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
                    if(options.isNeedSelectAll){
                        htmlStr += '<li class="checkall"><i></i>全选</li>'    
                    }
                    //计算初始选中几个选项
                    var selectedNum = 0;
                    //加载数据
                    for (var i = 0; i < options.data.length; i++) {
                        if (options.data[i].isCheck) {
                            selectedNum++;
                            htmlStr += '<li class="checked" data-value="' + options.data[i].value + '" title="' + options.data[i].text + '"><i></i>' + options.data[i].text + '</li>';
                            _this.selectedData.push({ value: options.data[i].value, text: options.data[i].text });
                        } else {
                            htmlStr += '<li title="' + options.data[i].text + '" data-value="' + options.data[i].value + '"><i></i>' + options.data[i].text + '</li>';
                        }
                    }
                    $('ul', options.container).html(htmlStr);
                    //选中的数量和数组的长度相等，则“全选”选项要选中
                    if(selectedNum==options.data.length && options.isNeedSelectAll){
                        $('.checkall',options.container).addClass('checked');
                    }                    
                }
                //绑定事件
                , bindEvents: function () {
                    var _this = this;
                    //选中事件
                    $('ul', options.container).delegate('li:not(".checkall")', 'click', function () {
                        _this.doLiClickCheck($(this));
                    });
                    options.container.find('.checkall').click(function () {
                        _this.doCheckAll($(this));
                    });
                }
                //选项点击事件
                , doLiClickCheck: function (ele) {
                    var _this = this;
                    var ul = ele.closest('ul');
                    //如果该项已被选择，则取消选择
                    if (ele.hasClass('checked')) {
                        ele.removeClass('checked');
                        if(options.isNeedSelectAll){
                            $('.checkall',options.container).removeClass('checked'); 
                            _this.canSelectAll = true;    
                        }
                        var iPos = _this.getPos(ele.data('value'), _this.selectedData);
                        if (iPos != -1) {
                            //更新已选数据
                            _this.selectedData.splice(iPos, 1);
                        }
                        if (typeof options.cancelCheck == 'function') {
                            options.cancelCheck(_this.selectedData, { value: ele.data('value'), text: ele.text() });
                        }
                    } else {
                        //如果已经达到最大选择数，则提示并返回
                        if (ele.siblings('.checked').length >= options.max && options.max >= 0) {
                            alert('已经超过最大选择数目');
                            /*$.showInfo({
                                content: '最多允许选择 '+ options.max +' 项！'
                            });*/
                            return;
                        }
                        ele.addClass('checked');
                        if(options.isNeedSelectAll && ul.find('.checked').length==ul.find('li:not(".checkall")').length){
                            $('.checkall',ul).addClass('checked'); 
                            _this.canSelectAll = false;  
                        }                        
                        //保存已选数据
                        _this.selectedData = [];
                        $('li.checked',ul).each(function(){
                            _this.selectedData.push({ value: $(this).data('value'), text: $(this).text() });    
                        });
                        if (typeof options.afterCheck == 'function') {
                            options.afterCheck(_this.selectedData, { value: ele.data('value'), text: ele.text() });
                        }
                    }
                }
                //全选
                , doCheckAll: function (checkall) {
                    var _this = this;
                    //全选操作
                    if (_this.canSelectAll) {
                        $('li', options.container).addClass('checked');
                        _this.canSelectAll = false;
                        //已选数据为全部数据
                        _this.selectedData = [];
                        for(var i=0;i<options.data.length;i++){
                            _this.selectedData.push({value:options.data[i].value,text:options.data[i].text});   
                        }
                 
                        if (typeof options.afterCheck == 'function') {
                            options.afterCheck(_this.selectedData);
                        }
                    }
                    //取消全选
                    else {
                        $('li', options.container).removeClass('checked');
                        _this.canSelectAll = true;
                        //已选数据为空
                        _this.selectedData = [];
                        if (typeof options.cancelCheck == 'function') {
                            options.cancelCheck(_this.selectedData);
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
            return checkObj.init();
        }
    });
})(jQuery);