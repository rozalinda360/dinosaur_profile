export default class Coin {

    constructor(ctx, x, y, speed, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = 35 * scaleRatio;
        this.height = 35 * scaleRatio;
        this.x = x;
        this.y = y;
        this.spriteWidth = 1151 / 6;
        this.spriteHeight = 171;
        this.speed = speed;
        this.scaleRatio = scaleRatio;

        this.image = new Image();
        this.image.src = "images/coin_spritesheet.png";
        this.frameX = 0;
        this.gameFrame = 0;
        this.staggerFrame = 5;
        this.position = 0;
    }

    update(speed, gameSpeed, frameTimeDelta, scaleRatio) {
        this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
    }

    draw() {
        this.position = Math.floor(this.gameFrame / this.staggerFrame) % 6;
        console.log(this.position);
        this.frameX = this.spriteWidth * this.position;
        this.ctx.drawImage(this.image, this.frameX, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        this.gameFrame++;
        console.log("draw");

    }

    reset() {
        this.x = 0;
    }

    collideWith(sprite) {
        const adjustBy = 1.4;
        if (
            sprite.x < this.x + this.width / adjustBy &&
            sprite.x + sprite.width / adjustBy > this.x &&
            sprite.y < this.y + this.height / adjustBy &&
            sprite.height + sprite.y / adjustBy > this.y
        ) {
            return true;
        } else {
            return false;
        }
    }
}