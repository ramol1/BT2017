/* Custom JavaScript file. Do not use bootstrap JS files for changes. */


/* Function to add more rows to existing medication table */
function addRow()
{
    $('#myTable tr:last').after('<tr><td><input type="text" name="medicine" value="" placeholder="Medikament"></td><td><input type="text" name="schema" value="" placeholder="Schema"></td><td><input type="text" name="unit" value="" placeholder="Einheit"></td><td><input type="text" name="applicationform" value="" placeholder="Art der Einnahme"></td><td><input type="text" name="fromdate" value="" placeholder="01.01.2017"></td><td><input type="text" name="todate" value="" placeholder="02.01.2017"></td><td><input type="text" name="instruction" value="" placeholder="Anwendungsinstruktion"></td><td><input type="text" name="reason" value="" placeholder="Einnahmegrund"></td><td><input type="text" name="commentary" value="" placeholder="Kommentar"></td></tr>');
}

/* Function to open and collapse tables */
$(document).ready(function(){
    $("#flip").click(function(){
        $("#panel").slideToggle("slow");
    });
});


/*Function to iterate content from a table and display as json*/
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
alert(JSON.stringify(myObj));
