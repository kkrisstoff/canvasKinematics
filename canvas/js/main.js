/** Constructor for Game Field */
function Field(id) {
    var canvasId = id || 'canvas';
    this.initialize.call(this, canvasId);

    return this;
}
Field.prototype.initialize = function (id) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    var rect = canvas.getBoundingClientRect();
    this.ctx = ctx;
    this.x0 = rect.left;
    this.y0 = rect.top;
    this.width = rect.width;
    this.height = rect.height;

    this.el = document.getElementById(id);
};
Field.prototype.clean = function () {
    this.ctx.clearRect(0, 0, this.width, this.height)
};

/** Constructor for Game Ball Item */
function Ball (obj) {
    this.x = obj.x || 0;
    this.y = obj.y || 0;
    this.r = obj.r || 0;
    this.vX = obj.vY || 0;
    this.vY = obj.vX || 0;
    this.color = obj.color || '666';

    return this;
}
Ball.prototype.draw = function (ctx){
    var arc = degToRad(360);

    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, arc, true);
    ctx.fill();
    ctx.stroke();

    function degToRad (x){
        return Math.PI*x/180;
    }
};
Ball.prototype.clean = function (ctx) {
    var x0 = this.x - this.r - 1,
        y0 = this.y - this.r - 1,
        d = 2*this.r + 2;

    ctx.clearRect(x0, y0, d, d)
};
Ball.prototype.move = function (){
    this.x += this.vX;
    this.y += this.vY;
};
Ball.prototype.setVelocity = function (vx, vy) {
    this.vX = vx;
    this.vY = vy;
};
Ball.prototype.getVelocity = function () {
    var vx = this.vX;
    var vy = this.vY;
    return {
        vX: vx,
        vY: vy
    }
};





/*function Factory(){
    this.ctx = '';
}
Factory.prototype.createBall = function(x, y){
    return new Ball(x, y, this.ctx);
}*/

