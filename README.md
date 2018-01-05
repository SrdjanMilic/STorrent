STorrent - Search for torrents on multiple sites

Electron multi platform desktop application.

All default providers are:
torrentSearch.enableProvider('ThePirateBay');	// public
torrentSearch.disableProvider('Yggtorrent');	// authentication
torrentSearch.disableProvider('KickassTorrents');	// public
torrentSearch.enableProvider('TorrentProject');	// public
torrentSearch.enableProvider('Rarbg');	// public
torrentSearch.enableProvider('Torrent9');	// public
torrentSearch.enableProvider('Torrentz2');	// public
torrentSearch.disableProvider('IpTorrents');	// authentication
torrentSearch.disableProvider('TorrentLeech');	// authentication
torrentSearch.disableProvider('1337x');	// public
torrentSearch.enableProvider('ExtraTorrent');	// public

You can toggle the state of providers by renaming '...disableProvider...' to '...enableProvider...' in myScript.js file.

This application is at an early stage of development and has a very basic functionality for now!

New features and improvements will be implemented as time goes by.

STorrent is based on the 'torrent-search-api' by Jimmy Laurent:
https://github.com/JimmyLaurent/torrent-search-api

For customization options please follow the link above.
