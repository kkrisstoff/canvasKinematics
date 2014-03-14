
function addEvents (o) {
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

        console.log(obj.grav);
    };

    function touchMove(e) {
        var x = e.changedTouches[0].pageX,
            y = e.changedTouches[0].pageY,
            x0 = obj.loc.x0,
            y0 = obj.loc.y0,
            tx =  obj.loc.tx,
            ty = obj.grav ? 0 : obj.loc.ty;
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
            elem.style.webkitTransform = "translate(" + obj.loc.tx + "px, 0)";
        }
        elem.classList.remove('touched');
    };

    obj.gravity = function (flag) {
        function g (flag) {
            this.grav = !!flag;
        }
        g.call(obj, flag)
    }
    return obj;
}

function AddNewItem(o) {
    var elem = this,
        types = ['ball', 'square'],
        type = (types.indexOf(o.type) > 0) ? o.type : 'ball',
        itemClass = 't_item ' + type;

    var cont = document.getElementById('container'),
        el = document.createElement('div');
    el.className = itemClass;
    cont.appendChild(el);
    elem.el = el;

    return elem;
}

