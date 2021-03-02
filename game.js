import Bird from "./modules/bird.js";
import vars from "./modules/vars.js";
import Ground from"./modules/ground.js";
import Column from"./modules/column.js";

let frame = 0; //current secound
let score = 0;

const canvasElement = document.getElementById("c");
const context = canvasElement.getContext("2d");
const canvasHeight = Math.floor(window.innerHeight);
const canvasWidth = Math.floor(canvasHeight * 9/16);

canvasElement.width = canvasWidth;
canvasElement.height = canvasHeight;

//calculate gravity in 5 sec must pull the fucking bird or else 
vars.GRAVITY = Math.floor(canvasHeight / (-1 * 5 * vars.FPS));
//sprite
const sprite = new Image();
sprite.src = "sprite.png";
//game elements
canvasElement.onclick = ()=> {bird.jump()}
    const bird = new Bird(context, sprite);
    const ground = new Ground(context, sprite);
    const columns = new Column(context, sprite);
//bind event if fat bird is succes
    columns.onRevive = increaseScore;

const gameInterval = setInterval(() => {
    context.clearRect(0, 0, canvasWidth, canvasHeight) //clear the canvas
    bird.draw(frame); // draw the fucker or bird
    ground.draw(frame);//draw the fucking ground
    columns.draw(frame);//what do you think column ofc!!!!
    if(bird.isTouchingGround(ground)){//check the fat bird if he/she can continue this shity game!
        alert("Game Over Fucker!!!!!");
        clearInterval(gameInterval);
    }
    if(bird.isTouchingColumn(columns))
    {//check the fat bird if -/-
        alert("Game Over Fucker!!!!!");
        clearInterval(gameInterval); 
    }
//print Score
    context.fillstyle = "black";
    context.textAlign = "center";
    context.font ="38px Arial";
    context.fillText(score, canvasWidth / 2, 40);
    frame =(frame+1) % vars.FPS;
}, 1000/vars.FPS)

function increaseScore(){
    score += 1;
}












//initGame();

//function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)


