import Ground from "./ground.js";
import vars from "./vars.js";

export default class Bird{
    constructor(context, sprite){
        this.context = context;
        this.sprite = sprite;
        this.position = {x:0, y:0}//position of the bird
        this.frames = [
            {x:3, y:491},
            {x:31, y:491},
            {x:59, y:491}
            ];// bird on spire
        //birds dimension acording to bg. img.
        this.width = 17 * this.context.canvas.width /144;
        this.heigth = 12 * this.context.canvas.heigth /256;

    }


draw(frame){
    frame = Math.floor(frame * 9/vars.FPS);
    this.position.y = Math.max(0, this.position.y-vars.GRAVITY);
    this.context.drawImage(
        this.sprite,
        this.frames[frame%this.frames.length].x,
        this.frames[frame%this.frames.length].y,
        17, 12,
        this.position.x, this.position.y,// bird position in canvas
        this.width, this.heigth
        )//bird dimension on canvas
    }

jump(){
    this.position.y += vars.GRAVITY * vars.FPS * .6; 
    }

isTouchingGround(ground){
    return(this.position.y + this.heigth) > (this.context.canvas.heigth - ground.heigth)
    }
isTouchingColumn(columns){
    if((this.position.x + this.width)>columns.position.x){
        if (this.position.y < columns.gapTopPosition ||
            this.position.y > (columns.gapTopPosition + columns.gap))
            {
            return true;
            }
        }
    return false;
    }

}
