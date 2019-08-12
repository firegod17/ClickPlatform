//Inspiration
// https://dribbble.com/shots/6155986-Chat-Bar-Interaction

var flag = 0;

$(".button").on('click',function(){
  if(flag == 0){
    on();
    flag = 1;
  }else{
    off();
    flag = 0;
  }
});

function on(){
  $('input').addClass('rotate-input');
  $('.button').addClass('button-rotate');
  $('.tools').addClass('tools-rotate');
}

function off(){
  $('input').removeClass('rotate-input');
  $('.button').removeClass('button-rotate');
  $('.tools').removeClass('tools-rotate');
}
