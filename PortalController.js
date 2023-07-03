import Portal from "./Portal.js"

export default class PortalController {

    PORTAL_INTERVAL_MIN = 8000;
    PORTAL_INTERVAL_MAX = 10000;
    scaleUp = 10;
    nextPortalInterval = null;
    portals = [];
    
    constructor(ctx, scaleRatio, speed) {
      this.ctx = ctx;
      this.canvas = ctx.canvas;
      this.scaleRatio = scaleRatio;
      this.speed = speed;
      this.setNextPortalTime();
    }
  
    setNextPortalTime() {
      const num = this.getRandomNumber(
        this.PORTAL_INTERVAL_MIN,
        this.PORTAL_INTERVAL_MAX
      );
  
      this.nextPortalInterval = num;
    }
  
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    
    createPortal() {
    const x = this.canvas.width * 1.5;
    const y = 70*this.scaleRatio;
    const width = 310/8 * this.scaleRatio;
    const height = 590/8 *  this.scaleRatio;
    const portal = new Portal(this.ctx, x, y,width,height);
    this.portals.push(portal);
    }
    
  
    update(gameSpeed, frameTimeDelta) {
        if (this.nextPortalInterval <= 0) {
          this.createPortal();
          this.setNextPortalTime();
        }
        this.nextPortalInterval -= frameTimeDelta;
    
        this.portals.forEach((portal) => {
          portal.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
        });
    
        this.portals = this.portals.filter((portal) => portal.x > -portal.width);
        
      }
  
    draw() {
        this.portals.forEach((portal) => portal.draw());
    }
  
    collideWith(sprite) {
        return this.portals.some((portal) => portal.collideWith(sprite));
      }
  
    reset() {
      this.portals = [];
    }

    updatePortalEntering(){
        this.portals = this.portals.filter((portal) => portal.x > -portal.width);
        this.portals.forEach((portal) => portal.drawP(this.scaleRatio,this.canvas.width, this.canvas.height));
    }
  
}