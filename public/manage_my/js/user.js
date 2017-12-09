$(function () {
    // 渲染界面
    var myPage = 1;
    var myPageSize = 5;

    function getDate() {
        $.ajax({
            url: "/user/queryUser",
            data: {
                page: myPage,
                pageSize: myPageSize
            },
            success: function (backDate) {
                console.log(backDate);
                $('tbody').html(template('userTem', backDate));

                // 设置分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPage, //当前页
                    totalPages: Math.ceil(backDate.total / backDate.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        myPage = page;
                        getDate();
                    }
                });
            }
        })
    }
    getDate();

    // 需求2 点击启用改变状态
    $('tbody').on('click', 'button', function () {
        var myId = $(this).parent().data('id');
        var myIsDelete = $(this).html() == '启用' ? 0 : 1;
        
        console.log(myId+"|"+myIsDelete);
        $.ajax({
            url: "/user/updateUser",
            data: {
                id: myId,
                isDelete: myIsDelete
            },
            type: 'post',
            success: function (backDate) {
                console.log(backDate);
                getDate();
            }
        })

    })

})