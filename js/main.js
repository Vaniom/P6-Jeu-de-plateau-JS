$(function(){
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
    $('#initBtn').click(function(){
        playOpening();
        $('#cadreMap').show();
        $('#audioOff').show();
        $('#initBtn').hide();
        $('#generateMap').show();
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
        setTimeout(grid.flipCoin, 1000);    
    })
})