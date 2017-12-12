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

    }
})