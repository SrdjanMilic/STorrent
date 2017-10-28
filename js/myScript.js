var testElement = document.createElement("p");
var node = document.createTextNode("This is newly added <p></p> Element. JavaScript is Working!!");
testElement.appendChild(node);

const TorrentSearchApi = require('torrent-search-api');
const torrentSearch = new TorrentSearchApi();

var element = document.getElementById('JavaScript-test');
element.appendChild(testElement);

torrentSearch.enableProvider('KickassTorrents');

torrentSearch.search('ufc', '', 2)
  .then(torrents => {
    // console.log(torrents);
    // document.getElementById('results').innerHTML = JSON.stringify(torrents[0]['title'] + ', ' + torrents[0]['time'] + ', ' + torrents[1]['title'] + ', ' + torrents[1]['time']);
    document.getElementById('results').innerHTML = JSON.stringify(torrents);
  })
  .catch(err => {
    window.alert(err);
  });

// var results = JSON.parse(torrents);
// document.getElementById('results').innerHTML = torrents[0] + torrents[1] + torrents[2] + torrents[3];
