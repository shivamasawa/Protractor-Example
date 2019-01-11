/**

 Purpose:-This is an excel utility script, user has to supply sheet name,adress of cell and excel file name
 and function returns the excel cell value.
 Author:- Sunil(Team Helios)
 Date:- 25-05-2017
 */



var excelFunctionalities = function () {


//Checking for the default product selection in the home page.

    this.readExcel = function (sheetNumber, addressofCelltoRead, fileName) {


        var XLSX = require('xlsx');


        try {
            // var workbook = XLSX.readFile('./data/Zakelijk_Data.xlsx');

            var workbook = XLSX.readFile('./Data/' + fileName + '.xlsx');

        }
        catch (err) {
            //When execution from webstorm IDE

            //  var workbook = XLSX.readFile('./Website.Tests/data/Zakelijk_Data.xlsx');

            var workbook = XLSX.readFile('./PartnerPortal/Data/' + fileName + '.xlsx');
        }
        var first_sheet_name = workbook.SheetNames[sheetNumber];

//var first_sheet_name = "LoginTest";

        var address_of_cell = addressofCelltoRead;

        var worksheet = workbook.Sheets[first_sheet_name];

        /* Find desired cell */
        var desired_cell = worksheet[address_of_cell];

        /* Get the value */
        var desired_value = desired_cell.v;

        // console.log("from excel sheet"+desired_value);
        return desired_value;


    };

};

module.exports = new excelFunctionalities();