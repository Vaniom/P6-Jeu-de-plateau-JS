var gridArray = [];
var randomArray = [];

function Grid(name) {
    this.name = name;
    this.array = gridArray;

}
Grid.prototype.createElements = function () { //placement des cases "grass"
    for (var i = 0; i < 10; i++) { //variable i boucle sur les abscisses
        for (var j = 0; j < 10; j++) { // variable j boucle sur les ordonnées 
            var box = new Box("grass", j * 60, i * 60);
            gridArray.push(box);
        }
    };
    var verif;
    var id;

    function tirage(max) { // On s'assure de ne pas tirer plusieurs fois le même nombre
        id = Math.floor(Math.random() * max);
        //console.log(id);        
        verif = randomArray.indexOf(id);
        //console.log(verif);
        if (verif === -1) {
            randomArray.push(id);
        } else {
            tirage(max);
        }
        //console.log(randomArray);
    }
    randomArray.splice(0, randomArray.length); // On efface le tableau

    for (var l = 0; l < 12; l++) { // On fait 12 tirages              
        tirage(100);
    }

    for (var m = 0; m < randomArray.length; m++) { // et on place les 12 cases "stone"
        var val = randomArray[m];
        //console.log("val = " + val);        
        var stone = new Box("stone", gridArray[val].x, gridArray[val].y);
        stone.accessible = false;
        gridArray.splice(val, 1, stone);
    };
    randomArray.splice(0, randomArray.length); // vidage du tableau
    var idx;
    var newTirage;

    function check() {
        for (var j = 0; j < randomArray.length; j++) {
            idx = randomArray[j];
            //console.log("idx = " + idx);
            //console.log("gridArray[idx].classe = " + gridArray[idx].classe);
            if (gridArray[idx].classe != "grass") {
                newTirage = Math.floor(Math.random() * 100);
                //console.log("newTirage = " + newTirage);
                //console.log("j = " + j);
                randomArray.splice(j, 1, newTirage);
                check();
            }
        }
    }

    function createWeapon(classe, damage) { // fonction de creation des armes
        tirage(100);
        check();
        //console.log("randomArray = " + randomArray);

        for (var n = 0; n < randomArray.length; n++) {
            var val2 = randomArray[n];
            //console.log("val2 = " + val2);
            var arme = new Weapon(classe, gridArray[val2].x, gridArray[val2].y, damage);
            gridArray.splice(val2, 1, arme);
        }
        randomArray.splice(0, randomArray.length);
    }

    createWeapon("dague", 15);
    createWeapon("sabre", 30);
    createWeapon("hache", 25);
    createWeapon("epee", 20);

    function createPlayer(classe) {
        tirage(100);
        check();
        //console.log(classe);
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
    //var ver;
    function checkEspacement() {
        var playerOne;
        for (var k = 0; k < gridArray.length; k++){
            if(gridArray[k].classe === "playerOne"){
                playerOne = gridArray[k];
            }
        }
        //console.log("playerOne = " + playerOne);
        for (var j = 0; j < randomArray.length; j++) {
            var dex = randomArray[j];
            //console.log("dex = " + dex);
            //console.log("gridArray[dex].classe = " + gridArray[dex].classe);
            var posXPlayerTwo  = gridArray[dex].x;
            var posYPlayerTwo = gridArray[dex].y;        
            
            var ecartX = Math.abs(posXPlayerTwo - playerOne.x);
            var ecartY = Math.abs(posYPlayerTwo - playerOne.y);
            console.log("verification = " + ((ecartX < 240) && (ecartY < 240)));
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
        var playerOne;
        var playerTwo;
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
    

    function intervalDraw(){
        var map = document.getElementById('map');
        while (map.firstChild) {
            map.removeChild(map.firstChild);
          }
        for (var i = 0; i < gridArray.length; i++) {
            var boxDiv = document.createElement('div');            
            boxDiv.style.left = this.x + "px";
            boxDiv.style.top = this.y + "px";
            boxDiv.className = gridArray[i].classe;            
            map.appendChild(boxDiv);            
        }
        console.log("+1");

    }
    var intervalID;
    Grid.prototype.draw = function(){
        intervalID = setInterval(intervalDraw, 500);
    }
}