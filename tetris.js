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
    this.block = new Block();
    this.block.x = this.scene.w /2 - 2;
    this.block.y = -4

    this.caseSize = 20;
    this.fallTime = 100;
    this.borderColor = randomHexColor();
}

Tetris.prototype.process = function() {
    var now = Date.now();
    var diff = now - this.referenceTime;
    var $this = this;

    while (diff >= this.fallTime) {
        var canFall = true;
        this.block.iterate(function(x, y) {
            var rx = x + $this.block.x;
            var ry = y + $this.block.y;
            if ((ry + 1) >= $this.scene.h ||
                (ry >= 0 && $this.scene.scene[rx][ry + 1][0] == 1))
                canFall = false;
        });
        if (canFall)
            this.block.y++;
        else {
            this.block.iterate(function(x, y) {
                var rx = x + $this.block.x;
                var ry = y + $this.block.y;
                $this.scene.scene[rx][ry] = [1, $this.block.color];
            });
            this.block.renew();
            this.block.x = this.scene.w /2 - 2;
            this.block.y = -4
        }
        diff -= this.fallTime;
    }
    this.referenceTime = now - diff;
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
    this.block.render(this.ctx, startX, startY, this.caseSize);
}

Tetris.prototype.iteration = function() {
    this.process();
    this.render();
}

Tetris.prototype.run = function(fps) {
    var $this = this;
    this.referenceTime = Date.now();

    setInterval(function() {
        $this.iteration();
    }, 1000 / fps);
}

