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

			$patientID = (int)($_GET['id']);
			if($patientID >0){

				$sql0 = "SELECT name, first_name
				FROM patient
				WHERE patient.patientID = :patientID";

				$statement0 = $dbh->prepare($sql0);
				$statement0->bindParam(':patientID', $patientID, PDO::PARAM_INT);
				$result0 = $statement0->execute();


				echo "<a class='logoutbutton' href='logout.php'>Logout</a><br>\n";
				while($line = $statement0->fetch()){

					echo "<div id='headarea'>";
					echo "<h1> Patient : ".$line['first_name']."  ".$line['name']."</h1>";
					echo "</div>";

					echo "<br>\n";
				}


				echo "<div id='tablewrapper'>";
				/*** echo a message saying we have connected ***/

				//Code needed to get Vital Signs
				$sql = "SELECT name, first_name, value, time, sign_name
				FROM patient, vital_sign, sign
				WHERE patient.patientID = vital_sign.patientID
				AND vital_sign.signID = sign.signID 
				AND patient.patientID = :patientID";

				$statement = $dbh->prepare($sql);
				$statement->bindParam(':patientID', $patientID, PDO::PARAM_INT);
				$result = $statement->execute();



				//Left Table that displays the Vital Signs
				echo "<div id='tableLeft'>";
				echo "<table>

				<th>Sign Name</th>
				<th>Value</th>
				<th>Time</th>";

				while($line = $statement->fetch())
				{
					echo "<tr>";
					echo "<td>" . $line['sign_name'] . "</td>";
					echo "<td>" . $line['value'] . "</td>";
					echo "<td>" . $line['time'] . "</td>";
					echo "</tr>";
				}
				echo "</table>";
				echo "</div>";

    			//code needed to get medicine informations
				$sql = "SELECT name, first_name, medicament_name, quantity, unit, note, time
				FROM patient, medicament, medicine
				WHERE patient.patientID = medicine.patientID 
				AND medicament.medicamentID = medicine.medicamentID 
				AND patient.patientID = :patientID";

				$statement = $dbh->prepare($sql);
				$statement->bindParam(':patientID', $patientID, PDO::PARAM_INT);
				$result = $statement->execute();


				//Table on the right hand side displaying medicine
				echo "<div id='tableRight'>";
				echo "<table>

				<th>Medicament</th>
				<th>Quantity</th>
				<th>Time</th>";


				while($line = $statement->fetch())
				{
					echo "<tr>";
					echo "<td>" . $line['medicament_name'] . "</td>";
					echo "<td>" . $line['quantity'] . "</td>";
					echo "<td>" . $line['time'] . "</td>";
					echo "</tr>";
				}
				echo "</table>";
				echo "</div>";
				echo "</div>";

				/* Forms to fill in information below */

				echo "<div class='formswrapper'>";
				
    			//Form for new Vital Sign
				echo "<div id='vitalForm'>";
				echo "<h3>Insert new vital sign</h3>\n";
				echo "<form action='addsign.php' method='POST'>\n";
				echo "<input type='hidden' name='patientID' value='$patientID'>\n";
				echo "<select name='signID'>\n";
				$sql = "SELECT * FROM sign";

				$statement = $dbh->prepare($sql);
				$result = $statement->execute();

				while($line = $statement->fetch()){
					echo "<option value='".$line['signID']."'>".$line['sign_name']."</option>\n";

				}
				echo "</select><br>";
				echo "Value : <input type='text' name='val'><br>\n";
				echo "Note <textarea name='note'></textarea>";
				echo "<input type='submit' value='Add sign'></form>";
				echo "</div>";



    			//Form for new medicine
				echo "<div id='medicineForm'>";
				echo "<h3>Insert new medicine</h3>\n";
				echo "<form action='addmedicine.php' method='POST'>\n";
				echo "<input type='hidden' name='patientID' value='$patientID'>\n";
				echo "<select name='medicamentID'>\n";
				$sql = "SELECT * FROM medicament";

				$statement = $dbh->prepare($sql);
				$result = $statement->execute();

				while($line = $statement->fetch()){
					echo "<option value='".$line['medicamentID']."'>".$line['medicament_name']."</option>\n";
				}
				echo "</select><br>";
				echo "Quantity : <input type='text' name='quantity'><br>\n";
				echo "Note <textarea name='note'></textarea>";

				//new dropdown for staff
				$sql = "SELECT * FROM staff";
				
				$statement = $dbh->prepare($sql);
				$result = $statement->execute();

				
				while($line = $statement->fetch()){
					
					$entry = "<option value='".$line['staffID']."'>".$line['first_name']." ".$line['name']."</option>\n";
					
					if($line['fonctionID']==1){
						$nurses[] = $entry;
					}
					elseif($line['fonctionID']==2){
						$doc[] = $entry;
					}
				}
				
				echo "<div class='singleTextDiv'><div id='nursesDiv'>Responsible Nurse: <select name='staffID_nurse'>\n";
				foreach ($nurses as $value){
					echo $value;
				}
				echo "</select></div>";
				
				echo "<div class='singleTextDiv'><div id='doctorsDiv'>Attending Physician: <select name='staffID_physician'>\n";
				foreach ($doc as $value){
					echo $value;
				}
				echo "</select></div>";

				echo "<input type='submit' value='Add medicine'></form>";

				echo "</div>";
				echo "</div>";
			}
			else{
				echo "<h1>The patient does not exist</h1>";
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