var Scene = function(width, height) {
    this.w = width;
    this.h = height;
    this.scene = new Array();

    for (var i = 0; i < this.w; ++i) {
        this.scene.push(new Array());
        for (var j = 0; j < this.h; ++j) {
            this.scene.slice(-1)[0].push([0, '#000']);
        }
    }
}

Scene.prototype.reset = function() {
    for (var i = 0; i < this.w; ++i) {
        for (var j = 0; j < this.h; ++j) {
            this.scene[i][j] = [0, '#000'];
        }
    }
}

Scene.prototype.render = function(ctx, startX, startY, caseSize) {
    for (var i = 0; i < this.w; ++i) {
        for (var j = 0; j < this.h; ++j) {
            ctx.fillStyle = this.scene[i][j][1];
            ctx.fillRect(startX + i * caseSize, startY + j * caseSize, caseSize, caseSize);
        }
    }
}

Scene.prototype.lines = function() {
    for (var i = this.h - 1; i >= 0; --i) {
        var j = 0;
        for (; j < this.w && this.scene[j][i][0] == 1; ++j);
        if (j == this.w) {
            for (var k = i; k > 0; --k) {
                for (var l = 0; l < this.w; ++l)
                    this.scene[l][k] = this.scene[l][k - 1];
            }
            for (var l = 0; l < this.w; ++l)
                this.scene[l][0] = [0, '#000'];
            ++i;
        }
    }
}

