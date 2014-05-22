function GameField(id) {
    var id = id || 'container',
        contEl = document.getElementById(id);

    this.el = contEl;
    this.container = {};
    this.init();
}

GameField.prototype.init = function () {
    var self = this;
    var contRect = this.el.getBoundingClientRect(),
        r = contRect.right,
        l = contRect.left,
        t = contRect.top,
        b = contRect.bottom;

    console.log(contRect);
    this.container.floor = b;
    addTouchEvents();

    function addTouchEvents() {
        var screen = self.el;
        var timer;
        var isGravity = true;

        self.touchStart = function (e) {
            console.log("Field was tapped, context: ", e);
            var item,
                target = e.target,
                x0 = e.touches[0].pageX,
                y0 = e.touches[0].pageY,
                opt = {
                    type: 'ball',
                    x0: x0,
                    y0: y0
                };
            if (target.classList.contains("t_item")) {
                return false;
            }
            isGravity = true;
            timer = setTimeout(function () {
                item = new GameItem(opt);
                item.setGravity(isGravity);
                clearTimeout(timer);
            }, 500)

        };
        self.touchMove = function () {
            isGravity = false;
        };
        self.touchEnd = function () {
            clearTimeout(timer);
            console.log("Field tap was ended, context: ", this);
        };

        eTouch(self);
    }
};

function GameItem(o) {
    // o.type
    // o.x
    // o.y

    this.type = o.type || "ball";
    this.x = o.x0 || 30;
    this.y = o.y0 || 30;

    this.gravity = null;

    this.init();
}
GameItem.prototype.init = function () {
    var types = ['ball', 'square'],
        type = (types.indexOf(this.type) > 0) ? this.type : 'ball',
        itemClass = 't_item ' + type;
    var cont = document.getElementById('container'),
        elem = document.createElement('div');
    var translate = "translate3D(" +  (this.x - 50) + "px, " + (this.y - 50)  + "px, 0)";

    elem.style.webkitTransform = translate;
    elem.className = itemClass;
    cont.appendChild(elem);

    this.el = elem;

    this.addEvents();

};
GameItem.prototype.setGravity = function (flag) {
    this.gravity = !!flag;
};
GameItem.prototype.addEvents = function () {
    var elem = this.el,
        obj = this;

    obj.loc = obj.loc? obj.loc: {tx: obj.x, ty: obj.y};
    console.log(obj.loc);
    // (x0, y0) touch coords
    // (tx, ty) transform coords
    // (dx. dy) transform delta


    this.touchStart = function(e) {
        e.stopPropagation();
        elem.classList.add('touched');
        elem.style.webkitTransition = "-webkit-transform 0";
        var touchobj = e.changedTouches[0],
            startx = parseInt(touchobj.clientX),
            starty = parseInt(touchobj.clientY);
        obj.loc.x0 = +startx;
        obj.loc.y0 = +starty;

        obj.loc.tx = obj.loc.tx || 0;
        obj.loc.ty = obj.loc.ty || 0;

        console.log("Item was tapped !!start");
    };

    this.touchMove = function(e) {
        e.stopPropagation();
        var x = e.changedTouches[0].pageX,
            y = e.changedTouches[0].pageY,
            x0 = obj.loc.x0,
            y0 = obj.loc.y0,
            tx =  obj.loc.tx,
            ty = obj.grav ? container.floor - 50 : obj.loc.ty;
        //elem.style.left = x - dx + 'px';
        //elem.style.top = y  - dy + 'px';

        var dx = x - x0 + tx,
            dy = y - y0 + ty ,
            translate = "translate3D(" +  dx + "px, " + dy  + "px, 0)";
        elem.style.webkitTransform = translate;
        obj.loc.zx = dx;
        obj.loc.zy = dy;
        console.log("Item was tapped !!moveing");
    };

    this.touchEnd = function(e) {
        e.stopPropagation();
        obj.loc.tx = obj.loc.zx;
        obj.loc.ty = obj.loc.zy;
        if (obj.grav){
            elem.style.webkitTransition = "-webkit-transform 1s";
            elem.style.webkitTransform = "translate(" + obj.loc.tx + "px, " + (container.floor - 56) + "px)";
        }
        elem.classList.remove('touched');
        console.log("Item was tapped !!touchend");
    };

    eTouch(this);
};

