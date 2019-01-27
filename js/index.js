const $ = require("jquery")
jQuery = require("jquery")
fakeLoader = require("jquery.fakeloader")
require("datatables.net-bs4")()
const TorrentSearchApi = require("torrent-search-api")
const torrentSearch = new TorrentSearchApi()

torrentSearch.disableProvider("TorrentLeech") // authentication
torrentSearch.disableProvider("IpTorrents") // authentication
torrentSearch.disableProvider("Torrent9") // public
torrentSearch.disableProvider("Torrentz2") // public (slow response)
torrentSearch.disableProvider("1337x") // public (fast response)
torrentSearch.disableProvider("ThePirateBay") // public
torrentSearch.disableProvider("Yggtorrent") // authentication
torrentSearch.enableProvider("KickassTorrents") // public
torrentSearch.enableProvider("Rarbg") // public (fast response)
torrentSearch.disableProvider("TorrentProject") // public
torrentSearch.disableProvider("ExtraTorrent") // public

searchTerm = document.getElementById("search-term")

const findTorrents = async () => {
  torrents = await torrentSearch.search(searchTerm.value, "", "")

  // Create table
  const table = document.createElement("table")
  table.className = "table table-sm table-condensed table-bordered table-hover table-striped"

  // Create table head
  let thead = HTMLTableSectionElement = table.createTHead()

  // Create table head row
  let theadRow = thead.insertRow()

  // Create eight table head row cells
  for (let i = 0; i < 8; i++) {
    let th = document.createElement("th")
    theadRow.appendChild(th)
  }

  // Create eight table head row cells names
  let tableHeadCellName = table.getElementsByTagName("th")

  tableHeadCellName[0].innerText = "ID"
  tableHeadCellName[1].innerText = "Title"
  tableHeadCellName[2].innerText = "Date"
  tableHeadCellName[3].innerText = "Seeds"
  tableHeadCellName[4].innerText = "Peers"
  tableHeadCellName[5].innerText = "Size"
  tableHeadCellName[6].innerText = "Url"
  tableHeadCellName[7].innerText = "Provider"

  const tbody = table.appendChild(document.createElement("tbody"))

  // Loop for all torrent search results
  for (let i = 0; i < torrents.length; i++) {
    // document.getElementById("loop-test").innerText = "Loop working" + " " + i + " " + "times!!" // For debuging

    // Create table row
    let newRow = tbody.insertRow()

    // Create ID numbers
    let id = newRow.insertCell()
    id.appendChild(document.createTextNode(i + 1))
    newRow.appendChild(id)

    // Create Title String
    let title = newRow.insertCell()
    title.appendChild(document.createTextNode(JSON.stringify(torrents[i].title).substr(1).slice(0, -1)))
    newRow.appendChild(title)

    // Create Time String
    let time = newRow.insertCell()
    time.appendChild(document.createTextNode(JSON.stringify(torrents[i].time).substr(1).slice(0, -1)))
    newRow.appendChild(time)

    // Create Seeds String
    let seeds = newRow.insertCell()
    seeds.appendChild(document.createTextNode(JSON.stringify(torrents[i].seeds)))
    newRow.appendChild(seeds)

    // Create Peers String
    let peers = newRow.insertCell()
    peers.appendChild(document.createTextNode(JSON.stringify(torrents[i].peers)))
    newRow.appendChild(peers)

    // Create Size String
    let size = newRow.insertCell()
    size.appendChild(document.createTextNode(JSON.stringify(torrents[i].size).substr(1).slice(0, -1)))
    newRow.appendChild(size)

    // URL String
    const url = newRow.insertCell()
    newRow.appendChild(url)

    const createLink = document.createElement("a")
    createLink.href = JSON.stringify(torrents[i].magnet).substr(1).slice(0, -1)
    createLink.setAttribute("class", "btn btn-secondary btn-sm")
    createLink.innerText = "Download"

    url.appendChild(createLink)

    // Provider String
    let provider = newRow.insertCell()
    newRow.appendChild(provider)
    provider.appendChild(document.createTextNode(JSON.stringify(torrents[i].provider).substr(1).slice(0, -1)))
    document.getElementById("torrent-results").appendChild(table)
  }

  try {
    torrents // Block of code to try
  } catch (err) {
    window.alert(`${"Error occurred!" + "\r\n"}${err}. \r\n` + "Please, try again.") // catchCode - Block of code to handle errors
    return
  }
  // finally {
  //   window.alert("Check for errors has finally finished!") // finallyCode - Block of code to be executed regardless of the try / catch result
  // }
  // document.getElementById("search-results").innerHTML = JSON.stringify(torrents) // for debuging purposes

  $("table").DataTable({ // calll data table api
    autoWidth: false,
    lengthChange: true,
    pageLength: 15,
    lengthMenu: [15, 50, 100],
    retrieve: true
  })
}

let loader = () => {
  $("#fakeLoader").fakeLoader({
    timeToHide: 300,
    spinner: "spinner2",
    bgColor: "#2ecc71"
  })
}

let newSearch = () => {
  loader()
  $(".dataTables_wrapper").remove() // remove previous results table
  findTorrents()
}

// Event Listeners
searchTerm.addEventListener("keypress", () => {
  if (event.keyCode === 13) {
    $("#fakeLoader").removeAttr("style") // this is neded for loader function to fire each time
    $(".form").removeAttr("id")
    newSearch()
  }
})

document.getElementById("btn-search").addEventListener("click", () => {
  $("#fakeLoader").removeAttr("style")
  $(".form").removeAttr("id")
  newSearch()
})

