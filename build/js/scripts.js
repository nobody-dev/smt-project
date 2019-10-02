"use strict"
$(document).ready(function(){
    //прячет кнопку "подробнее", если у новости нет объемного текста.
    $(".news-block__single").each(function(index, value){
        if($(value).find(".news-block__single-intro").length) {
            $(value).find(".news-block__single-more").show();
        } else {
            $(value).find(".news-block__single-more").hide();
        }
    });

    //плавные скроллы
    $(".menu-list").on("click","a", function(event) {
        event.preventDefault();
        var id = $(this).attr('href');
        var top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top - 50
        }, 1000);
    });

    $(".scroll-info").on("click", function(event) {
        event.preventDefault();
        var id = $(this).attr('href');
        var top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });
    
    $(".scroll-options").on("click", function(event) {
        event.preventDefault();
        var id = $(this).attr('href');
        var top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });

    $(".item-page__btn").on("click","a", function(event) {
        event.preventDefault();
        var id = $(this).attr('href');
        var top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top - 50
        }, 1000);
    });


    // Переключение табов
    $(".item-page__btn").click(function(){
        $(".tab-content").hide();
        $(".tab-content[data-index=" + $(this).attr('data-index') + "]").show();
    });

    // Прячет все табы
    $(".tab-content").hide();

    // Прячет кнопки, если у неё нет контента
    $(".tab-content").each(function(i, value) {
        if ($(value).html().trim() == "") {
            $(".item-page__btn[data-index=" + $(value).attr("data-index") + "]").hide();
        }
    });
    
    // Показывает первый контент блок eq(0)
    $('.tab-content[data-index='+ $('.item-page__btn:visible').eq(0).attr('data-index') +']').show();
});