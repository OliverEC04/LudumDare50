var yScale = 0.4;
var canvasSize;
var canvasElem;
var c;
var player;
var track;
window.onload = function () {
    canvasElem = document.querySelector('canvas');
    resizeWindow();
    c = canvasElem.getContext('2d');
    Platform.imgElem.src = 'assets/platform.png';
    player = new Player('assets/player.png', new Vector2(0.3, 0.5));
    track = new Track();
    loop();
};
function loop() {
    c.fillStyle = '#53abd4';
    c.fillRect(0, 0, canvasSize.x, canvasSize.y);
    player.draw(c, canvasSize);
    track.draw(c, canvasSize);
    requestAnimationFrame(loop);
}
window.addEventListener('resize', resizeWindow);
function resizeWindow() {
    canvasSize = new Vector2(window.innerWidth, window.innerWidth * yScale);
    canvasElem.width = canvasSize.x;
    canvasElem.height = canvasSize.y;
}
document.addEventListener('keydown', function (event) {
    if (event.key === 'space') {
        player.jump();
    }
});
var Platform = (function () {
    function Platform(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    Platform.prototype.draw = function (c, canvasSize) {
        c.drawImage(Platform.imgElem, this.pos.x * canvasSize.x, this.pos.y * canvasSize.y, this.size.x * canvasSize.x, this.size.y * canvasSize.y);
    };
    Platform.prototype.playerCol = function (player) {
        if (player.pos.y + player.size > this.pos.y) {
            return true;
        }
        else {
            return false;
        }
    };
    Platform.imgElem = document.createElement('img');
    return Platform;
}());
var Player = (function () {
    function Player(imgSrc, pos) {
        this.size = 0.1;
        this.imgElem = document.createElement('img');
        this.imgElem.src = imgSrc;
        this.pos = pos;
        this.force = new Vector2(0, 0.01);
    }
    Player.prototype.draw = function (c, canvasSize) {
        if (track.platforms[track.getSeg(this.pos.x)].playerCol(this)) {
            if (this.force.y < 0) {
                this.pos.y += this.force.y;
            }
        }
        else if (this.force.y > 0) {
            this.pos.y += this.force.y;
        }
        c.drawImage(this.imgElem, this.pos.x * canvasSize.x, this.pos.y * canvasSize.y, this.size * canvasSize.x * yScale, this.size * canvasSize.y);
    };
    Player.prototype.jump = function () {
        if (!track.platforms[track.getSeg(this.pos.x)].playerCol(this)) {
            return;
        }
    };
    return Player;
}());
var Track = (function () {
    function Track() {
        this.platforms = [];
        this.segCount = 10;
        this.segsPerTick = 0.001;
        for (var i = 0; i < this.segCount; i++) {
            this.platforms[i] = new Platform(new Vector2(i / this.segCount, 0.8), new Vector2(1 / this.segCount, 1));
        }
    }
    Track.prototype.draw = function (c, canvasSize) {
        this.platforms.forEach(function (platform) {
            platform.draw(c, canvasSize);
        });
    };
    Track.prototype.getSeg = function (pos) {
        return pos * this.segCount;
    };
    return Track;
}());
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector2;
}());
//# sourceMappingURL=script.js.map