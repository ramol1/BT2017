/* Custom JavaScript file. Do not use bootstrap JS files for changes. */


/* Function to add more rows to existing medication table */

function addRow()
{
    $('#myTable tr:last').after('<tr><td><input type="text" name="medicine" value=""></td><td><input type="text" name="schema" value=""></td><td><input type="text" name="unit" value=""></td><td><input type="text" name="applicationform" value=""></td><td><input type="text" name="fromdate" value=""></td><td><input type="text" name="todate" value=""></td><td><input type="text" name="instruction" value=""></td><td><input type="text" name="reason" value=""></td><td><input type="text" name="commentary" value=""></td></tr>');
}
