<?php
$ds = DIRECTORY_SEPARATOR;
$base_dir = realpath(dirname(__FILE__) . $ds . '..') . $ds;
require_once("{$base_dir}includes{$ds}Database.php");


class Article{

    private $table = 'articles';

    //Articles Properties
    public $article_id;
    public $user_id;
    public $category_id;
    public $article_title;
    public $article_body;
    public $article_created_on;
    public $status;

    public function __construct(){

    }

    //validating article param
    public function validate_article_param($value){
        if(!empty($value)){
            return true;
        }else{
            return false;
        }
    }


    public function create_articles(){
        //clean data
        $this->user_id = filter_var($this->user_id, FILTER_VALIDATE_INT);
        $this->category_id = filter_var($this->category_id, FILTER_VALIDATE_INT);
        $this->article_title = trim(htmlspecialchars(strip_tags($this->article_title)));
        $this->article_body = trim(htmlspecialchars(strip_tags($this->article_body)));
        $this->article_created_on = date('Y-m-d');

        global $database;

        $sql = "INSERT INTO $this->table (user_id, category_id, article_title, article_body, article_created_on)
         VALUES ('".$database->escape_value($this->user_id)."',
         '".$database->escape_value($this->category_id)."',
         '".$database->escape_value($this->article_title)."',
         '".$database->escape_value($this->article_body)."',
         '".$database->escape_value($this->article_created_on)."')";

         $article_saved = $database->query($sql);

         if($article_saved){
             return true;
         }else{
             return false;
         }
    }
   
    //Update Article
    public function update_article(){
        $this->article_id = filter_var($this->article_id, FILTER_VALIDATE_INT);
        $this->user_id = filter_var($this->user_id, FILTER_VALIDATE_INT); 
        $this->category_id = filter_var($this->category_id, FILTER_VALIDATE_INT); 
        $this->article_title = trim(htmlspecialchars(strip_tags($this->article_title)));
        $this->article_body = trim(htmlspecialchars(strip_tags($this->article_body)));


        global $database;

        $sql = "UPDATE ". $this->table ." SET
        category_id = '".$database->escape_value($this->category_id)."',
        article_title = '".$database->escape_value($this->article_title)."',
        article_body = '".$database->escape_value($this->article_body)."'
        WHERE article_id = '".$database->escape_value($this->article_id)."' &&
        user_id = '".$database->escape_value($this->user_id)."'";

        $article_updated = $database->query($sql);
        if($article_updated){
            return true;
        }else{
            return false;
        }
    }

    //delete article
    public function delete_article(){
        $this->article_id = filter_var($this->article_id, FILTER_VALIDATE_INT);
        $this->user_id = filter_var($this->user_id, FILTER_VALIDATE_INT); 
        
        global $database;

        $sql = "DELETE FROM ". $this->table ." 
         WHERE article_id = '".$database->escape_value($this->article_id)."' &&
         user_id = '".$database->escape_value($this->user_id)."'";

         $article_deleted = $database->query($sql);

         if($article_deleted){
            return true;
         }else{
             return false;
         }
    }


 //Latest Articles
public function get_latest_articles(){
    global $database;

    $sql = "SELECT articles.article_id, articles.user_id, articles.category_id, articles.article_title,
    articles.article_body,
    categories.category_title, users.user_id, users.firstname, users.lastname
    FROM ". $this->table ."
    JOIN categories on articles.category_id = categories.category_id
    JOIN users on users.user_id = articles.user_id order by articles.article_id desc limit 5";

    $result = $database->query($sql);
    $articleinfo = $database->fetch_array($result);
    return $articleinfo;
}
    
}// class ends
//instance of the class
$articles = new Article();
?>
