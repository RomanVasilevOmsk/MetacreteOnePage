$(document).ready(function(){
    //---------Change input-----------//
    function catalogItemCounter(field){

        var fieldCount = function(el) {

            var
                // Мин. значение
                min = el.data('min') || false,

                // Макс. значение
                max = el.data('max') || false,

                // Кнопка уменьшения кол-ва
                dec = el.prev('.dec'),

                // Кнопка увеличения кол-ва
                inc = el.next('.inc');

            function init(el) {
                if(!el.attr('disabled')){
                    dec.on('click', decrement);
                    inc.on('click', increment);
                }

                // Уменьшим значение
                function decrement() {
                    var value = parseInt(el[0].value);
                    value--;

                    if(!min || value >= min) {
                        el[0].value = value;
                    }
                };

                // Увеличим значение
                function increment() {
                    var value = parseInt(el[0].value);

                    value++;

                    if(!max || value <= max) {
                        el[0].value = value++;
                    }
                };

            }

            el.each(function() {
                init($(this));
            });
        };

        $(field).each(function(){
            fieldCount($(this));
        });
    }

    catalogItemCounter('.fieldCount');
//---------Change input-----------//

    //---------Calculator-----------//
    var inputWeight = $('#js-calculatorWeight')[0], inputQuantity = $('#js-calculatorQuantity')[0], sum ,titleSum, currency,priceKg ,priceAnalog, difference, differenceTitle, priceAnalogTitle;
    // $('input[name=raz]').on('change', CalResult);

    function CalResult() {
        priceKg = Number(inputQuantity.value);//если меняется колличество кг, переопределяем значение

        var valueBag = Number(inputWeight.value);
        if(!valueBag || !undefined){
            titleSum = "";
            differenceTitle = "";
            currency = "";
            difference = "";
            priceAnalogTitle = "";
            sum = priceKg*valueBag*1000;
            priceAnalog = sum-((sum*40)/100);
            difference = Math.round(sum - priceAnalog) +"руб.";
            paramsTitle ="MasterEmacoN900";//Дефолтьный продукт
        }
        else{
            titleSum = "Стоймость: ";
            currency = " руб.";
            priceAnalogTitle = "Стоймость аналога " + params['tema']+ ": ";
            differenceTitle = "Экономия до: ";
            sum = priceKg*valueBag*1000;
            priceAnalog = sum-((sum*40)/100);
            difference = Math.round(sum - priceAnalog);
            paramsTitle = params['tema'];

        }
        // $('#js-sum-calc')[0].innerHTML = titleSum + sum +currency;
        // $('#js-priceAnalog')[0].innerHTML = priceAnalogTitle + priceAnalog + currency;
        var totalSum = difference +currency;
        $('#js-difference')[0].innerHTML = totalSum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');



    }
    function CalDefault() {

        //---------Вытаскиваем название аналога из адрессной строки-----------//
        var params = window
            .location.search.replace('?','').split('&').reduce(
                function(p,e){
                    var a = e.split('=');
                    p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                },
                {}
            );
        //---------Вытаскиваем название аналога из адрессной строки-----------//

        switch (params['tema']) {
            case 'MasterEmacoN900':
                priceKg = 30;
                break;
            case 'MasterEmacoN901':
                priceKg = 20;
                break;
            case 'MasterEmacoN902':
                priceKg = 10;
                break;
            default:
                priceKg = 30;//Если нет ставим дефолтное значение дефолтного продукта
                params['tema'] = "MasterEmacoN900";
        }

        $('#js-nameTitle')[0].innerHTML =params['tema'];
        $('#js-calculator__title-analog')[0].innerHTML =params['tema'];
        $('#js-nameTitleBottom')[0].innerHTML =params['tema'];
        $('#jsAnalog')[0].innerHTML =params['tema'];

        $('#js-calculatorQuantity').val(priceKg);
    }

    CalDefault();
    $('#js-calculatorWeight, #js-calculatorQuantity').on('input', CalResult);
    // $('.buttonMin, .buttonMax').on('click', CalResult);
    $('.buttonMin, .buttonMax').click(CalResult);
    CalResult();
//---------Calculator-----------//



    

    //---------Animation interval-----------//


    function loopMenu() {
        window.clearTimeout();
        setTimeout(function(){$(".bags__item-3").removeClass("hvr-wobble-vertical");}, 4000);
        setTimeout(function(){$(".bags__item-3").addClass("hvr-wobble-vertical");}, 4000);
        setTimeout(function(){$(".bags__item-3").removeClass("hvr-wobble-vertical");}, 8000);
        setTimeout(function(){$(".bags__item-3").addClass("hvr-wobble-vertical");}, 8000);
        setTimeout(function(){$(".bags__item-3").removeClass("hvr-wobble-vertical");}, 12000);
        setTimeout(function(){$(".bags__item-3").addClass("hvr-wobble-vertical");}, 12000);
        setTimeout(function(){$(".bags__item-3").removeClass("hvr-wobble-vertical");}, 16000);
        setTimeout(function(){$(".bags__item-3").addClass("hvr-wobble-vertical");}, 12000);
    }

    loopMenu();

    //---------Animation interval-----------//

    //Modal-phone
    $(".js-show-modal").on("click", function(e) {
        e.preventDefault();
        var currentModal = $(this).attr("href");
        $(currentModal + ", #js-overlay").fadeIn(500);
        $("body").addClass("open-modal");
    });

    $("#js-overlay, .js-modal-close").on("click", function(e) {
        e.preventDefault();
        $(".js-modal, .js-modal-features-approach, .js-modal-features-availability, .js-modal-features-quality, .js-modal-features-price, .js-modal-features-objects, .js-modal-features-destruction, #js-overlay").fadeOut(100);
        $("body").removeClass("open-modal");
    });

    //Modal-features
    $(".js-show-modal-features").on("click", function(e) {
        e.preventDefault();
        var currentModal = $(this).attr("href");
        $(currentModal + ", #js-overlay").fadeIn(500);
        $("body").addClass("open-modal");
    });


    //---------Modals-----------//


    //---------Mask-----------//
    $('input[name="phone"]').mask('+7 (999) 999-99-99');
    //---------Mask-----------//


//---------GTM-----------//
    $('form').submit(function(event) {
        var required = $(this).find('input[required]');
        var error = false;
        for (var i = 0; i <= (required.length - 1); i++) {
            if (required[i].value == '') {
                required[i].style.borderColor = 'red';
                error = true;
            } else
                required[i].style.borderColor = '#fcc500';
        }
        if (error) event.preventDefault();
        else { dataLayer.push({ 'event': 'sendaction' }); }
    });
    $('.js-phone-wrap').click(function() { dataLayer.push({ 'event': 'sendaction' }); });
    $('.js-email-link').click(function() { dataLayer.push({ 'event': 'sendaction' }); });
    //---------GTM-----------//
});


//---------Bags upp-----------//
$(document).ready(function() {
    var easing_type = 'jswing';
    var default_dock_height = '70';
    var expanded_dock_height = $('.js-bags').height();
    var body_height = $(window).height() - default_dock_height;
    $('.main-screen').height(body_height);
    $('.js-bags').css({'height': default_dock_height, 'position':'absolute', 'top': body_height});

    $(window).resize(function () {
        updated_height = $(window).height() - default_dock_height;
        $('.main-screen').height(updated_height);
        $('.js-bags').css({'top': updated_height});
    });

    $('.js-bags').mouseover(function () {
        expanded_height = $(window).height() - expanded_dock_height;
        $(this).animate({'height':expanded_dock_height,'top': expanded_height},{queue:false, duration:500, easing: easing_type}).css({'z-index' : '999'});
    }).mouseout(function () {
        body_height = $(window).height() - default_dock_height;
        $(this).animate({'height':default_dock_height,'top': body_height},{queue:false, duration:500, easing: easing_type}).css({'z-index' : '1'});
    });
});
//---------Bags upp-----------//