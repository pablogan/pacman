window.onload = function() {
    var game = new Game('canvas');
    

    game.start();


    document.onkeydown = function(event) {
        game.onKeyEvent(event);
    }

    document.onkeyup = function(event) {
        game.onKeyEvent(event);
    }

    document.onkeyleft = function(event) {
        game.onKeyEvent(event);
    }

    document.onkeyright = function(event) {
        game.onKeyEvent(event);
    }
}