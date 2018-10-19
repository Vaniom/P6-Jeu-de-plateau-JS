var playerOne;
var playerTwo;

function Player(classe, x, y) {
    this.classe = classe;
    this.x = x;
    this.y = y;
    this.pdv = 100;
    this.equiped = "epée en bois";
    this.animate = function(){
        console.log("keypress - gridArray = " + gridArray[0].classe);
            for(var i = 0; i < gridArray.length; i++){
                if (gridArray[i].classe === "playerOne"){
                    playerOne = gridArray[i];
                } else if (gridArray[i].classe === "playerTwo"){
                    playerTwo = gridArray[i];
                }
            }
        console.log("playerOne = " + playerOne.classe);
        console.log("playerTwo = " + playerTwo.classe);
        $(document).keydown(function(e){
            if(e.which == 39){// ASCII fleche droite
                alert("A droite");
                var posX = playerOne.x;
                console.log("playerOne.x = " + playerOne.x);
                var posY = playerOne.y;

            } else if(e.which == 37){// ASCII fleche gauche
                alert("A gauche");
            }
                
        })
    }
}