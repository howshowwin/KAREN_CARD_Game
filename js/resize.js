$(function () {
    $(window).resize(objSizeReset);
    objSizeReset();
    function objSizeReset() {
        convertSizeALL('.outside-frame');

    }
    $(window).on('load', function () {
        objSizeReset();
    });
});


function convertSizeALL(className) {
    var w = 1920, h = 900;
    var iw = $(window).innerWidth(), ih = $(window).innerHeight();
    var pRatio = window.devicePixelRatio || 0, xRatio = iw / w, yRatio = ih / h, sRatio = 1;
    sRatio = Math.min(xRatio, yRatio);
    sRSS = sRatio
    if(sRatio<0.3){
        sRatio= 0.3
    }
        $('.game').css({padding: `${Math.round(30 * sRatio)}px 0`})
        $('.game__cards').css({ width: Math.round(1000* sRatio), gridAutoRows: Math.round(140 * sRatio),gridGap:  Math.round(20 * sRatio), });
        $('.frame__title').css({ width: Math.round(1000* sRatio),paddingTop: Math.round(60 * sRatio)});
        $('.game__box').css({ width: Math.round(1000* sRatio),fontSize:`${Math.round(36* sRatio)}px`});
        $('.frame').css({ width: Math.round(1100* sRatio)});
        $('.frame__mask-dra').css({ width: Math.round(400* sRatio),height: Math.round(350* sRatio) })
        $('.game__front-card').css({fontSize:`${Math.round(20 * sRatio)}px `})
    
}

