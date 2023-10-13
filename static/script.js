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

function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

async function getRequest(endpoint) { // Make a GET api request
    const response = await fetch(`${endpoint}`);
    const result = await response.json();
    
    let objResult = (typeof result == "object") ? result  : JSON.parse(result);
    let strResult = JSON.stringify(objResult, undefined, 2);

    return objResult;
}

// ---- Variables ---- //

const player = document.getElementById('player') // This is the music player
var current = 0 // This is the current song in the playlist variable
var musicFiles = JSON.parse(document.getElementById('data').textContent) // This is a Javascript Object with the music file directory 

var location1, playlist

var LGAdata = getRequest('https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-australia-local-government-area@public/records?where=ste_name%20%3D%20%27Queensland%27&limit=100')
var LGAs = {}
var LGApolygons = {}

LGAdata.then((data) => {
    console.log(data)
    for (i in data.results) {
        LGAs[data.results[i].lga_name] = data.results[i].geo_shape.geometry.coordinates
    }

    console.log(LGAs)

    for (j in LGAs) {
        for (i in LGAs[j]) {
            for (l in LGAs[j][i]) {
                LGApolygons[l] = LGAs[j][i][l]
                var check = inside([153.025131, -27.469770], LGApolygons[l])
                if (check) {
                    location1 = j
                }
            }
        }
    }

    console.log(location1)

    playlist = shuffle(Object.values(musicFiles[location1])) // Gets the playlist for 'location1' and shuffles it
    console.log("../static/Music/" + location1 + "/" + playlist[0])
    document.getElementById('song').src = "../static/Music/" + location1 + "/" + playlist[0]
    player.load()
})