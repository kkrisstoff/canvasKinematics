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
c.setVelocity(5, 4);
//move(c);

var c1 = new Ball({
    r: 20,
    color: '836333',
    x: 100, y:250
});
c1.draw(f.ctx);
c1.setVelocity(4, -3);
//move(c1);

var c2 = new Ball({
    r: 25,
    color: 'ab45ab',
    x: 50, y:350
});
c2.draw(f.ctx);
c2.setVelocity(-3, 3);
//move(c2);

var c3 = new Ball({
    r: 30,
    color: 'fc0033',
    x: 100, y:300
});
c3.draw(f.ctx);
c3.setVelocity(2, -3);
//move(c2);

var c4 = new Ball({
    r: 35,
    color: 'f0f033',
    x: 150, y:100
});
c4.draw(f.ctx);
c4.setVelocity(-2, -1);
//move(c2);

var animation = new Animator(f);
animation.addObj(c);
animation.addObj(c1);
animation.addObj(c2);
animation.addObj(c3);
animation.addObj(c4);
animation.start();
