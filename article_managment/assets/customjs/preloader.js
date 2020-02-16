$(document).ready(function(){ // makes sure the whole site is loaded
  $('#preloader').fadeIn(); // will first fade out the loading animation
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('.wrapper').delay(850).fadeIn();
})
