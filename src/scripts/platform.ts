class Platform {
    static imgElem: HTMLImageElement = document.createElement('img') as HTMLImageElement;

    pos: Vector2;
    size: Vector2;

    constructor(pos: Vector2, size: Vector2) {
        this.pos = pos;
        this.size = size;
    }

    draw(c: CanvasRenderingContext2D, canvasSize: Vector2): void {
        c.drawImage(Platform.imgElem, this.pos.x * canvasSize.x, this.pos.y * canvasSize.y, this.size.x * canvasSize.x, this.size.y * canvasSize.y);
    }

    playerCol(player: Player): boolean {
        if (player.pos.y + player.size > this.pos.y) {
            return true;
        }
        else {
            return false;
        }
    }
}