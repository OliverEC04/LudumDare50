class Track {
    platforms: Platform[] = [];
    segCount: number = 10;
    segsPerTick: number = 0.001;

    constructor() {
        for (let i = 0; i < this.segCount; i++) {
            this.platforms[i] = new Platform(new Vector2(i / this.segCount, 0.8), new Vector2(1 / this.segCount, 1));
        }
    }

    draw(c: CanvasRenderingContext2D, canvasSize: Vector2): void {
        this.platforms.forEach((platform) => {
            platform.draw(c, canvasSize);
        });
    }

    getSeg(pos: number): number {
        return pos * this.segCount;
    }
}