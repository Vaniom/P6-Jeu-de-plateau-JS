var playerOne;
var playerTwo;

function Player(classe, x, y) {
    this.classe = classe;
    this.accessible = false;
    this.x = x;
    this.y = y;
    this.pdv = 100;
    this.moveCount = 0;
    this.equiped = "epeeBois";
    this.damage = 15;
    this.active = false;
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
        console.log("LA = " + hereTwo);

        function path(index) {
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

        function changePath(index) {
            if (typeof (gridArray[index]) != 'undefined') {
                gridArray[index].path = false;
            }
        }
//------------------------------------------------------------------------------------------------//
        $(document).keydown(function (e) {
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
                    console.log("LA2 = " + hereTwo);
                    path(hereTwo);// affichage du chemin possible pour playerTwo
                }          
        //-----------------On passe au joueur 2-----------------//

            }else if (playerTwo.active === true) {
                console.log("hereTwo = " + hereTwo);                    
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
        })  
    }
}