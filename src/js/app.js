$(document).ready(function(){
    //---------Change input-----------//
    function catalogItemCounter(field){

        var fieldCount = function(el) {

            var
                // Мин. значение
                min = el.data('min') || true,

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
            difference = Math.round(sum - priceAnalog) +" руб.";
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
            //Grand 15 T
            case 'MasterEmacoS488':
                priceKg = 32;
                break;
            case 'MapegroutThixotripic':
                priceKg = 36;
                break;
            case 'Monotop612':
                priceKg = 413;
                break;

            //Grand 15 L
            case 'MasterEmacoS488PG':
                priceKg = 31;
                break;
            case 'MapegroutHiFlow':
                priceKg = 32;
                break;

            //Grand 17 T
            case 'MasterEmacoS560FR':
                priceKg = 67;
                break;
            case 'MapegroutMF':
                priceKg = 54;
                break;

            //Grand 17 L
            case 'MasterEmacoS540FR':
                priceKg = 68;
                break;
            case 'MapegroutSF':
                priceKg = 44;
                break;

            //Grand PM 20 T
            case 'MasterEmacoS5300':
                priceKg = 120;
                break;

            //Grand PM 25 T
            case 'MasterEmacoS5400':
                priceKg = 63;
                break;
            case 'MapegroutT60':
                priceKg = 73;
                break;

            //Grand PM 25 L
            case 'MasterEmacoS5450PG':
                priceKg = 104;
                break;

            //Grand CEM (Inject EP 40)
            case 'MasterEmacoA640':
                priceKg = 65;
                break;
            case 'Stabilcem':
                priceKg = 59;
                break;

            //Grand Epoxy
            case 'Sikadur31CF':
                priceKg = 1425;
                break;

            //Grand 56 T
            case 'MasterEmacoT1100TIX':
                priceKg = 70;
                break;

            //Grand 56 L
            case 'MasterEmacoT1200PG':
                priceKg = 68;
                break;

            //Grand 56 LF
            case 'MasterEmacoT1400FR':
                priceKg = 71;
                break;
            case 'MapegroutSVRFIBER':
                priceKg = 54;
                break;

            //Grand 10 T
            case 'MasterEmacoN900':
                priceKg = 68;
                break;
            case 'MapegroutFastSetR4':
                priceKg = 39;
                break;
            case 'Monotop615':
                priceKg = 156;
                break;

            //Grand PM 10 T
            case 'MasterEmacoN5200':
                priceKg = 109;
                break;
            case 'Mapegrout430':
                priceKg = 45;
                break;

            //Grand PM 12 T
            case 'MasterEmacoN5100':
                priceKg = 87;
                break;
            case 'Monotop620':
                priceKg = 156;
                break;

            //Grand Fast
            case 'PLANITOP400':
                priceKg = 133;
                break;

            //Antikor AD
            case 'MasterEmacoP5000AP':
                priceKg = 223;
                break;
            case 'Mapefer1K':
                priceKg = 202;
                break;
            case 'Monotop610':
                priceKg = 145;
                break;

            //Epoxy Grund
            case 'MonoTopArmatec':
                priceKg = 536;
                break;

            //Anker 47
            case 'SikaGrout314':
                priceKg = 137;
                break;

            //Anker 55
            case 'MasterFlow928':
                priceKg = 45;
                break;
            case 'Mapefill':
                priceKg = 46;
                break;
            case 'SikaGrout316':
                priceKg = 56;
                break;

            //Anker 90
            case 'MapegroutHiFlow10':
                priceKg = 33;
                break;
            case 'SikaGrout318':
                priceKg = 153;
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