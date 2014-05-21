initCont('container');

var ball = new  AddNewItem({type: 'ball', x0: 150, y0: 130});
eTouch(ball);

var ball1 = new  AddNewItem({type: 'ball', x0: 100, y0: 300});
eTouch(ball1);

var ball2 = new  AddNewItem({type: 'ball', x0: 200, y0: 200});
eTouch(ball2);

/*var sqr = new AddNewItem({type: 'square'});
sqr.gravity(true);*/










/** Observer Example */
/*function extend( extension, obj ){
    for ( var key in extension ){
        obj[key] = extension[key];
    }
}
var controlCheckbox = document.getElementById( "mainCheckbox" ),
    addBtn = document.getElementById( "addNewObserver" ),
    container = document.getElementById( "observersContainer" );
// Concrete Subject
extend( new Subject(), controlCheckbox );
controlCheckbox.onclick = function(){
    controlCheckbox.notify( controlCheckbox.checked );
};
addBtn.onclick = addNewObserver;
// Concrete Observer
function addNewObserver(){
    var check  = document.createElement( "input" );
    check.type = "checkbox";
    extend( new Observer(), check );
    check.update = function( value ){
        this.checked = value;
    };
    controlCheckbox.addObserver(check);
    container.appendChild(check);
}*/
/** end */