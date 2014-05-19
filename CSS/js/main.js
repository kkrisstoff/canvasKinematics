initCont('container');

var ball = new  AddNewItem({type: 'ball', x0: 150, y0: 130});
eTouch(ball.el);

var ball1 = new  AddNewItem({type: 'ball', x0: 100, y0: 300});
eTouch(ball1.el);

var ball2 = new  AddNewItem({type: 'ball', x0: 200, y0: 200});
eTouch(ball2.el);

/*var sqr = new AddNewItem({type: 'square'});
sqr.gravity(true);*/

/** Example */
/* Extend an object with an extension */
function extend( extension, obj ){
    for ( var key in extension ){
        obj[key] = extension[key];
    }
}
// References to our DOM elements
var controlCheckbox = document.getElementById( "mainCheckbox" ),
    addBtn = document.getElementById( "addNewObserver" ),
    container = document.getElementById( "observersContainer" );
// Concrete Subject
// Extend the controlling checkbox with the Subject class
extend( new Subject(), controlCheckbox );
// Clicking the checkbox will trigger notifications to its observers
controlCheckbox.onclick = function(){
    controlCheckbox.notify( controlCheckbox.checked );
};
addBtn.onclick = addNewObserver;
// Concrete Observer
function addNewObserver(){
    // Create a new checkbox to be added
    var check  = document.createElement( "input" );
    check.type = "checkbox";
    // Extend the checkbox with the Observer class
    extend( new Observer(), check );
    // Override with custom update behaviour
    check.update = function( value ){
        this.checked = value;
    };
    // Add the new observer to our list of observers
    // for our main subject
    controlCheckbox.addObserver( check );
    // Append the item to the container
    container.appendChild( check );
}
/** end */