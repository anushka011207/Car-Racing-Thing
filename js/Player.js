class Player {
    constructor(){
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.rank = 0;
    }
    getCount(){
        var playerCountRef= database.ref('playerCount');
        playerCountRef.on("value",(data)=>{
            playerCount= data.val();
        });
    }
    
    update(){
        var playerIndex= "players/player"+this.index;
        database.ref(playerIndex).set({
            'name':this.name,
            'distance':this.distance
        });
    }
    
    updateCount(count){
        database.ref('/').update({
            'playerCount':count
        });
    }

    readFinishLine()    {
        var finishLineCountRef= database.ref('finishLinePlayers');
        finishLineCountRef.on("value",(data)=>{
            this.rank = data.val();
        });
    }

    static updateFinishLine(count) {
        database.ref('/').update({
            'finishLinePlayers':count
        });
    }

    static getPlayerInfo()  {
        var playerInfoRef= database.ref('players');
        playerInfoRef.on("value",(data)=>{
            allPlayers = data.val();
        });
    }
}