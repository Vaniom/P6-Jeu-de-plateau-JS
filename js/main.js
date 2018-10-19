$(function(){
    $('#generateMap').click(function(){ //event listener
        gridArray.splice(0, 100);
        var grid = new Grid("myMap");
        grid.createElements();
        console.log(gridArray);
        grid.draw();
        var playerOne;
        var playerTwo;
        // Recupération des objets Player dans des variables
        for(var i = 0; i < gridArray.length; i++){
            if (gridArray[i].classe === "playerOne"){
                playerOne = gridArray[i];
            } else if (gridArray[i].classe === "playerTwo"){
                playerTwo = gridArray[i];
            }
        }
        
        playerOne.animate();// appelle la fonction sur l'objet Player, ne pas faire de second appel pour playerTwo, sinon on lance deux fois la fonction sur les mêmes objets!

        $('#generateMap').hide();
    })
})