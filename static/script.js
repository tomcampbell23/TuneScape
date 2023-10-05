//   for (s in Sunshine) {
    //       console.log(s)
    //       playlist.push(s.name)
    //   }

const player = document.getElementById('player')

function nextsong() {
    document.getElementById('song').src = "../static/Music/SunshineCoast/Bottles of Thrill.mp3"
    player.load()
    player.play()
}

var musicFiles = document.getElementById('data').textContent
console.log(musicFiles)