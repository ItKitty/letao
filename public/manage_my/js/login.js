$(function () {
    // 需求1 当点击提交按钮的时候
    // $('button[type=submit]').on('click', function (e) {
    //     e.preventDefault();
    //     $.ajax({
    //         url: "/employee/employeeLogin",
    //         data: $('form').serialize(),
    //         type: 'post',
    //         success: function (backDate) {
    //             console.log(backDate);
    //         },
    //         error: function (xhr) {
    //             console.log(xhr.responseText);
    //         }
    //     })
    // })

    // 需求2 验证form表单 初始化插件
    $('form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-star',
            invalid: 'glyphicon glyphicon-star-empty',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: '用户名长度必须在3到6之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }

                    // //正则校验
                    // regexp: {
                    //     regexp: /^[a-zA-Z0-9_\.]+$/,
                    //     message: '用户名由数字字母下划线和.组成'
                    // }
                }
            },
            //校验用户名，对应name表单的name属性
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度必须在6到16之间'
                    },
                    callback: {
                        message: '密码错误'
                    }
                    // //正则校验
                    // regexp: {
                    //     regexp: /^[a-zA-Z0-9_\.]+$/,
                    //     message: '用户名由数字字母下划线和.组成'
                    // }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: "/employee/employeeLogin",
            data: $('form').serialize(),
            type: 'post',
            success: function (backDate) {
                console.log(backDate);
                if (backDate.success) {
                    window.location = "./index.html";
                } else {
                    //获取表单校验实例
                    var validator = $("form").data('bootstrapValidator');
                    // 失败
                    if (backDate.error == 1000) {
                        validator.updateStatus('username', 'INVALID', 'callback');
                    } else if (backDate.error == 1001) {
                        validator.updateStatus('password', 'INVALID', 'callback');
                    }
                }

            },
            error: function (xhr) {
                console.log(xhr.responseText);
            }
        })
    });

    // 需求3 重置表单
    $('button[type=reset]').on('click',function(){
        //获取表单校验实例
        var validator = $("form").data('bootstrapValidator');
        //重置表单，并且会隐藏所有的错误提示和图标
        validator.resetForm();
    })
})