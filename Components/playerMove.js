import { Component, Vector2 } from "../GameEngine.js";

export default class PlayerMove extends Component{
    constructor(){
        super();
        this.name = 'playerMove';
        this.collider = null;
        this.moveSpeed = 60;
        this.inputs = [];//new 2/4

        //uncomment out later
        //this.gravityVector = Vector2.DOWN.scalar(5);

        // this.velocity = Vector2.ZERO;
        // this.move = new Vector2(0,0);
        // this.jumpVector = new Vector2(0,-4);
        

        document.addEventListener('keydown', e=>{
            this.addInput(e.code)//changed name of function 2/4
        });
    }

    onStart(){//things that I need but cant do until attached to parent(_addComponent)
        this.collider = this.parent._getComponentByName('boxCollider');
        //console.log(this.parent.engine)
    }

    addInput(code){//changed name of function 2/4
        switch(code) {
            case "ArrowUp":
                //this.inputObject.y = -this.moveSpeed
                this.inputs.push(new Vector2(0, -this.moveSpeed))
                break;
            case "ArrowDown":
                //this.inputObject.y = this.moveSpeed;
                this.inputs.push(new Vector2(0, this.moveSpeed))
                break;
            case "ArrowRight":
                //this.inputObject.x = this.moveSpeed;
                this.inputs.push(new Vector2(this.moveSpeed, 0))
                break;
            case "ArrowLeft":
                this.inputs.push(new Vector2(-this.moveSpeed, 0))
                //this.inputObject.x  = -this.moveSpeed;
                break;
            // case "Space": //jump //new 2/4
            //     this.inputs.push(new Vector2(0, -200))
            //     break;
            default:
                break
        }
        
    }

    // gravity(dMove, delta){
    //     if (!this.collider.checkCollisions(this.transform.position.add(Vector2.DOWN))){
    //         //this.inputs.push(new Vector2(0, 1))  //Gravity, but causes lag
    //         dMove = dMove.add(this.gravityVector);
    //     }else {
    //         //this.inputs.push(new Vector2(0, 0))
    //     }
    //     return dMove;
    // }

    update(delta){
        let dMove = Vector2.ZERO;
        while (this.inputs.length > 0){
            dMove = dMove.add(this.inputs.shift()) //shift removes first item of an array
        }

        //dMove = this.gravity(dMove,delta);///////////////////////

        //Currently Working On!!
        //this.transform.position = this.transform.position.add(this.velocity);//delta
        //console.log(this.transform.position);
        //this.velocity = this.velocity * dMove * delta;
        //console.log(this.transform.position, this.velocity);

        try{
            dMove = dMove.scalar(delta);
            dMove = this.transform.position.add(dMove);
            if (! this.collider.checkCollisions(dMove)){//collider
                this.transform.position = dMove;
            }
        }

        catch(error){

        }
        //this.transform.position = dMove
        // this.inputObject.x = 0;//reset input (so it does not keep moving)
        // this.inputObject.y = 0;
    }

    // onCollision(col){
    //     console.log(col);
    // }
}