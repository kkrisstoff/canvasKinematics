var f = new Field('canvas');
var raf = null;
console.log(f);

var c = new Ball({
    r: 15,
    color: '836FFF',
    x: 150, y:300,
    ctx: null
});
c.draw(f.ctx);
c.setVelocity(2, 4);
move(c);

var c1 = new Ball({
    r: 30,
    color: '836333',
    x: 100, y:250
});
c1.draw(f.ctx);
c1.setVelocity(5, -3);
move(c1);

var c2 = new Ball({
    r: 20,
    color: 'fcfc33',
    x: 50, y:350
});
c2.draw(f.ctx);
c2.setVelocity(-2, 3);
move(c2);


function move (o) {
    console.log(o);
    var left = 0 + o.r,
        right = f.width - o.r,
        top = 0 + o.r,
        bottom = f.height - o.r,
        v;
    action();

    function action () {
        o.clean(f.ctx);
        o.move();
        o.draw(f.ctx);
        if (!isInBoxV()) {
            v = o.getVelocity();
            o.setVelocity(-o.vX, o.vY);
        } else if (!isInBoxH()) {
            v = o.getVelocity();
            o.setVelocity(o.vX, -o.vY);
        }
        raf = window.requestAnimationFrame(function () {
            action()
        });
    }
    function isInBoxV () {
        return o.x > left && o.x < right
    }
    function isInBoxH () {
        return o.y > top && o.y < bottom
    }
}

function stop (o) {
//    o.setVelocity(0, 0);
    window.cancelAnimationFrame(raf);
}
