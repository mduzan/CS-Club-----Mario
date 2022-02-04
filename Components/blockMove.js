import { Component, Vector2 } from "../GameEngine.js";

export default class BlockMove extends Component{
    constructor(){
        super();
        this.name = "blockMove";
        this.move = new Vector2(0, 0);
        this.collider = null;
    }


    onStart(){//things that I need but cant do until attached to parent(_addComponent)  
        this.collider = this.parent._getComponentByName('boxCollider');
    }

    update(delta){
        this.move.x = -1;
        //gravity
        if (!this.collider.checkCollisions(this.transform.position.add(Vector2.DOWN))){
            this.move.y = 1;
        }else {
            this.move.y = 0;
        }
        //console.log(this.move)
        let dMove = this.transform.position.add(this.move);

        if (! this.collider.checkCollisions(dMove)){//collider
            this.transform.position = dMove;
        }
    }
}