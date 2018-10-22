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
    this.active = false;
    this.animate = function () {
        $('.plopAudio').trigger('load');

        function plopPlay() { // fonction d'appel du fichier audio créé
        $('.plopAudio').volume = 0.1;
            $('.plopAudio').trigger('play');
        }

        var here;
        for (var m = 0; m < gridArray.length; m++) {
            if (gridArray[m].classe === "playerOne") {
                here = m;
                playerOne = gridArray[m];
            }
        }
        //console.log("herelà = " + here);
        if (playerOne.active === true) {
            function path() {
                if ((gridArray[here].x < 540) && (gridArray[here + 1].accessible === true)) {
                    gridArray[here + 1].path = true;
                    //console.log("case + 1 path = " + gridArray[here + 1].path);
                    if ((gridArray[here].x < 480) && (gridArray[here + 2].accessible === true)) {
                        gridArray[here + 2].path = true;
                        if ((gridArray[here].x < 420) && (gridArray[here + 3].accessible === true)) {
                            gridArray[here + 3].path = true;
                        } else {}
                    } else {}
                } else {}
                if ((gridArray[here].x > 0) && (gridArray[here - 1].accessible === true)) {
                    gridArray[here - 1].path = true;
                    if ((gridArray[here].x > 60) && (gridArray[here - 2].accessible === true)) {
                        gridArray[here - 2].path = true;
                        if ((gridArray[here].x > 120) && (gridArray[here - 3].accessible === true)) {
                            gridArray[here - 3].path = true;
                        } else {}
                    } else {}
                } else {}
                if ((gridArray[here].y > 0) && (gridArray[here - 10].accessible === true)) {
                    gridArray[here - 10].path = true;
                    if ((gridArray[here].y > 60) && (gridArray[here - 20].accessible === true)) {
                        gridArray[here - 20].path = true;
                        if ((gridArray[here].y > 120) && (gridArray[here - 30].accessible === true)) {
                            gridArray[here - 30].path = true;
                        } else {}
                    } else {}
                } else {}
                if ((gridArray[here].y < 540) && (gridArray[here + 10].accessible === true)) {
                    gridArray[here + 10].path = true;
                    if ((gridArray[here].y < 480) && (gridArray[here + 20].accessible === true)) {
                        gridArray[here + 20].path = true;
                        if ((gridArray[here].y < 420) && (gridArray[here + 30].accessible === true)) {
                            gridArray[here + 30].path = true;
                        } else {}
                    } else {}
                } else {}
            }

            path();

            function changePath(index) {
                if (typeof (gridArray[index]) != 'undefined') {
                    gridArray[index].path = false;
                }
            }
            

            $(document).keydown(function (e) {
                if (e.which == 39) { // ASCII Right arrow
                    var here;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerOne") {
                            here = m;
                            playerOne = gridArray[m];
                        }
                    }
                    if (gridArray[here + 1].path === true) {
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
                    
                    console.log("playerOne.x = " + playerOne.x);
                    console.log("compteur = " + playerOne.moveCount);
                    /*
                    console.log("here = " + here);
                    if (playerOne.x > 0) {
                        if (gridArray[here - 1].accessible === true) {
                            playerOne.x = playerOne.x - 60;
                            var grassNew = new Box("grass", playerOne.x, playerOne.y);
                            gridArray.splice(here - 1, 1, playerOne);
                            gridArray.splice(here, 1, grassNew);
                            playerOne.moveCount++;
                            plopPlay()
                        } else {}
                    } else {}
                    console.log("playerOne.x = " + playerOne.x);
                    console.log("compteur = " + playerOne.moveCount);
                    */
                } else if (e.which == 38) { // Fleche UP
                    var here;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerOne") {
                            here = m;
                            playerOne = gridArray[m];
                        }
                    }
                    if (gridArray[here - 10].path === true) {
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
                    /*
                    console.log("here = " + here);
                    if (playerOne.y > 0) {
                        if (gridArray[here - 10].accessible === true) {
                            playerOne.y = playerOne.y - 60;
                            var grassNew = new Box("grass", playerOne.x, playerOne.y);
                            gridArray.splice(here - 10, 1, playerOne);
                            gridArray.splice(here, 1, grassNew);
                            playerOne.moveCount++;
                            plopPlay()
                        } else {}
                    } else {}
                    */
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
                    /*
                    console.log("here = " + here);
                    if (playerOne.y < 540) {
                        if (gridArray[here + 10].accessible === true) {
                            playerOne.y = playerOne.y + 60;
                            var grassNew = new Box("grass", playerOne.x, playerOne.y);
                            gridArray.splice(here + 10, 1, playerOne);
                            gridArray.splice(here, 1, grassNew);
                            playerOne.moveCount++;
                            plopPlay()
                        } else {}
                    } else {}
                    */
                    console.log("playerOne.y = " + playerOne.y);
                    console.log("compteur = " + playerOne.moveCount);
                }                
            })


            path();

            if (playerTwo.active === true) {
                if (e.which == 69) { //Touche E
                    var here;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerTwo") {
                            here = m;
                            playerTwo = gridArray[m];
                        }
                    }
                    console.log("here = " + here);
                    if (playerTwo.x < 540) {
                        if (gridArray[here + 1].accessible === true) {
                            playerTwo.x = playerTwo.x + 60;
                            var grassNew = new Box("grass", playerTwo.x, playerTwo.y);
                            gridArray.splice(here + 1, 1, playerTwo);
                            gridArray.splice(here, 1, grassNew);
                            playerTwo.moveCount++;
                            plopPlay()
                        } else {}
                    } else {}
                    console.log("playerOne.x = " + playerTwo.x);
                    console.log("compteur = " + playerTwo.moveCount);
                } else if (e.which == 65) { //Touche A
                    var here;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerTwo") {
                            here = m;
                            playerTwo = gridArray[m];
                        }
                    }
                    console.log("here = " + here);
                    if (playerTwo.x > 0) {
                        if (gridArray[here - 1].accessible === true) {
                            playerTwo.x = playerTwo.x - 60;
                            var grassNew = new Box("grass", playerTwo.x, playerTwo.y);
                            gridArray.splice(here - 1, 1, playerTwo);
                            gridArray.splice(here, 1, grassNew);
                            playerTwo.moveCount++;
                            plopPlay()
                        } else {}
                    } else {}
                    console.log("playerTwo.x = " + playerTwo.x);
                    console.log("compteur = " + playerTwo.moveCount);
                } else if (e.which == 90) { //Touche Z
                    var here;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerTwo") {
                            here = m;
                            playerTwo = gridArray[m];
                        }
                    }
                    console.log("here = " + here);
                    if (playerTwo.y > 0) {
                        if (gridArray[here - 10].accessible === true) {
                            playerTwo.y = playerTwo.y - 60;
                            var grassNew = new Box("grass", playerTwo.x, playerTwo.y);
                            gridArray.splice(here - 10, 1, playerTwo);
                            gridArray.splice(here, 1, grassNew);
                            playerTwo.moveCount++;
                            plopPlay()
                        } else {}
                    } else {}
                    console.log("playerTwo.y = " + playerTwo.y);
                    console.log("compteur = " + playerTwo.moveCount);
                } else if (e.which == 83) { //Touche S
                    var here;
                    for (var m = 0; m < gridArray.length; m++) {
                        if (gridArray[m].classe === "playerTwo") {
                            here = m;
                            playerTwo = gridArray[m];
                        }
                    }
                    console.log("here = " + here);
                    if (playerTwo.y < 540) {
                        if (gridArray[here + 10].accessible === true) {
                            playerTwo.y = playerTwo.y + 60;
                            var grassNew = new Box("grass", playerTwo.x, playerTwo.y);
                            gridArray.splice(here + 10, 1, playerTwo);
                            gridArray.splice(here, 1, grassNew);
                            playerTwo.moveCount++;
                            plopPlay()
                        } else {}
                    } else {}
                    console.log("playerTwo.y = " + playerTwo.y);
                    console.log("compteur = " + playerTwo.moveCount);
                }
            } else {}
        }
    }
}