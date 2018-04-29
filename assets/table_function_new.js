function searchResults() {
	torrentSearch.search(searchTerm.value, '', '')
		.then(torrents => {

			for (let i = 0; i < torrents.length; i++) {

				let titleColumn = tBody.rows[i].cells[1];
				let titleString = JSON.stringify(torrents[i].title).substr(1).slice(0, -1);
				let titleText = document.createTextNode(titleString);
				titleColumn.appendChild(titleText);

				let timeColumn = tBody.rows[i].cells[2];
				let timeString = JSON.stringify(torrents[i].time).substr(1).slice(0, -1);
				let timeText = document.createTextNode(timeString);
				timeColumn.appendChild(timeText);

				let seedsColumn = tBody.rows[i].cells[3];
				let seedsString = JSON.stringify(torrents[i].seeds);
				let seedsText = document.createTextNode(seedsString);
				seedsColumn.appendChild(seedsText);

				let peersColumn = tBody.rows[i].cells[4];
				let peersString = JSON.stringify(torrents[i].peers);
				let peersText = document.createTextNode(peersString);
				peersColumn.appendChild(peersText);

				let sizeColumn = tBody.rows[i].cells[5];
				let sizeString = JSON.stringify(torrents[i].size).substr(1).slice(0, -1);
				let sizeText = document.createTextNode(sizeString);
				sizeColumn.appendChild(sizeText);

				let magnetColumn = tBody.rows[i].cells[6];
				let magnetString = JSON.stringify(torrents[i].magnet).substr(1).slice(0, -1);
				let createLink = document.createElement('a');
				createLink.href = magnetString;
				createLink.setAttribute('class', 'btn btn-default btn-xs btn-block');
				createLink.setAttribute('role', 'button');
				createLink.innerHTML = 'Download';
				magnetColumn.appendChild(createLink);

				let providerColumn = tBody.rows[i].cells[7];
				let providerString = JSON.stringify(torrents[i].provider).substr(1).slice(0, -1);
				let providerText = document.createTextNode(providerString);
				providerColumn.appendChild(providerText);


				let tableRef = table.getElementsByTagName('tbody')[0];
				let newRow = tableRef.insertRow();

				let rowHeader = document.createElement('th');
				let rowId = document.createTextNode(i);
				rowHeader.appendChild(rowId);
				newRow.appendChild(rowHeader);

				// Insert a cell in the row at index 1
				for (let td = 0; td < 7; td++) {
					newRow.insertCell(1);
				}
				}
			}
		})

