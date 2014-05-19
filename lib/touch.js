function eTouch (obj, options) {
    var self = this,
        el = typeof obj.el == 'object' ? obj.el : document.getElementById(obj.el);

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
        el.classList.add('touched');
        //console.log(e);
        if (typeof obj['touchstart'] == 'function'){
            obj['touchstart'].call(obj);
        }
    }

    function touchMove(e) {
        el.classList.add('moving');
        var x = e.changedTouches[0].pageX,
            y = e.changedTouches[0].pageY;
        console.log("element are moving! x:", x, " y:", y);
    }

    function touchEnd(e) {
        el.classList.remove('touched');
        el.classList.remove('moving');

        if (typeof obj['touchstart'] == 'function'){
            obj['touchstart'].call(obj);
        }
    }


}
