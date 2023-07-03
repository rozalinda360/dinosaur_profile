export default class Portal{
    scale = 10;
    incrementScale = 0; 
    constructor(ctx, x, y,width,height){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image(); // Create a new Image element
        this.image.src = "img/portal.png"; 

    }


    update(speed,gameSpeed,frameTimeDelta,scaleRatio){
        this.x -= speed*gameSpeed*frameTimeDelta*scaleRatio;
    }

    draw(){
        this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

    collideWith(sprite){
        const adjustBy = 1.4;
        if (
            sprite.x < this.x + this.width / adjustBy &&
            sprite.x + sprite.width / adjustBy> this.x &&
            sprite.y < this.y + this.height /adjustBy &&
            sprite.height + sprite.y / adjustBy > this.y
        ){
            return true;
        }else{
            return false;
        }
    }

    drawP(scaleRatio,canvasW,canvasH){
        const ratioIncrement= this.incrementScale * scaleRatio;
        // Assuming the center of the image is at (this.x + this.width / 2, this.y + this.height / 2)
        // Calculate the center point
        const centerX = canvasW/2 ;
        const centerY = canvasH/2;
        console.log(`${centerX} ${centerY}`);

        // Save the current transformation state
        this.ctx.save();

        // Translate to the center point
        this.ctx.translate(centerX, centerY);

        // Rotate the image
        this.ctx.rotate(this.incrementScale*scaleRatio*0.4);

        // Scale the image while keeping it centered
        this.ctx.drawImage(
        this.image,
        -this.width * ratioIncrement / 2,
        -this.height * ratioIncrement/ 2,
        this.width * ratioIncrement,
        this.height * ratioIncrement
        );

        // Restore the previous transformation state
        this.ctx.restore();

        // Increment the angle for the next frame
        ++this.incrementScale;

        // this.ctx.rotate(this.incrementScale); //increment the angle and rotate the image 
        // this.ctx.drawImage(this.image,this.x,this.y,this.width*this.incrementScale,this.height*this.incrementScale);
        // ++this.incrementScale;
    }
}

 