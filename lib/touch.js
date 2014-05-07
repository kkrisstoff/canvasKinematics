function eTouch (elem, options) {
    var self = this,
        el = typeof elem == 'object' ? elem : doc.getElementById(elem);

    // Default options
    self.options = { };
    // User defined options
    for (i in options) self.options[i] = options[i];

    el.addEventListener('touchstart', function (e) {
        touchStart(e);
    }, false);

    el.addEventListener('touchmove', function (e) {
        touchMove(e);
    }, false);

    el.addEventListener('touchend', function(e) {
        touchEnd(e);
    }, false);

    function touchStart(e) {
        elem.classList.add('touched');
        //console.log(e);
        console.log("touch started");
        if (options.start && typeof options.start === "function") {
            options.start();
        }
    }

    function touchMove(e) {
        elem.classList.add('moving');
        var x = e.changedTouches[0].pageX,
            y = e.changedTouches[0].pageY;
        console.log("element are moving! x:", x, " y:", y);
    }

    function touchEnd(e) {
        elem.classList.remove('touched');
        elem.classList.remove('moving');

        console.log("touch ended");
    }
}
