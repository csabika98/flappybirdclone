import Ground from "./ground.js";
import vars from "./vars.js";

export default class Bird{
    constructor(context, sprite){
        this.context = context;
        this.sprite = sprite;
        this.position = {x:25, y:0}//position of the bird
        this.frames = [
            {x:3, y:486},
            {x:31, y:486},
            {x:59, y:486}
            ];// bird on spire
        //birds dimension acording to bg. img.
        this.width = 20 * this.context.canvas.width /144;
        this.height = 20 * this.context.canvas.height /256;

        }   


    draw(frame){
    //regular frame. spirte seems 9 fps
        frame = Math.floor(frame * 9/vars.FPS);
    //add gravity
        this.position.y = Math.max(0, this.position.y - vars.GRAVITY);
        this.context.drawImage(
            this.sprite,
            this.frames[frame%this.frames.length].x,
            this.frames[frame%this.frames.length].y,
            20, 20,
            this.position.x, this.position.y,// bird position in canvas
            this.width, this.height
            )//bird dimension on canvas
    }

    jump(){
        this.position.y += vars.GRAVITY * vars.FPS * .3; 
    }

    isTouchingGround(ground){
        return(this.position.y + this.height) > (this.context.canvas.height - ground.height)
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
