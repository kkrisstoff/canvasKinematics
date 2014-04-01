(function () {
    var core = this,
        container = {};

    core.initCont = function (id) {
        var id = id || 'container',
            contEl = document.getElementById(id);

        var contRect = contEl.getBoundingClientRect(),
            r = contRect.right,
            l = contRect.left,
            t = contRect.top,
            b = contRect.bottom;

        console.log(contRect);
        container.floor = b;
        this.addTouchEvents(contEl);
        return this;
    };

    core.addEvents = function (o) {
        var obj = o,
            elem = obj.el;
        obj.loc = obj.loc || {};
        // (x0, y0) touch coords
        // (tx, ty) transform coords
        // (dx. dy) transform delta
        elem.addEventListener('touchstart', function (e) {
            touchStart(e);
        }, false);

        elem.addEventListener('touchmove', function (e) {
            touchMove(e);
        }, false);

        elem.addEventListener('touchend', function(e) {
            touchEnd(e);
        }, false);

        function touchStart(e) {
            elem.classList.add('touched');
            elem.style.webkitTransition = "-webkit-transform 0";
            var touchobj = e.changedTouches[0],
                startx = parseInt(touchobj.clientX),
                starty = parseInt(touchobj.clientY);
            obj.loc.x0 = +startx;
            obj.loc.y0 = +starty;

            obj.loc.tx = obj.loc.tx || 0;
            obj.loc.ty = obj.loc.ty || 0;

            console.log(!!obj.grav);
            console.log(container.floor);
        };

        function touchMove(e) {
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
        };

        function touchEnd(e) {
            obj.loc.tx = obj.loc.zx;
            obj.loc.ty = obj.loc.zy;
            if (obj.grav){
                elem.style.webkitTransition = "-webkit-transform 1s";
                elem.style.webkitTransform = "translate(" + obj.loc.tx + "px, " + (container.floor - 56) + "px)";
            }
            elem.classList.remove('touched');
        };

        return obj;
    };

    core.AddNewItem = function (o) {
        var elem = this,
            types = ['ball', 'square'],
            type = (types.indexOf(o.type) > 0) ? o.type : 'ball',
            itemClass = 't_item ' + type,
            x = o.x0,
            y = o.y0,
            translate = "translate3D(" +  (x - 50) + "px, " + (y - 50)  + "px, 0)";


        var cont = document.getElementById('container'),
            el = document.createElement('div');
        el.className = itemClass;
        cont.appendChild(el);
        el.style.webkitTransform = translate;
        elem.el = el;
        elem.gravity = function (flag) {
            this.grav = !!flag;
        };
        addEvents(elem);
        return elem;
    };

    this.addTouchEvents = function (el) {
        var screen = el;
        var timer;
        var isGravity = true;
        screen.addEventListener('touchstart', function (e) {
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
                item = new AddNewItem(opt);
                item.gravity(isGravity);
                clearTimeout(timer);
            }, 500)
        }, false);
        screen.addEventListener('touchmove', function () {
            console.log('touchmove');
            isGravity = false;
        }, false);
        screen.addEventListener('touchend', function() {
            clearTimeout(timer);
        }, false);
    };

    return core;
})();

