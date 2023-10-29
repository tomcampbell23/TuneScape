// ---- Functions ---- //

function nextSong() { // This function finds the next song in the playlist variable and plays it
    if (playlist.length > current + 1) {
        current += 1
    } else {
        current = 0
    }
    console.log("../static/Music/" + location1 + "/" + playlist[current])
    document.getElementById('song').src = "../static/Music/" + location1 + "/" + playlist[current]
    ID3.loadTags("../static/Music/" + location1 + "/" + playlist[current], function() {
        var tags = ID3.getAllTags("../static/Music/" + location1 + "/" + playlist[current]);
        var base64String = "";
        for (var i = 0; i < tags.picture.data.length; i++) {
            base64String += String.fromCharCode(tags.picture.data[i]);
        }
        document.getElementById("art").src = "data:image/png;base64," + window.btoa(base64String)
        document.getElementById("artist").innerHTML = tags.artist
        document.getElementById("title").innerHTML = tags.title
    },
        {tags: ["artist", "title", "picture"]}
    );
    player.load()
    player.play()

    var previous = 0
    if (playlist.length > current - 1 && current - 1 >= 0) {
        previous = current - 1
    } else {
        previous = playlist.length - 1
    }
    ID3.loadTags("../static/Music/" + location1 + "/" + playlist[previous], function() { // Gets ID3 tags from the mp3 file
        var tags = ID3.getAllTags("../static/Music/" + location1 + "/" + playlist[previous]);
        var base64String = "";
        for (var i = 0; i < tags.picture.data.length; i++) {
            base64String += String.fromCharCode(tags.picture.data[i]);
        }
        document.getElementById("pArt").src = "data:image/png;base64," + window.btoa(base64String)
        document.getElementById("pArtist").innerHTML = tags.artist
        document.getElementById("pTitle").innerHTML = tags.title
    },
        {tags: ["artist", "title", "picture"]}
    );

    var next = 0
    if (playlist.length > current + 1) {
        next = current + 1
    } else {
        next = 0
    }
    ID3.loadTags("../static/Music/" + location1 + "/" + playlist[next], function() { // Gets ID3 tags from the mp3 file
        var tags = ID3.getAllTags("../static/Music/" + location1 + "/" + playlist[next]);
        var base64String = "";
        for (var i = 0; i < tags.picture.data.length; i++) {
            base64String += String.fromCharCode(tags.picture.data[i]);
        }
        document.getElementById("nArt").src = "data:image/png;base64," + window.btoa(base64String)
        document.getElementById("nArtist").innerHTML = tags.artist
        document.getElementById("nTitle").innerHTML = tags.title
    },
        {tags: ["artist", "title", "picture"]}
    );
}

function prevSong() { // This function finds the previous song in the playlist variable and plays it
    if (playlist.length > current - 1 && current - 1 >= 0) {
        current -= 1
    } else {
        current = playlist.length - 1
    }
    console.log("../static/Music/" + location1 + "/" + playlist[current])
    document.getElementById('song').src = "../static/Music/" + location1 + "/" + playlist[current]
    ID3.loadTags("../static/Music/" + location1 + "/" + playlist[current], function() {
        var tags = ID3.getAllTags("../static/Music/" + location1 + "/" + playlist[current]);
        var base64String = "";
        for (var i = 0; i < tags.picture.data.length; i++) {
            base64String += String.fromCharCode(tags.picture.data[i]);
        }
        document.getElementById("art").src = "data:image/png;base64," + window.btoa(base64String)
        document.getElementById("artist").innerHTML = tags.artist
        document.getElementById("title").innerHTML = tags.title
    },
        {tags: ["artist", "title", "picture"]}
    );
    player.load()
    player.play()

    var previous = 0
    if (playlist.length > current - 1 && current - 1 >= 0) {
        previous = current - 1
    } else {
        previous = playlist.length - 1
    }
    ID3.loadTags("../static/Music/" + location1 + "/" + playlist[previous], function() { // Gets ID3 tags from the mp3 file
        var tags = ID3.getAllTags("../static/Music/" + location1 + "/" + playlist[previous]);
        var base64String = "";
        for (var i = 0; i < tags.picture.data.length; i++) {
            base64String += String.fromCharCode(tags.picture.data[i]);
        }
        document.getElementById("pArt").src = "data:image/png;base64," + window.btoa(base64String)
        document.getElementById("pArtist").innerHTML = tags.artist
        document.getElementById("pTitle").innerHTML = tags.title
    },
        {tags: ["artist", "title", "picture"]}
    );

    var next = 0
    if (playlist.length > current + 1) {
        next = current + 1
    } else {
        next = 0
    }
    ID3.loadTags("../static/Music/" + location1 + "/" + playlist[next], function() { // Gets ID3 tags from the mp3 file
        var tags = ID3.getAllTags("../static/Music/" + location1 + "/" + playlist[next]);
        var base64String = "";
        for (var i = 0; i < tags.picture.data.length; i++) {
            base64String += String.fromCharCode(tags.picture.data[i]);
        }
        document.getElementById("nArt").src = "data:image/png;base64," + window.btoa(base64String)
        document.getElementById("nArtist").innerHTML = tags.artist
        document.getElementById("nTitle").innerHTML = tags.title
    },
        {tags: ["artist", "title", "picture"]}
    );
}

function setupLGA() { // This function finds the LGA of lon & lat, adds the marker to the map, and reads the ID3 tags of the mp3 files    
    for (j in LGAs) { // This for loop gets the coordinate polygon points for each LGA and tests to see which LGA 'lon' and 'lat' are in
        for (i in LGAs[j]) {
            for (l in LGAs[j][i]) {
                var check = inside([lon, lat], LGAs[j][i][l])
                if (check) {
                    location1 = j
                }
            }
        }
    }

    if (map == null) {
        map = L.map('map').setView([lat, lon], 5) // This sets the map up
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 15,
            minZoom: 1,
            attribution: '© OpenStreetMap'
        }).addTo(map)

        map.on('click', onMapClick) // When the map is clicked the onMapClick function is executed
    }

    if (marker != null) {
        map.removeLayer(marker)
    }

    marker = L.marker([lat, lon]).addTo(map)

    current = 0
    playlist = shuffle(Object.values(musicFiles[location1])) // Gets the playlist for 'location1' and shuffles it
    console.log("../static/Music/" + location1 + "/" + playlist[current])
    document.getElementById('song').src = "../static/Music/" + location1 + "/" + playlist[current] // Gets the first song to play
    document.getElementById('location').innerHTML = location1
    ID3.loadTags("../static/Music/" + location1 + "/" + playlist[current], function() { // Gets ID3 tags from the mp3 file
        var tags = ID3.getAllTags("../static/Music/" + location1 + "/" + playlist[0]);
        var base64String = "";
        for (var i = 0; i < tags.picture.data.length; i++) {
            base64String += String.fromCharCode(tags.picture.data[i]);
        }
        document.getElementById("art").src = "data:image/png;base64," + window.btoa(base64String)
        document.getElementById("artist").innerHTML = tags.artist
        document.getElementById("title").innerHTML = tags.title
    },
        {tags: ["artist", "title", "picture"]}
    );
    player.load()

    var previous = 0
    if (playlist.length > current - 1 && current - 1 >= 0) {
        previous = current - 1
    } else {
        previous = playlist.length - 1
    }
    ID3.loadTags("../static/Music/" + location1 + "/" + playlist[previous], function() { // Gets ID3 tags from the mp3 file
        var tags = ID3.getAllTags("../static/Music/" + location1 + "/" + playlist[previous]);
        var base64String = "";
        for (var i = 0; i < tags.picture.data.length; i++) {
            base64String += String.fromCharCode(tags.picture.data[i]);
        }
        document.getElementById("pArt").src = "data:image/png;base64," + window.btoa(base64String)
        document.getElementById("pArtist").innerHTML = tags.artist
        document.getElementById("pTitle").innerHTML = tags.title
    },
        {tags: ["artist", "title", "picture"]}
    );

    var next = 0
    if (playlist.length > current + 1) {
        next = current + 1
    } else {
        next = 0
    }
    ID3.loadTags("../static/Music/" + location1 + "/" + playlist[next], function() { // Gets ID3 tags from the mp3 file
        var tags = ID3.getAllTags("../static/Music/" + location1 + "/" + playlist[next]);
        var base64String = "";
        for (var i = 0; i < tags.picture.data.length; i++) {
            base64String += String.fromCharCode(tags.picture.data[i]);
        }
        document.getElementById("nArt").src = "data:image/png;base64," + window.btoa(base64String)
        document.getElementById("nArtist").innerHTML = tags.artist
        document.getElementById("nTitle").innerHTML = tags.title
    },
        {tags: ["artist", "title", "picture"]}
    );

    console.log(playlist)
}

function updateCoords(lati, long) { // This updates the 'lon' and 'lat' variables to the users current position (HTTPS only)
    if (lati == null && long == null) {
        navigator.geolocation.getCurrentPosition((position) => {
            lon = position.coords.longitude
            lat = position.coords.latitude
            setupLGA()
        }, function(error) {
            alert("Location services not available") 
        })
    } else {
        lat = lati
        lon = long
        setupLGA()
    }
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

function dropPin(lat,lon,msg) {
    popup
        .setLatLng([lat,lon])
        .setContent(msg)
        .openOn(map)
}

async function onMapClick(e) {
    updateCoords(e.latlng.lat, e.latlng.lng)
}

// ---- Variables ---- //

const player = document.getElementById('player') // This is the music player
var current = 0 // This is the current song in the playlist variable
var musicFiles = JSON.parse(document.getElementById('data').textContent) // This is a Javascript Object with the music file directory 
var ID3 = window.ID3
var map
var marker

var location1, playlist
// var lon = 153.066666, lat = -26.650000 // Declares longitude and latitude variables with default coordinates in Sunshine Coast
var lon = 153.025131, lat = -27.469770 // Declares longitude and latitude variables with default coordinates in Brisbane

var LGAdata = getRequest('https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-australia-local-government-area@public/records?where=ste_name%20%3D%20%27Queensland%27&limit=100')
var LGAs = {}

// ---- Listeners ---- //

player.addEventListener('ended', function() { // This plays the next song once the current song ends
    nextSong()
})

// ---- Script ---- //

LGAdata.then((data) => {
    console.log(data)
    for (i in data.results) { // This for loop saves all the polygon data under the LGA name
        LGAs[data.results[i].lga_name] = data.results[i].geo_shape.geometry.coordinates 
    }

    navigator.geolocation.getCurrentPosition((position) => { // This gets the current coordinates of the user and sets to 'lon' and 'lat' (HTTPS only)
        lon = position.coords.longitude
        lat = position.coords.latitude

        setupLGA()
    }, function(error) {
        setupLGA()
    }) 
})