
export default class NavPage{
    constructor(ctx,width,height,scaleRatio){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.scaleRatio = scaleRatio;

    }
    


    drawBg(){
        const fontSize = 10*this.scaleRatio;
        this.ctx.font = `${fontSize}px GameFont`;
        this.ctx.fillStyle = "grey";
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillText("Home",this.canvas.width/2, this.canvas.height/2);

    }

    drawText(){
        const fontSize = 10*this.scaleRatio;
        const yinc = 40;
        const y = 50*this.scaleRatio;
        const x= this.canvas.width/2;
        const titleList = ["Home","About","Skills","Work","Education"];
        this.ctx.font = `${fontSize}px GameFont`;
        this.ctx.fillStyle = "grey";
        for (let i =0; i< 5;++i){
            this.ctx.fillText(titleList[i],x,y+yinc*i);
        }
        
    }

    drawCursor(){


    }
}