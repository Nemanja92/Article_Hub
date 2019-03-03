<?php
session_start();
// require_once('../includes/Database.php');
// require_once('../includes/Bcrypt.php');
// require_once('../includes/Helper.php');

$ds = DIRECTORY_SEPARATOR;
$base_dir = realpath(dirname(__FILE__) . $ds . '..') . $ds;
require_once("{$base_dir}includes{$ds}Database.php");
require_once("{$base_dir}includes{$ds}Bcrypt.php");
require_once("{$base_dir}includes{$ds}Helper.php");

class Apiusers{

    private $table = 'apiusers';

    //Apiuser properties
    public $apiuser_id;
    public $firstname;
    public $lastname;
    public $email;
    public $password;
    public $auth_key;
    public $apiuser_status;

    public function __construct(){

    }

    //check unique email
    public function check_email(){
        global $database;
        $this->email = trim(htmlspecialchars(strip_tags($this->email)));
        $sql = "SELECT apiuser_id FROM ". $this->table ." WHERE 
                email = '".$database->escape_value($this->email)."' ";
        
                $result = $database->query($sql);
                $info = $database->fetch_row($result);

                if(empty($info)){
                    return true;
                }else{
                    return false;
                }
    }

    //create ApiUser
    public function create_ApiUser(){
        //clean data
        $this->firstname = trim(htmlspecialchars(strip_tags($this->firstname)));
        $this->lastname = trim(htmlspecialchars(strip_tags($this->lastname)));
        $this->email = trim(htmlspecialchars(strip_tags($this->email)));
        $this->password = trim(htmlspecialchars(strip_tags($this->password)));

        //hash the password => return hashed password
        $hashed_password = Bcrypt::hashPassword($this->password);

        //create user Auth_key
        $normal_key = substr(md5(mt_rand()), 0, 7);

        //hash the key
        $auth_key = Bcrypt::hashPassword($normal_key);

        global $database;

        $sql = "INSERT INTO $this->table (firstname, lastname, email, password, auth_key)
                VALUES ('".$database->escape_value($this->firstname)."',
                        '".$database->escape_value($this->lastname)."',
                        '".$database->escape_value($this->email)."',
                        '".$database->escape_value($hashed_password)."',
                        '".$database->escape_value($auth_key)."')";

                $user_saved = $database->query($sql);

                if($user_saved){
                    global $helper;
                    $helper->Message = 'Registration Successful Login here';
                    $helper->Location = 'login.php';
                    $helper->set_flash_message();
                }else{
                    die('Cannot save the user try again later...!');
                }
    }

    // public function ApiUserDetails
    public function get_ApiUserDetails(){

        global $database;

        $this->apiuser_id = intval($this->apiuser_id);

        $sql = "SELECT apiuser_id, firstname, lastname, email, auth_key FROM ". $this->table ."
                WHERE apiuser_id = '$this->apiuser_id'";

        $result = $database->query($sql);
        $userinfo = $database->fetch_row($result);
        return $userinfo;
    }

    // function to check users credentials
    public function check_user_credentials(){

        $this->email = trim(htmlspecialchars(strip_tags($this->email)));

        global $database;

        $sql = "SELECT apiuser_id, firstname, lastname, email, password FROM ". $this->table ."
        WHERE email = '".$database->escape_value($this->email)."'";

        $result = $database->query($sql);
        $user_info = $database->fetch_row($result);

        if(!empty($user_info)){
            //match the password
            $hashed_password = $user_info['password'];

            $password = trim(htmlspecialchars(strip_tags($this->password)));

            //match password using bcrypt
            $match_password = Bcrypt::checkPassword($password, $hashed_password);

            if($match_password){
                return $user_info;
            }else{
                return false;
            }
        }
    }

    //function to verify user authKey
    public function verify_AuthKey(){
        $this->auth_key = trim(htmlspecialchars(strip_tags($this->auth_key)));

        global $database;

        $sql = "SELECT apiuser_id, firstname, lastname, email, auth_key FROM ". $this->table ."
        WHERE auth_key = '".$database->escape_value($this->auth_key)."'";

        $result = $database->query($sql);
        $ApiUserInfo = $database->fetch_row($result);

        if(empty($ApiUserInfo)){
            return false;
        }else{
            return true;
        }
    }

}// class Apiusers ends

//instance of the class
$api_user = new Apiusers();
