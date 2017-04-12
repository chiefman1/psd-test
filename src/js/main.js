$(document).ready(function(){
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
        $(this).toggleClass('open');
    });
});

$(function() {
    $('#silver').click(function(){
        $(".front-phone").attr('src',"img/silver1.png");
        $(".back-phone").attr('src',"img/silver2.png");
        return false;
    });
});

$(function() {
    $('#black').click(function(){
        $(".front-phone").attr('src',"img/black1.png");
        $(".back-phone").attr('src',"img/black2.png");
        return false;
    });
});

$(function() {
    $('#gold').click(function(){
        $(".front-phone").attr('src',"img/gold1.png");
        $(".back-phone").attr('src',"img/gold2.png");
        return false;
    });
});