function ObserverList (){
    this.list = [];
}

ObserverList.prototype.add = function (id) {
    this.list.push(id);
};
ObserverList.prototype.count = function(){
    return this.list.length;
};
ObserverList.prototype.remove = function (id) {
    var i = 0,
        l = this.list.length;
    for (i; i<l; i+=1) {
        if (this.list[i] = id){
            this.list.splice( i, 1 );
        }
    }
};
ObserverList.prototype.get = function( index ){
    if( index > -1 && index < this.list.length ){
        return this.list[ index ];
    }
};
ObserverList.prototype.indexOf = function( obj, startIndex ){
    var i = startIndex;

    while( i < this.list.length ){
        if( this.list[i] === obj ){
            return i;
        }
        i++;
    }

    return -1;
};
ObserverList.prototype.removeAt = function( index ){
    this.list.splice( index, 1 );
};

function Subject(){
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function( observer ){
    this.observers.add( observer );
};

Subject.prototype.removeObserver = function( observer ){
    this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};

Subject.prototype.notify = function( context ){
    var observerCount = this.observers.count();
    for(var i=0; i < observerCount; i++){
        this.observers.get(i).update(context);
    }
};

// The Observer
function Observer(){
    this.update = function(ctx){
        console.log(ctx);
    };
}