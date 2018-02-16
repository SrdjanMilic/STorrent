const TorrentSearchApi = require('torrent-search-api');
const torrentSearch = new TorrentSearchApi();
const $ = require('jquery');
require('datatables.net-bs')();

// Search providers

torrentSearch.enableProvider('ThePirateBay');	// public
torrentSearch.disableProvider('Yggtorrent');	// authentication
torrentSearch.disableProvider('KickassTorrents');	// public
torrentSearch.enableProvider('TorrentProject');	// public
torrentSearch.enableProvider('Rarbg');	// public
torrentSearch.disableProvider('Torrent9');	// public
torrentSearch.enableProvider('Torrentz2');	// public
torrentSearch.disableProvider('IpTorrents');	// authentication
torrentSearch.disableProvider('TorrentLeech');	// authentication
torrentSearch.disableProvider('1337x');	// public
torrentSearch.enableProvider('ExtraTorrent');	// public

let body = document.getElementById('body');
let spinner = document.getElementById('spinner');
let overlay = document.getElementById('overlay');

let table = document.getElementById('table');
let tBody = document.getElementById('tbody');

let searchTerm = document.getElementById('search-term');
let buttonClick = document.getElementById('btn-search');

// JQuery detach spinner
$(spinner).detach();
$(overlay).detach();

searchTerm.addEventListener('keypress', function () {
	if (event.keyCode === 13) {
		$(spinner).appendTo(body);
		$(overlay).appendTo(body);
		searchResults();

		let dataTableApi = $('#table').DataTable();
		dataTableApi.destroy();
	}
});

buttonClick.addEventListener('click', function () {
	$(overlay).appendTo(body);
	$(spinner).appendTo(body);
	searchResults();
	
	let dataTableApi = $('#table').DataTable();
	dataTableApi.destroy();
});

function searchResults() {
	torrentSearch.search(searchTerm.value, '', '')
		.then(torrents => {

			for (let i = 0; i < torrents.length; i++) {

				let titleColumn = tBody.rows[i].cells[1];
				let titleString = JSON.stringify(torrents[i].title).substr(1).slice(0, -1);
				let titleText = document.createTextNode(titleString);
				titleColumn.appendChild(titleText);

				let timeColumn = tBody.rows[i].cells[2];
				let timeString = JSON.stringify(torrents[i].time).substr(1).slice(0, -1);
				let timeText = document.createTextNode(timeString);
				timeColumn.appendChild(timeText);

				let seedsColumn = tBody.rows[i].cells[3];
				let seedsString = JSON.stringify(torrents[i].seeds);
				let seedsText = document.createTextNode(seedsString);
				seedsColumn.appendChild(seedsText);

				let peersColumn = tBody.rows[i].cells[4];
				let peersString = JSON.stringify(torrents[i].peers);
				let peersText = document.createTextNode(peersString);
				peersColumn.appendChild(peersText);

				let sizeColumn = tBody.rows[i].cells[5];
				let sizeString = JSON.stringify(torrents[i].size).substr(1).slice(0, -1);
				let sizeText = document.createTextNode(sizeString);
				sizeColumn.appendChild(sizeText);

				let magnetColumn = tBody.rows[i].cells[6];
				let magnetString = JSON.stringify(torrents[i].magnet).substr(1).slice(0, -1);
				let createLink = document.createElement('a');
				createLink.href = magnetString;
				createLink.setAttribute('class', 'btn btn-default btn-xs btn-block');
				createLink.setAttribute('role', 'button');
				createLink.innerHTML = 'Download';
				magnetColumn.appendChild(createLink);

				let providerColumn = tBody.rows[i].cells[7];
				let providerString = JSON.stringify(torrents[i].provider).substr(1).slice(0, -1);
				let providerText = document.createTextNode(providerString);
				providerColumn.appendChild(providerText);

				if (torrents.length > 15) {
					let tableRef = table.getElementsByTagName('tbody')[0];
					let newRow = tableRef.insertRow();

					let rowHeader = document.createElement('th');
					let rowId = document.createTextNode(i + 16);
					rowHeader.appendChild(rowId);
					newRow.appendChild(rowHeader);

					// Insert a cell in the row at index 1
					for (let td = 0; td < 7; td++) {
						newRow.insertCell(1);
					}
				}
			}
		})

		.then(function () {
			// delete last extra 15 rows added accidentally (can't figure it out why)
			for (let k = 1; k <= 15; k++) {
				if (table.rows.length > 16) {
					let rowCount = table.rows.length;
					table.deleteRow(rowCount - 1);
				}
			}
			
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
			window.location.reload();
		});	

}		

// Check for providers
// document.getElementById('providers').innerHTML = JSON.stringify(torrentSearch.getProviders());
// document.getElementById('active-providers').innerHTML = JSON.stringify(torrentSearch.getActiveProviders());

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

