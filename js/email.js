// JavaScript Document
//global variables
var newTable;
var newRow;
var newCell;
var addData;
//Create new row and table cell
function createNewRow() {
	//Get table you are going to add elements to
	var myTable = document.getElementById('emailTable');
	//Add new row at end of any existing rows
	var myRow = myTable.insertRow(-1);
	//Add new cell <td> to row just created
	var myCell = myRow.insertCell(-1);
	//Get content for new cell
	myCell.appendChild(addContent());
	

}
function deleterow() {
    var table = document.getElementById('emailTable');
    var rowCount = table.rows.length;

    table.deleteRow(rowCount -1);
}
function getCode() {
	//Get table whose code you wish to display
	var myCode = document.getElementById('emailTable');
	//Set area to display the code
	var displayCode = document.getElementById('mygencode');
	//Get seasonal code
	var seasonalCode = document.getElementById('seasonalTable');
	//Get disclaimer code
	var disclaimerCode = document.getElementById('disclaimer');
	//Display the code in text area 
	displayCode.innerHTML = "<!-- Seasonal Code -->" + seasonalCode.innerHTML +  "\n\n<!-- End Seasonal Code -->\n\n" + "<!-- Main Body Code -->" + myCode.innerHTML + "\n\n<!-- End Main Body Code -->\n\n" + "<!-- Disclaimer Text -->\n\n" + disclaimerCode.innerHTML;
	
	
}

//Function to clear the text area that displays the generated html
function clearArea() {
	//Get element to be cleared by ID
	var clearCode = document.getElementById('mygencode');
	//Clear content
	clearCode.innerHTML = "";	
}
//Add content to newly created cell(s)
function addContent() {
	//Ask user how many columns will be in this row
	addData = prompt("How many columns in this row?", "1");
	//If the user entered 1 then proceed with entering in data
	if(addData == "1") {
		//Go to insertData function
		var newData = insertData();	
	}
	else {
		//Go to createNewTable function
		newData = createNewTable();
	}
	//Return data entered
	return newData;
}
function changeSeasonal() {
	var seasIcon = document.getElementById('seasonalIcon');
	var seasText = document.getElementById('seasonalText');
	//var newIcon = document.getElementById('iconImages').value;
	//var newText = document.getElementById('sText').value;
	var changeText = prompt("Enter seasonal text here");
	seasText.innerHTML = changeText;
	var changeIcon = prompt("Enter seasonal icon name here");
	seasIcon.src = "http://f.e.shopko.com/i/21/2088630699/seasonal-" + changeIcon + ".jpg";
}
//Function to insert image and image specifications
function insertImage() {
	//Create image element
	var newImg = document.createElement('img');
	//Ask user to enter image name and extension
	var filePath = prompt("Please enter full image name and extension, example: myimage.jpg");
	//Append image name to file path and assign to variable
	newImg.src = "http://f.e.shopko.com/i/21/2088630699/" + filePath;
	//If user previously entered 1 when asked how many rows then set width at 580px
	if(addData == "1") {
		newImg.width = "600";
	}
	else {
		//Ask user to enter image width in pixels
		var imageWidth = prompt("Please type image width (in pixels)");
		//Assign user entered width to variable
		newImg.width = imageWidth;
	}
	var imageHeight = prompt("Please type image Height (in pixels)");
	newImg.height = imageHeight;
	var imageAlt = prompt("Please enter alt text");
	newImg.alt = imageAlt;
	newImg.hspace = "0";
	newImg.vspace = "0";
	newImg.border = "0";
	newImg.style = "vertical-align:top;display:block;";

	return newImg;
}
function insertData() {
	//insert data into cell
	//ask for image file path, width and height
	var needAnchor = prompt("Does image require a link?", "Yes");
	if(needAnchor == "Yes" || needAnchor == "yes") {
		//document.write("\n");
		var imgAnchor = document.createElement('a');
		var ahref = prompt("Enter tracking link");
		imgAnchor.href = "http://%%track%%/" + ahref;
		imgAnchor.appendChild(insertImage());	
	}
	else {
		insertImage();	
	}
	
	return imgAnchor;
}
function createNewTable() {
	//document.write("\n")
	newTable = document.createElement('table');
	//document.write("\n")
	newRow = document.createElement('tr');
	newTable.appendChild(newRow);
	for(var i = 0; i < addData; i++) {
		//document.write("\n")
		newCell = document.createElement('td');
		newRow.appendChild(newCell);
		newCell.appendChild(insertData());
	}
	newTable.cellPadding = 0;
	newTable.cellSpacing = 0;
	newTable.border = 0;
	return newTable;
}
var editing  = false;

if (document.getElementById && document.createElement) {
    var butt = document.createElement('BUTTON');
    var buttext = document.createTextNode('Save!');
    butt.appendChild(buttext);
    butt.onclick = saveEdit;
}

function catchIt(e) {
    if (editing) return;
    if (!document.getElementById || !document.createElement) return;
    if (!e) var obj = window.event.srcElement;
    else var obj = e.target;
    while (obj.nodeType != 1) {
        obj = obj.parentNode;
    }
    if (obj.tagName == 'TEXTAREA' || obj.tagName == 'A') return;
    while (obj.nodeName != 'P' && obj.nodeName != 'HTML') {
        obj = obj.parentNode;
    }
    if (obj.nodeName == 'HTML') return;
    var x = obj.innerHTML;
    var y = document.createElement('TEXTAREA');
    var z = obj.parentNode;
    z.insertBefore(y,obj);
    z.insertBefore(butt,obj);
    z.removeChild(obj);
    y.value = x;
    y.focus();
    editing = true;
}

function saveEdit() {
    var area = document.getElementsByTagName('TEXTAREA')[0];
    var y = document.createElement('P');
    var z = area.parentNode;
    y.innerHTML = area.value;
    z.insertBefore(y,area);
    z.removeChild(area);
    z.removeChild(document.getElementsByTagName('button')[0]);
    editing = false;
}

document.onclick = catchIt;
