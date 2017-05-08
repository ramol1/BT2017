/* Custom JavaScript file. Do not use bootstrap JS files for changes.
    Please do not break this file */


// Function to add more rows to existing medication table
function addRow(){
  $('#myTable tr:last').after('<tr><td><input type="text" name="medicine" value="" placeholder="Medikament"></td><td><input type="text" name="activesubstance" value="" placeholder="Wirkstoff"></td><td><input type="text" name="code" value="" placeholder="Code"></td><td><input type="text" name="form" value="" placeholder="Galenische Form"></td><td><input type="text" name="dose" value="" placeholder="Dosis"></td><td><input type="text" name="unit" value="" placeholder="Einheit"></td><td><input type="text" name="schema" value="" placeholder="Schema"></td><td><input type="text" name="mode" value="" placeholder="Einnahmemodus"></td><td><input type="text" name="instruction" value="" placeholder="Anwendungsinstruktion"></td><td><input type="text" name="applicationform" value="" placeholder="Verabreichungsweg"></td><td><input type="text" name="reason" value="" placeholder="Anwendungsgrund"></td><td><input type="text" name="fromdate" value="" placeholder="01.01.2017"></td><td><input type="text" name="todate" value="" placeholder="02.01.2017"></td><td><input type="text" name="commentary" value="" placeholder="Kommentar"></td></tr>');
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


// test serialize array
function onSubmit( form ){
  var data = JSON.stringify( $(form).serializeArray() ); //  <-----------

  console.log( data );
  return false; //don't submit
}
