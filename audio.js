var context;

window.addEventListener('load', init, false);

function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
}

function play() {
    loadMusic('./sounds/jap.mp3');
}

function onError(err) {
    console.log("Error: ", err);
}

function loadMusic(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            console.log("buffer: ", buffer.length);
            playMusic(buffer);
        }, onError);
    }
    request.send();
}

function playMusic(buffer) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
}
