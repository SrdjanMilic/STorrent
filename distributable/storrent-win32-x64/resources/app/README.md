# STorrent - Search for torrents on multiple sites

<p><strong>Electron multi platform desktop application.</strong></p>

Torrent search providers are inside brackets:<br><br>
torrentSearch.disableProvider('ThePirateBay');	// public<br>
torrentSearch.disableProvider('Yggtorrent');	// authentication<br>
torrentSearch.disableProvider('KickassTorrents');	// public<br>
torrentSearch.disableProvider('TorrentProject');	// public<br>
torrentSearch.disableProvider('Rarbg');	// public<br>
torrentSearch.disableProvider('Torrent9');	// public<br>
torrentSearch.enableProvider('Torrentz2');	// public<br>
torrentSearch.disableProvider('IpTorrents');	// authentication<br>
torrentSearch.disableProvider('TorrentLeech');	// authentication<br>
torrentSearch.disableProvider('1337x');	// public<br>
torrentSearch.disableProvider('ExtraTorrent');	// public<br>

You can toggle the state of providers by renaming '...disableProvider...' to '...enableProvider...' in js/myScript.js file.

This application is still in development. It has a working functionality and can be very useful, as you don't have to visit torrent sites any more for downloading a torrent file.

Everything except distributable and installers directories are source code.

To start the application from source you need to have [NODE.JS](https://nodejs.org/en/) installed, then cd to directory and issue 'npm start' in terminal.

New features and improvements will be implemented as time goes by.

STorrent is based on the 'torrent-search-api' by [Jimmy Laurent](https://github.com/JimmyLaurent/torrent-search-api).<br>
