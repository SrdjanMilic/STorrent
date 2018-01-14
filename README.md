# STorrent - Search for torrents on multiple sites

**Electron multi platform desktop application**

Torrent search providers by default are:

1. ThePirateBay - enabled (public)
2. Yggtorrent - disabled (authentication)
3. KickassTorrents - disabled (public)
4. TorrentProject - enabled (public)
5. Rarbg - disabled (public)
6. Torrent9 - enabled (public)
7. Torrentz2 - enabled (public)
8. IpTorrents - disabled (authentication)
9. TorrentLeech - disabled (authentication)
10. 1337x - disabled (public)
11. ExtraTorrent - disabled (public)

You can toggle the state of providers by renaming '...disableProvider...' to '...enableProvider...' in js/myScript.js file.

This application is still in development. It has a working functionality and can be very useful, as you don't have to visit torrent sites any more for downloading a torrent file.

There is distributable builds for linux and windows and installer file for windows in repository Downloads section.

To start the application from source, you will need to have [NODE.JS](https://nodejs.org/en/) installed, then cd to directory and run:

1. npm update
2. npm start

New features and improvements will be implemented as time goes by.

STorrent is based on 'torrent-search-api' by [Jimmy Laurent](https://github.com/JimmyLaurent/torrent-search-api).
