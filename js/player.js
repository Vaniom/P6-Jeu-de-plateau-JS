var playerOne;
var playerTwo;

function Player(classe, x, y) {
    this.classe = classe;
    this.accessible = false;
    this.x = x;
    this.y = y;
    this.pdv = 100;
    this.moveCount = 0;
    this.equiped = "epée en bois";
    this.animate = function(){
        var plop = new Audio('media/plop.mp3');
        function plopPlay(){
            plop.play();
        }
        $(document).keydown(function(e){           
            if(e.which == 39){// ASCII Right arrow
                var here;
                for (var m = 0; m < gridArray.length; m++){
                    if(gridArray[m].classe === "playerOne"){
                        here = m;
                        playerOne = gridArray[m];
                    }
                }    
                console.log("here = " + here);
                if(playerOne.x < 540){
                    if(gridArray[here + 1].accessible === true){
                        playerOne.x = playerOne.x + 60;
                        var grassNew = new Box("grass", playerOne.x, playerOne.y);
                        gridArray.splice(here + 1, 1, playerOne);
                        gridArray.splice(here, 1, grassNew);
                        playerOne.moveCount++;
                        plopPlay()
                    }else {}
                }else{}
                console.log("playerOne.x = " + playerOne.x); 
                console.log("compteur = " + playerOne.moveCount);
            }else if(e.which == 37){// ASCII left arrow
                var here;
                for (var m = 0; m < gridArray.length; m++){
                    if(gridArray[m].classe === "playerOne"){
                        here = m;
                        playerOne = gridArray[m];
                    }
                }           
                console.log("here = " + here);
                if(playerOne.x > 0){
                    if(gridArray[here - 1].accessible === true){
                        playerOne.x = playerOne.x - 60;
                        var grassNew = new Box("grass", playerOne.x, playerOne.y);
                        gridArray.splice(here - 1, 1, playerOne);
                        gridArray.splice(here, 1, grassNew);
                        playerOne.moveCount++;
                        plopPlay()
                    }else {}
                }else{}
                console.log("playerOne.x = " + playerOne.x); 
                console.log("compteur = " + playerOne.moveCount);

            }else if(e.which == 38){// Fleche UP
                var here;
                for (var m = 0; m < gridArray.length; m++){
                    if(gridArray[m].classe === "playerOne"){
                        here = m;
                        playerOne = gridArray[m];
                    }
                }           
                console.log("here = " + here);
                if(playerOne.y > 0){
                    if(gridArray[here - 10].accessible === true){
                        playerOne.y = playerOne.y - 60;
                        var grassNew = new Box("grass", playerOne.x, playerOne.y);
                        gridArray.splice(here - 10, 1, playerOne);
                        gridArray.splice(here, 1, grassNew);
                        playerOne.moveCount++;
                        plopPlay()
                    }else {}
                }else{}
                console.log("playerOne.y = " + playerOne.y); 
                console.log("compteur = " + playerOne.moveCount);

            }else if(e.which == 40){//fleche DOWN
                var here;
                for (var m = 0; m < gridArray.length; m++){
                    if(gridArray[m].classe === "playerOne"){
                        here = m;
                        playerOne = gridArray[m];
                    }
                }           
                console.log("here = " + here);
                if(playerOne.y < 540){
                    if(gridArray[here + 10].accessible === true){
                        playerOne.y = playerOne.y + 60;
                        var grassNew = new Box("grass", playerOne.x, playerOne.y);
                        gridArray.splice(here + 10, 1, playerOne);
                        gridArray.splice(here, 1, grassNew);
                        playerOne.moveCount++;
                        plopPlay()
                    }else {}
                }else{}
                console.log("playerOne.y = " + playerOne.y); 
                console.log("compteur = " + playerOne.moveCount);

            }else if(e.which == 69) {//Touche E
                var here;
                for (var m = 0; m < gridArray.length; m++){
                    if(gridArray[m].classe === "playerTwo"){
                        here = m;
                        playerTwo = gridArray[m];
                    }
                }             
                console.log("here = " + here);
                if(playerTwo.x < 540){
                    if(gridArray[here + 1].accessible === true){
                        playerTwo.x = playerTwo.x + 60;
                        var grassNew = new Box("grass", playerTwo.x, playerTwo.y);
                        gridArray.splice(here + 1, 1, playerTwo);
                        gridArray.splice(here, 1, grassNew);
                        playerTwo.moveCount++;
                        plopPlay()
                    }else {}
                }else{}
                console.log("playerOne.x = " + playerTwo.x); 
                console.log("compteur = " + playerTwo.moveCount);
            }else if(e.which == 65) {//Touche A
                var here;
                for (var m = 0; m < gridArray.length; m++){
                    if(gridArray[m].classe === "playerTwo"){
                        here = m;
                        playerTwo = gridArray[m];
                    }
                }          
                console.log("here = " + here);
                if(playerTwo.x > 0){
                    if(gridArray[here - 1].accessible === true){
                        playerTwo.x = playerTwo.x - 60;
                        var grassNew = new Box("grass", playerTwo.x, playerTwo.y);
                        gridArray.splice(here - 1, 1, playerTwo);
                        gridArray.splice(here, 1, grassNew);
                        playerTwo.moveCount++;
                        plopPlay()
                    }else {}
                }else{}
                console.log("playerTwo.x = " + playerTwo.x); 
                console.log("compteur = " + playerTwo.moveCount);
            }else if(e.which == 90) {//Touche Z
                var here;
                for (var m = 0; m < gridArray.length; m++){
                    if(gridArray[m].classe === "playerTwo"){
                        here = m;
                        playerTwo = gridArray[m];
                    }
                }
                console.log("here = " + here);
                if(playerTwo.y > 0){
                    if(gridArray[here - 10].accessible === true){
                        playerTwo.y = playerTwo.y - 60;
                        var grassNew = new Box("grass", playerTwo.x, playerTwo.y);
                        gridArray.splice(here - 10, 1, playerTwo);
                        gridArray.splice(here, 1, grassNew);
                        playerTwo.moveCount++;
                        plopPlay()
                    }else {}
                }else{}
                console.log("playerTwo.y = " + playerTwo.y); 
                console.log("compteur = " + playerTwo.moveCount);
            }else if(e.which == 83) {//Touche S
                var here;
                for (var m = 0; m < gridArray.length; m++){
                    if(gridArray[m].classe === "playerTwo"){
                        here = m;
                        playerTwo = gridArray[m];
                    }
                }
                console.log("here = " + here);
                if(playerTwo.y < 540){
                    if(gridArray[here + 10].accessible === true){
                        playerTwo.y = playerTwo.y + 60;
                        var grassNew = new Box("grass", playerTwo.x, playerTwo.y);
                        gridArray.splice(here + 10, 1, playerTwo);
                        gridArray.splice(here, 1, grassNew);
                        playerTwo.moveCount++;
                        plopPlay()
                    }else {}
                }else{}
                console.log("playerTwo.y = " + playerTwo.y); 
                console.log("compteur = " + playerTwo.moveCount);
            }
        })
    }
}