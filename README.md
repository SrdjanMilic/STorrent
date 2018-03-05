# STorrent - Search for torrents on multiple sites

**Electron multi platform desktop application**

Torrent search providers by default are:

1. ThePirateBay - enabled (public)
2. Yggtorrent - disabled (authentication)
3. KickassTorrents - disabled (public)
4. TorrentProject - disabled (public)
5. Rarbg - disabled (public)
6. Torrent9 - disabled (public)
7. Torrentz2 - enabled (public)
8. IpTorrents - disabled (authentication)
9. TorrentLeech - disabled (authentication)
10. 1337x - disabled (public)
11. ExtraTorrent - enabledd (public)

You can toggle the state of providers by renaming "...disableProvider..." to "...enableProvider..." in js/myScript.js file. Please note, if there are many providers enabled, waiting for search results could prolongs a bit.

One more thing: before every new search, you will need to manually hit the reload button each time, until I implement a solution for that issue. It's not needed to do that after you get an error alert.

In the [release](https://github.com/SrdjanMilic/STorrent/releases) section, there is distributable builds for Linux/Windows, and installer file for Windows. If you want to run app from distributable build, just double click on "storrent" executable in root directory. Installer for Windows works like expected, although due to the module compiler, app executable ends up in the "...AppData\Local\storrent\" and not in the "...\Program Files\" like it should be.

To locally start the application from source, you will need to have [node.js](https://nodejs.org/en/) installed, then cd to directory and run:

1. npm update
2. npm start

New improvements and fixes will be implemented as time goes by.

STorrent is based on 'torrent-search-api' by [Jimmy Laurent](https://github.com/JimmyLaurent/torrent-search-api).
