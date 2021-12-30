'use strict'

// Button to Change Light to Dark Theme

const optionFields = ["date", "ticker", "callPut", "expiry", "numCons", "strike", "rr", "entry", "sl", "tp", "sold", "emotions", "tradeNotes"];

const bgSwitcher = document.querySelector('#btnBgColor');

var csvData = null; //csv data from text file

var entryData = []; //csv data in array format

bgSwitcher.addEventListener('click', function()
{
    document.body.classList.toggle('dark-theme')

    var className = document.body.className;

    if(className == "light-theme")
    {
        this.textContent = "Dark";
    }
    else
    {
        this.textContent = "Light";
    }
});

// Button Functionality to Add Row to the Entry Table

const addRowBtn = document.querySelector('#btnAddRow');

addRowBtn.addEventListener('click', function()
{
    createTableRow();
});

var numRow = 0;

function createTableRow(entryInfo)
{
    var tbodyRef = document.getElementById('optionsTable').getElementsByTagName('tbody')[0];

    var newRow = tbodyRef.insertRow();
    
    var newRowContent = [];
    
    for (let i = 0; i < 13; i++) {

        var content = '""';

        if(entryInfo != undefined)
        {
            content = entryInfo[i];
        }

        var idName = optionFields[i] + numRow;

        newRowContent.push(content);

        var cellContent = '<td><input id=' + idName + ' type="text" value=' + content + ' /></td>';
        newRow.innerHTML += cellContent;
    }

    entryData.push(newRowContent);

    numRow += 1;
}


//Creates Table Based off Logged Data in entryLog.csv

jQuery.get('http://127.0.0.1:5500/entryLog.csv', function(data) {
    csvData = data.split(/\r?\n/);

    for (let i = 1; i < csvData.length; i++)
    {
        createTableRow(csvData[i].split(','));
    }
});

// On row change, updates information in csv file

$(document).ready(function () {
    
    $(document).on("change", "#optionsTable :input", function() {
        console.log(entryData);
        var optionCell = $(this);
        var optionCellValue = optionCell.val();
        var unparsedID = optionCell.attr('id');
        var cellRow = unparsedID.slice(-1);
        var cellType = unparsedID.slice(0, unparsedID.length-1);
        console.log("Type: " + cellType + ", Row: " + cellRow + ", Value: " + optionCellValue);

        entryData[cellRow][optionFields.indexOf(cellType)] = optionCellValue;

    });

});
 