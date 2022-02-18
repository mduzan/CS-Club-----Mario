import * as GE from "./GameEngine.js";
import PlayerMove from "./Components/playerMove.js";
import BlockMove from "./Components/blockMove.js";


class Game extends GE.GameEngine{
    constructor(canvas){
        super(canvas)
        
        // set up canvas
        const view = new GE.Vector2(window.innerWidth*(2/3), window.innerHeight*(2/3));
        const screenCenter = new GE.Vector2(window.innerWidth/2, window.innerHeight/2);
        
        this._canvas.canvas.width = view.x;
        this._canvas.canvas.height = view.y;
        this._canvas.canvas.style.position = 'absolute';
        this._canvas.canvas.style.left = screenCenter.x - (view.x/2) + 'px';
        this._canvas.canvas.style.top = screenCenter.y - (view.y/2) + 'px';
        this._canvas.canvas.style.backgroundColor = "black";

        //set up camera
        this._camera.updateBaseResolution(new GE.Vector2(640, 320));//what camera can see in world
        this._camera.updateViewPort(view);//what user can see (how big the picture is on the monitor)
        


        //add a player
        const player = new GE.Entity(0, 0, 32, 32);
        this._addEntity(player);//new
        player.name = "Player";
        player._addComponent(new GE.Primitive(new GE.Vector2(32, 32), 'red', true));
        player._addComponent(new GE.BoxCollider(this._colliders));//new
        player._addComponent(new PlayerMove());



        //End of last session
        //Add ground with collision
        const ground = new GE.Entity (70, 150, 700, 50);
        this._addEntity(ground);
        ground.name = "ground";
        ground._addComponent(new GE.Primitive(new GE.Vector2(700, 50), 'blue', true));
        ground._addComponent(new GE.BoxCollider(this._colliders));

        //add vertical collision block
        // const collisionBlock = new GE.Entity (-50, 70, 25, 100);
        // this._addEntity(collisionBlock);
        // collisionBlock.name = "collisionBlock";
        // collisionBlock._addComponent(new GE.Primitive(new GE.Vector2(25, 100), 'purple', true));
        // collisionBlock._addComponent(new GE.BoxCollider(this._colliders));

        
        //Add a moving block w/ colliders
        // const movingBlock = new GE.Entity(100, 70, 32, 32);
        // this._addEntity(movingBlock);
        // movingBlock.name = "movingBlock";
        // movingBlock._addComponent(new GE.Primitive(new GE.Vector2(32, 32), 'white', true));
        // movingBlock._addComponent(new GE.BoxCollider(this._colliders));
        // movingBlock._addComponent(new BlockMove());
        //console.log(movingBlock);


        //using prefab example
        // const player2 = new player(100, 100);
        // const goombas = [
        //     [130, 100], [175, 100]
        // ];
        // goombas.forEach(goomba =>{
        //     this._addEntity(new goomba(g[0], g[1]))
        // })

        //delta tracks time between frames
        //game loop
        this._gameLoop()
    }
    cubeEntity(position,size,color){
        const collisionBlock = new GE.Entity (-50, 70, 25, 100);
        this._addEntity(collisionBlock);
        collisionBlock.name = "collisionBlock";
        collisionBlock._addComponent(new GE.Primitive(new GE.Vector2(25, 100), 'purple', true));
        collisionBlock._addComponent(new GE.BoxCollider(this._colliders));
    }
}


//////
const canvas = document.querySelector('canvas');
const game = new Game(canvas);