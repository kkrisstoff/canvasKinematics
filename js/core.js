function getCoords (el) {
    var ballRect = el.getBoundingClientRect(),
        coords = {},
        r = ballRect.right,
        l = ballRect.left,
        t = ballRect.top,
        b = ballRect.bottom;

    coords.o = {
        x: (r + l)/2,
        y: (t + b)/2
    };

    coords.leftUp = {
        x: l,
        y: t
    };
    return el.coords = coords;
}

function addEvents (obj) {
    obj.addEventListener('touchstart', function (e) {
        touchStart(e);
    }, false);

    obj.addEventListener('touchmove', function (e) {
        touchMove(e);
    }, false);

    obj.addEventListener('touchend', function(e) {
        touchEnd(e);
    }, false);

    function touchStart(e) {
        obj.classList.add('touched');

        var touchobj = e.changedTouches[0],
            startx = parseInt(touchobj.clientX),
            starty = parseInt(touchobj.clientY);
        console.log(touchobj    );
        console.log('Status: touchstart ClientX: ' + startx + 'px');
        console.log('Status: touchstart ClientY: ' + starty + 'px');
        var x0 = +(obj.style.left.split('px')[0]),
            y0 = +(obj.style.top.split('px')[0]);
        var dx = x0 - startx,
            dy = x0 - starty;
        obj.coords.dx = dx;
        obj.coords.dy = dy;
        obj.coords.x0 = x0;
        obj.coords.y0 = y0;
    };

    function touchMove(e) {
        var x = event.changedTouches[0].pageX,
            y = event.changedTouches[0].pageY,
            x0 = ball.coords.x0,
            y0 = ball.coords.y0,
            dx = ball.coords.dx,
            dy = ball.coords.dy;
        //console.log(x0, y0);
        console.log(dx, dy, x0, y0);


        var translate =  'translate(' + (x + dx) + 'px, ' + (y + dx) + 'px)';
        obj.style.left = x + dx + 'px'; //  'transform(' + (x + dx) + 'px, ' + (y + dy) + 'px);';
        obj.style.top = y + dy + 'px';
        //ball.style.transform = translate;
        //ball.style.webkitTransform = translate;
    };

    function touchEnd(e) {
        obj.classList.remove('touched');
    }
}

function AddNewItem(o) {
    var elem = this,
        types = ['ball', 'square'],
        type = o.type || 'ball',
        itemClass = 't_item ' + type;

    var cont = document.getElementById('container'),
        el = document.createElement('div');
    el.className = itemClass;

    cont.appendChild(el);

    elem.el = el;
    var br = elem.el.getBoundingClientRect();
    elem.x0 = br.top;
    elem.y0 = br.left;

    return elem;
}


/*
getCoords(el);
if (!el.coords){
    console.log('this element doesn\'t have coordinates');
    return false;
}
el.style.left = el.coords.leftUp.x + 'px';
el.style.top = el.coords.leftUp.y + 'px';


addEvents(el);*/
