/* eslint-env browser */
const TorrentSearchApi = require('torrent-search-api');

const torrentSearch = new TorrentSearchApi();
const $ = require('jquery');
require('datatables.net-bs')();

// Search providers

torrentSearch.disableProvider('ThePirateBay'); // public
torrentSearch.disableProvider('Yggtorrent'); // authentication
torrentSearch.disableProvider('KickassTorrents'); // public
torrentSearch.disableProvider('TorrentProject'); // public
torrentSearch.enableProvider('Rarbg'); // public
torrentSearch.disableProvider('Torrent9'); // public
torrentSearch.disableProvider('Torrentz2'); // public
torrentSearch.disableProvider('IpTorrents'); // authentication
torrentSearch.disableProvider('TorrentLeech'); // authentication
torrentSearch.disableProvider('1337x'); // public
torrentSearch.disableProvider('ExtraTorrent'); // public

const body = $('#body');
const tableResults = $('#table-results');
const searchTerm = $('#search-term');

function removeTable() {
  $('#table-wrapper').remove();
}

$('#btn-refresh').addEventListener('click', () => {
  location.reload();
});

// JQuery detach spinner
$('#spinner').detach();
$('#overlay').detach();

function searchResults() {
  torrentSearch.search(searchTerm.value, '', '')
    .then((torrents) => {
      // Dynamic table creation
      const table = document.createElement('table');
      table.className = 'table table-condensed table-bordered table-hover table-striped';

      const tableBody = document.createElement('tbody');
      tableBody.id = 'table-body';

      const tableColumnHeader = document.createElement('thead');
      const columnHeaderRow = document.createElement('tr');
      table.appendChild(tableColumnHeader);
      tableColumnHeader.appendChild(columnHeaderRow);

      // Creates table header elements
      for (let th = 0; th < 8; th++) {
        const columnHeaderCells = document.createElement('th');
        columnHeaderRow.appendChild(columnHeaderCells);
      }

      // Creates Titles for column
      const firstCell = table.getElementsByTagName('th')[0];
      const columnHeaderTextCell1 = document.createTextNode('#');
      firstCell.appendChild(columnHeaderTextCell1);

      const secondCell = table.getElementsByTagName('th')[1];
      const columnHeaderTextCell2 = document.createTextNode('Title');
      secondCell.appendChild(columnHeaderTextCell2);

      const thirdCell = table.getElementsByTagName('th')[2];
      const columnHeaderTextCell3 = document.createTextNode('Time');
      thirdCell.appendChild(columnHeaderTextCell3);

      const fourthCell = table.getElementsByTagName('th')[3];
      const columnHeaderTextCell4 = document.createTextNode('Seeds');
      fourthCell.appendChild(columnHeaderTextCell4);

      const fifthCell = table.getElementsByTagName('th')[4];
      const columnHeaderTextCell5 = document.createTextNode('Peers');
      fifthCell.appendChild(columnHeaderTextCell5);

      const sixthCell = table.getElementsByTagName('th')[5];
      const columnHeaderTextCell6 = document.createTextNode('Size');
      sixthCell.appendChild(columnHeaderTextCell6);

      const seventhCell = table.getElementsByTagName('th')[6];
      const columnHeaderTextCell7 = document.createTextNode('URL');
      seventhCell.appendChild(columnHeaderTextCell7);

      const eightCell = table.getElementsByTagName('th')[7];
      const columnHeaderTextCell8 = document.createTextNode('Provider');
      eightCell.appendChild(columnHeaderTextCell8);

      // Creates each table row
      let titleString = '';
      let timeString = '';
      let seedsString = '';
      for (let row = 0; row < torrents.length; row++) {
        const rowHeader = document.createElement('th');
        const rowId = document.createTextNode(row + 1);
        rowHeader.appendChild(rowId);
        const tableRow = document.createElement('tr');
        tableRow.appendChild(rowHeader);

        // Title String
        const tableRowData = document.createElement('td');
        tableRow.appendChild(tableRowData);

        titleString = JSON.stringify(torrents[row].title).substr(1).slice(0, -1);
        const titleText = document.createTextNode(titleString);
        tableRowData.appendChild(titleText);

        // Time String
        const timeRowData = document.createElement('td');
        tableRow.appendChild(timeRowData);

        timeString = JSON.stringify(torrents[row].time).substr(1).slice(0, -1);
        const timeText = document.createTextNode(timeString);
        timeRowData.appendChild(timeText);

        // Seeds String
        const seedsRowData = document.createElement('td');
        tableRow.appendChild(seedsRowData);

        seedsString = JSON.stringify(torrents[row].seeds);
        const seedsText = document.createTextNode(seedsString);
        seedsRowData.appendChild(seedsText);

        // Peers String
        const peersRowData = document.createElement('td');
        tableRow.appendChild(peersRowData);

        const peersString = JSON.stringify(torrents[row].peers);
        const peersText = document.createTextNode(peersString);
        peersRowData.appendChild(peersText);

        // Size String
        const sizeRowData = document.createElement('td');
        tableRow.appendChild(sizeRowData);

        const sizeString = JSON.stringify(torrents[row].size).substr(1).slice(0, -1);
        const sizeText = document.createTextNode(sizeString);
        sizeRowData.appendChild(sizeText);

        // URL String
        const urlRowData = document.createElement('td');
        tableRow.appendChild(urlRowData);

        const magnetString = JSON.stringify(torrents[row].magnet).substr(1).slice(0, -1);
        const createLink = document.createElement('a');
        createLink.href = magnetString;
        createLink.setAttribute('class', 'btn btn-default btn-xs btn-block');
        createLink.setAttribute('role', 'button');
        createLink.innerHTML = 'Download';

        urlRowData.appendChild(createLink);

        // Provider String
        const providerRowData = document.createElement('td');
        tableRow.appendChild(providerRowData);

        const providerString = JSON.stringify(torrents[row].provider).substr(1).slice(0, -1);
        const providerText = document.createTextNode(providerString);
        providerRowData.appendChild(providerText);

        // add the row to the end of the table body
        tableBody.appendChild(tableRow);
      }

      tableResults.appendChild(table);
      table.appendChild(tableBody);
    })

    .then(() => {
      $('table').DataTable({
        autoWidth: false,
        lengthChange: true,
        pageLength: 15,
        lengthMenu: [15, 25, 50, 100],
      });

      $('#overlay').detach();
      $('#spinner').detach();
    })

    .catch((err) => {
      window.alert(`${'Error occurred!' + '\r\n'}${err}\r\n` + 'Please, try again.');
      $('#overlay').detach();
      $('#spinner').detach();
      $(body).remove();
      location.reload();
    });
}

searchTerm.addEventListener('keypress', () => {
  if (event.keyCode === 13) {
    $('#spinner').appendTo(body);
    $('overlay').appendTo(body);
    $('#DataTables_Table_0_wrapper').remove();
    $('#DataTables_Table_1_wrapper').remove();
    $('#DataTables_Table_2_wrapper').remove();
    $('#DataTables_Table_4_wrapper').remove();
    $('#DataTables_Table_5_wrapper').remove();
    removeTable();
    searchResults();
  }
});

document.getElementById('btn-search').addEventListener('click', () => {
  $('#overlay').appendTo(body);
  $('#spinner').appendTo(body);
  // Remove search results after consecutive search.
  // It's not a final solution. Need to be fixed.
  $('#DataTables_Table_0_wrapper').remove();
  $('#DataTables_Table_1_wrapper').remove();
  $('#DataTables_Table_2_wrapper').remove();
  $('#DataTables_Table_4_wrapper').remove();
  $('#DataTables_Table_5_wrapper').remove();
  removeTable();
  searchResults();
});

// DataTables settings
$.extend($.fn.dataTable.defaults, {
  searching: true,
  ordering: true,
  retrieve: true,
});

$('table').DataTable({
  autoWidth: false,
  lengthChange: true,
  pageLength: 15,
  lengthMenu: [15, 25, 50, 100],
});

// Check for providers
// document.getElementById('providers').innerHTML = JSON.stringify(torrentSearch.getProviders());
// document.getElementById('active-providers').innerHTML = JSON.stringify(torrentSearch.getActiveProviders());
