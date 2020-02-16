$(document).ready(function(){

  //login form process
  	$('#login_form').submit(function(e){//pass (e) to make it prevent
      $('#preloader').fadeIn();

      var pForm = $('#login_form');//creating a varaible to hold data from login form

      var email = $('#loginEmail').val();
      var password = $('#loginPassword').val();

      var form = {email:email, password:password};
		

// Ajax call for checking user credentials
      $.ajax({
      type: pForm.attr('method'),
      url:  pForm.attr('action'),
      data: JSON.stringify(form),
      contentType: 'application/json',
      dataType: 'json',
      headers: {"Auth_Key": "$2y$12$JxRsfTx1d0vEIl9ZawpAWe53FX.C68MOehMWj3HbrJUZfuwEl6y1q",
                 Accept: "application/json"},
      success: function(response){
        console.log(response);
         var jcontent = JSON.parse(JSON.stringify(response));   
        if($.trim(jcontent.message) === "Invalid Email Or Password")
        {
          $.notify({ message: jcontent.message},
          { // settings
            element: 'body',
            type: 'danger',
            allow_dismiss: true,
            placement: {
              from: "top",
              align: "right"
            },

            delay: 5000,
            timer: 1000,
            animate: {
              enter: 'animated fadeInDown',
              exit: 'animated fadeOutUp'
            },

          });
        }

        else
        {

          //clear the form data
           pForm.trigger("reset");

          //console.log(jcontent.id);

          localStorage.setItem("user_id", jcontent.user_id);
          localStorage.setItem("firstname", jcontent.firstname);
          localStorage.setItem("lastname", jcontent.lastname);
          localStorage.setItem("email", jcontent.email);

            //call to function get_categories
            set_logged_user_status();
          $('#login_form').slideUp();
          $('#app-page').slideDown();
          $('#user_info').slideDown();
        }

      },//success function ends
      complete: function(){
      $('#preloader').fadeOut();
      }

      });//ajax call ends


	e.preventDefault();//prevent form from posting
  });


  $('#log_out').on('click',
  function() {
    localStorage.clear();
    $('#app-page').slideUp();
    $('#login_form').slideDown();
    $('#user_info').hide();
    location.reload();
  }
  );

});
