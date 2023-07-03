export default class Player {

    WALK_ANIMATION_TIMER = 200;
    walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    dinoRunImages = [];
    jumpPressed = false;
    jumpInProgress = false;
    falling= false;
    JUMP_SPEED = 0.6;
    GRAVITY = 0.4;

    constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio){
        //get the scaled height of the player
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;
        this.runningSound = new Audio('./SFX/running.mp3'); // Replace with the path to your running sound effect
        this.jumpSound = new Audio('./SFX/jump.wav');
        //setting the position of dino
        this.x = 10*scaleRatio;
        this.y = this.canvas.height-this.height - 1.5*scaleRatio;
        this.yStandingPosition = this.y;
        //setting the type of image used
        this.standingStillImage = new Image();
        this.standingStillImage.src = "img/standing_still.png";
        this.image = this.standingStillImage;
        this.isRunning = false;

        const dinoRunImage1 = new Image();
        dinoRunImage1.src = 'img/dino_run1.png';
        
        const dinoRunImage2 = new Image();
        dinoRunImage2.src = 'img/dino_run2.png';
        this.dinoRunImages.push(dinoRunImage1);
        this.dinoRunImages.push(dinoRunImage2);

        //keyboard
        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("keyup", this.keyup);
    
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);

        window.removeEventListener('touchstart', this.touchstart);
        window.removeEventListener('touchend', this.touchend);

        window.addEventListener('touchstart', this.touchstart);
        window.addEventListener('touchend', this.touchend);

    }

    draw(){
        this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);

    }

    update(gameSpeed,frameTimeDelta){
        this.run(gameSpeed,frameTimeDelta);
        
        if(this.jumpInProgress){
            this.image= this.standingStillImage;
        }
        this.jump(frameTimeDelta);
    }

    run(gameSpeed,frameTimeDelta){
        this.playRunningSound();
        if(this.walkAnimationTimer <= 0){
            if(this.image === this.dinoRunImages[0]){
                this.image = this.dinoRunImages[1];
            }else{
                this.image = this.dinoRunImages[0];
            }
            
            this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;

        }

        this.walkAnimationTimer -= frameTimeDelta * gameSpeed
    
    }

    jump(frameTimeDelta){
        
        if(this.jumpPressed){
            this.pauseRunningSound();
            this.playJumpSound();
            this.jumpInProgress = true;
        }
    
        if(this.jumpInProgress && !this.falling){
            if(this.y > this.canvas.height - this.minJumpHeight || this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed){
                this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
            }
            else{
                this.falling = true;
    
            }    
        }
        else{
            if(this.y<this.yStandingPosition){
                this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
                if(this.y + this.height > this.canvas.height){
                     this.y = this.yStandingPosition;
                }
            }else{
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }


    keydown = (event) => {
        if (event.code === "Space") {
            this.jumpPressed = true;
        }
    };

    keyup = (event) => {
        if (event.code === "Space") {
            this.jumpPressed = false; 
        }
    };

    touchstart = ()=>{
        this.jumpPressed = true;
    };

    touchend = ()=>{
        this.jumpPressed = false;
    };

    playRunningSound() {
        this.runningSound.play();
      }

    pauseRunningSound(){
        this.runningSound.pause();

    }
    playJumpSound() {
        if (this.jumpPressed && !this.jumpInProgress){
        this.jumpSound.play();
    }}
      
    pauseJumpSound() {
        this.jumpSound.pause();
    }

}