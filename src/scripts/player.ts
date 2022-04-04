class Player {
    size: number = 0.1;
    imgElem: HTMLImageElement;
    pos: Vector2;
    force: Vector2;

    constructor(imgSrc: string, pos: Vector2) {
        this.imgElem = document.createElement('img');
        this.imgElem.src = imgSrc;
        this.pos = pos;
        this.force = new Vector2(0, 0.01);
    }

    draw(c: CanvasRenderingContext2D, canvasSize: Vector2): void {
        if (track.platforms[track.getSeg(this.pos.x)].playerCol(this)) {
            if (this.force.y < 0) {
                this.pos.y += this.force.y;
            }

        }
        else if (this.force.y > 0) {
            this.pos.y += this.force.y;
        }

        c.drawImage(this.imgElem, this.pos.x * canvasSize.x, this.pos.y * canvasSize.y, this.size * canvasSize.x * yScale, this.size * canvasSize.y);
    }

    jump(): void {
        if (!track.platforms[track.getSeg(this.pos.x)].playerCol(this)) {
            return;
        }


    }
}