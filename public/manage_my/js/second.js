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

    // 上传图片
    $("#fileUpload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            $('form img').attr('src', data.result.picAddr);
            // 将地址路径赋值给input
            $('input[name=brandLogo]').val(data.result.picAddr);
            // 如果动态改变 
            $("form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });

    // 点击ul改变
    $.ajax({
        url: "/category/queryTopCategoryPaging",
        data: {
            page: 1,
            pageSize: 256
        },
        success: function (backData) {
            $('.dropdown-menu').html("");
            $.each(backData.rows, function (i, n) {
                var li = $("<li><a data-id='" + n.id + "' href='javascript:;'>" + n.categoryName + "</a></li>");
                $('.dropdown-menu').append(li);
            })
        }
    })

    $('.dropdown-menu').on('click', 'a', function () {
        var value = $(this).html();
        // console.log(value);
        $('.select-value').html(value);
        // 将ID赋值给input的value；
        $('input[name=categoryId]').val($(this).data('id'));
        // 如果动态改变 
        $("form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })

    // 表单数据验证
    $('form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-heart',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 检验的字段
        fields: {
            categoryId: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类选择不能为空"
                    }
                }
            },
            brandName: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类名称不能为空"
                    }
                }
            },
            brandLogo: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "品牌LOGO不能为空"
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: "/category/addSecondCategory",
            data: $('form').serialize(),
            type: 'post',
            success: function (backData) {
                console.log(backData);
                // 关闭modal
                $('.modal-add').modal('hide')
                // 重新获取当前页数据
                getDate();

                $("form").data('bootstrapValidator').resetForm()
                $('.select-value').html('请选择');
                $('input').val("");
                $('form img').attr('src', './images/none.png');

            }
        })

    });

})