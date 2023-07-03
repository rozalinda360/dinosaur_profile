import Player from "./player.js";
import Ground from "./ground.js";
import CactiController from "./CactiController.js";
import Score from "./Score.js";
import CoinController from "./CoinController.js";

const canvas = document.getElementById('game');
let ctx = canvas.getContext("2d");

const GAME_SPEED_START = 0.75;
const GAME_SPEED_INCREMENT = 0.00001;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;

const PLAYER_WIDTH = 88 / 1.5; //58
const PLAYER_HEIGHT = 94 / 1.5; //62

const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;

const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GROUND_AND_CACTUS_SPEED = 0.5;

const CACTI_CONFIG = [
    {width:48/1.5, height:100/1.5, image:"img/cactus_1.png"},
    {width:98/1.5, height:100/1.5, image:"img/cactus_2.png"},
    {width:68/1.5, height:70/1.5, image:"img/cactus_3.png"},
];

//Game Objects
let player = null;
let ground = null;
let cactiController = null;
let coinController = null;
let score = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;

function showGameOver(){
    const fontSize = 50*scaleRatio;
    ctx.font = `${fontSize}px GameFont`;
    ctx.fillStyle = "grey";
    const x = canvas.width / 4.5;
    const y = canvas.height / 2;
    ctx.fillText("GAME OVER",x,y);
}

function setupGameReset(){
    if(!hasAddedEventListenersForRestart){
        hasAddedEventListenersForRestart = true;

        setTimeout(()=>{
            window.addEventListener("keyup",reset,{once:true});
            window.addEventListener("touchstart",reset,{once:true});
        }, 1000);
    }
}

function reset(){
    hasAddedEventListenersForRestart = false;
    gameOver = false;
    waitingToStart = false;
    ground.reset();
    cactiController.reset();
    coinController.reset();
    score.reset();
    gameSpeed = GAME_SPEED_START;

}

function showStartGame(){
    const fontSize = 20*scaleRatio;
    ctx.font = `${fontSize}px GameFont`;
    ctx.fillStyle = "grey";
    const x = canvas.width / 14;
    const y = canvas.height / 2;
    ctx.fillText("Tap Screen or Press Space to Start",x,y);

}

function updateGameSpeed(frameTimeDelta){
    gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
}

function createSprites() {
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const PlayerHeightInGame = PLAYER_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

    const groundWidthInGame = GROUND_WIDTH*scaleRatio;
    const groundHeightInGame = GROUND_HEIGHT*scaleRatio;

    ground = new Ground(ctx,groundWidthInGame,groundHeightInGame,GROUND_AND_CACTUS_SPEED,scaleRatio);
    player = new Player(ctx, playerWidthInGame, PlayerHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio);

    const cactiImages = CACTI_CONFIG.map(cactus =>{
    const image = new Image();
    image.src = cactus.image;
    return {
        image:image,
        width: cactus.width*scaleRatio,
        height: cactus.height*scaleRatio,
    };

    });

    cactiController = new CactiController(ctx,cactiImages,scaleRatio,GROUND_AND_CACTUS_SPEED);
    coinController = new CoinController(ctx,scaleRatio,GROUND_AND_CACTUS_SPEED);
    score = new Score(ctx,scaleRatio);
}


function getScaleRatio() {
    const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
    const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
    //Window is wider than game width
    if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
        return screenWidth / GAME_WIDTH;
    }
    //Window is narrower than game width
    else {
        return screenHeight / GAME_HEIGHT;
    }
}

function setScreen() {
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createSprites();

}

function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}

function gameLoop(currentTime) {
    if (previousTime === null) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }

    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    clearScreen();

    if(!gameOver && !waitingToStart){
    //update
    ground.update(gameSpeed, frameTimeDelta);
    cactiController.update(gameSpeed,frameTimeDelta);
    coinController.update(gameSpeed,frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta);
    score.update(frameTimeDelta);
    updateGameSpeed(frameTimeDelta);
    }

    if(!gameOver && cactiController.collideWith(player)){
        gameOver = true;
        setupGameReset();
        score.setHighScore();
    }
    //draw
    ground.draw();
    cactiController.draw();
    coinController.draw();
    player.draw();
    score.draw();

    if(gameOver){
        showGameOver();
    }

    if(waitingToStart){
        showStartGame();
    }
    requestAnimationFrame(gameLoop);
}




setScreen();
window.addEventListener('resize', () => setTimeout(setScreen, 500));

if (screen.orientation) {
    screen.orientation.addEventListener('change', setScreen);
}

requestAnimationFrame(gameLoop);

window.addEventListener("keyup",reset,{once:true});
window.addEventListener("touchstart",reset,{once:true});