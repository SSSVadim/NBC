

/* ====== start "START JS" ======== */
$(document).ready(function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie; 
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}
/* ===== end "START JS" ======= */





/* ======== start "MAIN SCRIPT BLOCK" ======== */
console.log('Here we are');

/*========================= МЕНЮ, ХЭДДЕР ===============================*/
/*======================================================================*/
/*======================================================================*/
$('.header-menu__icon').click(function(event) {
	$(this).toggleClass('active');
	$('.adaptive-header-menu').toggleClass('active');
	$('.adaptive-header-menu__mask').toggleClass('active');
	if($(this).hasClass('active')){
		$('body').data('scroll',$(window).scrollTop());
	}
		$('body').toggleClass('lock');
	if(!$(this).hasClass('active')){
		$('body,html').scrollTop(parseInt($('body').data('scroll')));
	}
});


/* Клик вне области для меню и других элементов */
document.documentElement.addEventListener("click", function(e) {

	
		/* Это для других элементов, которые всплывают 

		if (!e.target.closest('.user-header')) {    //Если у target нет родителя с классом 
		let user_menu = document.querySelector('.user-header__menu');  //Сохр в переменную 
		user_menu.classList.remove('active'); //удлаляем класс
	}
	*/

		/* Это для меню уже */

	if (   !e.target.closest('.header-menu__icon')  &&  !e.target.closest('.adaptive-header-menu') && !e.target.closest('.popup') ){    /*Если клик не был по одному из объектов  */
		let menuAd = document.querySelector('.adaptive-header-menu');  /*Сохр в переменную */
		let menuAdMask = document.querySelector('.adaptive-header-menu__mask');  /*Сохр в переменную */
		let menuIco = document.querySelector('.header-menu__icon'); /*Сохр в переменную */
		let body = document.querySelector('body');/*Сохр в переменную */	
		menuAd.classList.remove('active'); /*удлаляем класс */
		menuAdMask.classList.remove('active'); /*удлаляем класс */
		menuIco.classList.remove('active'); /*удлаляем класс */
		body.classList.remove('lock'); /*удлаляем класс */
	}
});



/*SCROLL MENU*/
let fixed_menu = function(e){ 

if($(window).outerWidth()>767.8){
	
	if ($(document).scrollTop() > 200){
		$('.header').addClass('header_scroll');  //задаем класс, который "готовит" меню на top:-200 например
	}
	else {
		$('.header').removeClass('header_scroll');
	}
	
	if ($(document).scrollTop() > 310){
		$('.header').removeClass('header_scroll');
		$('.header').addClass('header_ready');  //задаем класс, который "готовит" меню на top:-200 например
	}
	else {
		$('.header').removeClass('header_ready');
	}

	if ($(document).scrollTop() > 500){       
		$('.header').addClass('header_fixed');  //класс который меняет top: 0 и меню выплывает сверху
	}
	else {
		$('.header').removeClass('header_fixed');
	}
}
};
$(window).scroll(fixed_menu).resize(fixed_menu);




/*SCROLL MENU for Phone*/
let scrollNow = 0;
let scrollBefore = 0;

let phoneScrollMenu = function(e){ 

if($(window).outerWidth()<767.8 &&  $(document).scrollTop()>200   ){
	scrollNow = $(document).scrollTop();	

	if (scrollNow > scrollBefore){
		scrollBefore = scrollNow;
		$('.header').removeClass('mobile_scrollUp');
		$('.header').addClass('mobile_scrollDown');
	}	
	else {
			scrollBefore = scrollNow;
			$('.header').addClass('mobile_scrollUp');
			$('.header').removeClass('mobile_scrollDown');
		}
}
else {
	$('.header').removeClass('mobile_scrollUp');
	$('.header').removeClass('mobile_scrollDown');	
}
};
$(window).scroll(phoneScrollMenu).resize(phoneScrollMenu);




/* GoTo */
$('.goto').click(function() {
		var el=$(this).attr('href').replace('#',''); //получаем имя из href
		var offset=$('.header').innerHeight(); //offset - переменная для обратного отступа
	$('body,html').animate({scrollTop:$('.'+el).offset().top-offset},500, function() {});

	if($('.adaptive-header-menu').hasClass('active')){
		$('.adaptive-header-menu,.header-menu__icon,.adaptive-header-menu__mask').removeClass('active');
		$('body').removeClass('lock');
	}
	return false;
});



/* Active scroll nav link  */
/* Polyfill */
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


window.addEventListener('scroll', function() {
	let scrollDistance = window.scrollY;   // переменная для замера дистанции (сколько проскролили)
	document.querySelectorAll('.title').forEach(function(el, i){  //отдельный класс для секций, чтобы совпадало с кол-во пунктов в меню
		if (el.offsetTop - document.querySelector('.header').clientHeight <= scrollDistance + 150) {  
			document.querySelectorAll('.header-menu__link').forEach(function(el){
				if (el.classList.contains('activePoint')) {
					el.classList.remove('activePoint');
				}
			});
			document.querySelectorAll('.header-menu__link')[i].classList.add('activePoint');
		}
	});     
 

});



/*========================= СЛАЙДЕР SWIPER ===============================*/
/*======================================================================*/
/*======================================================================*/


/* SwiperCode from demo  */
var swiper = new Swiper('.swiper-container', {
	pagination: {
		el: '.swiper-pagination',
		type: 'progressbar',
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay: {
		delay: 5000,
	},
	loop: true,
	 breakpoints: {
		// MD4 when window width is >= 320px
		320: {

		},
		// MD3 when window width is >= 479.98px
		479.98: {

		},
		// MD2 when window width is >= 767.98px
		767.98: {

		},
		// MD1 when window width is >= 767.98px
		992.98: {

		},
		// MD0 when window width is >= $mw(container)
		1112: {

		}
	}	
});











/*========================= Other ===============================*/
/*======================================================================*/
/*======================================================================*/

/* Ibg */

function ibg(){
	$.each($('.ibg'), function(index, val) {
		if($(this).find('img').length>0){
			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
		}
	});
}
ibg();


/* Ibg Parallax*/
function ibgparallax(){
	$.each($('.ibgparallax'), function(index, val) {
		if($(this).find('img').length>0){
			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
		}
	});
}
ibgparallax();




/* Autoheight elements */


function ah(){
	$(".autoheight").each(function () {
		var container = $(this);
		var same = $(".same", this);
		var mh = 0;
		if ($(window).outerWidth()>767.8){
			container.find(same).each(function () {
				same.height('auto');
				var h_block = parseInt($(this).height());
				if(h_block > mh) {
				mh = h_block;
			};
		});
		} else{
			mh = same.height('auto');
		};
		container.find(same).height(mh);
	});
};
ah();
window.onresize = ah;






@@include('forms.js');



/* END JS */
});

