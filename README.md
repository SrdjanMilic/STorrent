<h2>STorrent - Search for torrents on multiple sites</h2>
Electron multi platform desktop application.

Default torrent providers are:
torrentSearch.enableProvider('ThePirateBay');	// public<br>
torrentSearch.disableProvider('Yggtorrent');	// authentication<br>
torrentSearch.disableProvider('KickassTorrents');	// public<br>
torrentSearch.enableProvider('TorrentProject');	// public<br>
torrentSearch.enableProvider('Rarbg');	// public<br>
torrentSearch.enableProvider('Torrent9');	// public<br>
torrentSearch.enableProvider('Torrentz2');	// public<br>
torrentSearch.disableProvider('IpTorrents');	// authentication<br>
torrentSearch.disableProvider('TorrentLeech');	// authentication<br>
torrentSearch.disableProvider('1337x');	// public<br>
torrentSearch.enableProvider('ExtraTorrent');	// public<br>

You can toggle the state of providers by renaming '...disableProvider...' to '...enableProvider...' in myScript.js file.

This application is at an early stage of development and has a very basic functionality for now!

New features and improvements will be implemented as time goes by.

STorrent is based on the 'torrent-search-api' by Jimmy Laurent:<br>
https://github.com/JimmyLaurent/torrent-search-api

For customization options please follow the link above.

Also, feel free to send pull requests, or to contact me at any time about the app.
