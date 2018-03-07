
<?php
//   if ($_GET['action'] == "getCampus") {
//     if($_GET['id']){
//         $myid = $_GET['id'];
//         print(json_encode(myGet($myid)));
//     }
//     else 
//     print_r("error");
//   }
//   else if ($_GET['action'] == "getAuditor"){
//     if($_GET['id'] && $_GET['num']){
//         $myid = $_GET['id'];
//         $mynum = $_GET['num'];
//         print(json_encode(myGet($myid,$mynum)));
//     }
//     else 
//     print_r("error");
//   }
//   else if ($_GET['action'] == "getTech"){
//     if($_GET['unId']){
//         $myid = $_GET['unId'];
        
//         print(json_encode(getInfo($myid,'tech')));
//     }
//     else 
//     print_r("error");
//   }
//   else if ($_GET['action'] == "getForniture"){
//     if($_GET['unId']){
//         $myid = $_GET['unId'];
        
//         print(json_encode(getInfo($myid,'forniture')));
//     }
//     else 
//     print_r("error");
//   }



header('Access-Control-Allow-Origin: *'); 
class Api{
    public $get;
    public function __construct(){
        $this->get = $_GET;
    }

    private function mysqlli($user,$password,$bd){
        $mysqli = new mysqli('mysql.hostinger.ru',$user,$password,$bd);

        if ($mysqli->connect_error) {
            die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
        }
        return $mysqli;
    }

    public function getCampusSp(){
        $mysqli = $this->mysqlli('u807849420_blant','4Zjb3pss','u807849420_fond');
        $results = $mysqli->query("SELECT * FROM kampus ORDER BY Number ");
        
        if($results){
            
            while($row = $results->fetch_assoc()) {
            $data[] = $row;
            }
            $results->free();
        }
        else $data = 0;
        $mysqli->close();
        echo json_encode($data);
    }

    public function getAuditoreInfo(){
        
        if (!isset($this->get['id'])){ 
            return "error"; 
        }
        
        $id = $this->get['id'];
        $mysqli = $this->mysqlli('u807849420_blant','4Zjb3pss','u807849420_fond');
        $results = $mysqli->query("SELECT * FROM i013456 WHERE Id = $id");
        
        if($results){
            
            while($row = $results->fetch_assoc()) {
            $data[] = $row;
            }
        
        $results->free();
        }
        else $data = 0;
        $mysqli->close();

        echo json_encode($data);
    }


    public function getAuditoreSp(){
        
        if (!isset($this->get['id'])){ 
            return "error"; 
        }
        
        $id = $this->get['id'];
        
        $mysqli = $this->mysqlli('u807849420_blant','4Zjb3pss','u807849420_fond');// TODO сделать несколько пользователей с разными правами доступа, сделать экранирование
        $results = $mysqli->query("SELECT * FROM i013456 WHERE Kampus = $id");
        
        if($results){
            
            while($row = $results->fetch_assoc()) {
            $data[] = $row;
            // print_r($row);
            }
        
        $results->free();
        }
        else $data = 0;
        $mysqli->close();

        echo json_encode($data);
     
    }
    /**unNumber - уникальный номер оборудования where - что именно tech/forniture */
    public function getInfo(){
        if (!isset($this->get['auditore']) && !isset($this->get['where'])  ){ 
            return "error"; 
        }
        
        $myaud = $this->get['auditore'];
        $where = $this->get['where'];
        //$kampus = $this->get['kampus'];
        $mysqli = $this->mysqlli('u807849420_blant','4Zjb3pss','u807849420_fond');// TODO сделать несколько пользователей с разными правами доступа, сделать экранирование
        
        $results = $mysqli->query("SELECT * FROM $where WHERE Auditore = $myaud ");
        
        if($results){
            
            while($row = $results->fetch_assoc()) {
            $data[] = $row;
            }
        
        $results->free();
        }
        else $data = 0;
        $mysqli->close();

        echo json_encode($data);
    }

    public function addCampus(){
        //при передачи параметров в запросе get использовать переменные вида "text"
        if (!isset($this->get['Name']) && !isset($this->get['UnId']) && !isset($this->get['Number'])){ 
            return "error"; 
        }
        $name = $this->get['Name'];
        $unid = $this->get['UnId'];
        $num = $this->get['Number'];
        
        $mysqli = $this->mysqlli('u807849420_blant','4Zjb3pss','u807849420_fond');
        $results = $mysqli->query("INSERT INTO `kampus`VALUES (null,$name,$unid,$num)");
        print_r(json_encode($results));
    }

    public function addAuditore(){
        //EnAud-номер аудитории Kampus-id корпуса Place-площадт Seats-количество мест
        if (!isset($this->get['Aud']) && !isset($this->get['Campus']) && !isset($this->get['Place']) && !isset($this->get['Seats'])){ 
            return "error"; 
        }
        $aud = $this->get['Aud'];
        $campus = $this->get['Campus'];
        $place = $this->get['Place'];
        $seats = $this->get['Seats'];

        $mysqli = $this->mysqlli('u807849420_blant','4Zjb3pss','u807849420_fond');
        $results = $mysqli->query("INSERT INTO `i013456`VALUES (null,$aud,$campus,$place,$seats)");
        print_r(json_encode($results));
    }
    public function addInfo(){
        //where = tech or forniture
        if (!isset($this->get['where']) && !isset($this->get['Auditore']) && !isset($this->get['Name']) && !isset($this->get['UnNumber']) && !isset($this->get['Description'])){ 
            return "error"; 
        }
        
        $myaud = $this->get['Auditore'];
        $where = $this->get['where'];
        $name = $this->get['Name'];
        $unNumber = $this->get['UnNumber'];
        $descript = $this->get['Description'];
        //$kampus = $this->get['kampus'];
        $mysqli = $this->mysqlli('u807849420_blant','4Zjb3pss','u807849420_fond');// TODO сделать несколько пользователей с разными правами доступа, сделать экранирование

        $results = $mysqli->query("INSERT INTO `$where`VALUES (null,$name,$unNumber,$descript,$myaud)");
        print_r(json_encode($results));
    }
    
}

$api = new Api();
$api->$_GET['action']();