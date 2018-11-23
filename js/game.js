function Game() {
    var grid;
    var that = this;
    this.init = function () {
        var message = document.createElement('div');
        message.className = "initMessage";
        $('#map').append(message);
        $('.openingAudio').trigger('load');
        function playOpening() {
            $('.openingAudio').trigger('play');
        }
        function stopOpening() {
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
            grid = new Grid("myMap"); // on crée une nouvelle map
            grid.createElements(); // on y place les éléments (pierres, armes, personnages)
            console.log(grid.array); // contrôle du bon remplissage du tableau en console
            console.log("===> playerOne dans Objet = " + grid.playerOne().classe);
            console.log("espacementXbis = " + (Math.abs(grid.playerOne().x - grid.playerTwo().x)));
            console.log("espacementYbis = " + (Math.abs(grid.playerOne().y - grid.playerTwo().y)));
            grid.draw(); // On affiche les objets créés
            setTimeout(myGame.zone, 2000);// On appelle la fonction de zonage autour du personnage avec un délai de 2 secondes.
            document.addEventListener("keydown", that.event);// on ajoute un ecouteur d'evenement sur les touches pressées

            $('#generateMap').hide();
            $('#cadreLog').show();
            $('#perso1').show();
            $('#perso2').show();
            //playOpening();  // <=== commenter pour couper la musique par defaut
            $('#audioOff').show();
            $('#log').html("<p>Joueur 1: Utiliser les flèches pour se déplacer, touche Entrée pour finir.</p><p>Joueur 2: Touches A Z E S pour se déplacer, Espace pour finir.</p>");
            setTimeout(myGame.flipCoin, 1000);// tirage au sort pour designer celui qui commence
        })
    };
    this.flipCoin = function(){ //tirage au sort pour designer le joueur qui commence
        var coin = Math.floor(Math.random() * 2);
        console.log("coin = " + coin);
        console.log("playerOneCoin = " + grid.playerOne().classe);
        console.log("playerTwoCoin = " + grid.playerTwo().classe);
        var message = document.createElement('p');
        if(coin === 0){
            grid.playerOne().active = true;            
            message.textContent = "Steve commence ! ";
            $('#log').append(message);
        }else {
            grid.playerTwo().active = true;
            message.textContent = "Link commence ! ";
            $('#log').append(message);
        }
    };
    this.infoBox = function(){ // affichage des infos variables des joueurs: arme et pdv
        
        $('#pdv1').text(grid.playerOne().pdv);
        $('#arme1').text(grid.playerOne().equiped);
        $('#pdv2').text(grid.playerTwo().pdv);
        $('#arme2').text(grid.playerTwo().equiped);
    };
    this.indexArray = [];
    this.changePath = function (element) { //definition du chemin possible
        if(typeof (grid.array[element]) != 'undefined'){
            grid.array[element].path = false;
        }
    };
    this.here = function() {
        for (var m = 0; m < grid.array.length; m++) {
            if (grid.array[m].classe === "playerOne") {
                return m;
            }
        }
    };
    this.hereTwo = function () {
        for (var m = 0; m < grid.array.length; m++) {
            if ( grid.array[m].classe === "playerTwo") {
                return m;
            }
        }
    };
    this.zone = function () {
        var here = that.here();
        var hereTwo = that.hereTwo(); 
        if(grid.playerOne().active === true){
            grid.path(here);
        }else if(grid.playerTwo().active === true){
            grid.path(hereTwo);
        }
    };
    this.event = function (e) {
        $('.plopAudio').trigger('load');

        function plopPlay() { 
            $('.plopAudio').volume = 0.0;
            $('.plopAudio').trigger('play');
        }

        var here;
        var hereTwo;
        var gridArray = grid.array;
        var playerOne = grid.playerOne();
        var playerTwo = grid.playerTwo();
        if (playerOne.active === true) {
            if (e.which == 39) { // ASCII Right arrow 
                here = that.here();
                if (gridArray[here + 1].path === true) {
                    if (gridArray[here + 1].weapon === true) {
                        that.weaponSwitch(playerOne, here, +1);
                        playerOne.moveCount++;
                        plopPlay();        
                    }else {
                        playerOne.moveRight();
                        that.indexArray = [here - 1, here - 2, here - 3, here + 10, here + 20, here + 30, here - 10, here - 20, here - 30];
                        that.indexArray.forEach(that.changePath);        
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
                that.checkFight();
            } else if (e.which == 37) { // ASCII left arrow
                here = that.here();
                if (gridArray[here - 1].path === true) {
                    if (gridArray[here - 1].weapon === true) {
                        that.weaponSwitch(playerOne, here, -1);
                        playerOne.moveCount++;
                        plopPlay();
                    }else {
                        playerOne.moveLeft();                    
                        that.indexArray = [here + 1, here + 2, here + 3, here + 10, here + 20, here + 30, here - 10, here - 20, here - 30];
                        that.indexArray.forEach(that.changePath);
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
                that.checkFight();
            } else if (e.which == 38) { // Fleche UP
                here = that.here();
                if (gridArray[here - 10].path === true) {
                    here = that.here();
                    if (gridArray[here - 10].weapon === true) {
                       that.weaponSwitch(playerOne, here, -10);
                        playerOne.moveCount++;
                        plopPlay();
                    }else {
                        playerOne.moveUp();                    
                        that.indexArray = [here + 1, here + 2, here + 3, here + 10, here + 20, here + 30, here - 1, here - 2, here - 3];    
                        that.indexArray.forEach(that.changePath);
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
                that.checkFight();
            } else if (e.which == 40) { //fleche DOWN
                here = that.here();
                if (gridArray[here + 10].path === true) {
                    if (gridArray[here + 10].weapon === true) {
                       that.weaponSwitch(playerOne, here, +10);
                        playerOne.moveCount++;
                        plopPlay();
                    }else {
                        playerOne.moveDown();                    
                        that.indexArray = [here + 1, here + 2, here + 3, here - 1, here - 2, here - 3, here - 10, here - 20, here - 30];           
                        that.indexArray.forEach(that.changePath);
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
                that.checkFight();
            }else if(e.which == 13){ // on change de joueur si on presse entrée
                here = that.here();
                hereTwo = that.hereTwo();
                that.indexArray = [here + 1, here + 2, here + 3, here - 1, here - 2, here - 3, here - 10, here - 20, here - 30, here + 10, here + 20, here + 30];           
                that.indexArray.forEach(that.changePath);
                    
                //}
                playerOne.active = false;
                playerTwo.active = true;
                grid.path(hereTwo);// affichage du chemin possible pour playerTwo
            }          
    //-----------------On passe au joueur 2-----------------//

        }else if (playerTwo.active === true) {                   
            if (e.which == 69) { //Touche E (droite)
                hereTwo = that.hereTwo();
                if (gridArray[hereTwo + 1].path === true) {
                    if (gridArray[hereTwo + 1].weapon === true) {
                        that.weaponSwitch(playerTwo, hereTwo, +1);
                        playerTwo.moveCount++;
                        plopPlay();
                    }else {
                        playerTwo.x = playerTwo.x + 60;                    
                        that.indexArray = [hereTwo - 1, hereTwo - 2, hereTwo - 3, hereTwo + 10, hereTwo + 20, hereTwo + 30, hereTwo - 10, hereTwo - 20, hereTwo - 30];
                        that.indexArray.forEach(that.changePath);
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
                that.checkFight();
            } else if (e.which == 65) { //Touche A (gauche)
                hereTwo = that.hereTwo();
                if (gridArray[hereTwo - 1].path === true) {
                    if (gridArray[hereTwo - 1].weapon === true) {
                        that.weaponSwitch(playerTwo, hereTwo, -1);
                        playerTwo.moveCount++;
                        plopPlay();
                    }else {
                        playerTwo.moveLeft();                    
                        that.indexArray = [hereTwo + 1, hereTwo + 2, hereTwo + 3, hereTwo + 10, hereTwo + 20, hereTwo + 30, hereTwo - 10, hereTwo - 20, hereTwo - 30];
                        that.indexArray.forEach(that.changePath);
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
                that.checkFight();
            } else if (e.which == 90) { //Touche Z (haut)
                hereTwo = that.hereTwo();
                if (gridArray[hereTwo - 10].path === true) {
                    if (gridArray[hereTwo - 10].weapon === true) {
                        that.weaponSwitch(playerTwo, hereTwo, -10);
                        playerTwo.moveCount++;
                        plopPlay();
                    }else {
                        playerTwo.moveUp();                    
                        that.indexArray = [hereTwo + 1, hereTwo + 2, hereTwo + 3, hereTwo + 10, hereTwo + 20, hereTwo + 30, hereTwo - 1, hereTwo - 2, hereTwo - 3];
                        that.indexArray.forEach(that.changePath);
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
                that.checkFight();
            } else if (e.which == 83) { //Touche S (bas)
                hereTwo = that.hereTwo();
                if (gridArray[hereTwo + 10].path === true) {
                    if (gridArray[hereTwo + 10].weapon === true) {
                        that.weaponSwitch(playerTwo, hereTwo, +10);
                        playerTwo.moveCount++;
                        plopPlay();
                    }else {
                        playerTwo.moveDown();                    
                        that.indexArray = [hereTwo + 1, hereTwo + 2, hereTwo + 3, hereTwo - 10, hereTwo - 20, hereTwo - 30, hereTwo - 1, hereTwo - 2, hereTwo - 3];
                        that.indexArray.forEach(that.changePath);
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
                that.checkFight();
            } else if(e.which == 32){ // touche espace pour finir son tour et passer au joueur 1
                here = that.here();
                hereTwo = that.hereTwo();
                that.indexArray = [hereTwo + 1, hereTwo + 2, hereTwo + 3, hereTwo + 10, hereTwo + 20, hereTwo + 30, hereTwo - 1, hereTwo - 2, hereTwo - 3, hereTwo - 10, hereTwo - 20, hereTwo - 30];
                that.indexArray.forEach(that.changePath);
            //}
            playerOne.active = true;
            playerTwo.active = false;
            grid.path(here);// affichage du chemin possible pour playerOne
            }
        
        }else {}
    };
    this.weaponSwitch = function (player, i, next) {
        var previousWeapon = player.equiped;
        var previousDamage = player.damage;
        var newWeapon = grid.array[i + next].classe;
        var newDamage = grid.array[i + next].damage;
        if (next == -1){
            player.moveLeft();
            that.indexArray = [i + 1, i + 2, i + 3, i + 10, i + 20, i + 30, i - 10, i - 20, i - 30];
            that.indexArray.forEach(that.changePath);
        }else if (next == +1) {
            player.moveRight();
            that.indexArray = [i - 1, i - 2, i - 3, i + 10, i + 20, i + 30, i - 10, i - 20, i - 30];
            that.indexArray.forEach(that.changePath);
        }else if (next == -10) {
            player.moveUp();
            that.indexArray = [i - 1, i - 2, i - 3, i + 10, i + 20, i + 30, i +1, i +2, i + 3];
            that.indexArray.forEach(that.changePath);
        }else if (next == +10) {
            player.moveDown();
            that.indexArray = [i - 1, i - 2, i - 3, i + 1, i + 2, i + 3, i - 10, i - 20, i - 30];
            that.indexArray.forEach(that.changePath);
        }
        var weaponDeposit = new Weapon(previousWeapon, player.x, player.y, previousDamage);                            
        weaponDeposit.path = false;
        player.equiped = newWeapon;
        player.damage = newDamage;
        grid.array.splice(i, 1, weaponDeposit);
        grid.array.splice(i + next, 1, player);
    }
    this.checkFight = function (){ // verification des conditions pour engager le combat
        for(var j = 0; j < grid.array.length; j++){
            if(grid.array[j].classe == "playerOne"){
                if((grid.array[j+1].classe == "playerTwo") || (grid.array[j-1].classe == "playerTwo") || (grid.array[j-10].classe == "playerTwo") || (grid.array[j+10].classe == "playerTwo")){
                    that.fight();
                }
            }else if(grid.array[j].classe === "playerTwo"){
                if((grid.array[j+1].classe === "playerOne") || (grid.array[j-1].classe === "playerOne") || (grid.array[j-10].classe === "playerOne") || (grid.array[j+10].classe === "playerOne")){
                    that.fight();
                }
            }
        }
    }
    this.fight = function (){
        $('.epeeAudio').trigger('load');
        $('.bouclierAudio').trigger('load');
        var gridArray = grid.array;
        var playerOne = grid.playerOne();
        var playerTwo = grid.playerTwo();

        function epeePlay() {
            $('.epeeAudio').trigger('play');
        }
        function bouclierPlay() {
            $('.bouclierAudio').trigger('play');
        }
        document.removeEventListener("keydown", that.event); // on stop l'ecoute des evenements
        console.log("fight !!!");
        for(var i = 0; i < gridArray.length; i++){
            if(gridArray[i].path === true){ // on masque tous les chemins visibles
                gridArray[i].path = false;
            }
        }
        var combatDiv = document.createElement("div");// creation des infos textuelles
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
                    $('#log').prepend("<p>Steve joue: Touche K pour attaquer, touche M pour se défendre</p>");            
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
                    $('#log').prepend("<p>C'est au tour de Link: Touche Q pour attaquer, touche D pour se défendre</p>");  
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
                grid.playerOne().dead();
            }else if(playerTwo.pdv <= 0){
                document.removeEventListener("keydown", combatEvent);
                grid.playerTwo().dead();
            }
        }
    }
}
