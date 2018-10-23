$(function(){
    $('#generateMap').click(function(){ //event listener
        gridArray.splice(0, 100);// on nettoie le tableau des objets
        var grid = new Grid("myMap"); // on crée une nouvelle map
        grid.createElements(); // on y place les éléments (pierres, armes, personnages)
        console.log(gridArray); // contrôle du bon remplissage du tableau
        grid.draw(); // On affiche les objets créés
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
        
        playerOne.animate();// appelle la fonction sur l'objet Player, ne pas faire de second appel pour playerTwo, sinon on lance deux fois la fonction sur les mêmes objets (et on double les valeurs de deplacement!)

        $('#generateMap').hide();  //Masquage du bouton 
    
    })
})