'use strict'

// Button to Change Light to Dark Theme

const optionFields = ["date", "ticker", "callput", "expiry", "numCons", "strike", "rr", "entry", "sl", "tp", "sold", "emotions", "tradeNotes"];

const bgSwitcher = document.querySelector('#btnBgColor');

var serverData = null; //data from SQL server

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

    if(entryInfo == undefined)
    {
        serverData[numRow] = [];
    }
        
    for (let i = 0; i < 13; i++) {

        var content = '""';

        if(entryInfo != undefined)
        {
            content = entryInfo[optionFields[i]];
        }
        else
        {
            serverData[numRow][optionFields[i]] = "";
        }

        var idName = optionFields[i] + numRow;

        var cellContent = '<td><input id=' + idName + ' type="text" value=' + content + ' /></td>';
        newRow.innerHTML += cellContent;
    }

    numRow += 1;
}


//Creates Table Based off Logged Data in entryLog.csv

var oReq = new XMLHttpRequest();

oReq.open("GET", "dbh.php", true);

oReq.send();

oReq.onreadystatechange = function()
{
    //do everything that requires the request to go through from the sql server here

    if (this.readyState == 4 && this.status == 200)
    {
        serverData = JSON.parse(this.responseText);

        for (let i = 0; i < serverData.length; ++i)
        {
            createTableRow(serverData[i]);
        }
    }
}



// On any value change, updates information in sql server

$(document).ready(function () {
    
    $(document).on("change", "#optionsTable :input", function() {
        var optionCell = $(this);
        var optionCellValue = optionCell.val();
        var unparsedID = optionCell.attr('id');
        var cellRow = unparsedID.slice(-1);
        var cellType = unparsedID.slice(0, unparsedID.length-1);
        console.log("Type: " + cellType + ", Row: " + cellRow + ", Value: " + optionCellValue);

        serverData[cellRow][cellType] = optionCellValue;
        console.log(serverData);
    });

});
 