<?php
  // For the testing of this database, the username and password are the same
  // They are the names of our staff members.

if(!isset($_POST['val']) OR !isset($_POST['signID']) OR !isset($_POST['patientID'])){
  include('index.php');
  exit();
 }

session_start();
$val = $_POST['val'];
$signID= (int)$_POST['signID'];
$patientID = (int)$_POST['patientID'];
$note = $_POST['note'];
include('pdo.inc.php');

try {
    $dbh = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
    /*** echo a message saying we have connected ***/
    // echo 'Connected to database<br />';


    /*** set the error reporting attribute ***/
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /*** prepare the SQL statement ***/
    $stmt = $dbh->prepare("INSERT INTO `medizininformatik`.`vital_sign` (`vital_signID`, `patientID`, `signID`, `value`, `time`, `note`) VALUES (NULL, :patientID, :signID, :value, CURRENT_TIMESTAMP, :note);");

    /*** bind the paramaters ***/
    $stmt->bindParam(':patientID', $patientID, PDO::PARAM_INT);
    $stmt->bindParam(':signID', $signID, PDO::PARAM_INT);
    $stmt->bindParam(':value', $val, PDO::PARAM_STR,5);
    $stmt->bindParam(':note', $note, PDO::PARAM_STR, 5);

    /*** execute the prepared statement ***/
    $stmt->execute();

    // redirect to the page home.php
    header('location: patient.php?id='.$patientID);

    

    /*** close the database connection ***/
    $dbh = null;

    }
catch(PDOException $e)
    {
    echo $e->getMessage();
    }



?>