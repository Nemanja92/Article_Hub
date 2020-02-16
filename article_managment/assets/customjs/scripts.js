$(document).ready(function(){

  set_logged_user_status();


//Toggle rigester and login forms
$('#register_form').hide();
  $('#register').on('click',
  function() {
    $('#login_form').slideUp();
    $('#register_form').slideDown();
  }
);

$('#login').on('click',
function() {
  $('#register_form').slideUp();
  $('#login_form').slideDown();
}
);

// Create article form
    $("#create_article_btn").click(function(){

       if($("#create_panel").css('display') === 'none' && $("#edit_panel").css('display') === 'block' ){
        $('#create_panel').slideDown();
        $('#article_section').slideDown();
        $('#edit_panel').slideUp();
       }

      else if ($("#create_panel").css('display') === 'none') {
        $('#create_panel').slideDown();
     }
     else if ($("#create_panel").css('display') === 'block') {
      $('#create_panel').slideUp();
   }
   
    });



});


function set_logged_user_status(){
    
  if(localStorage.user_id === undefined)
  {
    $('#user_info').hide();
    $('#login_form').show();
  }
  else
  {
    //call to function get_categories
    get_categories();
    get_category_list();
    $('#login_form').hide();
    $('#app-page').show();
    $('#user_info').show();
    $('#display').html(localStorage.getItem("firstname"));

  }

}
