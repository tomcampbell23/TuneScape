const player = document.getElementById('player')
var current = 0

function nextsong() {
    if (playlist.length > current + 1) {
        current += 1
    } else {
        current = 0
    }
    console.log("../static/Music/SunshineCoast/" + playlist[current])
    document.getElementById('song').src = "../static/Music/SunshineCoast/" + playlist[current]
    player.load()
    player.play()
}

function shuffle(array) { 
    return array.sort(() => Math.random() - 0.5); 
}

function fileslist() {
    var musicFiles = JSON.parse(document.getElementById('data').textContent)
    return musicFiles
}

var musicFiles = fileslist()

/*for (i in musicFiles) {
    var location1 = 'SunshineCoast'
} */

var location1 = 'SunshineCoast'

var playlist = shuffle(Object.values(musicFiles[location1]))