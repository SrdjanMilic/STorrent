# STorrent - Search for torrents on multiple sites

<p><strong>Electron multi platform desktop application.</strong></p>

In master branch there is Linux download bundle and there is Windows branch also for Windows users. 

Default torrent providers are:<br><br>
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

This application is still in development, but it has a basic working functionality and can be useful!

You don't have to visit torrent sites any more for downloading a torrent file.

New features and improvements will be implemented as time goes by.

STorrent is based on the 'torrent-search-api' by Jimmy Laurent:<br>
https://github.com/JimmyLaurent/torrent-search-api

For customization options please follow the link above.

Thank you for take an interest about this app.

Feel free to contact me at any time.