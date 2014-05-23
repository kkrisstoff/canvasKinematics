/**
 * Web Audio API.
 */


var context;
var bangBuffer = null;
window.addEventListener('load', init, false);
function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();
        console.log(context);
    }
    catch(e) {
        console.error('Web Audio API is not supported in this browser');
    }
}

function loadBangSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
        /*if (this.status == 200) {*/
            console.log(this.status, request);

            context.decodeAudioData(request.response, function(buffer) {
                bangBuffer = buffer;
            }, onError);
        /*}*/
    };
    request.send();
}
function onError(e) {
    console.log(e);
}
function playBangSound(buffer) {
    var source = context.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);                           // play the source now
    // note: on older systems, may have to use deprecated noteOn(time);
}

loadBangSound('../storage/punch.mp3');