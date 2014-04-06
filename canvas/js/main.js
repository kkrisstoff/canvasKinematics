(function () {

    // constructor for field
    this.CanvasField = function () {
        if ( !(this instanceof CanvasField) ) {
            return new CanvasField();
        }
        var self = this;

        self.initializeCanvas = function () {
            var canvas = document.getElementById('canvas'),
                ctx = canvas.getContext('2d');
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            self.canvas = canvas;
            self.ctx = ctx;
        };

        self.initializeCanvas();
    };

    // constructor for object
    this.Circle = function (c) {
        if ( !(this instanceof Circle) ) {
            return new Circle(c);
        }
        var self = this;

        var canvas = c.canvas;
        var ctx = c.ctx;

        function degToRad (x){
            return Math.PI*x/180;
        }



        self.drawCircle = function (obj){
            var x = obj.x,
                y = obj.y,
                r = obj.r,
                color = obj.color,
                arc = degToRad(360);

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

        return self;
    };

    return this;
})();
