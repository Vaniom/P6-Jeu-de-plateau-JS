var gridArray = [];
var randomArray = [];
function Grid() {
    
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
        if (verif == -1) {
            randomArray.push(id);
        } else {
            tirage(max);
        }
        console.log(randomArray);
    }
    randomArray.splice(0, randomArray.length);// On efface le tableau

    for (var l = 0; l < 12; l++) { // placement des 12 cases "stone"               
        tirage(100); 
    }   
        
    for (var m = 0; m < randomArray.length; m++) {
        var val = randomArray[m];
        console.log("val = " + val);  
        if (gridArray[val].classe == "grass") {
            var stone = new Box("stone", gridArray[val].x, gridArray[val].y);
            gridArray.splice(val, 1, stone);
        } else {
            val++;
        }        
    };
    var count = 0;
    for (var q = 0; q < gridArray.length; q++) {
        if (gridArray[q].classe == "stone"){
            count ++;
        }else {}
    }
    console.log("compteur = "  + count);


    function createWeapon(classe, damage){// fonction de creation des armes
        var id2 = Math.floor(Math.random() * 100);        
        if (gridArray[id2].classe == "grass") {
            var arme = new Weapon (classe, gridArray[id2].x, gridArray[id2].y, damage);
            gridArray.splice(id2, 1, arme);
        } else {
            id2 = Math.floor(Math.random() * 100);
        }
        
    };
    createWeapon("epee", 20);
    createWeapon("dague", 15);
    createWeapon("sabre", 30);
    createWeapon("hache", 25);
    function createPlayer(classe) {
        var id3 = Math.floor(Math.random() * 100);        
        if(gridArray[id3].classe == "grass") {
            var player = new Player (classe, gridArray[id3].x, gridArray[id3].y);
            gridArray.splice(id3, 1, player);
        } else {}
    };
    createPlayer("player0ne");
    createPlayer("playerTwo");
    /*for (var i = 0; i < 12 ; i++){ //initialisation d'une boucle de 12 tours
    // génération aleatoire de x et y en chiffres entiers compris entre 0 et 10
        var aleatX = Math.floor(Math.random() * 10);
        //console.log('aleatX = ' + aleatX);
        var aleatY = Math.floor(Math.random() * 10);
        //console.log('aleatY = ' + aleatY);
        var supprX = gridArray.find(function(element) {
            return element.x == aleatX;
        });
        console.log('supprX = ' + supprX);
        //gridArray.splice(element.index, 1, stone);
        /*
        for (var j = 0; j < gridArray.length; j++) { // on remplace dans le tableau les cases initialement créées par des cases grises. correspondance faite sur l'id
        console.log('aleatX = ' + aleatX);
        console.log('aleatY = ' + aleatY);
        do {

        } while (aleatX != gridArray[j].x && aleatY != gridArray[j].y)
                var stone = new Box("stone", aleatY * 60, aleatX * 60);            
                gridArray.splice(j, 1, stone);// et on remplace dans le tableau
            //}; //else {};
        }
        
    }*/
}