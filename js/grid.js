var gridArray = [];
//var randomArray = [];
var playerOne;
var playerTwo;

function Grid(name) {
    this.name = name;
    this.array = gridArray;

}
//placement des cases "grass"
Grid.prototype.createElements = function () { 
    for (var i = 0; i < 10; i++) { //variable i boucle sur les abscisses
        for (var j = 0; j < 10; j++) { // variable j boucle sur les ordonnées
            var box = new Box("grass", j * 60, i * 60);
            gridArray.push(box);
        }
    };
    var verif;
    var id;
    var randomArray = [];
//Tirage aleatoire d'un entier naturel compris entre 0 et un nombre maximum(exclu)
    function tirage(max) { 
        id = Math.floor(Math.random() * max);
        // On s'assure de ne pas tirer plusieurs fois le même nombre:    
        verif = randomArray.indexOf(id);
        if (verif === -1) {
            randomArray.push(id);
        } else {
            //si le nombre tiré est déjà présent dans le tableau, on en tire un autre:
            tirage(max);
        }
    }
    randomArray.splice(0, randomArray.length); // On efface le tableau

    for (var l = 0; l < 12; l++) { // On fait 12 tirages entre 0 et 100             
        tirage(100);
    }

    for (var m = 0; m < randomArray.length; m++) { //on place les 12 cases "stone"
        var val = randomArray[m];    
        var stone = new Box("stone", gridArray[val].x, gridArray[val].y);
        stone.accessible = false;
        gridArray.splice(val, 1, stone);
    };
    randomArray.splice(0, randomArray.length); // vidage du tableau

    var idx;
    var newTirage;
// la fonction check s'assure qu'on ne place pas un objet sur une case autre que de l'herbe:
    function check() {
        for (var j = 0; j < randomArray.length; j++) {
            idx = randomArray[j];
            if (gridArray[idx].classe != "grass") {
                newTirage = Math.floor(Math.random() * 100);
                randomArray.splice(j, 1, newTirage);
                check();
            }
        }
    }
// fonction de creation des armes:
    function createWeapon(classe, damage) { 
        tirage(100);
        check();

        for (var n = 0; n < randomArray.length; n++) {
            var val2 = randomArray[n];
            var arme = new Weapon(classe, gridArray[val2].x, gridArray[val2].y, damage);
            gridArray.splice(val2, 1, arme);
        }
        randomArray.splice(0, randomArray.length);
    }

    createWeapon("dague", 15);
    createWeapon("sabre", 30);
    createWeapon("hache", 25);
    createWeapon("epee", 20);

    // fonction de cration et placement des personnages:
    function createPlayer(classe) {
        tirage(100);
        check();
        if (classe === "playerTwo"){
            checkEspacement();
        } else {}
        for (var p = 0; p < randomArray.length; p++) {
            var val3 = randomArray[p];
            var player = new Player(classe, gridArray[val3].x, gridArray[val3].y);
            gridArray.splice(val3, 1, player);
        }
        randomArray.splice(0, randomArray.length);
    };
    createPlayer("playerOne");
    createPlayer("playerTwo");

// Fonction qui vérifie l'espacement x et y entre les deux personnages:
    function checkEspacement() {
        //var playerOne;
        for (var k = 0; k < gridArray.length; k++){
            if(gridArray[k].classe === "playerOne"){
                playerOne = gridArray[k];
            }
        }
        for (var j = 0; j < randomArray.length; j++) {
            var dex = randomArray[j];
            var posXPlayerTwo  = gridArray[dex].x;
            var posYPlayerTwo = gridArray[dex].y;        
            var ecartX = Math.abs(posXPlayerTwo - playerOne.x);// Math.abs() renvoie la valeur absolue d'un nombre ou d'une expression
            var ecartY = Math.abs(posYPlayerTwo - playerOne.y);
            //console.log("verification = " + ((ecartX < 240) && (ecartY < 240)));
            if ((ecartX < 240) && (ecartY < 240)) {
                newItem = Math.floor(Math.random() * 100);
                console.log("newItem = " + newItem);
                randomArray.splice(j, 1, newItem);
                checkEspacement();
            }else {}
        }
    }
    // comptage des objets créés (uniquement pour contrôle)
    function count(elt) {
        var count = 0;
        for (var q = 0; q < gridArray.length; q++) {
            if (gridArray[q].classe === elt) {
                count++;
            } else {}
        }
        return count;
    }
    var countStone = count("stone");
    var countGrass = count("grass");
    var countEpee = count("epee");
    var countDague = count("dague");
    var countHache = count("hache");
    var countSabre = count("sabre");
    var countPlayerOne = count("playerOne");
    var countPlayerTwo = count("playerTwo");
    PrintEspace();

    console.log("compteur grass = " + countGrass);
    console.log("compteur stones = " + countStone);
    console.log("compteur épée = " + countEpee);
    console.log("compteur dague = " + countDague);
    console.log("compteur hache = " + countHache);
    console.log("compteur sabre = " + countSabre);
    console.log("compteur playerOne = " + countPlayerOne);
    console.log("compteur playerTwo = " + countPlayerTwo);
    
    // Contrôle de l'espacement entre les deux joueurs (affichage console)
    function PrintEspace(){
        //var playerOne;
        //var playerTwo;
        for (var l = 0; l < gridArray.length; l++){
            if(gridArray[l].classe === "playerOne"){
                playerOne = gridArray[l];
            }else if (gridArray[l].classe === "playerTwo"){
                playerTwo = gridArray[l];
            }
        }
        console.log("espacementX = " + (Math.abs(playerOne.x - playerTwo.x)));
        console.log("espacementY = " + (Math.abs(playerOne.y - playerTwo.y)));
    };
}
    
// fonction d'affichage des éléments du tableau
    function intervalDraw(){
        var map = document.getElementById('map');
        while (map.firstChild) {// vidage de la zone de jeu de son contenu
            map.removeChild(map.firstChild);
          }
        for (var i = 0; i < gridArray.length; i++) {
            var boxDiv = document.createElement('div');            
            boxDiv.style.left = this.x + "px";
            boxDiv.style.top = this.y + "px";
            boxDiv.className = gridArray[i].classe;
            if(gridArray[i].path === true){
                boxDiv.classList.add("pathTrue");
            }
            if(gridArray[i].active === true){
                boxDiv.classList.add("active");
            }          
            map.appendChild(boxDiv);            
        };
        myGame.infoBox();
        console.log("Refresh");

    }
    var intervalID;
// methode objet de raffraichissment de l'affichage toutes les 500 millisecondes:
    Grid.prototype.draw = function(){
        intervalID = setInterval(intervalDraw, 500);
    }

    Grid.prototype.flipCoin = function(){
        var coin = Math.floor(Math.random() * 2);
        //var coin = 0;
        console.log("coin = " + coin);
        var message = document.createElement('p');
        if(coin === 0){
            playerOne.active = true;            
            message.textContent = "Steve commence ! ";
            $('#log').append(message);
        }else {
            playerTwo.active = true;
            message.textContent = "Link commence ! ";
            $('#log').append(message);
        }
        console.log("playerOne.active = " + playerOne.active);
        console.log("playerTwo.active = " + playerTwo.active);
    }
