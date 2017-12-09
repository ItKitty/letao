$(function () {
    var myPage = 1;
    var myPageSize = 5;
    // 需求1 渲染界面
    function getDate() {
        $.ajax({
            url: "/product/queryProductDetailList",
            data: {
                page: myPage,
                pageSize: myPageSize
            },
            success: function (backDate) {
                console.log(backDate);
                $('tbody').html(template('productsTem', backDate));

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

    // 需求2 变更上下架
    $('tbody').on('click', 'button:eq(0)', function () {
        // console.log("1");
        var myStatu = $(this).html() == '下架' ? 1 : 0;
        var myId = $(this).parent().data('id');
        var myBrandId = $(this).parent().data('brandid');
        var proName = $(this).parent().siblings('td').data('proname');
        var oldPrice = $(this).parent().siblings('td').data('oldprice');
        var price = $(this).parent().siblings('td').data('price');
        var proDesc = $(this).parent().siblings('td').data('prodesc');
        var size = $(this).parent().siblings('td').data('size');
        var num = $(this).parent().siblings('td').data('num');

        console.log(myStatu + "|" + myId + "|" + myBrandId + "|" + proName + "|" + oldPrice + "|" + price + "|" + proDesc + "|" + size + "|" + num)

        $.ajax({
            url: "/product/updateProduct",
            data: {
                id: myId,
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                num: num,
                brandId: myBrandId,
                statu: myStatu
            },
            type: 'post',
            success: function (backDate) {
                console.log(backDate);
                getDate();
            }
        })
    })

})