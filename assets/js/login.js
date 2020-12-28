$(function () {
    // 点击去注册按钮
    $('#link_reg').on('click', () => {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登录按钮
    $('#link_login').on('click', () => {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui中获取form对象
    const {
        form,
        layer
    } = layui;
    // 通过form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则

        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框的内容
            // 还需要拿到密码框中的内容
            // 还需要进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) {
                    layer.msg(res.message || '注册失败');
                    return;
                }
                layer.msg(res.message || '注册成功');
                // 自动跳转登录界面
                $('#link_login').click();
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit',function (e) {
        e.preventDefault();

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message || '登录失败');
                    return;
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})