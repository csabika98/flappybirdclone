import Bird from "./modules/bird.js";
import vars from "./modules/vars.js";
import Ground from"./modules/ground.js";
import Column from"./modules/column.js";



const canvasElement = document.getElementById("c");
const context = canvasElement.getContext("2d");
const canvasHeight = Math.floor(window.innerHeight-128);
const canvasWidth = Math.floor(canvasHeight * 9/16);
const currentScore = document.getElementById('current-score');
const BestScore = document.getElementById('best-score');
let gameover = false;

let highestScore = 0;

canvasElement.width = canvasWidth;
canvasElement.height = canvasHeight;

//sprite
const sprite = new Image();
sprite.src = "sprite.png";
//background
const bg = new Image();
bg.src = "BG.png";
const bg2 = new Image();
bg2.src = "map2.png";
game();

function restartGame(){
    game();
}
function game(){
    let frame = 0; //current secound
    let score = 0;
    gameover = false;

    //calculate gravity in 5 sec must pull the fucking bird or else 
    vars.GRAVITY = Math.floor(canvasHeight / (-1 * 5 * vars.FPS));



    //game elements
    canvasElement.onclick = ()=> {bird.jump()}
        const bird = new Bird(context, sprite);
        const ground = new Ground(context, sprite);
        const columns = new Column(context, sprite);
    //bind event if fat bird is succes
        columns.onRevive = increaseScore;

    const gameInterval = setInterval(() => {
        context.imageSmoothingEnabled = false;
        context.clearRect(0, 0, canvasWidth, canvasHeight) //clear the canvas
        if (score >= 5)
        context.drawImage(bg2, 0, 0, bg2.width, bg2.height, 0, 0, bg2.width/4, bg2.height/4);
        if (score <= 5)
        context.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, bg.width/2, bg.height/2);//draw Background
        bird.draw(frame); // draw the fucker or bird
        ground.draw(frame);//draw the fucking ground
        columns.draw(frame);//what do you think column ofc!!!!
        if(bird.isTouchingGround(ground)){//check the fat bird if he/she can continue this shity game!
            if(score > highestScore){
                highestScore = score;
            }
            clearInterval(gameInterval);
            gameover = true;
            sceneEnd();
        }
        if(bird.isTouchingColumn(columns))
        {//check the fat bird if -/-
            if(score > highestScore){
                highestScore = score;
            }
            clearInterval(gameInterval);
            gameover = true;
            sceneEnd();
        }
    //print Score
        frame =(frame+1) % vars.FPS;
        BestScore.textContent = 'Highest score:' + highestScore;
        currentScore.textContent = 'Current score: ' + score;
    }, 1000/vars.FPS)


    function increaseScore(){
        score += 1;
    }
}

function sceneEnd(){
    gameover = true;
    let x = 0;
    let y = 0;
    let restartButton = {
        x:canvasWidth/4,
        y:canvasHeight/2,
        width:52*3,
        height:29*3
    };

    canvasElement.style.backgroundColor ='#0f0f32';
    let animation = setInterval(function(){
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(bg, x, y, bg.width, bg.height, 0, 0, bg.width/2, bg.height/2);
        y += 10;
        console.log(y);
        if (y==750){
            clearInterval(animation);
            context.drawImage(sprite, 395, 59, 96, 21, canvasWidth/16, canvasHeight/4, 96*3, 21*3); //Gameover text
            context.drawImage(sprite, 355, 119, 52, 29, canvasWidth/3, canvasHeight/2, 52*2, 29*2); // button to restart
        }
     }, 10);
     //get mouse pos for canvas
     function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    
    //Function to check whether a point is inside a rectangle
    function isInside(pos, rect){
        return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
    }
    

    //listen to canvas clicks
    canvasElement.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvasElement, evt);
    
        if (isInside(mousePos,restartButton) && gameover) {
            restartGame();
        }
    }, false);
}