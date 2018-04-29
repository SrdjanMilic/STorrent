// Empty Dynamic Table
let showTable = document.getElementById('search-results');

table.className = 'table table-striped table-bordered table-hover table-condensed';
table.id = 'table';

let table = document.getElementById('table');
let tBody = document.getElementById('tbody');

let tableColumnHeader = document.createElement('thead');
let columnHeaderRow = document.createElement('tr');
table.appendChild(tableColumnHeader);
tableColumnHeader.appendChild(columnHeaderRow);

for (let th = 0; th < 8; th++) {
	let columnHeaderCells = document.createElement('th');
	columnHeaderRow.appendChild(columnHeaderCells);
}

// creates a table row

for (let row = 0; row < 15; row++) {
	let rowHeader = document.createElement('th');
	let rowId = document.createTextNode(row + 1);
	rowHeader.appendChild(rowId);
	let tableRow = document.createElement('tr');
	tableRow.appendChild(rowHeader);

	for (let td = 0; td < 7; td++) {
		// Create a <td> element and a text node, make the text
		// node the contents of the <td>, and put the <td> at
		// the end of the table row
		let tableRowData = document.createElement('td');
		tableRow.appendChild(tableRowData);
	}

	// add the row to the end of the table body
	tBody.appendChild(tableRow);
}

// put the <tbody> in the <table>
showTable.appendChild(table);

// appends <table> into <body>
table.appendChild(tBody);

let firstCell = showTable.getElementsByTagName('th')[0];
let columnHeaderTextCell1 = document.createTextNode('#');
firstCell.appendChild(columnHeaderTextCell1);

let secondCell = showTable.getElementsByTagName('th')[1];
let columnHeaderTextCell2 = document.createTextNode('Title');
secondCell.appendChild(columnHeaderTextCell2);

let thirdCell = showTable.getElementsByTagName('th')[2];
let columnHeaderTextCell3 = document.createTextNode('Date');
thirdCell.appendChild(columnHeaderTextCell3);

let fourthCell = showTable.getElementsByTagName('th')[3];
let columnHeaderTextCell4 = document.createTextNode('Seeds');
fourthCell.appendChild(columnHeaderTextCell4);

let fifthCell = showTable.getElementsByTagName('th')[4];
let columnHeaderTextCell5 = document.createTextNode('Peers');
fifthCell.appendChild(columnHeaderTextCell5);

let sixthCell = showTable.getElementsByTagName('th')[5];
let columnHeaderTextCell6 = document.createTextNode('Size');
sixthCell.appendChild(columnHeaderTextCell6);

let seventhCell = showTable.getElementsByTagName('th')[6];
let columnHeaderTextCell7 = document.createTextNode('URL');

let eightCell = showTable.getElementsByTagName('th')[7];
let columnHeaderTextCell8 = document.createTextNode('Provider');
eightCell.appendChild(columnHeaderTextCell8);

