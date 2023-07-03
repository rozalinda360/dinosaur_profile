import Cactus from "./Cactus.js";
import Coin from "./Coin.js";

export default class CactiController {

  CACTUS_INTERVAL_MIN = 500;
  CACTUS_INTERVAL_MAX = 2000;

  COIN_INTERVAL_MIN = 2000;
  COIN_INTERVAL_MAX = 5000;

  nextCactusInterval = null;
  nextCoinInterval = null;
  cacti = [];
  coins = [];

  constructor(ctx, cactiImages, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.cactiImages = cactiImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    this.setNextCactusTime();
    this.setNextCoinTime();
  }

  setNextCactusTime() {
    const num = this.getRandomNumber(
      this.CACTUS_INTERVAL_MIN,
      this.CACTUS_INTERVAL_MAX
    );

    this.nextCactusInterval = num;
  }

  setNextCoinTime() {
    const num = this.getRandomNumber(
      this.COIN_INTERVAL_MIN,
      this.COIN_INTERVAL_MAX
    );

    this.nextCoinInterval = num;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createCactus() {
    const index = this.getRandomNumber(0, this.cactiImages.length - 1);
    const cactusImage = this.cactiImages[index];
    const x = this.canvas.width * 1.5;
    const y = this.canvas.height - cactusImage.height;
    const cactus = new Cactus(
      this.ctx,
      x,
      y,
      cactusImage.width,
      cactusImage.height,
      cactusImage.image
    );

    this.cacti.push(cactus);
  }

  createCoin() {
    const x = this.canvas.width * 1.5;
    const y = 80;
    const coin = new Coin(this.ctx, x, y, this.speed, this.scaleRatio);
    this.coins.push(coin);
  }

  update(gameSpeed, frameTimeDelta) {
    if (this.nextCactusInterval <= 0) {
      this.createCactus();
      this.setNextCactusTime();
    }
    this.nextCactusInterval -= frameTimeDelta;

    if (this.nextCoinInterval <= 0) {
      this.createCoin();
      this.setNextCoinTime();
    }
    this.nextCoinInterval -= frameTimeDelta;

    this.cacti.forEach((cactus) => {
      cactus.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
    });

    this.coins.forEach((coin) => {
      coin.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
    });

    this.cacti = this.cacti.filter((cactus) => cactus.x > -cactus.width);
    // this.coins = this.coins.filter((coin) => coin.x > -coin.width);
  }

  draw() {
    this.cacti.forEach((cactus) => cactus.draw());
    console.log(this.coins.length);
    this.coins.forEach((coin) => coin.draw());
  }

  collideWith(sprite) {
    return (
      this.cacti.some((cactus) => cactus.collideWith(sprite))
      ||
      this.coins.some((coin) => coin.collideWith(sprite))
    );
  }

  reset() {
    this.cacti = [];
    this.coins = [];
  }

  // CACTUS_INTERVAL_MIN = 500;
  // CACTUS_INTERVAL_MAX = 2000;

  // nextCactusInterval = null;
  // cacti = [];

  // constructor(ctx, cactiImages, scaleRatio, speed) {
  //   this.ctx = ctx;
  //   this.canvas = ctx.canvas;
  //   this.cactiImages = cactiImages;
  //   this.scaleRatio = scaleRatio;
  //   this.speed = speed;

  //   this.setNextCactusTime();
  // }

  // setNextCactusTime() {
  //   const num = this.getRandomNumber(
  //     this.CACTUS_INTERVAL_MIN,
  //     this.CACTUS_INTERVAL_MAX
  //   );

  //   this.nextCactusInterval = num;
  // }

  // getRandomNumber(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // }

  // createCactus() {
  //   const index = this.getRandomNumber(0, this.cactiImages.length - 1);
  //   const cactusImage = this.cactiImages[index];
  //   const x = this.canvas.width * 1.5;
  //   const y = this.canvas.height - cactusImage.height;
  //   const cactus = new Cactus(
  //     this.ctx,
  //     x,
  //     y,
  //     cactusImage.width,
  //     cactusImage.height,
  //     cactusImage.image
  //   );

  //   this.cacti.push(cactus);
  // }

  // update(gameSpeed, frameTimeDelta) {
  //   if (this.nextCactusInterval <= 0) {
  //     this.createCactus();
  //     this.setNextCactusTime();
  //   }
  //   this.nextCactusInterval -= frameTimeDelta;

  //   this.cacti.forEach((cactus) => {
  //     cactus.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
  //   });

  //   this.cacti = this.cacti.filter((cactus) => cactus.x > -cactus.width);
  // }

  // draw() {
  //   this.cacti.forEach((cactus) => cactus.draw());
  // }

  // collideWith(sprite) {
  //   return this.cacti.some((cactus) => cactus.collideWith(sprite));
  // }

  // reset() {
  //   this.cacti = [];
  // }
}