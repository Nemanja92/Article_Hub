<?php
$ds = DIRECTORY_SEPARATOR;
$base_dir = realpath(dirname(__FILE__) . $ds . '..') . $ds;
require_once("{$base_dir}includes{$ds}Database.php");

class Categories{

    private $table = 'categories';

    //Categories Properties
    public $category_id;
    public $category_name;
    public $status;

    public function __construct(){

    }


        //validating category param
        public function validate_category_param($value){
            if(!empty($value)){
                return true;
            }else{
                return false;
            }
        }


    public function get_categories(){
        global $database;

        $sql = "SELECT categories.category_id, categories.category_title,
                COUNT(articles.article_id) AS total_articles FROM ". $this->table ."
                LEFT JOIN articles on articles.category_id = categories.category_id
                GROUP BY categories.category_id";

                $result = $database->query($sql);

                $categories_info = $database->fetch_array($result);
                return $categories_info;
    }

    public function get_articles_by_category(){
        global $database;
        $this->category_id = filter_var($this->category_id,  FILTER_VALIDATE_INT);
        $sql = "SELECT articles.article_id, articles.user_id, articles.category_id, articles.article_title,
        articles.article_body,
        categories.category_title, users.user_id, users.firstname, users.lastname
        FROM ". $this->table ."
        JOIN articles on articles.category_id = categories.category_id
        JOIN users on users.user_id = articles.user_id
        WHERE categories.category_id = '".$database->escape_value($this->category_id)."'";

        $result = $database->query($sql);
        $articleinfo = $database->fetch_array($result);
        return $articleinfo;
    }


    public function get_category_list(){
        global $database;
        $sql = "SELECT category_id, category_title FROM ". $this->table ."";
        $result = $database->query($sql);
        $category_list = $database->fetch_array($result);
        return $category_list;
    }

}// class Ends
//instance of the class

$categories = new Categories();
?>
