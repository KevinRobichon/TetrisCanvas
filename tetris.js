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
    this.block = new Block(this.scene.w /2 - 2);

    this.caseSize = 20;
    this.fallTime = 300;
    this.borderColor = randomHexColor();
}

Tetris.prototype.process = function() {
    var now = Date.now();
    var diff = now - this.referenceTime;

    while (diff >= this.fallTime) {
        this.fall();
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

Tetris.prototype.canTranslate = function(direction) {
    var canTranslate = true;
    var $this = this;
    this.block.iterate(function(x, y) {
        var rx = x + $this.block.x;
        var ry = y + $this.block.y;
        var nrx = rx + direction;
        if (nrx < 0 || nrx >= $this.scene.w)
            canTranslate = false;
        else if (ry >= 0 && $this.scene.scene[nrx][ry][0] == 1)
            canTranslate = false;
    });
    return canTranslate;
}

Tetris.prototype.canFall = function() {
    var canFall = true;
    var $this = this;
    this.block.iterate(function(x, y) {
        var rx = x + $this.block.x;
        var ry = y + $this.block.y;
        if ((ry + 1) >= $this.scene.h ||
            (ry >= 0 && $this.scene.scene[rx][ry + 1][0] == 1))
            canFall = false;
    });
    return canFall;
}

Tetris.prototype.isStuck = function() {
    return !this.canTranslate(0);
}

Tetris.prototype.goLeft = function() {
    this.go(-1);
}

Tetris.prototype.goRight = function() {
    this.go(1);
}

Tetris.prototype.go = function(direction) {
    if (this.canTranslate(direction))
        this.block.x += direction;
}

Tetris.prototype.fall = function() {
    var $this = this;
    if (this.canFall())
        this.block.y++;
    else {
        this.block.iterate(function(x, y) {
            var rx = x + $this.block.x;
            var ry = y + $this.block.y;
            $this.scene.scene[rx][ry] = [1, $this.block.color];
        });
        this.scene.lines();
        this.block.renew();
    }
}

Tetris.prototype.rotate = function() {
    this.block.next();
    if (this.isStuck()) {
        this.block.prev();
    }
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

Tetris.prototype.reset = function() {
    this.scene.reset();
    this.block.renew();
}

