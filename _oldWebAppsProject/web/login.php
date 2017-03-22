<?php
  // For the testing of this database, the username and password are the same
  // They are the names of our staff members.

if(!isset($_POST['username']) OR !isset($_POST['password'])){
  include('index.php');
  exit();
 }

session_start();
$user = $_POST['username'];
$pwd= $_POST['password'];


include('pdo.inc.php');

try {
    $dbh = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
    /*** echo a message saying we have connected ***/
    // echo 'Connected to database<br />';


    /*** set the error reporting attribute ***/
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //    echo "<h3>First select the new user</h3>";

    /*** prepare the SQL statement ***/
    $stmt = $dbh->prepare("SELECT staff.* FROM staff, credential WHERE staff.staffID = credential.staffID AND credential.hashed_password LIKE sha(:password) AND staff.username=:username");

    /*** bind the paramaters ***/
    $stmt->bindParam(':password', $pwd, PDO::PARAM_STR,5);
    $stmt->bindParam(':username', $user, PDO::PARAM_STR, 5);

    /*** execute the prepared statement ***/
    $stmt->execute();

    /*** fetch the results ***/
    $result = $stmt->fetchAll();

    /*** loop of the results ***/
    foreach($result as $row)
    {
      $_SESSION['staffID']= $row['staffID'];
      $_SESSION['name'] = $row['name'];
      $_SESSION['first_name'] = $row['first_name'];

      // redirect to the page home.php
      header('location: home.php');

    }

    /*** close the database connection ***/
    $dbh = null;

    }
catch(PDOException $e)
    {
    echo $e->getMessage();
    }



?>