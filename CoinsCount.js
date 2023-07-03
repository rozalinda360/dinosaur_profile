export default class CoinsCount{
    count = 0;
    
    constructor(ctx,scaleRatio){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio  = scaleRatio;
    }

    update(frameTimeDelta){
        this.count += frameTimeDelta * 0.01;
    }

    reset(){
        this.count = 0;
    }


    draw(){
        const y = 20*this.scaleRatio;
        const fontSize = 10*this.scaleRatio;
        this.ctx.font = `${fontSize}px GameFont`;
        this.ctx.fillStyle = "grey";
        const countX = this.canvas.width - 75 * this.scaleRatio;

        this.ctx.fillText(coun,countX,y);
        // this.ctx.fillText(highScorePadded,highScoreX,y);
    }
}