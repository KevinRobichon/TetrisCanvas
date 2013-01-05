window.onload = function() {
    var canvas = document.getElementById('canvas');
    canvas.width = document.width;
    canvas.height = document.height;

    var tetris = new Tetris(canvas);

    //setup events here

    tetris.run(60);
}

