# STorrent

## Electron multi-platform desktop application

[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-yellow.svg?style=flat-square)](https://opensource.org/licenses/GPL-3.0)
[![GitHub release](https://img.shields.io/github/release/SrdjanMilic/STorrent.svg?style=flat-square)](https://GitHub.com/SrdjanMilic/STorrent/releases)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-brightgreen.svg?style=flat-square)](https://GitHub.com/SrdjanMilic/STorrent/graphs/commit-activity)
[![Support](https://img.shields.io/badge/support-PayPal-lightgray.svg?style=flat-square)](https://paypal.me/SrdjanMilic?locale.x=en_US)

### Torrent search providers are:

| Provider        | Authentication |
|-----------------|----------------|
| TorrentLeech    | required       |
| IpTorrents      | required       |
| Torrent9        | public         |
| Torrentz2       | public         |
| 1337x           | public         |
| ThePirateBay    | public         |
| Yggtorrent      | required       |
| KickassTorrents | public         |
| Rarbg           | public         |
| TorrentProject  | public         |
| Yts             | public         |
| Limetorrents    | public         |
| Eztv            | public         |

### You can toggle the active state of providers by calling two methods:
> `...enableProvider` or `...disableProvider` in `js/index.js` file.

Please note, if there is many providers enabled, waiting for search results could prolong a bit.  

## Usage

In [releases](https://github.com/SrdjanMilic/STorrent/releases) section,
there is a `.deb` installer for GNU/Linux Ubuntu based distros and `.exe` executable for Windows.

For Linux users, there is `storrent.desktop` file provided in the assets folder for better convenience.  

Windows users should probably want to pin the app to the taskbar on first run, because installer doesn't create start menu and other usual shortcuts.  
Application files are stored in `c:\Users\%USERNAME%\AppData\Local\storrent\` directory.

To locally start the application from source,
you will need to have [node.js](https://nodejs.org/en/) with npm installed,  
then cd to directory and run:

1. npm i
2. npm start

**Credits**

STorrent is based on 'torrent-search-api' by [Jimmy Laurent](https://github.com/JimmyLaurent/torrent-search-api).
