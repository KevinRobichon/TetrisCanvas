if (!CanvasRenderingContext2D.prototype.clear) {
    CanvasRenderingContext2D.prototype.clear = function() {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.restore();
    }
}

var Tetris = function(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.scene = new Scene(10, 20);

    this.caseSize = 20;
    this.borderColor = randomHexColor();
}

Tetris.prototype.render = function() {
    var borderSize = this.caseSize / 3;
    var totalWidth = this.scene.w * this.caseSize + borderSize * 2;
    var totalHeight = this.scene.h * this.caseSize + borderSize * 2;
    var startX = (this.canvas.width / 2) - (totalWidth / 2);
    var startY = (this.canvas.height / 2) - (totalHeight / 2);

    this.ctx.clear();

    this.ctx.fillStyle = this.borderColor;
    this.ctx.fillRect(startX, startY, totalWidth, totalHeight);

    startX += borderSize;
    startY += borderSize;
    totalWidth -= 2 * borderSize;
    totalHeight -= 2 * borderSize;
    this.ctx.fillStyle = '#FFF';
    this.ctx.fillRect(startX, startY, totalWidth, totalHeight);

    this.scene.render(this.ctx, startX, startY, this.caseSize);
}

Tetris.prototype.frame = function() {
    this.render();
}

Tetris.prototype.run = function(fps) {
    var $this = this;

    setInterval(function() {
        $this.frame();
    }, 1000 / fps);
}

