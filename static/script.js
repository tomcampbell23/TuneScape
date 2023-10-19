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

function updateCoord() { // This updates the 'lon' and 'lat' variables to the users current position (HTTPS only)
    if (! "geolocation" in navigator) { 
        alert("Location services not available") 
        return
    }
    navigator.geolocation.getCurrentPosition((position) => {
        lon = position.coords.longitude
        lat = position.coords.latitude
    })
}

function shuffle(array) { // This function changes the order of the array given
    return array.sort(() => Math.random() - 0.5)
}

function inside(point, vs) { // This function determines if 'point' is inside the polygon 'vs'
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        if (intersect) inside = !inside;
    }
    
    return inside
}

async function getRequest(endpoint) { // Make a GET api request
    const response = await fetch(`${endpoint}`);
    const result = await response.json();
    
    let objResult = (typeof result == "object") ? result  : JSON.parse(result);
    let strResult = JSON.stringify(objResult, undefined, 2);

    return objResult;
}

// ---- Variables ---- //

const getCoordinatesButton = document.getElementById("getCoordinatesButton");
const player = document.getElementById('player') // This is the music player
var current = 0 // This is the current song in the playlist variable
var musicFiles = JSON.parse(document.getElementById('data').textContent) // This is a Javascript Object with the music file directory 

var location1, playlist
// var lon = 153.066666, lat = -26.650000 // Declares longitude and latitude variables with default coordinates in Sunshine Coast
var lon = 153.025131, lat = -27.469770 // Declares longitude and latitude variables with default coordinates in Brisbane

var LGAdata = getRequest('https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-australia-local-government-area@public/records?where=ste_name%20%3D%20%27Queensland%27&limit=100')
var LGAs = {}
var LGApolygons = {}

// ---- Listeners ---- //

player.addEventListener('ended', function() { // This plays the next song once the current song ends
    nextSong()
})

// ---- Script ---- //

if (! "geolocation" in navigator) { // This displays an error when location services aren't available
    alert("Location services not available")
}
navigator.geolocation.getCurrentPosition((position) => { // This gets the current coordinates of the user and sets to 'lon' and 'lat' (HTTPS only)
    lon = position.coords.longitude
    lat = position.coords.latitude
}) 

LGAdata.then((data) => {
    console.log(data)
    for (i in data.results) { // This for loop saves all the polygon data under the LGA name
        LGAs[data.results[i].lga_name] = data.results[i].geo_shape.geometry.coordinates 
    }

    console.log(LGAs)

    for (j in LGAs) { // This for loop gets the coordinate polygon points for each LGA and tests to see which LGA 'lon' and 'lat' are in
        for (i in LGAs[j]) {
            for (l in LGAs[j][i]) {
                LGApolygons[l] = LGAs[j][i][l]
                var check = inside([lon, lat], LGApolygons[l])
                if (check) {
                    location1 = j
                }
            }
        }
    }

    console.log(location1)

    playlist = shuffle(Object.values(musicFiles[location1])) // Gets the playlist for 'location1' and shuffles it
    console.log("../static/Music/" + location1 + "/" + playlist[0])
    document.getElementById('song').src = "../static/Music/" + location1 + "/" + playlist[0] // Gets the first song to play
    player.load()
    document.getElementById('location').innerHTML = location1
})