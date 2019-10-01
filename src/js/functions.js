//= ../../node_modules/jquery/dist/jquery.js
//= ../../node_modules/bootstrap/dist/js/bootstrap.min.js
//= ../../node_modules/mobile-detect/mobile-detect.js
//= ../../node_modules/magnific-popup/dist/jquery.magnific-popup.js
//= jquery.maskedinput.min.js


window.addEventListener('DOMContentLoaded', () => {

    let _placeholderText = '';
    $('input[placeholder], textarea[placeholder]').on('focus', function(){
        _placeholderText = $(this).attr('placeholder');
        $(this).attr('placeholder', ' ');
    }).on('blur', function(){
        $(this).attr('placeholder', _placeholderText);
    });

    $('.banner-block__scroll').on('click', function(e){
        e.preventDefault();
        let _top = $('#categories').offset().top;
        $('html, body').animate({scrollTop : _top}, 1300);
    });

    function footerPosition(){
        let _docHeight = $(window).height(),
            _footerOffset = $('footer').offset().top + parseInt($('footer').css('height'));

        if(_docHeight > _footerOffset){
            $('footer').addClass('position');
        }
        else{
            $('footer').removeClass('position');
        }
    }
    footerPosition();
    window.addEventListener('resize', function(){
        footerPosition();
    });

    $('.category-page__side-nav ul li span.point').on('click', function(){
       let _li = $(this).closest('li');
       if(_li.hasClass('open')){
           _li.removeClass('open');
       }
       else{
           $('.category-page__side-nav ul li').removeClass('open');
           _li.addClass('open');
       }
    });

    $('.header__show-menu').on('click', function(e){
        e.preventDefault();
        let _menu = $('.header__nav');
        if(_menu.hasClass('shown')){
            _menu.removeClass('shown');
        }
        else{
            _menu.addClass('shown');
        }
    });

    $(document).on('click', function(e){
        if($(e.target).closest('.header__nav').length == 0 && $(e.target).closest('.header__show-menu').length == 0){
            $('.header__nav').removeClass('shown');
        }
    })
});

