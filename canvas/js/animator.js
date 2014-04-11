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
};

Animator.prototype.move = function () {
    var self = this,
        ctx = this.ctx,
        objs = this.objects;

    console.log(this.objects);

    for (var i=0, l=objs.length; i < l; i +=1) {
        moveStart(objs[i]);
    }

    function moveStart (o) {
        var v = o.getVelocity();

        action();

        function action () {
            o.clean(f.ctx);
            o.move();
            o.draw(f.ctx);
            if (!isInBoxV(o)) {
                v = o.getVelocity();
                o.setVelocity(-o.vX, o.vY);
            } else if (!isInBoxH(o)) {
                v = o.getVelocity();
                o.setVelocity(o.vX, -o.vY);
            }
            raf = window.requestAnimationFrame(function () {
                action()
            });
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



Animator.prototype.stop = function () {

};
Animator.prototype.addObj = function (o) {
    this.objects.push(o)
};
Animator.prototype.removeObj = function (o) {

};
