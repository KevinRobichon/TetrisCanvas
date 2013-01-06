var Block = function() {
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
                frame.slice(-1)[0].push(parseInt(cur[i][k * 4 + j]));
            }
        }
        this.currentBlock.push(frame);
    }
    this.x = 0;
    this.y = 0;
    this.color = randomHexColor();
}

Block.prototype.next = function() {
    ++this.currentFrame;
    this.currentFrame %= this.currentBlock.length;
}

Block.prototype.render = function(ctx, startX, startY, caseSize) {
    startX += this.x * caseSize;
    startY += this.y * caseSize;
    ctx.fillStyle = this.color;
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            if (this.currentBlock[this.currentFrame][i][j] == 1)
                ctx.fillRect(startX + i * caseSize, startY + j * caseSize, caseSize, caseSize);
        }
    }
}

