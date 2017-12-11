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
        // var myId = $(this).parent().data('id');
        // var myBrandId = $(this).parent().data('brandid');
        // var proName = $(this).parent().siblings('td').data('proname');
        // var oldPrice = $(this).parent().siblings('td').data('oldprice');
        // var price = $(this).parent().siblings('td').data('price');
        // var proDesc = $(this).parent().siblings('td').data('prodesc');
        // var size = $(this).parent().siblings('td').data('size');
        // var num = $(this).parent().siblings('td').data('num');

        // console.log(myStatu + "|" + myId + "|" + myBrandId + "|" + proName + "|" + oldPrice + "|" + price + "|" + proDesc + "|" + size + "|" + num)

        $.ajax({
            url: "/product/updateProduct",
            data: {
                // id: myId,
                // proName: proName,
                // oldPrice: oldPrice,
                // price: price,
                // proDesc: proDesc,
                // size: size,
                // num: num,
                // brandId: myBrandId,
                statu: myStatu
            },
            type: 'post',
            success: function (backDate) {
                console.log(backDate);
                getDate();
            }
        })
    })

    // 图片上传验证
    $("#fileUpload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            $('<img width="100" height="100" style="margin-top:10px;margin-right:10px" src="' + data.result.picAddr + '" alt="">').appendTo($('.fileupload'));

            // 人为动态更新字段
            if ($('.fileupload img').length == 3) {
                $('form').data('bootstrapValidator').updateStatus('pic1', 'VALID');
            }
        }
    });

    // 当图片超过3张的时候不能添加
    $('#fileUpload').on('click', function (e) {
        var num = $(this).siblings('img').length;
        if (num == 3) {
            e.preventDefault();
        }
    })

    // 双击图片 图片删除
    $('.fileupload').on('dblclick', 'img', function () {
        console.log("1");
        $(this).remove();
    })

    // 表单数据验证
    $('form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-heart',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 检验的字段
        fields: {
            proName: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "商品名称不能为空"
                    }
                }
            },
            proDesc: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "商品描述不能为空"
                    }
                }
            },
            num: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "商品库存不能为空"
                    }
                }
            },
            price: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "商品价格不能为空"
                    }
                }
            },
            oldPrice: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "商品原价不能为空"
                    }
                }
            },
            size: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "商品尺寸不能为空"
                    }
                }
            },
            pic1: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "商品LOGO不能为空"
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        // 判断是否传入3张
        if($('.fileupload img').length<3){
            alert("请输入3张图片")
        };
        //使用ajax提交逻辑
        $.ajax({
            url: "/product/addProduct",
            data: $('form').serialize(),
            type: 'post',
            success: function (backData) {
                console.log(backData);
                // 关闭modal
                $('.modal-add').modal('hide')
                // 重新获取当前页数据
                getDate();

                $("form").data('bootstrapValidator').resetForm()
                $('input').val("");

            }
        })

    });

})