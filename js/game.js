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
                    
            setTimeout(myGame.animate, 2000);// On appelle la fonction d'animation avec un délai de 2 secondes.

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
    };
    //-------------Animation des joueurs---------------------------//
    this.animate = function () {
        $('.plopAudio').trigger('load');

        function plopPlay() { // fonction d'appel du fichier audio créé
            $('.plopAudio').volume = 0.0;
            $('.plopAudio').trigger('play');
        }

        var here;
        var hereTwo;
        for (var m = 0; m < gridArray.length; m++) {
            if (gridArray[m].classe === "playerOne") {
                here = m;
                playerOne = gridArray[m];
            }
        }
        for (var m = 0; m < gridArray.length; m++) { 
            if( gridArray[m].classe === "playerTwo") {
                hereTwo = m;
                playerTwo = gridArray[m];
            }
        }

        function path(index) { // définit le chemin possible pour le joueur actif (mouvement haut bas gauche droite de 1 à 3 cases)
            if ((gridArray[index].x < 540) && (gridArray[index + 1].accessible === true)) {
                gridArray[index + 1].path = true;
                //console.log("case + 1 path = " + gridArray[here + 1].path);
                if ((gridArray[index].x < 480) && (gridArray[index + 2].accessible === true)) {
                    gridArray[index + 2].path = true;
                    if ((gridArray[index].x < 420) && (gridArray[index + 3].accessible === true)) {
                        gridArray[index + 3].path = true;
                    } else {}
                } else {}
            } else {}
            if ((gridArray[index].x > 0) && (gridArray[index - 1].accessible === true)) {
                gridArray[index - 1].path = true;
                if ((gridArray[index].x > 60) && (gridArray[index - 2].accessible === true)) {
                    gridArray[index - 2].path = true;
                    if ((gridArray[index].x > 120) && (gridArray[index - 3].accessible === true)) {
                        gridArray[index - 3].path = true;
                    } else {}
                } else {}
            } else {}
            if ((gridArray[index].y > 0) && (gridArray[index - 10].accessible === true)) {
                gridArray[index - 10].path = true;
                if ((gridArray[index].y > 60) && (gridArray[index - 20].accessible === true)) {
                    gridArray[index - 20].path = true;
                    if ((gridArray[index].y > 120) && (gridArray[index - 30].accessible === true)) {
                        gridArray[index - 30].path = true;
                    } else {}
                } else {}
            } else {}
            if ((gridArray[index].y < 540) && (gridArray[index + 10].accessible === true)) {
                gridArray[index + 10].path = true;
                if ((gridArray[index].y < 480) && (gridArray[index + 20].accessible === true)) {
                    gridArray[index + 20].path = true;
                    if ((gridArray[index].y < 420) && (gridArray[index + 30].accessible === true)) {
                        gridArray[index + 30].path = true;
                    } else {}
                } else {}
            } else {}
        }
       
          if(playerOne.active === true){
              path(here);
          }else if(playerTwo.active === true){
              path(hereTwo);
          }

        function changePath(index) { //rend le chemin impossible sur les cases définies.
            if (typeof (gridArray[index]) != 'undefined') {
                gridArray[index].path = false;
            }
        }
//------------------------------------------------------------------------------------------------//
        document.addEventListener("keydown", event);
        function event(e) {
            if (playerOne.active === true) {
                if (e.which == 39) { // ASCII Right arrow
                    var here;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerOne") {
                            here = m;
                            playerOne = gridArray[m];
                        }
                    }
                    if (gridArray[here + 1].path === true) {
                        if (gridArray[here + 1].weapon === true) {
                            var previousWeapon = playerOne.equiped;
                            var previousDamage = playerOne.damage;
                            var newWeapon = gridArray[here + 1].classe;
                            var newDamage = gridArray[here + 1].damage;
                            playerOne.x = playerOne.x + 60;
                            changePath(here - 1);
                            changePath(here - 2);
                            changePath(here - 3);
                            changePath(here + 10);
                            changePath(here + 20);
                            changePath(here + 30);
                            changePath(here - 10);
                            changePath(here - 20);
                            changePath(here - 30);
                            var weaponDeposit = new Weapon(previousWeapon, playerOne.x, playerOne.y, previousDamage);                            
                            weaponDeposit.path = false;
                            gridArray.splice(here + 1, 1, playerOne);
                            playerOne.equiped = newWeapon;
                            playerOne.damage = newDamage;
                            gridArray.splice(here, 1, weaponDeposit);
                            playerOne.moveCount++;
                            plopPlay();        
                        }else {
                            playerOne.x = playerOne.x + 60;             
                            changePath(here - 1);
                            changePath(here - 2);
                            changePath(here - 3);
                            changePath(here + 10);
                            changePath(here + 20);
                            changePath(here + 30);
                            changePath(here - 10);
                            changePath(here - 20);
                            changePath(here - 30);
                        
                            var grassNew = new Box("grass", playerOne.x, playerOne.y);
                            grassNew.path = false;
                            gridArray.splice(here + 1, 1, playerOne);
                            gridArray.splice(here, 1, grassNew);
                            playerOne.moveCount++;
                            plopPlay();
                        }    
                    
                    }
                    console.log("playerOne.x = " + playerOne.x);
                    console.log("compteur = " + playerOne.moveCount);
                    checkFight();
                } else if (e.which == 37) { // ASCII left arrow
                    var here;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerOne") {
                            here = m;
                            playerOne = gridArray[m];
                        }
                    }
                    if (gridArray[here - 1].path === true) {
                        if (gridArray[here - 1].weapon === true) {
                            var previousWeapon = playerOne.equiped;
                            var previousDamage = playerOne.damage;
                            var newWeapon = gridArray[here - 1].classe;
                            var newDamage = gridArray[here - 1].damage;
                            playerOne.x = playerOne.x - 60;
                            changePath(here + 1);
                            changePath(here + 2);
                            changePath(here + 3);
                            changePath(here + 10);
                            changePath(here + 20);
                            changePath(here + 30);
                            changePath(here - 10);
                            changePath(here - 20);
                            changePath(here - 30);
                            var weaponDeposit = new Weapon(previousWeapon, playerOne.x, playerOne.y, previousDamage);                            
                            weaponDeposit.path = false;
                            gridArray.splice(here - 1, 1, playerOne);
                            playerOne.equiped = newWeapon;
                            playerOne.damage = newDamage;
                            gridArray.splice(here, 1, weaponDeposit);
                            playerOne.moveCount++;
                            plopPlay();
                        }else {
                            playerOne.x = playerOne.x - 60;                    

                            changePath(here + 1);
                            changePath(here + 2);
                            changePath(here + 3);
                            changePath(here + 10);
                            changePath(here + 20);
                            changePath(here + 30);
                            changePath(here - 10);
                            changePath(here - 20);
                            changePath(here - 30);
                        
                            var grassNew = new Box("grass", playerOne.x, playerOne.y);
                            grassNew.path = false;
                            gridArray.splice(here - 1, 1, playerOne);
                            gridArray.splice(here, 1, grassNew);
                            playerOne.moveCount++;
                            plopPlay();
                        }
                    }
                    
                    console.log("playerOne.x = " + playerOne.x);
                    console.log("compteur = " + playerOne.moveCount);
                    checkFight();
                } else if (e.which == 38) { // Fleche UP
                    var here;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerOne") {
                            here = m;
                            playerOne = gridArray[m];
                        }
                    }
                    if (gridArray[here - 10].path === true) {
                        if (gridArray[here - 10].weapon === true) {
                            var previousWeapon = playerOne.equiped;
                            var previousDamage = playerOne.damage;
                            var newWeapon = gridArray[here - 10].classe;
                            var newDamage = gridArray[here - 10].damage;
                            playerOne.y = playerOne.y - 60;
                            changePath(here - 1);
                            changePath(here - 2);
                            changePath(here - 3);
                            changePath(here + 10);
                            changePath(here + 20);
                            changePath(here + 30);
                            changePath(here + 1);
                            changePath(here + 2);
                            changePath(here + 3);
                            var weaponDeposit = new Weapon(previousWeapon, playerOne.x, playerOne.y, previousDamage);                            
                            weaponDeposit.path = false;
                            gridArray.splice(here - 10, 1, playerOne);
                            playerOne.equiped = newWeapon;
                            playerOne.damage = newDamage;
                            gridArray.splice(here, 1, weaponDeposit);
                            playerOne.moveCount++;
                            plopPlay();
                        }else {
                            playerOne.y = playerOne.y - 60;                    

                            changePath(here + 1);
                            changePath(here + 2);
                            changePath(here + 3);
                            changePath(here + 10);
                            changePath(here + 20);
                            changePath(here + 30);
                            changePath(here - 1);
                            changePath(here - 2);
                            changePath(here - 3);
                        
                            var grassNew = new Box("grass", playerOne.x, playerOne.y);
                            grassNew.path = false;
                            gridArray.splice(here - 10, 1, playerOne);
                            gridArray.splice(here, 1, grassNew);
                            playerOne.moveCount++;
                            plopPlay();
                        }
                    }
                    
                    console.log("playerOne.y = " + playerOne.y);
                    console.log("compteur = " + playerOne.moveCount);
                    checkFight();
                } else if (e.which == 40) { //fleche DOWN
                    var here;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerOne") {
                            here = m;
                            playerOne = gridArray[m];
                        }
                    }
                    if (gridArray[here + 10].path === true) {
                        if (gridArray[here + 10].weapon === true) {
                            var previousWeapon = playerOne.equiped;
                            var previousDamage = playerOne.damage;
                            var newWeapon = gridArray[here + 10].classe;
                            var newDamage = gridArray[here + 10].damage;
                            playerOne.y = playerOne.y + 60;
                            changePath(here - 1);
                            changePath(here - 2);
                            changePath(here - 3);
                            changePath(here + 1);
                            changePath(here + 2);
                            changePath(here + 3);
                            changePath(here - 10);
                            changePath(here - 20);
                            changePath(here - 30);
                            var weaponDeposit = new Weapon(previousWeapon, playerOne.x, playerOne.y, previousDamage);                            
                            weaponDeposit.path = false;
                            gridArray.splice(here + 10, 1, playerOne);
                            playerOne.equiped = newWeapon;
                            playerOne.damage = newDamage;
                            gridArray.splice(here, 1, weaponDeposit);
                            playerOne.moveCount++;
                            plopPlay();
                        }else {
                            playerOne.y = playerOne.y + 60;                    

                            changePath(here + 1);
                            changePath(here + 2);
                            changePath(here + 3);
                            changePath(here - 1);
                            changePath(here - 2);
                            changePath(here - 3);
                            changePath(here - 10);
                            changePath(here - 20);
                            changePath(here - 30);
                        
                            var grassNew = new Box("grass", playerOne.x, playerOne.y);
                            grassNew.path = false;
                            gridArray.splice(here + 10, 1, playerOne);
                            gridArray.splice(here, 1, grassNew);
                            playerOne.moveCount++;
                            plopPlay()
                        }
                    }
                
                    console.log("playerOne.y = " + playerOne.y);
                    console.log("compteur = " + playerOne.moveCount);
                    checkFight();
                }else if(e.which == 13){ // on change de joueur si on presse entrée
                    var here;
                    var hereTwo;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerOne") {
                            here = m;
                            playerOne = gridArray[m];
                        }
                        for (var n = 0; n < gridArray.length; n++) { 
                            if( gridArray[n].classe === "playerTwo") {
                                hereTwo = n;
                                playerTwo = gridArray[n];
                            }
                        }
                        changePath(here + 1);
                        changePath(here + 2);
                        changePath(here + 3);
                        changePath(here - 1);
                        changePath(here - 2);
                        changePath(here - 3);
                        changePath(here + 10);
                        changePath(here + 20);
                        changePath(here + 30);
                        changePath(here - 10);
                        changePath(here - 20);
                        changePath(here - 30);
                    }
                    playerOne.active = false;
                    playerTwo.active = true;
                    path(hereTwo);// affichage du chemin possible pour playerTwo
                }          
        //-----------------On passe au joueur 2-----------------//

            }else if (playerTwo.active === true) {
                //console.log("hereTwo = " + hereTwo);                    
                if (e.which == 69) { //Touche E
                    var hereTwo;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerTwo") {
                            hereTwo = m;
                            playerTwo = gridArray[m];
                        }
                    }
                    if (gridArray[hereTwo + 1].path === true) {
                        if (gridArray[hereTwo + 1].weapon === true) {
                            var previousWeapon = playerTwo.equiped;
                            var previousDamage = playerTwo.damage;
                            var newWeapon = gridArray[hereTwo + 1].classe;
                            var newDamage = gridArray[hereTwo + 1].damage;
                            playerTwo.x = playerTwo.x + 60;
                            changePath(hereTwo - 1);
                            changePath(hereTwo - 2);
                            changePath(hereTwo - 3);
                            changePath(hereTwo + 10);
                            changePath(hereTwo + 20);
                            changePath(hereTwo + 30);
                            changePath(hereTwo - 10);
                            changePath(hereTwo - 20);
                            changePath(hereTwo - 30);
                            var weaponDeposit = new Weapon(previousWeapon, playerTwo.x, playerTwo.y, previousDamage);                            
                            weaponDeposit.path = false;
                            gridArray.splice(hereTwo + 1, 1, playerTwo);
                            playerTwo.equiped = newWeapon;
                            playerTwo.damage = newDamage;
                            gridArray.splice(hereTwo, 1, weaponDeposit);
                            playerTwo.moveCount++;
                            plopPlay();
                        }else {
                            playerTwo.x = playerTwo.x + 60;                    

                            changePath(hereTwo - 1);
                            changePath(hereTwo - 2);
                            changePath(hereTwo - 3);
                            changePath(hereTwo + 10);
                            changePath(hereTwo + 20);
                            changePath(hereTwo + 30);
                            changePath(hereTwo - 10);
                            changePath(hereTwo - 20);
                            changePath(hereTwo - 30);
                        
                            var grassNew = new Box("grass", playerTwo.x, playerTwo.y);
                            grassNew.path = false;
                            gridArray.splice(hereTwo + 1, 1, playerTwo);
                            gridArray.splice(hereTwo, 1, grassNew);
                            playerTwo.moveCount++;
                            plopPlay();
                        }
                    }
                    console.log("playerTwo.x = " + playerTwo.x);
                    console.log("compteur = " + playerTwo.moveCount);
                    checkFight();
                } else if (e.which == 65) { //Touche A
                    var hereTwo;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerTwo") {
                            hereTwo = m;
                            playerTwo = gridArray[m];
                        }
                    }
                    if (gridArray[hereTwo - 1].path === true) {
                        if (gridArray[hereTwo - 1].weapon === true) {
                            var previousWeapon = playerTwo.equiped;
                            var previousDamage = playerTwo.damage;
                            var newWeapon = gridArray[hereTwo - 1].classe;
                            var newDamage = gridArray[hereTwo - 1].damage;
                            playerTwo.x = playerTwo.x + 60;
                            changePath(hereTwo + 1);
                            changePath(hereTwo + 2);
                            changePath(hereTwo + 3);
                            changePath(hereTwo + 10);
                            changePath(hereTwo + 20);
                            changePath(hereTwo + 30);
                            changePath(hereTwo - 10);
                            changePath(hereTwo - 20);
                            changePath(hereTwo - 30);
                            var weaponDeposit = new Weapon(previousWeapon, playerTwo.x, playerTwo.y, previousDamage);                            
                            weaponDeposit.path = false;
                            gridArray.splice(hereTwo - 1, 1, playerTwo);
                            playerTwo.equiped = newWeapon;
                            playerTwo.damage = newDamage;
                            gridArray.splice(hereTwo, 1, weaponDeposit);
                            playerTwo.moveCount++;
                            plopPlay();
                        }else {
                            playerTwo.x = playerTwo.x - 60;                    

                            changePath(hereTwo + 1);
                            changePath(hereTwo + 2);
                            changePath(hereTwo + 3);
                            changePath(hereTwo + 10);
                            changePath(hereTwo + 20);
                            changePath(hereTwo + 30);
                            changePath(hereTwo - 10);
                            changePath(hereTwo - 20);
                            changePath(hereTwo - 30);
                        
                            var grassNew = new Box("grass", playerTwo.x, playerTwo.y);
                            grassNew.path = false;
                            gridArray.splice(hereTwo - 1, 1, playerTwo);
                            gridArray.splice(hereTwo, 1, grassNew);
                            playerTwo.moveCount++;
                            plopPlay();
                        }
                    }
                    console.log("playerTwo.x = " + playerTwo.x);
                    console.log("compteur = " + playerTwo.moveCount);
                    checkFight();
                } else if (e.which == 90) { //Touche Z
                    var hereTwo;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerTwo") {
                            hereTwo = m;
                            playerTwo = gridArray[m];
                        }
                    }
                    if (gridArray[hereTwo - 10].path === true) {
                        if (gridArray[hereTwo - 10].weapon === true) {
                            var previousWeapon = playerTwo.equiped;
                            var previousDamage = playerTwo.damage;
                            var newWeapon = gridArray[hereTwo - 10].classe;
                            var newDamage = gridArray[hereTwo - 10].damage;
                            playerTwo.y = playerTwo.y - 60;
                            changePath(hereTwo - 1);
                            changePath(hereTwo - 2);
                            changePath(hereTwo - 3);
                            changePath(hereTwo + 10);
                            changePath(hereTwo + 20);
                            changePath(hereTwo + 30);
                            changePath(hereTwo + 1);
                            changePath(hereTwo + 2);
                            changePath(hereTwo + 3);
                            var weaponDeposit = new Weapon(previousWeapon, playerTwo.x, playerTwo.y, previousDamage);                            
                            weaponDeposit.path = false;
                            gridArray.splice(hereTwo - 10, 1, playerTwo);
                            playerTwo.equiped = newWeapon;
                            playerTwo.damage = newDamage;
                            gridArray.splice(hereTwo, 1, weaponDeposit);
                            playerTwo.moveCount++;
                            plopPlay();
                        }else {
                            playerTwo.y = playerTwo.y - 60;                    

                            changePath(hereTwo + 1);
                            changePath(hereTwo + 2);
                            changePath(hereTwo + 3);
                            changePath(hereTwo + 10);
                            changePath(hereTwo + 20);
                            changePath(hereTwo + 30);
                            changePath(hereTwo - 1);
                            changePath(hereTwo - 2);
                            changePath(hereTwo - 3);
                        
                            var grassNew = new Box("grass", playerTwo.x, playerTwo.y);
                            grassNew.path = false;
                            gridArray.splice(hereTwo - 10, 1, playerTwo);
                            gridArray.splice(hereTwo, 1, grassNew);
                            playerTwo.moveCount++;
                            plopPlay();
                        }
                    }
                    console.log("playerTwo.y = " + playerTwo.y);
                    console.log("compteur = " + playerTwo.moveCount);
                    checkFight();
                } else if (e.which == 83) { //Touche S
                    var hereTwo;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerTwo") {
                            hereTwo = m;
                            playerTwo = gridArray[m];
                        }
                    }
                    if (gridArray[hereTwo + 10].path === true) {
                        if (gridArray[hereTwo + 10].weapon === true) {
                            var previousWeapon = playerTwo.equiped;
                            var previousDamage = playerTwo.damage;
                            var newWeapon = gridArray[hereTwo + 10].classe;
                            var newDamage = gridArray[hereTwo + 10].damage;
                            playerTwo.y = playerTwo.y + 60;
                            changePath(hereTwo - 1);
                            changePath(hereTwo - 2);
                            changePath(hereTwo - 3);
                            changePath(hereTwo - 10);
                            changePath(hereTwo - 20);
                            changePath(hereTwo - 30);
                            changePath(hereTwo + 1);
                            changePath(hereTwo + 2);
                            changePath(hereTwo + 3);
                            var weaponDeposit = new Weapon(previousWeapon, playerTwo.x, playerTwo.y, previousDamage);                            
                            weaponDeposit.path = false;
                            gridArray.splice(hereTwo + 10, 1, playerTwo);
                            playerTwo.equiped = newWeapon;
                            playerTwo.damage = newDamage;
                            gridArray.splice(hereTwo, 1, weaponDeposit);
                            playerTwo.moveCount++;
                            plopPlay();
                        }else {
                            playerTwo.y = playerTwo.y + 60;                    

                            changePath(hereTwo + 1);
                            changePath(hereTwo + 2);
                            changePath(hereTwo + 3);
                            changePath(hereTwo - 10);
                            changePath(hereTwo - 20);
                            changePath(hereTwo - 30);
                            changePath(hereTwo - 1);
                            changePath(hereTwo - 2);
                            changePath(hereTwo - 3);
                        
                            var grassNew = new Box("grass", playerTwo.x, playerTwo.y);
                            grassNew.path = false;
                            gridArray.splice(hereTwo + 10, 1, playerTwo);
                            gridArray.splice(hereTwo, 1, grassNew);
                            playerTwo.moveCount++;
                            plopPlay();
                        }
                    }
                    console.log("playerTwo.y = " + playerTwo.y);
                    console.log("compteur = " + playerTwo.moveCount);
                    checkFight();
                } else if(e.which == 32){ // touche espace pour finir son tour et passer au joueur 1
                    var here;
                    var hereTwo;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerOne") {
                            here = m;
                            playerOne = gridArray[m];
                        }
                    for (var n = 0; n < gridArray.length; n++) { 
                        if( gridArray[n].classe === "playerTwo") {
                            hereTwo = n;
                            playerTwo = gridArray[n];
                        }
                    }
                    changePath(hereTwo + 1);
                    changePath(hereTwo + 2);
                    changePath(hereTwo + 3);
                    changePath(hereTwo - 1);
                    changePath(hereTwo - 2);
                    changePath(hereTwo - 3);
                    changePath(hereTwo + 10);
                    changePath(hereTwo + 20);
                    changePath(hereTwo + 30);
                    changePath(hereTwo - 10);
                    changePath(hereTwo - 20);
                    changePath(hereTwo - 30);
                }
                playerOne.active = true;
                playerTwo.active = false;
                path(here);// affichage du chemin possible pour playerOne
                }
            
            }else {}
        };
        function checkFight(){ // verification des conditions pour lancer le combat
            for(var j = 0; j < gridArray.length; j++){
                if(gridArray[j].classe === "playerOne"){
                    if((gridArray[j+1].classe === "playerTwo") || (gridArray[j-1].classe === "playerTwo") || (gridArray[j-10].classe === "playerTwo") || (gridArray[j+10].classe === "playerTwo")){
                        fight();
                    }
                }else if(gridArray[j].classe === "playerTwo"){
                    if((gridArray[j+1].classe === "playerOne") || (gridArray[j-1].classe === "playerOne") || (gridArray[j-10].classe === "playerOne") || (gridArray[j+10].classe === "playerOne")){
                        fight();
                    }
                }
            }
        }
        function fight(){ // fonction combat
            $('.epeeAudio').trigger('load');
            $('.bouclierAudio').trigger('load');

        function epeePlay() {
            $('.epeeAudio').trigger('play');
        }
        function bouclierPlay() {
            $('.bouclierAudio').trigger('play');
        }
            document.removeEventListener("keydown", event);
            console.log("fight !!!");
            for(var i = 0; i < gridArray.length; i++){
                if(gridArray[i].path === true){
                    gridArray[i].path = false;
                }
            }
            var combatDiv = document.createElement("div");
            combatDiv.textContent = "COMBAT!!!";
            combatDiv.className = "combatDiv";
            $("#cadreMap").append(combatDiv);
            var timeoutID = setTimeout(function(){
                $(".combatDiv").hide();
            }, 1000);
            $('#log').innerHTML = "";
            $('#log').prepend("<p>Le combat commence!</p>");
            document.addEventListener("keydown", combatEvent);
            if(playerOne.active === true){
                $("#log").prepend("<p>Steve choisit sa posture de combat: K pour attaquer, M pour se défendre</p>");
            }else {
                $("#log").prepend("<p>Link choisit sa posture de combat: Q pour attaquer, D pour se défendre</p>");
            }
            function combatEvent(e){
                if((playerOne.pdv > 0) && (playerTwo.pdv > 0)){
                    if(playerOne.active === true){                        
                        if(e.which == 75){ // Touche K pour attaquer
                            playerTwo.pdv = playerTwo.pdv - playerOne.damage;
                            $('#log').prepend("<p>Steve attaque et inflige " + playerOne.damage + " pts de dégats à Link.</p>");
                            playerOne.active = false;
                            playerTwo.active = true;
                            epeePlay();
                        }else if(e.which == 77){ // Touche M pour defendre
                            playerOne.pdv = playerOne.pdv - (playerTwo.damage / 2);
                            var def1 = playerTwo.damage / 2;
                            $("#log").prepend("<p>Steve se défend et encaisse " + def1 + " pts de dégats.</p>");
                            playerOne.active = false;
                            playerTwo.active = true;
                            bouclierPlay();
                        }
                    }else {
                        if(e.which == 81){// Touche Q pour attaquer
                            playerOne.pdv = playerOne.pdv - playerTwo.damage;
                            $('#log').prepend("<p>Link attaque et inflige " + playerTwo.damage + " pts de dégats à Steve.</p>");
                            playerOne.active = true
                            playerTwo.active = false;
                            epeePlay();
                        }else if(e.which == 68){// touche D pour defendre
                            playerTwo.pdv = playerTwo.pdv - (playerOne.damage / 2);
                            var def2 = playerOne.damage / 2;
                            $("#log").prepend("<p>Link se défend et encaisse " + def2 + " pts de dégats.</p>");
                            playerOne.active = true;
                            playerTwo.active = false;
                            bouclierPlay();
                        }
                    }
                }else if(playerOne.pdv <= 0){
                    document.removeEventListener("keydown", combatEvent);
                    combatDiv.innerHTML = "";
                    combatDiv.textContent = "LINK A GAGNÉ !";
                    $('.combatDiv').show();
                    $("#log").prepend("<p>Game Over, Link a gagné !</p>");
                        //game over
                }else if(playerTwo.pdv <= 0){
                    document.removeEventListener("keydown", combatEvent);
                    combatDiv.innerHTML = "";
                    combatDiv.textContent = "STEVE A GAGNÉ !";
                    $('.combatDiv').show();
                    $("#log").prepend("<p>Game Over, Steve a gagné !</p>");
                }
            }
        } 
    } 
}