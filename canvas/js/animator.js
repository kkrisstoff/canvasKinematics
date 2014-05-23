function Animator (field) {
    this.objects = [];
    this.rect = {
        w: 0,
        h: 0
    };

    this.initialize(field);
}
Animator.prototype.initialize = function (f) {
    console.log('animator was initialized');
    this.ctx = f.ctx;

    this.rect.w = f.width;
    this.rect.h = f.height;

    this.clean = function () {
        f.clean();
    }
};

Animator.prototype.move = function () {

};
Animator.prototype.step = function () {
    var self = this,
        objs = this.objects;
    this.clean();

    for (var i=0, l=objs.length; i < l; i +=1) {
        objs[i].move();
        var j = 1;
        for (j; j < (l-i); j+=1){
            checkCollision(objs[i], objs[i+j]);
        }
        checkIsInBox(objs[i]);
        objs[i].draw(self.ctx);
    }
    function checkCollision (o1, o2) {
        //console.log("---");
        //console.log(o1, o2);
        var x1 = o1.x,
            x2 = o2.x,
            y1 = o1.y,
            y2 = o2.y,
            distance = Math.sqrt((x1-x2)*(x1-x2) + (y1 - y2)*(y1 - y2)),
            sumOfRadiuses = (o1.r + o2.r);
        if (distance <= sumOfRadiuses){
            collide(o1, o2);
        }
        function collide(o1, o2) {
            console.log("BANG");
            //TODO: hardcode. Make it as callback;
            sound.play();

            o1.setVelocity(-o1.vX, -o1.vY);
            o2.setVelocity(-o2.vX, -o2.vY);
        }

    }
    function checkIsInBox (o) {
        if (!isInBoxV(o)) {
            o.setVelocity(-o.vX, o.vY);
        } else if (!isInBoxH(o)) {
            o.setVelocity(o.vX, -o.vY);
        }
    }
    function isInBoxV (o) {
        var left = 0 + o.r,
            right = self.rect.w - o.r;
        return o.x > left && o.x < right
    }
    function isInBoxH (o) {
        var top = 0 + o.r,
            bottom = self.rect.h - o.r;
        return o.y > top && o.y < bottom
    }
};
Animator.prototype.start = function () {
    var self = this;
    this.raf = window.requestAnimationFrame(function () {
        self.step();
        self.start();
        //self.stop();
    });
};
Animator.prototype.stop = function () {
    if (this.raf) {
        window.cancelAnimationFrame(this.raf);
    }
};
Animator.prototype.addObj = function (o) {
    this.objects.push(o)
};
Animator.prototype.removeObj = function (o) {

};
