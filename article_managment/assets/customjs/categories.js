
var auth_key= "$2y$12$JxRsfTx1d0vEIl9ZawpAWe53FX.C68MOehMWj3HbrJUZfuwEl6y1q";

//function to get all categories for side bar
function get_categories(){
    $('#category_block').empty();

    $.ajax({
        type: 'GET',
        url: 'http://localhost/api-code/api/categories/GetCategories',
        headers: {"Auth_Key": auth_key, Accept: "application/json"},
        success: function(response){
            var jcontent = JSON.parse(JSON.stringify(response));
            for(var myObj in jcontent){
                $('#category_block').append('<li><a href="javascript:void(0)" \
                onclick="get_category_articles('+jcontent[myObj].category_id +');">'
                     +jcontent[myObj].category_title+ ' ('+jcontent[myObj].total_articles+')</a></li>');
            }
           
        }
    });
}

//function to create category dropdownlist
function get_category_list(){

    $.ajax({
        type: 'GET',
        url: 'http://localhost/api-code/api/categories/GetCategoryList',
        headers: {"Auth_Key": auth_key, Accept: "application/json"},
        contentType: 'application/json',
        success: function(response){
            $('#category_select').append('<option value="" selected> Select a Category </option>');
            var jcontent = JSON.parse(JSON.stringify(response));
            for(var myObj in jcontent){
                $('#category_select').append('<option value="'+jcontent[myObj].category_id+'">'+jcontent[myObj].category_title+'</option>');
            }
            $('#create_article').append('<input type="hidden" name="user_id" id="user_id" value="'+localStorage.getItem("user_id")+'" />');
        }
    });
}


//Function to get articles of every category
function get_category_articles(param){
    $('#preloader').fadeIn(10);

    //check if any form is opened
    if($("#create_panel").css('display') === 'block' || $("#edit_panel").css('display') === 'block' ){
        $('#create_panel').slideUp();
        $('#article_section').slideDown();
        $('#edit_panel').slideUp();
       }

    $('#article_section').empty();
    var category_id = param;
   
    $.ajax({
        type: 'POST',
        url: 'http://localhost/api-code/api/categories/GetArticlesByCategory',
        data: JSON.stringify({category_id:category_id}),
        contentType: 'application/json',
        dataType: 'json',
        headers: {"Auth_Key": auth_key, Accept: "application/json"},
        success: function(response){
            var jcontent = JSON.parse(JSON.stringify(response));
            if(jQuery.isEmptyObject(jcontent)){
                $('#article_section').append('<div class="article_holder block-card m-bot-40"><h2>No Articles Found</h2></div>');
            }else{
            for(var myObj in jcontent){

                //setting edit and delete buttons
                var article_user_id = jcontent[myObj].user_id;
                var logged_in_user_id = localStorage.getItem("user_id");
                var article_id = jcontent[myObj].article_id;
                var category_id = jcontent[myObj].category_id;
                //creating edit and delete button
                if(article_user_id === logged_in_user_id){
                   var action_btn = '<span><a href="javascript:void(0)" class="btn btn-primary" \
                                    onclick="edit_article('+article_id+','+category_id+','+article_user_id+');">Edit Article</a> \
                                    <a href="javascript:void(0)" class="btn btn-danger" \
                                    onclick="delete_article('+article_id+','+category_id+','+article_user_id+');">Delete Article</a></span>';
                }else{
                    var action_btn = '';
                }
                
                //appending the response to the div
                $('#article_section').append(
                    '<div id="'+article_id+'" class="article_holder block-card m-bot-40"> \
                    <h5 class="article_title">'+jcontent[myObj].article_title+'</h5> \
                     <small> Category:- '+jcontent[myObj].category_title+' | By:- '+jcontent[myObj].firstname+'</small> \
                     <p class="article_body">'+jcontent[myObj].article_body+'</p>'+ action_btn +'</div>');

             
            }
        }
        },
        complete: function(){
        $('#preloader').fadeOut();
        }
    });
}


//Function to prepare Edit Article Form
function edit_article(param, param2, param3){

    if($("#create_panel").css('display') === 'block' && $("#edit_panel").css('display') === 'none' ){
        $('#create_panel').slideUp();
        $('#article_section').slideUp();
        $('#edit_panel').slideDown();
       }
      else if($("#create_panel").css('display') === 'none' && $("#edit_panel").css('display') === 'none' ){
        $('#article_section').slideUp();
        $('#edit_panel').slideDown();
       }

        //setting the variables for Edit Article Form
        var article_id = param;    
        var article_user_id = param3;
        
        //append user_id to the form
        
        var article_title = $( "#"+article_id+" .article_title" ).html();
        var article_body = $( "#"+article_id+" .article_body" ).html();

        $('#edit_article_title').val(article_title);
        $('#edit_article_body').val(article_body);
        $('#edit_user_id').val(article_user_id);
        $('#edit_article_id').val(article_id);

      //getting the category list for our edit article form
      $.ajax({
        type: 'GET',
        url: 'http://localhost/api-code/api/categories/GetCategoryList',
        headers: {"Auth_Key": auth_key, Accept: "application/json"},
        contentType: 'application/json',
        success: function(response){
            var jcontent = JSON.parse(JSON.stringify(response));
            $('#edit_category_select').append('<option value="" selected> Select a Category </option>');

            for(var myObj in jcontent){ //For Loop Starts
                var category_id = param2;
                var selected = "";
                 //check for selected category
             var article_cat_id = jcontent[myObj].category_id;
           
             if(category_id == article_cat_id){
                selected = "selected";
             }

                $('#edit_category_select').append(
                    '<option value="'+jcontent[myObj].category_id+'" '+ selected+'>'+jcontent[myObj].category_title+'</option>');
            }// For Loop Ends
          
        }
    });


}