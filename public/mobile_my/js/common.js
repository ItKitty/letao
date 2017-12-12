$(function () {

    // 当页面加载完成执行事件
    window.addEventListener('load', function () {
        windowResize();
        muiFn();
    })

    // 运用rem 自适应界面
    function windowResize() {
        var w = document.body.offsetWidth;
        var fz = w / 375 * 100;
        document.querySelector('html').style.fontSize = fz + 'px';
        window.addEventListener('resize', function () {
            w = document.body.offsetWidth;
            fz = w / 375 * 100;
            document.querySelector('html').style.fontSize = fz + 'px';
        })
    }

    function muiFn() {
        // 滚动mui
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            indicators: false, //是否显示滚动条
        });
        // 自动轮播
        mui(".mui-slider").slider({
            interval: 2000
        });
        // 上啦和下拉
        // mui.init({
        //     pullRefresh: {
        //         container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        //         down: {
        //             style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
        //             height: 50, //可选,默认50.触发下拉刷新拖动距离,
        //             // auto: true, //可选,默认false.首次加载自动下拉刷新一次
        //             contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        //             contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        //             contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        //             // callback: pullfresh - function //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        //             callback: function () {
        //                 //注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
        //                 //没有更多内容了，endPulldown 传入true， 不再执行下拉刷新
        //                 var that=this;
        //                 setTimeout(function(){
        //                     that.endPulldownToRefresh();
        //                 },2000)
        //             }
        //         },
        //         up: {
        //             height: 50, //可选.默认50.触发上拉加载拖动距离
        //             // auto: true, //可选,默认false.自动上拉加载一次
        //             contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
        //             contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
        //             // callback :pullfresh-function //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        //             callback: function () {
        //                 //注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
        //                 //没有更多内容了，endPulldown 传入true， 不再执行下拉刷新
        //                 var that=this;
        //                 // setTimeout(function(){
        //                 //     that.endPulldownToRefresh();
        //                 // }.bind(that),2000)
        //                 setTimeout(function(){
        //                     that.endPullupToRefresh();
        //                 },2000)
        //             }
        //         }
        //     }
        // });


    }
})