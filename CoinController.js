import Coin from "./Coin.js";

export default class CoinController {

    Coin_INTERVAL_MIN = 1000;
    Coin_INTERVAL_MAX = 3000;
    nextCoinInterval = null;


    constructor(ctx, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
        this.speed = speed;
        this.setNextCoinTime();
    }

    setNextCoinTime() {
        const num = this.getRandomNumber(
            this.Coin_INTERVAL_MIN,
            this.Coin_INTERVAL_MAX
        );

        this.nextCoinInterval = num;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    createCoin() {
        const x = this.canvas.width * 1.5;
        const y = 60;
        const coin = new Coin(
            this.ctx,
            x,
            y,
            coinObj.image,
            coinObj.width,
            coinObj.height,
            this.scaleRatio
        );
        this.coinList.push(coin);
        console.log(coin);
    }

    update(gameSpeed, frameTimeDelta) {
        if (this.nextCoinInterval <= 0) {
            this.createCoin();
            this.setNextCoinTime();
        }
        this.nextCoinInterval -= frameTimeDelta;

        this.coinList.forEach((coin) => {
            coin.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
        });

        this.coinList = this.coinList.filter((coin) => coin.x > -coin.width);
    }

    draw() {
        this.coinList.forEach((coin) => coin.draw());
    }

    collideWith(sprite) {
        // return this.coinList.some((coin) => coin.collideWith(sprite));
    }


    reset() {
        this.coinList = [];
    }
}