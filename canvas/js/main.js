var canvas;
var ctx;

canvasSettings();
function canvasSettings () {
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    this.canvas = canvas;
    this.ctx = ctx;
}

function createCircle (x, r, c){
    function degToRad (x){
        return Math.PI*x/180;
    }
    console.log(canvas, this.canvas );
    return {
        x: x,
        y: canvas.height - r,
        r: r,
        arc: degToRad(360),
        color: c
    };
}

function drawCircle (obj){
    var ctx = this.ctx,
        x = obj.x,
        y = obj.y,
        r = obj.r,
        arc = obj.arc,
        color = obj.color;

    var grad;
    grad = ctx.createRadialGradient(250, 250, 5, 250, 250, 300);
    grad.addColorStop(0, color);
    grad.addColorStop(1, '000');

    ctx.strokeStyle = grad;
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, arc, true);
    ctx.fill();
    ctx.stroke();
}

var c1 = createCircle(150, 15, '836FFF');
drawCircle(c1);

