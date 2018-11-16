var playerOne;
var playerTwo;
for (var m = 0; m < gridArray.length; m++) {
    if (gridArray[m].classe === "playerOne") {
        //here = m;
        playerOne = gridArray[m];
    }
}
for (var m = 0; m < gridArray.length; m++) { 
    if( gridArray[m].classe === "playerTwo") {
        //hereTwo = m;
        playerTwo = gridArray[m];
    }
}
function Game(){
    this.init = function(){
        var message = document.createElement('div');
        message.className = "initMessage";
        //message.innerHTML = "<img src='media/opening.png' alt='Steve versus Link' heigth='600px' />";
        $('#map').append(message);
        $('.openingAudio').trigger('load');
        function playOpening(){
            $('.openingAudio').trigger('play');
        }
        function stopOpening(){
            $('.openingAudio').trigger('pause');
        }
        $('#audioOn').click(function(){
            playOpening();
            $('#audioOn').hide();
            $('#audioOff').show();
        })
        $('#audioOff').click(function(){
            stopOpening();
            $('#audioOff').hide();
            $('#audioOn').show();
        })
        
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
            
            setTimeout(playerOne.animate, 2000);// appelle la fonction sur l'objet Player, ne pas faire de second appel pour playerTwo, sinon on lance deux fois la fonction sur les mêmes objets (et on double les valeurs de deplacement!)

            $('#generateMap').hide();  //Masquage du bouton
            $('#cadreLog').show();
            $('#perso1').show();
            $('#perso2').show();
            playOpening();
            $('#audioOff').show();
            $('#log').html("<p>Joueur 1: Utiliser les flèches pour se déplacer, touche Entrée pour finir.</p><p>Joueur 2: Touches A Z E S pour se déplacer, Espace pour finir.</p>");
            setTimeout(grid.flipCoin, 1000);
        })
    };
    this.infoBox = function(){
        $('#pdv1').text(playerOne.pdv);
        $('#arme1').text(playerOne.equiped);
        $('#pdv2').text(playerTwo.pdv);
        $('#arme2').text(playerTwo.equiped);
    }
}