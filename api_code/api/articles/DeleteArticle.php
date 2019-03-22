<?php
//header
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Origin, Content-type, Auth_Key, Accept');


include_once '../../models/Apiusers.php';
include_once '../../models/Articles.php';

//Validating request
if($_SERVER['REQUEST_METHOD'] === 'DELETE'){

 // Validating Content type
 if($_SERVER['CONTENT_TYPE'] === 'application/json'){

//get the auth_key from the header
$headers = apache_request_headers();
$auth_key = $headers['Auth_Key'];

$api_user->auth_key = $auth_key;

//Verify the Auth Key
$Verified = $api_user->verify_AuthKey();

if($Verified == TRUE){

  //get the files data
  $json = file_get_contents('php://input');
  $data = json_decode($json);

   //Validating parameters

   if($articles->validate_article_param($data->article_id)){
    $articles->article_id = $data->article_id;
   }else{
    die(header('HTTP/1.1 402 article_id parameter is required'));
   }


   if($articles->validate_article_param($data->user_id)){
    $articles->user_id = $data->user_id;
   }else{
    die(header('HTTP/1.1 402 user_id parameter is required'));
   }


   

   //Delete Article
   if($articles->delete_article()){
    echo json_encode(array('message' => 'Article Deleted Successfully'));
   }else{
    echo json_encode(array('message' => 'Article cannot be Deleted right now..!'));
   }
}
else
{
    die(header('HTTP/1.1 401 Unauthorized Key Used'));
}

 }// if for validating content type ends
else{
    die(header('HTTP/1.1 204 Content type not valid'));
}
}// if for request check ends
else{
    die(header('HTTP/1.1 400 Request Method is Not Valid'));
}


?>
