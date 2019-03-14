<?php
//header
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-type, Auth_Key, Accept');

include_once '../../models/Apiusers.php';
include_once '../../models/Users.php';


//Validating request
if($_SERVER['REQUEST_METHOD'] === 'POST'){

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
if($user->validate_param($data->email)){
    $user->email = $data->email;
  }else{
    die(header('HTTP/1.1 402 Email parameter is required'));
  }

  if($user->validate_param($data->password)){
    $user->password = $data->password;
  }else{
    die(header('HTTP/1.1 402 Password parameter is required'));
  }

  // Check user Credentials
  if($info = $user->check_user_credentials()){
    echo json_encode($info);
  }else{
    echo json_encode(array('message' => 'Invalid email Or Password'));
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
