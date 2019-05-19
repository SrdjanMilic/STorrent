# STorrent - Search for torrents with multiple providers

## Electron multi platform desktop application

### Torrent search providers

torrentSearch.disableProvider("TorrentLeech") // authentication  
torrentSearch.disableProvider("IpTorrents") // authentication  
torrentSearch.disableProvider("Torrent9") // public  
torrentSearch.enableProvider("Torrentz2") // public  
torrentSearch.disableProvider("1337x") // public (fast response)  
torrentSearch.disableProvider("ThePirateBay") // public  
torrentSearch.disableProvider("Yggtorrent") // authentication  
torrentSearch.enableProvider("KickassTorrents") // public  
torrentSearch.enableProvider("Rarbg") // public (fast response)  
torrentSearch.disableProvider("TorrentProject") // public  
torrentSearch.disableProvider("ExtraTorrent") // public (fast response)

You can toggle the active state of providers by renaming "...disableProvider..." to "...enableProvider..." in "js/index.js" file. Please note, if there is many providers enabled, waiting for search results could prolongs a bit. Also, some providers are not working as it should, causing the app to give no results response.

### Usage

To locally start the application from source, you will need to have [node.js](https://nodejs.org/en/) installed, then just cd to directory and run:

1. npm update
2. npm start

In section [release](https://github.com/SrdjanMilic/STorrent/releases), there is distributable builds for Linux and Windows. If you want to run app from distributable build, just double click on "storrent" executable in root directory.

### Credits

STorrent is based on 'torrent-search-api' by [Jimmy Laurent](https://github.com/JimmyLaurent/torrent-search-api).

You can follow up above link for more options and configurations.
