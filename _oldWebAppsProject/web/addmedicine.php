<?php

if(!isset($_POST['quantity']) 
OR !isset($_POST['medicamentID'])
OR !isset($_POST['staffID_nurse'])
OR !isset($_POST['staffID_physician']) 
OR !isset($_POST['patientID'])){
  include('index.php');
  exit();
 }

session_start();
$quantity = $_POST['quantity'];
$medicamentID= (int)$_POST['medicamentID'];
$patientID = (int)$_POST['patientID'];
$note = $_POST['note'];
$staffID_nurse = $_POST['staffID_nurse'];
$staffID_physician = $_POST['staffID_physician'];
include('pdo.inc.php');

try {

    $dbh = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
    /*** echo a message saying we have connected ***/
    // echo 'Connected to database<br />';


    /*** set the error reporting attribute ***/
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /*** prepare the SQL statement ***/
    $stmt = $dbh->prepare("INSERT INTO `medizininformatik`.`medicine` (
							`medicineID`, `time`, `quantity`, `medicamentID`, `patientID`, `staffID_nurse`, `staffID_physician`, `note`
							) 
							VALUES (
							NULL, CURRENT_TIMESTAMP, :quantity, :medicamentID, :patientID, :staffID_nurse, :staffID_physician, :note);");

    /*** bind the paramaters ***/
    $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
    $stmt->bindParam(':medicamentID', $medicamentID, PDO::PARAM_INT);
    $stmt->bindParam(':patientID', $patientID, PDO::PARAM_INT);
	$stmt->bindParam(':staffID_nurse', $staffID_nurse, PDO::PARAM_INT);
	$stmt->bindParam(':staffID_physician', $staffID_physician, PDO::PARAM_INT);
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