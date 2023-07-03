import Coin from "./Coin.js";

export default class CoinController {
  COIN_INTERVAL_MIN = 2000;
  COIN_INTERVAL_MAX = 5000
  nextCoinInterval = null;
  coins = [];

  constructor(ctx, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
    this.speed = speed;
    this.coinCount = 0;
    this.collisionSound = new Audio('./SFX/coin.wav'); // Replace with the path to your collision sound effect
    this.setNextCoinTime();
    this.image = new Image();
    this.image.src = "img/bag.png";
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

  createCoin() {
    const x = this.canvas.width * 1.5;
    const y = 70*this.scaleRatio;
    const coin = new Coin(this.ctx, x, y, this.speed, this.scaleRatio);
    this.coins.push(coin);
  }

  update(gameSpeed, frameTimeDelta) {
    if (this.nextCoinInterval <= 0) {
      this.createCoin();
      this.setNextCoinTime();
    }
    this.nextCoinInterval -= frameTimeDelta;

    this.coins.forEach((coin) => {
      coin.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
    });

    this.coins = this.coins.filter((coin) => coin.x > -coin.width);
    
  }

  draw() {
    this.coins.forEach((coin) => coin.draw());
    const y = 20*this.scaleRatio;
    const fontSize = 10*this.scaleRatio;
    this.ctx.font = `${fontSize}px GameFont`;
    this.ctx.fillStyle = "grey";
    const coinCountWidth = this.canvas.width - 240 * this.scaleRatio;
    this.ctx.fillText(this.coinCount,coinCountWidth,y);
    const bagWidth = 200/10 * this.scaleRatio;
    const bagHeight = 196/10 * this.scaleRatio;
    const bagX = this.canvas.width - 268 * this.scaleRatio;
    const bagY = 3*this.scaleRatio;
    this.ctx.drawImage(this.image,bagX, bagY,bagWidth, bagHeight);
  }
  
collideWith(sprite) {
    const collidedCoins = this.coins.filter((coin) => coin.collideWith(sprite));
    collidedCoins.forEach((coin) => {
      const index = this.coins.indexOf(coin);
      // Get the index of the collided coin
      if (index > -1) {
        this.coins.splice(index, 1); // Remove the collided coin from the array
        this.coinCount++        
        this.playCollisionSound(); // Play the collision sound effect
        console.log(this.coinCount);
    }
    });
  }

reset() {
    this.coins = [];
    this.coinCount = 0;
  }

  playCollisionSound() {
    this.collisionSound.currentTime = 0; // Reset the sound to the beginning
    this.collisionSound.play(); // Play the sound effect
  }

  pauseCollisionSound() {
    this.collisionSound.pause(); // Play the sound effect
  }


}
