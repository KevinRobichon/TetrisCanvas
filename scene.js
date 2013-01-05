var Scene = function(width, height) {
    this.w = width;
    this.h = height;
    this.scene = new Array();

    for (var i = 0; i < this.w; ++i) {
        this.scene.push(new Array());
        for (var j = 0; j < this.h; ++j) {
            this.scene.slice(-1)[0].push(0);
        }
    }
}

Scene.prototype.reset = function() {
    for (var i = 0; i < this.w; ++i) {
        for (var j = 0; j < this.h; ++j) {
            this.scene[i][j] = 0;
        }
    }
}

