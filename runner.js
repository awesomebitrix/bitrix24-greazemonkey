// ==UserScript==
// @name           bitrix starter
// @namespace      https*
// @include        https://bitrix.ideal-plm.ru/?bitrix_starter
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @grant       none
// ==/UserScript==

//СКРИПТ РАБОТАЕТ ТОЛЬКО ПО АДРЕСУ https://bitrix.ideal-plm.ru/?bitrix_starter - делайте для этого отдельную вкладку
//ЗАДАЙТЕ НАСТРОЙКИ
var howoftenrechek=13;//Как часто проверять статус (перезагружать страницу и выполнять скрипт) в минутах
var whenstartday=10;//Час, когда нужно начинать рабочий день
var whenstopday=18.5;//Час, когда нужно заканчивать рабочий день

function click_start() {
    $('#timeman-block').click();
    $('.tm-popup-button-handler').click();
}

function reload_page() {
    document.location=document.location;
}

function run_day() {
    var dt = new Date();
    var hours = dt.getHours();

    if(hours>whenstartday&&hours<whenstopday&&$("#timeman-status").html()!='Работаю') {
        click_start();
    }
    if(hours>=whenstopday&&$("#timeman-status").html()=='Работаю') {
        click_start();
    }

    var html='<div id="disciplinecrack">Здесь автоотмечание. Тебе в другую вкладку!<br><span style="color:red"><a href="https://bitrix.ideal-plm.ru" target="_blank">Жми сюда</a></span></div>';
    $('table.bx-layout-table').hide().before(html);
    $("#disciplinecrack").css('background','black').css('font-size','3em').css('color','white').css('width','100%').css('height','100%');
    $('#timeman_main').css('z-index','-100');

    setTimeout(reload_page,howoftenrechek*60000);
}

setTimeout(run_day,1000); 