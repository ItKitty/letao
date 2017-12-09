$(function () {
    // 需求1 点击边栏隐藏
    $('.ad_nav span').first().on('click', function () {
        $('.ad_aside').toggle();
        // $('.ad_aside').toggleClass('close2');
        // 卧槽，这个类名不能起常用的，有毒哦
        $('.ad_section').toggleClass('close1');
    })

    // 需求2 点击跳转登录-1
    $('.ad_nav span').last().on('click', function () {
        $('.modal-show').modal('show');
    })

    // 需求3 点击跳转登录-2
    $('.modal-show .btn-sure').on('click', function () {

        $('.modal-show').modal('hide');
        $.ajax({
            url: '/employee/employeeLogout',
            success: function (backData) {
                window.location = "./login.html";
            }
        })
    })

    // 需求4 判断是否登陆
    $.ajax({
        url: "/employee/checkRootLogin",
        success: function (backData) {
            // console.log(backData);
            if (backData.error == 400) {
                window.location = "./login.html";
            }
        }
    })

    // 需求5 点击侧边栏收起
    $('.ad_aside .menu ul li:eq(1)>a').on('click', function () {
        $(this).siblings('ol').slideToggle();
    })
})