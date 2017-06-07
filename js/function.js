/* Custom JavaScript file. Do not use bootstrap JS files for changes.
    Please do not break this file */


// Function to add more rows to existing medication table at last position
function addRow(){
  $('#myTable tr:last').after('<tr><td><input type="text" name="medicine" value="" placeholder="Medikament"></td><td><input type="text" name="medActivesubstance" value="" placeholder="Wirkstoff"></td><td><input type="text" name="medCode" value="" placeholder="Code"></td><td><input type="text" name="medGalenicForm" value="" placeholder="Galenische Form"></td><td><input type="text" name="medDose" value="" placeholder="Dosis"></td><td><input type="text" name="medMeasureUnit" value="" placeholder="Einheit"></td><td><input type="text" name="medSchema" value="" placeholder="Schema"></td><td><input type="text" name="medMode" value="" placeholder="Einnahmemodus"></td><td><input type="text" name="medInstruction" value="" placeholder="Anwendungsinstruktion"></td><td><input type="text" name="medApplicationform" value="" placeholder="Verabreichungsweg"></td><td><input type="text" name="medReason" value="" placeholder="Anwendungsgrund"></td><td><input type="text" name="medFromdate" value="" placeholder="01.01.2000"></td><td><input type="text" name="medTodate" value="" placeholder="02.01.2000"></td><td><input type="text" name="medPrescriber" value="" placeholder="Verschreibender"></td><td><input type="text" name="medPrescriptionDate" value="" placeholder="01.01.2000"></td><td><input type="text" name="medCommentary" value="" placeholder="Kommentar"></td></tr>');
}

// Function to remove rows from adjust medication table
function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("myTable").deleteRow(i);
}

// Same function as addRow for more table rows but for the eraser table
function addErasers(){
  $('#myRemoveTable tr:last').after('<tr><td class="removeRow"><input type="image" src="images/Eraser-2-icon.png" alt="Button" onclick="deleteRow(this); deleteEraser(this)"></td></tr>');
}

// Function to remove rows from the remove Table
function deleteEraser(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("myRemoveTable").deleteRow(i);
}


// Login function while user are hardcoded
var userWenger = "wenger";
var passWenger = "admin";

var userLoser = "loser";
var passLoser = "admin";



function check(form) {
  if(form.userid.value == userWenger && form.userpass.value == passWenger) {
    window.open('choosepatient.xhtml')
    var name = "Wenger";
  }
  if(form.userid.value == userLoser && form.userpassw.value == passLoser) {
    window.open('choosepatient.xhtml')
    var name = "Loser";

  }
  else {
    alert("Benutzername oder Passwort falsch")
  }
}

// cookie to store user information
var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

// Function to open and collapse tables
/*
$(document).ready(function() {
    $(".flip").click(function() {
        $(".panel").slideToggle("slow");
    });
});

*/


/*Function to iterate content from a table and display as json*/
function tableToJSON(){
  var myRows = [];
  var headersText = [];

  var $headers = $("th");

  // Loop through grabbing everything
  var $rows = $("tbody tr").each(function(index) {
    $cells = $(this).find("td");
    myRows[index] = {};

    $cells.each(function(cellIndex) {
      // Set the header text
      if(headersText[cellIndex] === undefined) {
        headersText[cellIndex] = $($headers[cellIndex]).text();
      }
      // Update the row object with the header/cell combo
      myRows[index][headersText[cellIndex]] = $(this).text();
    });
  });

  // Let's put this in the object like you want and convert to JSON (Note: jQuery will also do this for you on the Ajax request)
  var myObj = {
      "myrows": myRows
  };

  //alerts content of a table as json
  alert(JSON.stringify(myObj));
}

//calls the conversion of the table to JSON when the "Änderungen übernehmen" button is clicked
//document.getElementById("saveChangesBtn").onclick = tableToJSON;

//Code to export json as file

var medForm;
// test serialize array
function onSubmit( form ){
  var medForm = JSON.stringify( $(form).serializeArray() ); //  <-----------
  localStorage.setItem("medForm", medForm);
  console.log( medForm );
  document.getElementById('jsonObjects').value = medForm;
  return false; //don't submit
}

// macht aus dem adjustForm
function prepareMedication(){
	var jsonData = JSON.stringify(document.getElementById("adjustForm"));
	document.getElementById('jsonObjects').value = jsonData ;
}



function prepareHistory(){
	var rawData = document.getElementById('jsonHistoryData').innerHTML;
	var rawDates = document.getElementById('jsonHistoryDates').innerHTML;

	var dataArray = rawData.split("|");
	var datesArray = rawDates.split("|");

	function createToggler( iterator ){
		  return function(){
			 $('#panel' + iterator).slideToggle('slow');
		  }
		}

	for (var iterator = 0; iterator < dataArray.length; iterator++) {

		var guiString = '<div class="flip" id="flip' + iterator + '">' + datesArray[iterator]  + '</div><div class="panel" id="panel'+ iterator +'">'
		 + '<div class="table-responsive tableFont">'
	     + '<table class="table table-current-medication collapsed-table">'
		 + '<thead><tr><th>Medikament</th><th>Wirkstoff</th><th>Code</th><th>Galenische Form</th>'
		 + '<th>Dosis</th><th>Einheit</th><th>Schema</th><th>Einnahmemodus</th>'
		 + '<th>Anwendungsinstruktion</th><th>Verabreichungsweg</th><th>Anwendungsgrund</th>'
		 + '<th>Einnahme ab</th><th>Einnahme bis</th><th>Verordnet durch</th>'
		 + '<th>Verordnungsdatum</th><th>Bemerkungen</th></tr></thead>'
		 + '<tbody id="historyMedication' + iterator + '">'
		 + '</tbody></table></div></div>'
		 + '<div style="height:20px"></div>';

		var medContainer = document.getElementById('historyContent');
		medContainer.insertAdjacentHTML('beforeend', guiString);

		console.log(guiString);
		console.log(datesArray[iterator]);
		console.log(dataArray[iterator]);

		historyItem = JSON.parse(dataArray[iterator]);
		var tablearr ='<tr>';
		for(var i = 0, len = historyItem.length; i < len; i++) {
		    tablearr += '<td>' + historyItem[i].value + '</td>';
		    if (i == historyItem.length-1) {
		      tablearr += '</tr>';
		    }
		    else if (i>1 && (i+1)%16 == 0) {
		      tablearr += '</tr><tr>'
		    }
		}

		var selectorMed = '#historyMedication' + iterator;
		console.log(selectorMed);
		$(selectorMed).append(tablearr);

		/*
		var selectorFlip = '#flip' + iterator;
		console.log(selectorFlip);
		var selectorPanel = '#panel' + iterator;
		console.log(selectorPanel);
		*/

		$('#flip' + iterator).click( createToggler( iterator ) );

		/*
		$(selectorFlip+'').click(function() {
	        $(selectorPanel+'').slideToggle('slow');
	    });

	    */

		/*
		$(selectorFlip).click(function() {
	        $(selectorPanel).slideToggle("slow");
	    });
	    */

	}


}

function prepareCurrentMedication(){
	var rawCurrentMedData = document.getElementById('rawDataCurrentMedication').innerHTML;

	var currentMedicationJsonString = JSON.parse(rawCurrentMedData);
	var tablearr ='<tr>';
	for(var i = 0, len = currentMedicationJsonString.length; i < len; i++) {
	    tablearr += '<td>' + currentMedicationJsonString[i].value + '</td>';
	    if (i == currentMedicationJsonString.length-1) {
	      tablearr += '</tr>';
	    }
	    else if (i>1 && (i+1)%16 == 0) {
	      tablearr += '</tr><tr>'
	    }
	}

	$("#currentMedicationTable").append(tablearr);
}

function prepareHomeMedication(){
	var rawCurrentMedData = document.getElementById('homeMedicationOutput').innerHTML;

	var currentMedicationJsonString = JSON.parse(rawCurrentMedData);
	var tablearr ='<tr>';
	for(var i = 0, len = currentMedicationJsonString.length; i < len; i++) {
	    tablearr += '<td>' + currentMedicationJsonString[i].value + '</td>';
	    if (i == currentMedicationJsonString.length-1) {
	      tablearr += '</tr>';
	    }
	    else if (i>1 && (i+1)%16 == 0) {
	      tablearr += '</tr><tr>'
	    }
	}

	$("#homeMedicationTable").append(tablearr);
}


//to insert the JSON into the table
medForm = JSON.parse(localStorage.getItem("medForm"));
//var tableData;
//$.each(medForm, function(index, data) {
//  tableData += //'<tr><td>'+data.medicine+'</td><td>'+data.medActivesubstance+'</td><td>'+data.medCode+'</td><td>'+data.medGalenicForm+'</td><td>'+data.medDose+'</td><td>'+data.medMeasureUnit+'</td><td>'+data.medSchema+'</td><td>'+data.medMode+'</td><td>'+data.medInstruction+'</td><td>'+data.medApplicationform+'</td><td>'+data.medReason+'</td><td>'+data.medFromdate+'</td><td>'+data.medTodate+'</td><td>'+data.medPrescriber+'</td><td>'+data.medPrescriptionDate+'</td><td>'+data.medCommentary+'</td></tr>';
//});
//$('#newMedication').append(tableData);


//---------------------
var tablearr ='<tr>';

for(var i = 0, len = medForm.length; i < len; i++) {
    tablearr += '<td>' + medForm[i].value + '</td>';


    if (i == medForm.length-1) {
      tablearr += '</tr>';
    }
    else if (i>1 && (i+1)%16 == 0) {
      tablearr += '</tr><tr>'
    }
}

$('#newMedication').append(tablearr);
