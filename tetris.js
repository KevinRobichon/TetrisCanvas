var Tetris = function(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
}

Tetris.prototype.frame = function() {

}

Tetris.prototype.run = function(fps) {
    var $this = this;

    setInterval(function() {
        $this.frame();
    }, 1000 / fps);
}

