$(document).ready(function(){

  var auth_key= "$2y$12$JxRsfTx1d0vEIl9ZawpAWe53FX.C68MOehMWj3HbrJUZfuwEl6y1q";

    $('#create_article').submit(function(e){
        $('#preloader').fadeIn();

        var pForm = $('#create_article');//creating a variable to hold data from create article form
        
        var article_title = $('#article_title').val();
        var article_body = $('#article_body').val();
        var category_id  = $('#category_select').val();
        var user_id      = $('#user_id').val();
        var form = {article_title:article_title, article_body:article_body, category_id:category_id, user_id:user_id};

        // Ajax call for adding article 
        $.ajax({
            type: pForm.attr('method'),
            url:  pForm.attr('action'),
            data: JSON.stringify(form),
            contentType: 'application/json',
            dataType: 'json',
            headers: {"Auth_Key": auth_key,Accept: "application/json"},
            success: function(response){
              console.log(response);
               var jcontent = JSON.parse(JSON.stringify(response));   
              if($.trim(jcontent.message) === "Article cannot be added right now..!")
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
      
              if($.trim(jcontent.message) === "Article Created Successfully")
			   {
					 //clear the form data
					  pForm.trigger("reset");

					 //go to login section
                     $("#panel").hide();

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
         
             //call to function get_categories
            get_categories();
            get_category_list();
      
            },//success function ends
            complete: function(){
            $('#preloader').fadeOut();
            }
      
            });//ajax call ends

        e.preventDefault();//prevent form from posting
    });









      //Update Article
      $('#edit_article').submit(function(e){
        $('#preloader').fadeIn();
  
        var pForm = $('#edit_article');//creating a variable to hold data from create article form
        
        var article_id     = $('#edit_article_id').val();
        var article_title  = $('#edit_article_title').val();
        var article_body   = $('#edit_article_body').val();
        var category_id    = $('#edit_category_select').val();
        var user_id        = $('#edit_user_id').val();
        
        var form = {article_id:article_id, article_title:article_title, article_body:article_body, category_id:category_id, user_id:user_id};
  
        // Ajax call for adding article 
        $.ajax({
            type: pForm.attr('method'),
            url:  pForm.attr('action'),
            data: JSON.stringify(form),
            contentType: 'application/json',
            dataType: 'json',
            headers: {"Auth_Key": auth_key,Accept: "application/json"},
            success: function(response){
              console.log(response);
               var jcontent = JSON.parse(JSON.stringify(response));   
              if($.trim(jcontent.message) === "Article cannot be updated right now..!")
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
      
              if($.trim(jcontent.message) === "Article Updated Successfully")
         {
           //clear the form data
            pForm.trigger("reset");
  
            //get category_articles
            get_category_articles(category_id)
          


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
    });

});//document ready ends
