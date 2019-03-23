//导航栏悬浮效果
$(function () {
    var tab = $(".nav-main");
    tab.mouseover(function (event) {
        $(this).find("ul").stop();
        $(this).find("ul").slideDown();

    }).mouseout(function (event) {
        $(this).find("ul").stop();
        $(this).find("ul").slideUp();
    });
    //侧边导航
    $('#nav').on('click', function () {
        $('.nav-side').animate({right: 0});
        $('#nav').css({display: 'none'});
        $('.top').css({display: 'none'});
    });
    $('body').on('dblclick', function () {
        $('.nav-side').animate({right: '-200px'});
        $('#nav').css({display: 'block'});
        $('.top').css({display: 'block'});
    });
    //返回顶部
    $('.top').hide();        //隐藏top按钮
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.top').fadeIn();
        } else {
            $('.top').fadeOut();
        }
    });
    $('.top').click(function () {
        $('html ,body').animate({scrollTop: 0}, 300);
        return false;
    });
    //注册
    $('#reg').on('click', function () {
        var admin = $('#admin').val();
        var email = $('#email').val(),
            password = $('#password').val(),
            repassword = $('#repassword').val();
        var reg = /^[a-zA-Z0-9_]{4,8}$/;//用户名正则规则
        var regemail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;//邮箱正则规则
        var regpassword = /^\d{3,6}.*$/;//密码正则规则.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*? ])
        if (!reg.test(admin)) {
            $('#placeadmin').fadeIn().fadeOut().fadeIn().fadeOut();
        } else if (!regemail.test(email)) {
            $('#placeemail').fadeIn().fadeOut().fadeIn().fadeOut();
        } else if (!regpassword.test(password)) {
            $('#placepassword').fadeIn().fadeOut().fadeIn().fadeOut();
        } else if (password != repassword) {
            $('#placerepassword').fadeIn().fadeOut().fadeIn().fadeOut();
        } else {
            /*$.ajax({
                url:'/api/reg',
                type:'post',/!*请求的类型*!/
                dataType:'json',/!*发送请求的格式*!/
                data:{
                    username:admin,
                    email :email,
                    password:password,
                    repassword:repassword,
                    date:new Date().getTime()
                },
                success:function (suc) {
                    console.log(suc)
                },
                error:function (err) {
                    console.log(err)
                }
            });*/
            $.ajax({
                type: 'post',/*请求的类型*/
                dataType: 'json',/*发送请求的格式*/
                url: '/api/user/res',/*发送请求的路径*/
                data: {/*数据*/
                    username: admin,
                    email: email,
                    password: password,
                    repassword: repassword
                },
                success: function (json) {/*发送成功，将后台返回的数据打印出来*/
                    if (json.code === 3) {
                        console.log(json);
                        window.location.href = '/api/user/log';
                    }
                },
                error: function (err) {/*失败就将原因打印出来*/
                    console.log(err);
                }
            });
        }
    });
    //登录
    $('#btn-log').on('click', function () {
        var admin_a = $('#admin_a').val();
        var password_a = $('#password_a').val();
        if (admin_a === '') {
            $('#user-p').fadeIn().fadeOut().fadeIn().fadeOut();
        } else if (password_a === '') {
            $('#pass-p').fadeIn().fadeOut().fadeIn().fadeOut();
        } else {
            $.ajax({
                type: 'post',
                url: '/api/user/login',
                dataType: 'json',
                data: {
                    username: admin_a,
                    password: password_a,
                    date: new Date().getTime()
                },
                success: function (res) {
                    console.log(res)
                    if (res.code === 4) {
                        $('#user-p').html(res.msg).fadeIn().fadeOut().fadeIn().fadeOut();
                    } else if (res.code === 5) {
                        window.location.href = '/index';
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            })
        }
    });
    //退出
    $('#logout').on('click', function () {
        $.ajax({
            url: 'api/user/logout',
            success: function (suc) {
                if (suc.code === 6) {
                    window.location.reload();
                }
            }
        })
    })
});

