// ---- Functions ---- //

function nextSong() { // This function finds the next song in the playlist variable and plays it
    if (playlist.length > current + 1) {
        current += 1
    } else {
        current = 0
    }
    console.log("../static/Music/" + location1 + "/" + playlist[current])
    document.getElementById('song').src = "../static/Music/" + location1 + "/" + playlist[current]
    player.load()
    player.play()
}

function prevSong() { // This function finds the previous song in the playlist variable and plays it
    if (playlist.length > current - 1 && current - 1 >= 0) {
        current -= 1
    } else {
        current = playlist.length - 1
    }
    console.log("../static/Music/" + location1 + "/" + playlist[current])
    document.getElementById('song').src = "../static/Music/" + location1 + "/" + playlist[current]
    player.load()
    player.play()
}

function shuffle(array) { // This function changes the order of the array given
    return array.sort(() => Math.random() - 0.5); 
}

// ---- Variables ---- //

const player = document.getElementById('player') // This is the music player
var current = 0 // This is the current song in the playlist variable
var musicFiles = JSON.parse(document.getElementById('data').textContent) // This is a Javascript Object with the music file directory 

var location1 = 'SunshineCoast'

/*for (i in musicFiles) {
    var location1 = 'SunshineCoast'
} */


var playlist = shuffle(Object.values(musicFiles[location1])) // Gets the playlist for 'location1' and shuffles it