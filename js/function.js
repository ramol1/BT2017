/* Custom JavaScript file. Do not use bootstrap JS files for changes.
    Please do not break this file */


// Function to add more rows to existing medication table
function addRow(){
  $('#myTable tr:last').after('<tr><td><input type="text" name="medicine" value="" placeholder="Medikament"></td><td><input type="text" name="medActivesubstance" value="" placeholder="Wirkstoff"></td><td><input type="text" name="medCode" value="" placeholder="Code"></td><td><input type="text" name="medGalenicForm" value="" placeholder="Galenische Form"></td><td><input type="text" name="medDose" value="" placeholder="Dosis"></td><td><input type="text" name="medMeasureUnit" value="" placeholder="Einheit"></td><td><input type="text" name="medSchema" value="" placeholder="Schema"></td><td><input type="text" name="medMode" value="" placeholder="Einnahmemodus"></td><td><input type="text" name="medInstruction" value="" placeholder="Anwendungsinstruktion"></td><td><input type="text" name="medApplicationform" value="" placeholder="Verabreichungsweg"></td><td><input type="text" name="medReason" value="" placeholder="Anwendungsgrund"></td><td><input type="text" name="medFromdate" value="" placeholder="01.01.2000"></td><td><input type="text" name="medTodate" value="" placeholder="02.01.2000"></td><td><input type="text" name="medPrescriber" value="" placeholder="Verschreibender"></td><td><input type="text" name="medPrescriptionDate" value="" placeholder="01.01.2000"></td><td><input type="text" name="medCommentary" value="" placeholder="Kommentar"></td></tr>');
}

// Function to remove rows from adjust medication table
function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("myTable").deleteRow(i);
}

// Somehow a copy from the add and remove stuff from above to use it on the remove table weeeeee
function addErasers(){
  $('#myRemoveTable tr:last').after('<tr><td class="removeRow"><input type="image" src="images/Eraser-2-icon.png" alt="Button" onclick="deleteRow(this); deleteEraser(this)"></td></tr>');
}

// Function to remove rows from the remove Table
function deleteEraser(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("myRemoveTable").deleteRow(i);
}


// Function to open and collapse tables
$(document).ready(function() {
    $("#flip").click(function() {
        $("#panel").slideToggle("slow");
    });
});


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
  return false; //don't submit
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
