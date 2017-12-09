$(function () {
    // 渲染界面
    var myPage = 1;
    var myPageSize = 5;

    function getDate() {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            data: {
                page: myPage,
                pageSize: myPageSize
            },
            success: function (backDate) {
                console.log(backDate);
                $('tbody').html(template('secondTem', backDate));

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

    // 表单数据验证
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-heart',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 检验的字段
        fields: {
            categoryName: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类不能为空"
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: "/category/addTopCategory",
            data: $('form').serialize(),
            type: 'post',
            success: function (backData) {
                console.log(backData);
                // 关闭modal
                $('.modal-add').modal('hide')
                // 重新获取当前页数据
                getDate();

            }
        })
    });
})