const $ = require('jquery');
require('datatables.net-bs5')();
const modal = require('bootstrap');
const torrentSearch = require('torrent-search-api');

const homePage = document.querySelector('.home-page');
const searchInput = document.querySelector('.search-input');
const myModal = new modal.Modal(document.getElementById('myModal'));
const modalBodyParagraph = document.getElementById('paragraph');
const brandContainer = document.querySelector('.navbar-brand');
const loaderOverlay = document.querySelector('.loader-overlay');
const spinner = document.querySelector('.spinner');

const thePirateBay = document.getElementById('the-pirate-bay');
const rarbg = document.getElementById('rarbg');

let newDataSet = [];
let modalMessage = 'Input the search term first.';

searchInput.focus();

thePirateBay.checked = true;
rarbg.checked = false;

torrentSearch.disableProvider('TorrentLeech'); // authentication
torrentSearch.disableProvider('IpTorrents'); // authentication
torrentSearch.disableProvider('Yggtorrent'); // authentication
torrentSearch.disableProvider('Torrent9'); // public
torrentSearch.disableProvider('Torrentz2'); // public (slow response)
torrentSearch.disableProvider('1337x'); // public (fast response)
torrentSearch.disableProvider('TorrentProject'); // public
torrentSearch.disableProvider('KickassTorrents'); // public
torrentSearch.enableProvider('ThePirateBay'); // public

// torrentSearch.enableProvider('Yts'); // public
// torrentSearch.enableProvider('Limetorrents'); // public
// torrentSearch.enableProvider('Eztv'); // public
// torrentSearch.enableProvider('Rarbg'); // public (fast response)

const findTorrents = async () => {
  let torrents = [];
  let filtered = {};

  loaderOverlay.style.display = 'flex';
  spinner.style.display = 'flex';

  try {
    torrents = await torrentSearch.search(searchInput.value, '', '');
    if (homePage) homePage.remove();

    if (torrents.length == null || torrents === [] ||
      torrents[0].title === 'No results returned') {
      modalMessage = 'There are no torrents with that name.';
      modalBodyParagraph.innerText = modalMessage;
      myModal.show();
    }

    /*
    ** Remove unused columns from objects
    */

    torrents.forEach(result => {
      Object.keys(result).reduce((acc, key) => {
        if (key !== 'id' && key !== 'imdb' && key !== 'category' && key !== 'status') {
          acc[key] = result[key];
        }
        filtered = acc;
        return acc;
      }, {});
      newDataSet.push([...Object.values(filtered)]);
    });

    // console.log('-> torrents', torrents);

    $('table').DataTable({ // call data table api
      autoWidth: false,
      lengthChange: true,
      pageLength: 15,
      lengthMenu: [15, 50, 100],
      retrieve: true,
      columns: [
        { title: 'Provider' },
        { title: 'Title' },
        { title: 'Time' },
        { title: 'Seeds' },
        { title: 'Peers' },
        { title: 'Size' },
        {
          title: 'Download',
          render: function (data, type) {
            if (type === 'display') {
              data = '<a href="' + data + '"><i class="bi bi-download"></i></a>';
            }
            return data;
          }
        },
        { title: 'Description' }
      ]
    }).rows.add(newDataSet).draw();

    loaderOverlay.style.display = 'none';
    spinner.style.display = 'none';
    document.body.style.backgroundImage = 'unset';
  } catch (err) {
    alert(err);
    /*
    modalMessage = err;
    modalBodyParagraph.innerText = modalMessage;
    myModal.show();
    */
    return null;
  }
};

function resetSearch () {
  if (newDataSet.length !== 0) {
    $('table').DataTable().clear().draw();
    newDataSet = [];
  }
  return findTorrents();
}

//
// Event Listeners
//

thePirateBay.addEventListener('change', event => {
  thePirateBay.checked = event.target.checked;

  if (thePirateBay.checked === true) {
    torrentSearch.enableProvider('ThePirateBay');
  } else {
    torrentSearch.disableProvider('ThePirateBay');
  }
});

rarbg.addEventListener('change', event => {
  rarbg.checked = event.target.checked;

  if (rarbg.checked === true) {
    torrentSearch.enableProvider('Rarbg');
  } else {
    torrentSearch.disableProvider('Rarbg');
  }
});

brandContainer.addEventListener('click', (event) => {
  location.reload(); // TODO: needs to be addressed much better
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && searchInput.value === '') {
    event.preventDefault();
    modalBodyParagraph.innerText = modalMessage;
    myModal.show();
  }

  if (event.key === 'Enter' && searchInput.value !== '') {
    event.preventDefault();
    return resetSearch();
  }
});

document.querySelector('.button-search').addEventListener('click', (event) => {
  if (searchInput.value === '') {
    event.preventDefault();
    modalBodyParagraph.innerText = modalMessage;
    myModal.show();
  }

  if (searchInput.value !== '') {
    event.preventDefault();
    return resetSearch();
  }
});
