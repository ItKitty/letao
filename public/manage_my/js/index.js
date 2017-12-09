$(function () {
    // 导入第一个echarts 柱状图
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('main1'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: ["6月", "7月", "8月", "9月", "10月", "11月"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [500, 2000, 3600, 1000, 1000, 2000]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);

    var myChart2 = echarts.init(document.getElementById('main2'));
    
    // 导入第二个饼状图
    option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年11月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','新百伦','安踏','李宁']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'安踏'},
                    {value:1548, name:'李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);

    // 需求1 点击边栏隐藏
    $('.ad_nav span').first().on('click',function(){
        $('.ad_aside').toggle();
        // $('.ad_aside').toggleClass('close2');
        // 卧槽，这个类名不能起常用的，有毒哦
        $('.ad_section').toggleClass('close1');
    })
    // 需求2 点击跳转登录-1
    $('.ad_nav span').last().on('click',function(){
        $('.modal-show').modal('show');
    })
    // 需求3 点击跳转登录-2
    $('.modal-show .btn-sure').on('click',function(){

        $('.modal-show').modal('hide');
        $.ajax({
            url:'/employee/employeeLogout',
            success:function(backData){
                window.location="./login.html";
            }
        })
    })

    // 需求4 判断是否登陆
    $.ajax({
        url:"/employee/checkRootLogin",
        success:function(backData){
            console.log(backData);
            if(backData.error==400){
                window.location="./login.html";
            }
        }
    })

    // 需求5 点击侧边栏收起
    $('.ad_aside .menu ul li:eq(1)>a').on('click',function(){
        $(this).siblings('ol').slideToggle();
    })

})