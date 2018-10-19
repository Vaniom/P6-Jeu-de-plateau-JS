$(function(){
    var playerOne;
    function animatePlayerOne(){
        console.log("keypress - grid Array = " + myMap)
        for(var i = 0; i < gridArray.length; i++){
            if (gridArray[i].classe === "playerOne"){
                playerOne = gridArray[i];
            }
            console.log("playerOne = " + playerOne.classe);
        }
        $(document).keydown(function(e){
            if(e.which == 39){// ASCII fleche droite
                alert("A droite");
                var posX = playerOne.x;
                var posY = playerOne.y;

            }
            
        })
    }
    setTimeout(animatePlayerOne, 3000);
    //animatePlayerOne();
})