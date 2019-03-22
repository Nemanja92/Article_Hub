<?php
//header
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-type, Auth_Key, Accept');

include_once '../../models/Apiusers.php';
include_once '../../models/Categories.php';

//Validating request
if($_SERVER['REQUEST_METHOD'] === 'POST'){

//get the auth_key from the header
$headers = apache_request_headers();
$auth_key = $headers['Auth_Key'];

$api_user->auth_key = $auth_key;

//Verify the Auth Key
$Verified = $api_user->verify_AuthKey();

if($Verified == TRUE){

$json = file_get_contents('php://input');

$data = json_decode($json);

$categories->category_id = $data->category_id;

$category_articles = $categories->get_articles_by_category();

echo json_encode($category_articles);

}
else
{
    die(header('HTTP/1.1 401 Unauthorized Key Used'));
}
}// if for request check ends
else{
    die(header('HTTP/1.1 400 Request Method is Not Valid'));
}
?>
