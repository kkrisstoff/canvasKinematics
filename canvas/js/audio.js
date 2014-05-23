/**
 * Web Audio API.
 */
/**
 * @class Sound
 */
function Sound() {
    this.context = null;
    this.bufferList = [];

    this.initialize();
}
Sound.prototype.initialize = function () {
    var ctx;

    try {
        //prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        ctx = new AudioContext();
    }
    catch(e) {
        console.error('Web Audio API is not supported in this browser');
        return false;
    }
    this.context = ctx;
};
Sound.prototype.load = function(urlList/*, callback*/) {
    /*if (callback && typeof callback == 'function'){
        this.onLoad = callback
    }*/
    /* type of arguments:
     * ['str', 'str', 'str']
     * {'key': 'str', 'key': 'str', 'key': 'str'}
     * */
    if ((arguments.length == 2 && typeof arguments[1] != 'function') || arguments.length > 2) {
        console.error("you try to download wrong URL");
        return false;
    }
    for(var i in urlList){
        if (urlList.hasOwnProperty(i)) {
            console.log(urlList[i], i);
            this.loadBuffer(urlList[i], i);
        }
    }
};
Sound.prototype.play = function () {
    var ctx = this.context,
        source = ctx.createBufferSource();
    source.buffer = this.bufferList[0];
    source.connect(ctx.destination);
    source.start(0);
};
Sound.prototype.loadBuffer = function (url, i) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;
    request.onload = function() {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            request.response,
            success,
            error
        );
        function success(buffer) {
            if (!buffer) {
                console.error('error decoding file data: ' + url);
                return false;
            }
            loader.bufferList.push(buffer);
            //if (++loader.loadCount == loader.urlList.length) loader.onLoad(loader.bufferList);
        }
        function error(error) {
            console.error('decodeAudioData error', error);
        }
    };
    request.onerror = function() {
        console.error('BufferLoader: XHR error');
    };

    request.send();
};


/*
var context;
var bangBuffer = null;
window.addEventListener('load', init, false);
function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();
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
        context.decodeAudioData(request.response, function(buffer) {
            bangBuffer = buffer;
        }, onError);
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
*/
