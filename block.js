var Block = function(startX) {
    this.sx = startX;
    this.blocks = [
        [
            '0000' +
            '0000' +
            '0100' +
            '1110'
            ,
            '0000' +
            '1000' +
            '1100' +
            '1000'
            ,
            '0000' +
            '0000' +
            '1110' +
            '0100'
            ,
            '0000' +
            '0010' +
            '0110' +
            '0010'
        ]
    ];
    this.renew();
}

Block.prototype.renew = function() {
    this.currentFrame = 0;
    var cur = this.blocks[0];
    this.currentBlock = new Array();
    for (var i = 0; i < cur.length; ++i) {
        var frame = new Array();
        for (var j = 0; j < 4; ++j) {
            frame.push(new Array());
            for (var k = 0; k < 4; ++k) {
                frame.slice(-1)[0].push(cur[i][k * 4 + j]);
            }
        }
        this.currentBlock.push(frame);
    }
    this.x = this.sx;
    this.y = -4;
    this.color = randomHexColor();
}

Block.prototype.next = function() {
    ++this.currentFrame;
    this.currentFrame %= this.currentBlock.length;
}

Block.prototype.prev = function() {
    --this.currentFrame;
    this.currentFrame += this.currentBlock.length;
    this.currentFrame %= this.currentBlock.length;
}

Block.prototype.iterate = function(callback) {
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            if (this.currentBlock[this.currentFrame][i][j] == '1')
                callback(i, j);
        }
    }
}

Block.prototype.render = function(ctx, startX, startY, caseSize) {
    var absStartY = startY;
    startX += this.x * caseSize;
    startY += this.y * caseSize;
    ctx.fillStyle = this.color;
    this.iterate(function(x, y) {
        if ((startY + y * caseSize) >= absStartY)
            ctx.fillRect(startX + x * caseSize, startY + y * caseSize, caseSize, caseSize);
    });
}

