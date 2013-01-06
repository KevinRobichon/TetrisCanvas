function randomHexColor() {
    var numStr = (Math.random() * (0xFFFFFF + 1) << 0).toString(16);
    numStr = (new Array(7 - numStr.length).join('0')) + numStr;
    return '#' + numStr;
}

window.onload = function() {
    var canvas = document.getElementById('canvas');

    canvas.width = document.width;
    canvas.height = document.height;

    var tetris = new Tetris(canvas);

    //setup events here
    document.onkeydown = function(e) {
        switch(e.keyIdentifier) {
        case 'Left':
            e.preventDefault();
            tetris.goLeft();
            break;
        case 'Right':
            e.preventDefault();
            tetris.goRight();
            break;
        case 'Up':
            e.preventDefault();
            tetris.rotate();
            break;
        default:
            //NOP
        }
    }

    tetris.run(60);
}

