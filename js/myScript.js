const TorrentSearchApi = require('torrent-search-api');
const torrentSearch = new TorrentSearchApi();
const $ = require('jquery');
require('datatables.net-bs')();

// Search providers

torrentSearch.enableProvider('ThePirateBay');	// public
torrentSearch.disableProvider('Yggtorrent');	// authentication
torrentSearch.disableProvider('KickassTorrents');	// public
torrentSearch.disableProvider('TorrentProject');	// public
torrentSearch.disableProvider('Rarbg');	// public
torrentSearch.enableProvider('Torrent9');	// public
torrentSearch.enableProvider('Torrentz2');	// public
torrentSearch.disableProvider('IpTorrents');	// authentication
torrentSearch.disableProvider('TorrentLeech');	// authentication
torrentSearch.disableProvider('1337x');	// public
torrentSearch.enableProvider('ExtraTorrent');	// public

let body = document.getElementById('body');
let spinner = document.getElementById('spinner');
let overlay = document.getElementById('overlay');

let tableResults = document.getElementById('table-results');

let searchTerm = document.getElementById('search-term');
let buttonSearch = document.getElementById('btn-search');
let buttonRefresh = document.getElementById('btn-refresh');

function removeTable() {
	$('#table-wrapper').remove();
}

buttonRefresh.addEventListener('click', function () {
	location.reload();
});

// JQuery detach spinner
$(spinner).detach();
$(overlay).detach();

searchTerm.addEventListener('keypress', function() {
	if (event.keyCode === 13) {
		$(spinner).appendTo(body);
		$(overlay).appendTo(body);
		$('#DataTables_Table_0_wrapper').remove();
		$('#DataTables_Table_1_wrapper').remove();
		$('#DataTables_Table_2_wrapper').remove();
		$('#DataTables_Table_4_wrapper').remove();
		$('#DataTables_Table_5_wrapper').remove();
                removeTable();
		searchResults();
	}
});

buttonSearch.addEventListener('click', function() {
	$(overlay).appendTo(body);
	$(spinner).appendTo(body);
	$('#DataTables_Table_0_wrapper').remove();
	$('#DataTables_Table_1_wrapper').remove();
	$('#DataTables_Table_2_wrapper').remove();
	$('#DataTables_Table_4_wrapper').remove();
	$('#DataTables_Table_5_wrapper').remove();
        removeTable();
	searchResults();
});

function searchResults() {
	torrentSearch.search(searchTerm.value, '', '')
		.then(torrents => {

			let table = document.createElement('table');
			table.className = 'table table-condensed table-bordered table-hover table-striped';

			let tableBody = document.createElement('tbody');
			tableBody.id = 'table-body';

			let tableColumnHeader = document.createElement('thead');
			let columnHeaderRow = document.createElement('tr');
			table.appendChild(tableColumnHeader);
			tableColumnHeader.appendChild(columnHeaderRow);

			// Creates table header elements
			for (let th = 0; th < 8; th++) {
				let columnHeaderCells = document.createElement('th');
				columnHeaderRow.appendChild(columnHeaderCells);
			}

			// Creates Titles for column
			let firstCell = table.getElementsByTagName('th')[0];
			let columnHeaderTextCell1 = document.createTextNode('#');
			firstCell.appendChild(columnHeaderTextCell1);

			let secondCell = table.getElementsByTagName('th')[1];
			let columnHeaderTextCell2 = document.createTextNode('Title');
			secondCell.appendChild(columnHeaderTextCell2);

			let thirdCell = table.getElementsByTagName('th')[2];
			let columnHeaderTextCell3 = document.createTextNode('Time');
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

			// Creates each table row
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

			tableResults.appendChild(table);
			table.appendChild(tableBody);

		})

		.then(function () {
			$('table').DataTable({
				'autoWidth': false,
				'lengthChange': true,
				'pageLength': 15,
				'lengthMenu': [15, 25, 50, 100]
			});

			$(overlay).detach();
			$(spinner).detach();
		})	

		.catch(err => {
			window.alert('Error occurred!' + '\r\n' + err + '\r\n' + 'Please, try again.');
			$(overlay).detach();
			$(spinner).detach();
			$(body).remove();
			location.reload();
		});	

}

// DataTables settings
$.extend($.fn.dataTable.defaults, {
	searching: true,
	ordering: true,
	retrieve: true
});	

$('table').DataTable({
	'autoWidth': false,
	'lengthChange': true,
	'pageLength': 15,
	'lengthMenu': [15, 25, 50, 100],
});

// Check for providers
// document.getElementById('providers').innerHTML = JSON.stringify(torrentSearch.getProviders());
// document.getElementById('active-providers').innerHTML = JSON.stringify(torrentSearch.getActiveProviders());

