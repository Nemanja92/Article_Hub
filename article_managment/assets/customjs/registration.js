// JavaScript Document
$(document).ready(function(){

//registration form process
	$('#register_form').submit(function(e){//pass (e) to make it prevent
     $('#preloader').fadeIn();

		 var pForm = $('#register_form');//creating a varaible to hold data from form
		 var firstname = $('#firstname').val();
		 var lastname = $('#lastname').val();
		 var email = $('#registerEmail').val();
		 var password = $('#registerPassword').val();

		 var form = {firstname:firstname, lastname:lastname, email:email, password:password};


	      $.ajax({
			  type: pForm.attr('method'),
			  url:  pForm.attr('action'),
			  data: JSON.stringify(form),
			  contentType: 'application/json',
              dataType: 'json',
			  headers: {"Auth_Key": "$2y$12$JxRsfTx1d0vEIl9ZawpAWe53FX.C68MOehMWj3HbrJUZfuwEl6y1q",
			  			 Accept: "application/json"},
			  success: function(response){
					//parse the JSON response
				 var jcontent = JSON.parse(JSON.stringify(response));

				 // check for response
				 //if response is for not unique email
				 if($.trim(jcontent.message) === "This Email is already taken")
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

				 if($.trim(jcontent.message) === "User has been created")
			   {
					 //clear the form data
					  pForm.trigger("reset");

					 //go to login section
					 $('#register_form').hide();
					 $('#login_form').show();

					 $.notify({ message: jcontent.message},
					 { // settings
						 element: 'body',
						 type: 'success',
						 allow_dismiss: true,
						 placement: {
						 from: "top",
						 align: "right"
						 }
					 });

			   }

				},//success function ends
				complete: function(){
        $('#preloader').fadeOut();
      	}

			  });//ajax call ends


		e.preventDefault();//prevent form from posting
	});//Register form process ends




});
