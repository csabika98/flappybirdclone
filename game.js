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
let playAudio = false;
var audio = new Audio('sound.mp3');


function sound() { 
    playAudio=!playAudio;
    audio.muted= playAudio;


  } 

  document.getElementById("sound").addEventListener("click", function() {
    sound();
  });
  
  
let gameover = false;
let nostStarted = true;

let current_map = null;

let highestScore = 0;

canvasElement.width = canvasWidth;
canvasElement.height = canvasHeight;

//sprite
const sprite = new Image();
sprite.src = "sprite.png";
//background
const bg = new Image();
bg.src = "stage/map.png";
const bg2 = new Image();
bg2.src = "stage/map2.png";
const bg3 = new Image();
bg3.src = "stage/map3.png";
const bg4 = new Image();
bg4.src = "stage/map4.png";
const bg5 = new Image();
bg5.src = "stage/map5.png";
const bg6 = new Image();
bg6.src = "stage/map6.png";
const win = new Image();
win.src = "youwon2.png";

main();


function main(){
    nostStarted = true;
    context.imageSmoothingEnabled = false;
    let canvasSize = {
        x:0,
        y:0,
        width:canvasWidth,
        height:canvasHeight
    };
    //get mouse pos for canvas
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
        }

    function isInside(pos, rect){
        return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
    }
        
    //render images every 0.1 frame
        const interval = setInterval(function(){
            context.clearRect(0, 0, canvasWidth, canvasHeight) //clear images

            context.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, bg.width/2, bg.height/2);
            context.drawImage(sprite,292,82,58,57,canvasWidth/4,canvasHeight/2.5,58*3,57*3); 
            context.drawImage(sprite,295,59,92,25,canvasWidth/16,canvasHeight/4,92*3,25*3);
        }, 100);
    // Listen to click to start game
            canvasElement.addEventListener('click', function(evt) {
                var mousePos = getMousePos(canvasElement, evt);
            
                if (isInside(mousePos,canvasSize) && nostStarted) {
                    clearInterval(interval);
                    game();
                }
            }, false);

}



function restartGame(){
    game();
}
function game(){
    let frame = 0; //current secound
    let score = 0;
    gameover = false;
    nostStarted = false;
    audio.play();
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
        context.imageSmoothingEnabled = false;const bg3 = new Image();
        context.clearRect(0, 0, canvasWidth, canvasHeight) //clear the canvas
        if (score <= 1){
            current_map = bg;
            context.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, bg.width/2, bg.height/2);
        }if (score >= 2){
            current_map = bg2;
            context.drawImage(bg2, 0, 0, bg2.width, bg2.height, 0, 0, bg2.width/2, bg2.height/2);//draw Background
        }if (score > 4 ){
            current_map = bg3;
            context.drawImage(bg3, 0, 0, bg3.width, bg3.height, 0, 0, bg3.width/2, bg3.height/2);
        }if (score > 6){
            current_map = bg4;
            context.drawImage(bg4, 0, 0, bg4.width, bg4.height, 0, 0, bg4.width, bg4.height);
        }if(score >= 8){
            current_map = bg5;
            context.drawImage(bg5, 0, 0, bg5.width, bg5.height, 0, 0, bg5.width/2, bg5.height/2);
        }if (score > 10){
            current_map = bg6;
            context.drawImage(bg6, 0, 0, bg6.width, bg6.height, 0, 0, bg6.width/3, bg6.height/3);
        } if (score > 12){
            clearInterval(gameInterval)
            gameover = true;
            sceneWin();

        }
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
        width:52*2,
        height:29*2
    };

    let animation = setInterval(function(){
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(current_map, x, y, bg.width, bg.height, 0, 0, bg.width/2, bg.height/2);
        x += 10;
        if (x==750){
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

function sceneWin(){
    gameover = true;
    let x = 0;
    let y = 0;
    let restartButton = {
        x:canvasWidth/4,
        y:canvasHeight/2,
        width:52*2,
        height:29*2
    };

    let animation = setInterval(function(){
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(current_map, x, y, bg.width, bg.height, 0, 0, bg.width/2, bg.height/2);
        x += 10;
        if (x==750){
            clearInterval(animation);
            context.drawImage(win, 0, 0, win.width, win.height, 50, 50, win.width*1, win.height*1);
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