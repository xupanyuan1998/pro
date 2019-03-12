//导航栏悬浮效果
$(function () {
	$('.nav-left').find('li').find('a').on('click', function () {
		$('.nav-left').find('li').find('a').css({background: 'transparent'});
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
	$('.top').hide();        //隐藏go to top按钮
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
});

