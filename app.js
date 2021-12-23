'use strict'

const switcher = document.querySelector('.btn');

switcher.addEventListener('click', function()
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

    console.log('current class name: ' + className);
});

var tbodyRef = document.getElementById('optionsTable').getElementsByTagName('tbody')[0];
var newRow = tbodyRef.insertRow();

var newText = document.createTextNode('new row');
var cellContent = "<td><div contenteditable></div></td>";

for (let i = 0; i < 13; i++) {
    newRow.innerHTML += cellContent;
}

