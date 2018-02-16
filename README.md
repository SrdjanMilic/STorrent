# STorrent - Search for torrents on multiple sites

**Electron multi platform desktop application**

Torrent search providers by default are:

1. ThePirateBay - enabled (public)
2. Yggtorrent - disabled (authentication)
3. KickassTorrents - disabled (public)
4. TorrentProject - enabled (public)
5. Rarbg - enabled (public)
6. Torrent9 - disabled (public)
7. Torrentz2 - enabled (public)
8. IpTorrents - disabled (authentication)
9. TorrentLeech - disabled (authentication)
10. 1337x - disabled (public)
11. ExtraTorrent - enabledd (public)

You can toggle the state of providers by renaming '...disableProvider...' to '...enableProvider...' in js/myScript.js file.

Before new search you will need to manually reload window each time until I fix that issue. It's not needed to do that after a error alert.

In the [release](https://github.com/SrdjanMilic/STorrent/releases) section, there is distributable builds for linux/windows, and installer file for windows.

To locally start the application from source, you will need to have [NODE.JS](https://nodejs.org/en/) installed, then cd to directory and run:

1. npm update
2. npm start

New improvements and fixes will be implemented as time goes by.

STorrent is based on 'torrent-search-api' by [Jimmy Laurent](https://github.com/JimmyLaurent/torrent-search-api).
