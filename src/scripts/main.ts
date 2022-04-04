const yScale: number = 0.4;

let canvasSize: Vector2;
let canvasElem: HTMLCanvasElement;
let c: CanvasRenderingContext2D;
let player: Player;
let track: Track;

window.onload = () => {
    canvasElem = document.querySelector('canvas');
    resizeWindow();
    c = canvasElem.getContext('2d');

    Platform.imgElem.src = 'assets/platform.png';

    player = new Player('assets/player.png', new Vector2(0.3, 0.5));

    track = new Track();

    loop();
};

function loop(): void {
    c.fillStyle = '#53abd4';
    c.fillRect(0, 0, canvasSize.x, canvasSize.y);

    player.draw(c, canvasSize);
    track.draw(c, canvasSize);

    requestAnimationFrame(loop);
}

window.addEventListener('resize', resizeWindow);

function resizeWindow(): void {
    canvasSize = new Vector2(window.innerWidth, window.innerWidth * yScale);
    canvasElem.width = canvasSize.x;
    canvasElem.height = canvasSize.y;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'space') {
        player.jump();
    }
});