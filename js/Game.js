class Game{
    constructor()   {}

    getState(){
        var gameStateRef= database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState= data.val();
        });
    }
    update(state){
        database.ref('/').update({
            'gameState':state
        });
    }

    async start(){
        if(gameState===0){
            player= new Player();
            var playerCountRef= await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount=playerCountRef.val();
                player.getCount();
            }
            form= new Form();
            form.display();
        }
        car1=createSprite(100,200);
        car1.addImage("car1",car1img);
        car2=createSprite(300,200);
        car2.addImage("car2",car2img);
        car3=createSprite(500,200);
        car3.addImage("car3",car3img);
        car4=createSprite(700,200);
        car4.addImage("car4",car4img);
        cars=[car1,car2,car3,car4];
    }

    play(){
        background(groundimg);
        image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5);
        form.hidefunction();
        //textSize(30);
        //text("Game Start",120,100);
        player.readFinishLine();
        Player.getPlayerInfo();
        if(allPlayers!== undefined){
            var index=0;
            var x=210;
           // var  display_position=130;
            for(var plr in allPlayers){
                index+=1;
                x+=250;
                cars[index-1].x=x;
                cars[index-1].y= displayHeight-allPlayers[plr].distance;
                if(index===player.index){
                    //cars[index-1].shapeColor="red";
                    //fill("black");
                    //ellipse(cars[index-1].x,cars[index-1].y,120,120);
                    fill("white");
                    textSize(30);
                    text(player.name,cars[index-1].x-40,cars[index-1].y+70);
                    camera.position.x=displayWidth/2;
                    camera.position.y=cars[index-1].y;
                }
               
                //display_position+=20;
                //textSize(20);
               // text(allPlayers[plr].name+ " : "+allPlayers[plr].distance,120,display_position);

            }
        }

        
        if(gameState===1)   {
            if(keyDown(UP_ARROW)&& player.index!==null){
                player.distance+=20;
                player.update();
            }
        }
        if(player.distance>5000)    {
            gameState = 2;
            player.rank+=1;
            Player.updateFinishLine(player.rank);
        }
        drawSprites();
    }

    end()   {
        console.log("game ended");
        this.update(2);
        console.log(player.rank);
    }
}