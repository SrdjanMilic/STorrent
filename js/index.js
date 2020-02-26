require('datatables.net-bs4')();

const $ = require('jquery');
const jQuery = require('jquery');
const fakeLoader = require('jquery.fakeloader');
const TorrentSearchApi = require('torrent-search-api');
const torrentSearch = new TorrentSearchApi();

torrentSearch.disableProvider('TorrentLeech'); // authentication
torrentSearch.disableProvider('IpTorrents'); // authentication
torrentSearch.disableProvider('Torrent9'); // public
torrentSearch.enableProvider('Torrentz2'); // public (slow response)
torrentSearch.disableProvider('1337x'); // public (fast response)
torrentSearch.disableProvider('ThePirateBay'); // public
torrentSearch.disableProvider('Yggtorrent'); // authentication
torrentSearch.disableProvider('KickassTorrents'); // public
torrentSearch.enableProvider('Rarbg'); // public (fast response)
torrentSearch.disableProvider('TorrentProject'); // public
torrentSearch.disableProvider('ExtraTorrent'); // public

const searchTerm = document.getElementById('search-term');

searchTerm.focus(); // place cursor in the search input filed

const findTorrents = async () => {
  const torrents = await torrentSearch.search(searchTerm.value, '', '');

  if (torrents.length == 1) {
    alert('There is no such torrent!');
    return;
  }

  // Create table
  const table = document.createElement('table');
  table.className = 'table table-sm table-condensed table-bordered table-hover table-striped';

  // Create table head
  const thead = table.createTHead();

  // Create table head row
  const theadRow = thead.insertRow();

  // Create eight table head row cells
  for (let i = 0; i < 8; i++) {
    const th = document.createElement('th');
    theadRow.appendChild(th);
  }

  // Create eight table head row cells names
  const tableHeadCellName = table.getElementsByTagName('th');

  tableHeadCellName[0].innerText = 'ID';
  tableHeadCellName[1].innerText = 'Title';
  tableHeadCellName[2].innerText = 'Date';
  tableHeadCellName[3].innerText = 'Seeds';
  tableHeadCellName[4].innerText = 'Peers';
  tableHeadCellName[5].innerText = 'Size';
  tableHeadCellName[6].innerText = 'Url';
  tableHeadCellName[7].innerText = 'Provider';

  const tbody = table.appendChild(document.createElement('tbody'));

  // Loop for all torrent search results
  for (let i = 0; i < torrents.length; i++) {
    // Create table row
    const newRow = tbody.insertRow();

    // Create ID numbers
    const id = newRow.insertCell();
    id.appendChild(document.createTextNode(i + 1));
    newRow.appendChild(id);

    // Create Title String
    const title = newRow.insertCell();
    title.appendChild(document.createTextNode(JSON.stringify(torrents[i].title).substr(1).slice(0, -1)));
    newRow.appendChild(title);

    // Create Time String
    const time = newRow.insertCell();
    time.appendChild(document.createTextNode(JSON.stringify(torrents[i].time).substr(1).slice(0, -1)));
    newRow.appendChild(time);

    // Create Seeds String
    const seeds = newRow.insertCell();
    seeds.appendChild(document.createTextNode(JSON.stringify(torrents[i].seeds)));
    newRow.appendChild(seeds);

    // Create Peers String
    const peers = newRow.insertCell();
    peers.appendChild(document.createTextNode(JSON.stringify(torrents[i].peers)));
    newRow.appendChild(peers);

    // Create Size String
    const size = newRow.insertCell();
    size.appendChild(document.createTextNode(JSON.stringify(torrents[i].size).substr(1).slice(0, -1)));
    newRow.appendChild(size);

    // URL String
    const url = newRow.insertCell();
    newRow.appendChild(url);

    const createLink = document.createElement('a');
    createLink.href = JSON.stringify(torrents[i].magnet).substr(1).slice(0, -1);
    createLink.setAttribute('class', 'btn btn-secondary btn-sm');
    createLink.innerText = 'Download';

    url.appendChild(createLink);

    // Provider String
    const provider = newRow.insertCell();
    newRow.appendChild(provider);
    provider.appendChild(document.createTextNode(JSON.stringify(torrents[i].provider).substr(1).slice(0, -1)));
    document.getElementById('torrent-results').appendChild(table);
  }

  try {
    torrents;
  } catch (err) {
    alert(`Error occurred!\r\n${err}.\r\nPlease, try again.`);
    return;
  }

  $('table').DataTable({ // call data table api
    autoWidth: false,
    lengthChange: true,
    pageLength: 15,
    lengthMenu: [15, 50, 100],
    retrieve: true
  });
};

const loader = () => {
  $('#fakeLoader').fakeLoader({
    timeToHide: 300,
    spinner: 'spinner2',
    bgColor: '#006ADB'
  });
};

const newSearch = () => {
  loader();
  $('.dataTables_wrapper').remove(); // remove previous results table
  findTorrents();
};

// Event Listeners
searchTerm.addEventListener('keypress', () => {
  if (event.keyCode === 13 && searchTerm.value === '') {
    alert('Please, input search term.');
  } else if (event.keyCode === 13 && searchTerm.value !== '') {
    $('#fakeLoader').removeAttr('style'); // this is needed for loader function to fire each time
    $('.form').removeAttr('id'); // remove class styles
    newSearch();
  }
});

document.getElementById('btn-search').addEventListener('click', () => {
  if (searchTerm.value === '') {
    alert('Please, input search term.');
    searchTerm.focus();
  } else if (searchTerm.value !== '') {
    $('#fakeLoader').removeAttr('style');
    $('.form').removeAttr('id'); // remove class styles
    newSearch();
  }
});
