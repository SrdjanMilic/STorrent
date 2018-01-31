// 'use strict';

const TorrentSearchApi = require('torrent-search-api');
const torrentSearch = new TorrentSearchApi();
const $ = require('jquery');

// Search providers

torrentSearch.enableProvider('ThePirateBay');	// public
torrentSearch.disableProvider('Yggtorrent');	// authentication
torrentSearch.enableProvider('KickassTorrents');	// public
torrentSearch.enableProvider('TorrentProject');	// public
torrentSearch.disableProvider('Rarbg');	// public
torrentSearch.disableProvider('Torrent9');	// public
torrentSearch.disableProvider('Torrentz2');	// public
torrentSearch.disableProvider('IpTorrents');	// authentication
torrentSearch.disableProvider('TorrentLeech');	// authentication
torrentSearch.disableProvider('1337x');	// public
torrentSearch.enableProvider('ExtraTorrent');	// public

let searchTerm = document.getElementById('search-term');
let buttonClick = document.getElementById('btn-search');

searchTerm.addEventListener('keypress', function () {
	if (event.keyCode === 13) {
		document.getElementById('spinner').style.display = 'flex';
				
		searchResults();
	}
});

// function clearForm() {
// 	document.getElementById('form').reset();
// }
// clearForm();

buttonClick.addEventListener('click', function () {
	document.getElementById('spinner').style.display = 'flex';
	searchResults();
});

let resultsTable = document.getElementById('results-output');

function searchResults() {
	torrentSearch.search(searchTerm.value, '', 20)
		.then(torrents => {

			let table = document.createElement('table');
			table.className = 'table table-condensed table-bordered table-hover table-striped';

			let tableBody = document.createElement('tbody');
			tableBody.id = 'table-body';

			let tableColumnHeader = document.createElement('thead');
			let columnHeaderRow = document.createElement('tr');
			table.appendChild(tableColumnHeader);
			tableColumnHeader.appendChild(columnHeaderRow);

			for (let th = 0; th < 8; th++) {
				let columnHeaderCells = document.createElement('th');
				columnHeaderRow.appendChild(columnHeaderCells);
			}

			// Create Titles for column
			let firstCell = table.getElementsByTagName('th')[0];
			let columnHeaderTextCell1 = document.createTextNode('#');
			firstCell.appendChild(columnHeaderTextCell1);

			let secondCell = table.getElementsByTagName('th')[1];
			let columnHeaderTextCell2 = document.createTextNode('Title');
			secondCell.appendChild(columnHeaderTextCell2);

			let thirdCell = table.getElementsByTagName('th')[2];
			let columnHeaderTextCell3 = document.createTextNode('Date');
			thirdCell.appendChild(columnHeaderTextCell3);

			let fourthCell = table.getElementsByTagName('th')[3];
			let columnHeaderTextCell4 = document.createTextNode('Seeds');
			fourthCell.appendChild(columnHeaderTextCell4);

			let fifthCell = table.getElementsByTagName('th')[4];
			let columnHeaderTextCell5 = document.createTextNode('Peers');
			fifthCell.appendChild(columnHeaderTextCell5);

			let sixthCell = table.getElementsByTagName('th')[5];
			let columnHeaderTextCell6 = document.createTextNode('Size');
			sixthCell.appendChild(columnHeaderTextCell6);

			let seventhCell = table.getElementsByTagName('th')[6];
			let columnHeaderTextCell7 = document.createTextNode('URL');
			seventhCell.appendChild(columnHeaderTextCell7);

			let eightCell = table.getElementsByTagName('th')[7];
			let columnHeaderTextCell8 = document.createTextNode('Provider');
			eightCell.appendChild(columnHeaderTextCell8);

			// creates a table row
			let titleString = '';
			let timeString = '';
			let seedsString = '';
			for (let row = 0; row < torrents.length; row++) {
				let rowHeader = document.createElement('th');
				let rowId = document.createTextNode(row + 1);
				rowHeader.appendChild(rowId);
				let tableRow = document.createElement('tr');
				tableRow.appendChild(rowHeader);

				// Title String 
				let tableRowData = document.createElement('td');
				tableRow.appendChild(tableRowData);
				// tableRowData.id = 'td-id';

				titleString = JSON.stringify(torrents[row].title).substr(1).slice(0, -1);
				let titleText = document.createTextNode(titleString);
				tableRowData.appendChild(titleText);

				// Time String
				let timeRowData = document.createElement('td');
				tableRow.appendChild(timeRowData);

				timeString = JSON.stringify(torrents[row].time).substr(1).slice(0, -1);
				let timeText = document.createTextNode(timeString);
				timeRowData.appendChild(timeText);

				// Seeds String
				let seedsRowData = document.createElement('td');
				tableRow.appendChild(seedsRowData);

				seedsString = JSON.stringify(torrents[row].seeds);
				let seedsText = document.createTextNode(seedsString);
				seedsRowData.appendChild(seedsText);

				// Peers String
				let peersRowData = document.createElement('td');
				tableRow.appendChild(peersRowData);

				let peersString = JSON.stringify(torrents[row].peers);
				let peersText = document.createTextNode(peersString);
				peersRowData.appendChild(peersText);

				// Size String
				let sizeRowData = document.createElement('td');
				tableRow.appendChild(sizeRowData);

				let sizeString = JSON.stringify(torrents[row].size).substr(1).slice(0, -1);
				let sizeText = document.createTextNode(sizeString);
				sizeRowData.appendChild(sizeText);

				// URL String
				let urlRowData = document.createElement('td');
				tableRow.appendChild(urlRowData);

				let magnetString = JSON.stringify(torrents[row].magnet).substr(1).slice(0, -1);
				let createLink = document.createElement('a');
				createLink.href = magnetString;
				createLink.setAttribute('class', 'btn btn-default btn-xs btn-block');
				createLink.setAttribute('role', 'button');
				createLink.innerHTML = 'Download';

				urlRowData.appendChild(createLink);

				// Provider String
				let providerRowData = document.createElement('td');
				tableRow.appendChild(providerRowData);

				let providerString = JSON.stringify(torrents[row].provider).substr(1).slice(0, -1);
				let providerText = document.createTextNode(providerString);
				providerRowData.appendChild(providerText);

				// add the row to the end of the table body
				tableBody.appendChild(tableRow);
			}

			resultsTable.appendChild(table);
			table.appendChild(tableBody);

		})

		.then(function () {
			document.getElementById('spinner').style.display = 'none';
		})

		.catch(err => {
			window.alert('Error occurred!' + '\r\n' + err + '\r\n' + 'Please, try again.');
			document.getElementById('spinner').style.display = 'none';
		});
}

// Check for providers
// document.getElementById('providers').innerHTML = JSON.stringify(torrentSearch.getProviders());
// document.getElementById('active-providers').innerHTML = JSON.stringify(torrentSearch.getActiveProviders());
