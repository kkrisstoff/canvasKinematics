function eTouch (obj, options) {
    var self = this,
        el = typeof obj.el == 'object' ? obj.el : document.getElementById(obj.el);
    console.log(el);
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
        //el.classList.add('touched');

        if (typeof obj['touchStart'] == 'function'){
            obj['touchStart'].call(obj, e);
        }
    }

    function touchMove(e) {
        //el.classList.add('moving');

        if (typeof obj['touchMove'] == 'function'){
            obj['touchMove'].call(obj, e);
        }
    }

    function touchEnd(e) {
        //el.classList.remove('touched');
        //el.classList.remove('moving');

        if (typeof obj['touchEnd'] == 'function'){
            obj['touchEnd'].call(obj, e);
        }
    }
}
