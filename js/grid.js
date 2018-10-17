var gridArray = [];
var randomArray = [];
function Grid(name) {
    this.name = name;
    
}
Grid.prototype.createElements = function(){ //placement des cases "grass"
    for (var i = 0; i < 10; i++) { //variable i boucle sur les abscisses
        for (var j = 0; j < 10; j++) { // variable j boucle sur les ordonnées 
            var box = new Box("grass", j*60, i*60);
            gridArray.push(box);
        }
    };
    var verif;
    var id;
    function tirage(max) {// On s'assure de ne pas tirer plusieurs fois le même nombre
        id = Math.floor(Math.random() * max);
        console.log(id);        
        verif = randomArray.indexOf(id);
        console.log(verif);
        if (verif === -1) {
            randomArray.push(id);
        } else {
            tirage(max);
        }
        //console.log(randomArray);
    }
    randomArray.splice(0, randomArray.length);// On efface le tableau

    for (var l = 0; l < 12; l++) { // On fait 12 tirages              
        tirage(100); 
    }   
        
    for (var m = 0; m < randomArray.length; m++) { // et on place les 12 cases "stone"
        var val = randomArray[m];
        //console.log("val = " + val);        
        var stone = new Box("stone", gridArray[val].x, gridArray[val].y);
        gridArray.splice(val, 1, stone);             
    };
    randomArray.splice(0, randomArray.length);// vidage du tableau

    function createWeapon(classe, damage){// fonction de creation des armes
        tirage(10);
        for (var n = 0; n < randomArray.length; n++) {
            var val2 = randomArray[n];  
            if (gridArray[val2].classe === "grass") {
                var arme = new Weapon (classe, gridArray[val2].x, gridArray[val2].y, damage);
                gridArray.splice(val2, 1, arme);
            } else {
                /*do {
                    n++;
                }
                while (gridArray[val2].classe != "grass") */
            };           
        }        
    };
    createWeapon("epee", 20);
    createWeapon("dague", 15);
    createWeapon("sabre", 30);
    createWeapon("hache", 25);

    function createPlayer(classe) {
        tirage(100);
        for (var p = 0; p < randomArray.length; p++) {
            var val3 = randomArray[p];     
            if (gridArray[val3].classe === "grass") {
                var player = new Player (classe, gridArray[val3].x, gridArray[val3].y);
                gridArray.splice(val3, 1, player);
            } else {
              
            }
        }
    };
    createPlayer("player0ne");
    createPlayer("playerTwo");
    function createPlayerTwo(){        
        var index = randomArray.indexOf(Player)
        
        /*var diffX = Math.abs(playerTwo.x - playerOne.x);
        var diffY = Math.abs(playerOne.y - playerTwo.y);
        console.log("diffX = " + diffX + " / diffY = " + diffY);*/
    }
    createPlayerTwo();

    // comptage des objets "stone" créés (uniquement pour contrôle)
    var count = 0;
    for (var q = 0; q < gridArray.length; q++) {
        if (gridArray[q].classe === "stone"){
            count ++;
        }else {}
    }
    console.log("compteur stones = "  + count);
}