var ball = document.getElementById('ball');
getCoords(ball);
styling(ball);

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

function styling (el) {
    if (!el.coords){
        console.log('this element doesn\'t have coordinates');
        return false;
    }
    el.style.left = el.coords.leftUp.x + 'px';
    el.style.top = el.coords.leftUp.y + 'px';

    console.log(el.style.top);
}

ball.addEventListener('touchstart', function (e) {
    ball.classList.add('touched');

    var touchobj = e.changedTouches[0],
        startx = parseInt(touchobj.clientX),
        starty = parseInt(touchobj.clientY);
    console.log('Status: touchstart ClientX: ' + startx + 'px');
    console.log('Status: touchstart ClientY: ' + starty + 'px');
    var x0 = +(ball.style.left.split('px')[0]),
        y0 = +(ball.style.top.split('px')[0]);
    var dx = startx,
        dy = starty;
    ball.coords.dx = dx;
    ball.coords.dy = dy;
    ball.coords.x0 = x0;
    ball.coords.y0 = y0;
}, false);

ball.addEventListener('touchmove', function (event) {
    var x = event.changedTouches[0].pageX,
        y = event.changedTouches[0].pageY,
        x0 = ball.coords.x0,
        y0 = ball.coords.y0,
        dx = ball.coords.dx,
        dy = ball.coords.dy;
    //console.log(x0, y0);
    console.log(x, y);


    var translate =  'translate(' + (x + dx) + 'px, ' + (y + dx) + 'px)';
    //ball.style.left = x + dx + 'px'; //  'transform(' + (x + dx) + 'px, ' + (y + dy) + 'px);';
    ball.style.transform = translate;
    ball.style.webkitTransform = translate;
    //ball.style.top = y + dy + 'px';

}, false);

ball.addEventListener('touchend', function(event) {
    ball.classList.remove('touched');
}, false);
