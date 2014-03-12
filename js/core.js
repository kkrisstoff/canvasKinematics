
function addEvents (obj) {
    var elem = obj.el
    elem.addEventListener('touchstart', function (e) {
        touchStart(e);
    }, false);

    elem.addEventListener('touchmove', function (e) {
        touchMove(e);
    }, false);

    elem.addEventListener('touchend', function(e) {
        touchEnd(e);
    }, false);

    function touchStart(e) {
        elem.classList.add('touched');
        var touchobj = e.changedTouches[0],
            startx = parseInt(touchobj.clientX),
            starty = parseInt(touchobj.clientY),
            x0 = +(elem.style.left.split('px')[0]),
            y0 = +(elem.style.top.split('px')[0]),
            dx =  startx - x0,
            dy =  starty - y0;
        obj.dx = +dx;
        obj.dy = +dy;
    };

    function touchMove(e) {
        var x = e.changedTouches[0].pageX,
            y = e.changedTouches[0].pageY;
            dx = obj.dx,
            dy = obj.dy;

        //var translate =  'translate(' + (x + dx) + 'px, ' + (y + dx) + 'px)';
        elem.style.left = x - dx + 'px'; //  'transform(' + (x + dx) + 'px, ' + (y + dy) + 'px);';
        elem.style.top = y  - dy + 'px';
        //ball.style.transform = translate;
        //ball.style.webkitTransform = translate;
    };

    function touchEnd(e) {
        elem.classList.remove('touched');
    }
}

function AddNewItem(o) {
    var elem = this,
        types = ['ball', 'square'],
        type = (types.indexOf(o.type) > 0) ? o.type : 'ball',
        itemClass = 't_item ' + type;

    var cont = document.getElementById('container'),
        el = document.createElement('div');
    el.className = itemClass;
    cont.appendChild(el);
    elem.el = el;

    /*var br = elem.el.getBoundingClientRect();
    elem.x0 = br.top;
    elem.y0 = br.left;*/

    return elem;
}

