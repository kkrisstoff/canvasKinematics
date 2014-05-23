var field = new GameField('container');

var ball = new  GameItem({field: field, type: 'ball', x0: 150, y0: 130});

var ball1 = new  GameItem({field: field, type: 'ball', x0: 100, y0: 300});

var ball2 = new  GameItem({field: field, type: 'ball', x0: 200, y0: 200});

/*var sqr = new GameField({type: 'square'});
sqr.setGravity(true);*/










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