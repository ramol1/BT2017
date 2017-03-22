<head>
  <link rel="stylesheet" type="text/css" href="styles/style.css">
</head>
<body>
<div id="wrapper">
<?php

 session_start();

// Test if the user is logged in.
// If no : back to the login page!
if(!isset($_SESSION['staffID'])){
  header('location: index.php');
  exit;
 }


include('pdo.inc.php');

try {
    $dbh = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);

    echo "<a class='logoutbutton' href='logout.php'>Logout</a><br>\n";

    echo "<div id='headarea'>";
    echo "<h1>Homepage of ".$_SESSION['first_name']." ".$_SESSION['name']."</h1>\n";

    echo "</div>";

    /*** echo a message saying we have connected ***/

    //List of Patients displayed as buttons
    echo '<h3>List of patients</h3>';
    $sql = "select * from patient";

    $result = $dbh->query($sql);

    while($line = $result->fetch()){
      echo "<div>";
      echo "<a class='patientBox' href='patient.php?id=".$line['patientID']."'>";
      echo "Name: ".$line['first_name']." ".$line['name']."<br>";

      if($line['gender']==1){
            echo "Gender: Male<br>";
          }
          elseif($line['gender']==2){
            echo "Gender: Female<br>";
          }

      echo "Birthdate: ".$line['birthdate'];

      echo "</a><br>\n";
      echo "</div>";
    }

    $dbh = null;
}
catch(PDOException $e)
{

    /*** echo the sql statement and error message ***/
    echo $e->getMessage();
}


?>
</div>
</body> 