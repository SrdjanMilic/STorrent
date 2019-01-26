# STorrent - Search for torrents with multiple providers

**Electron multi platform desktop application**

Torrent search providers are:

torrentSearch.disableProvider("TorrentLeech") // authentication <br>
torrentSearch.disableProvider("IpTorrents") // authentication <br>
torrentSearch.disableProvider("Torrent9") // public <br>
torrentSearch.disableProvider("Torrentz2") // public <br>
torrentSearch.disableProvider("1337x") // public (fast response) <br>
torrentSearch.disableProvider("ThePirateBay") // public <br>
torrentSearch.disableProvider("Yggtorrent") // authentication <br>
torrentSearch.disableProvider("KickassTorrents") // public <br>
torrentSearch.enableProvider("Rarbg") // public (fast response) <br>
torrentSearch.disableProvider("TorrentProject") // public <br>
torrentSearch.disableProvider("ExtraTorrent") // public (fast response)

Only "Rarbg" provider is enabled by default. You can toggle the state of providers by renaming "...disableProvider..." to "...enableProvider..." in js/index.js file. Please note, if there is many providers enabled, waiting for search results could prolongs a bit.

To locally start the application from source, you will need to have [node.js](https://nodejs.org/en/) installed, then just cd to directory and run:

1. npm update
2. npm start

---

In section [release](https://github.com/SrdjanMilic/STorrent/releases), there is distributable builds for Linux and Windows. If you want to run app from distributable build, just double click on "storrent" executable in root directory. Distributables should soon be updated to a newest versions as well.

---

STorrent is based on 'torrent-search-api' by [Jimmy Laurent](https://github.com/JimmyLaurent/torrent-search-api).
You can follow up above link for more options and configurations.
