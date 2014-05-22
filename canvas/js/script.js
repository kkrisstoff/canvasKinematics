var gameField = new Field('canvas');

var c = new Ball({
    r: 15,
    color: '836FFF',
    x: 150, y:300,
    ctx: null
});
c.draw(gameField.ctx);
//c.setVelocity(5, 4);

var c1 = new Ball({
    r: 20,
    color: '836333',
    x: 80, y:250
});
c1.draw(gameField.ctx);
//c1.setVelocity(4, -3);

var c2 = new Ball({
    r: 25,
    color: 'ab45ab',
    x: 50, y:350
});
c2.draw(gameField.ctx);
//c2.setVelocity(-3, 3);

var c3 = new Ball({
    r: 30,
    color: 'fc0033',
    x: 100, y:300
});
c3.draw(gameField.ctx);
//c3.setVelocity(2, -3);

var c4 = new Ball({
    r: 35,
    color: 'f0f033',
    x: 120, y:100
});
c4.draw(gameField.ctx);
//c4.setVelocity(-2, -1);

var animation = new Animator(gameField);
animation.addObj(c);
animation.addObj(c1);
animation.addObj(c2);
animation.addObj(c3);
animation.addObj(c4);
animation.start();


/** Observer */
/* create the Subject */
var options = {};
console.log(gameField);
eTouch(gameField, options);

/* register game field as a Subject */
extend(new Subject(), gameField);
gameField.touchstart = function (e) {
    var point = {};
    point.x = e.changedTouches[0].pageX - gameField.x0;
    point.y = e.changedTouches[0].pageY - gameField.y0;

    gameField.notify(point);
};


/* register ball as a Observer */
regBallObserver(c);
regBallObserver(c1);
regBallObserver(c2);
regBallObserver(c3);
regBallObserver(c4);

function regBallObserver(c) {
    extend(new Observer(), c)
    // Override with custom update behaviour
    c.update = function(p){
        //animation.addObj(c);
        checkIsBallTapped(p, c);
    };
    gameField.addObserver(c);
}

function checkIsBallTapped(point, obj) {
    var x1 = point.x,
        x2 = obj.x,
        y1 = point.y,
        y2 = obj.y,
        rad = obj.r,
        delta = Math.sqrt((x1-x2)*(x1-x2) + (y1 - y2)*(y1 - y2));
    /*console.log(obj);
    console.log(point, rad);*/
    if (delta < rad) {
        getIt(obj);
    }

    function getIt(o) {
        console.log("GET IT!!!");
        var vx = Math.floor((Math.random() * 5)),
            vy = Math.floor((Math.random() * 5));
        if (o.isMoveing) {
            o.setVelocity(0, 0);
            o.isMoveing = false;
        } else {
            o.setVelocity(vx, vy);
            o.isMoveing = true;
        }

    }
}

function extend( extension, obj ){
    for ( var key in extension ){
        obj[key] = extension[key];
    }
}
