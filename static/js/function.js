AOS.init({
    easing: 'ease-out-back',
    disable: 'mobile',
    duration: 2000
});

setTimeout(()=>{
    $('.images_1').addClass('images_scale')
},10)

if ($('#my-scrollbar').length > 0) {
    var Scrollbar = window.Scrollbar;
    Scrollbar.initAll()
    var scrollbar = Scrollbar.get(document.querySelector('#my-scrollbar'))
    scrollbar.addListener((status) => {
        AOS.refresh();
        window.pageYOffset = scrollbar.scrollTop
        var scroll = window.pageYOffset
        if (scroll > 0) {
            var top = (scroll) * -0.5;
            $('.fixed_background').css('transform', 'translate3d(0px,' + top + 'px,0px)')
        }else {
            $('.fixed_background').css('transform', 'translate3d(0px,0px,0px)')
        }

        if ($('#works').length > 0){
            var dynamic = (scroll - 600) * +0.02;
            var scale = 1+(scroll - 600)* - 0.0005;
            var opacity = 1+(scroll - 600)* - 0.0020;
            console.log(scroll)
            if (scroll > 600) {
                $('.section .warp .dynamic img').css({
                    transform: 'perspective(800px) rotateX(' + dynamic + 'deg) scale('+ scale +')',
                    opacity: opacity
                })
            }else {
                $('.section .warp .dynamic img').css({
                    transform: 'perspective(800px) rotateX(0deg) scale(1)',
                    opacity: 1
                })
            }
            if (scroll > 1100) {
                var moveTOp = (scroll - 1100);
                $('.section .warp .dynamic .text').css({
                    transform: 'translate3d(0px,' + moveTOp + 'px,0px)',
                    color: '#000000'
                })
            }else {
                $('.section .warp .dynamic .text').css({
                    transform: 'translate3d(0px,0px,0px)',
                    color: '#fff'
                })
            }
        }
    });
}

// banner文字效果
function bannerText(){
    if ($('.gsap_show').length > 0) {
        obj2 = new SplitText($('.gsap_show .banner .text span,.banner .text p'), {type: "chars"});
        var tl = new TimelineMax();
        tl.add("start");
        tl.staggerFrom(obj2.chars, 0.9, {
            opacity: 0,
            // y: 20,
            rotationX: 90,
            transformOrigin: "0% 50%",
            ease: Back.easeOut
        }, 0.03,"start");
    }
}

var menu = true
$('.header .function .menu').click(function () {
    $('.menu_background').toggleClass('menu_active')
    setTimeout(()=>{
        $('header').toggleClass('active')
        $('.menu_background .warp').toggleClass('warp_active')
    },500)
    if (menu) {
        menu = false
        $('.menu_background .headline .each div').removeClass('delay_active')
    }else {
        $('.menu_background .headline .each div').addClass('delay_active')
        menu = true
    }
})
$('.mask').click(function () {
    $('.menu_background').removeClass('menu_active')
    setTimeout(()=>{
        $('header').removeClass('active')
        $('.menu_background .warp').removeClass('warp_active')
        $('.menu_background .headline .each div').addClass('delay_active')
    },500)
    menu = true
})


$('.each').each(function (index, item) {
    var text = $(item).html();
    var textArray = text.split('');
    var html = '';
    for (var i in textArray) {
        html += '<div>' + textArray[i] + '</div>';
    }
    $(item).html(html);
    $(this).find('div').each(function (index, ele) {
        var delay = index * 0.05
        $(this).css('transition-delay',delay + 's')
    })
})
$('.menu_background nav a').each(function (index,ele) {
    var delay = index * 0.05
    $(this).css('transition-delay',delay + 's')
})
// 首页图片缓缓缩小动画
setTimeout(()=>{
    $('.banner .background').addClass('scale_active')
},10)

// JS月份从0~11
let dTimeStart=new Date();
let dTimeEnd=new Date("2022-7-3 0:0:00");
let dTimes=(dTimeEnd-dTimeStart)/1000;
function dTime(){
    if(dTimes>=0){
        dTimes-=1;
        // 需要 秒 分钟 小时  天
        let second=Math.floor(dTimes%60);
        let minute=Math.floor((dTimes/60)%60);
        let hour=Math.floor((dTimes/3600)%24);
        let day=Math.floor(dTimes/(3600*24));
        $('.StudyHard').text(day+" 天 "+hour+" 小时 "+minute+" 分 "+second+" 秒 ");
    }
}
function cTime(){
    // if(dTimes>=0){
    dTimes+=1;
    // 需要 秒 分钟 小时  天
    let second=Math.floor(dTimes%60);
    let minute=Math.floor((dTimes/60)%60);
    let hour=Math.floor((dTimes/3600)%24);
    let day=Math.floor(dTimes/(3600*24));
    day>=1?day:day+=1;
    $('.section .establish h1 .time').text(+day+"天"+hour+"小时"+minute+"分"+second);
}
if(dTimes>=0){
    dTime();
    setInterval(dTime,1000);
}else{
    dTimes=-dTimes
    cTime();
    setInterval(cTime,1000);
    // $(".StudyHard").text("已经结束啦~");
}

// 加载图片
setTimeout(()=>{
    var load=0
    var arr=new Array();
    $('img').each(function (index,ele){
        if($(this).attr('src')!==''){
            arr.push($(this).attr('src'))
        }
    })
    var len=arr.length
    for(var i in arr){
        var bimg=new Image();
        bimg.src = arr[i];
        bimg.onload = function () {
            load+=1;
            $('.loading .warp .line div').css({
                width:load/len*100+'%',
            })
            if(len===load){
                setTimeout(()=>{
                    $('.fixed_background .background').addClass('scale_active')
                    $('.loading').addClass('events_active')
                    bannerText()
                },1000)
            }
        }
    }
},10)

var about_swiper = new Swiper('.about_swiper',{
    speed: 1000,
    effect: 'fade',
})
