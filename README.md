# STorrent - Search for torrents with multiple providers

[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat-square)](https://opensource.org/licenses/GPL-3.0) [![GitHub release](https://img.shields.io/github/release/SrdjanMilic/STorrent.svg?style=flat-square)](https://GitHub.com/SrdjanMilic/STorrent/releases) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square)](https://GitHub.com/SrdjanMilic/STorrent/graphs/commit-activity)  
 
Providers are:

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

You can toggle the active state of providers by renaming "...disableProvider..." to "...enableProvider..." in "js/index.js" file. Please note, if there is many providers enabled, waiting for search results could prolongs a bit.

**Usage**

In section [releases](https://github.com/SrdjanMilic/STorrent/releases), there is a `.deb` installer for GNU/Linux Ubuntu based distros and `.exe` executable for Windows.

For Linux users, there is `storrent.desktop` file provided in the assets folder for better convenience.  
Put that file in `~/.local/share/applications` directory, in order to show up icon and description in the app menu.

Windows users should optionaly pin the app on first run, because installer doesn't create start menu shortcuts.  
Application files are stored in `c:\Users\%USERNAME%\AppData\Local\storrent\` directory.

To locally start the application from source, you will need to have [node.js](https://nodejs.org/en/) installed, then cd to directory and run:

1. npm install
2. npm start

**Credits**

STorrent is based on 'torrent-search-api' by [Jimmy Laurent](https://github.com/JimmyLaurent/torrent-search-api).

You can follow above link for more options and configurations if needed.
