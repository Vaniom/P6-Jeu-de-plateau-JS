function Grid(name) {
    this.name = name;
    this.array = [];
//placement des cases "grass"
    this.createElements = function () { 
        for (var i = 0; i < 10; i++) { //variable i boucle sur les abscisses
            for (var j = 0; j < 10; j++) { // variable j boucle sur les ordonnées
                var box = new Box("grass", j * 60, i * 60);
                this.array.push(box);
            }
        };

        var id;
        var randomArray = [];
        var gridArrayLcl = this.array;

    //Tirage aleatoire d'un entier naturel compris entre 0 et un nombre maximum(exclu)
        function tirage(max) { 
            id = Math.floor(Math.random() * max);
            // On s'assure de ne pas tirer plusieurs fois le même nombre:    
            var verif = randomArray.indexOf(id);
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
            var stone = new Box("stone", this.array[val].x, this.array[val].y);
            stone.accessible = false;
            this.array.splice(val, 1, stone);
        };
        randomArray.splice(0, randomArray.length); // vidage du tableau

        var newTirage;
    // la fonction check s'assure qu'on ne place pas un objet sur une case autre que de l'herbe:
        function check() {
            for (var j = 0; j < randomArray.length; j++) {
                var idx = randomArray[j];
                if (gridArrayLcl[idx].classe != "grass") {
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
                var arme = new Weapon(classe, gridArrayLcl[val2].x, gridArrayLcl[val2].y, damage);
                gridArrayLcl.splice(val2, 1, arme);
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
                var player = new Player(classe, gridArrayLcl[val3].x, gridArrayLcl[val3].y);
                gridArrayLcl.splice(val3, 1, player);
            }
            randomArray.splice(0, randomArray.length);
        };
        createPlayer("playerOne");
        createPlayer("playerTwo");

    // Fonction qui vérifie l'espacement x et y entre les deux personnages:
    
        function checkEspacement() {
            for (var k = 0; k < gridArrayLcl.length; k++){
                if(gridArrayLcl[k].classe === "playerOne"){
                    var p1 = gridArrayLcl[k];
                }
            }
            
            for (var j = 0; j < randomArray.length; j++) {
                var dex = randomArray[j];
                var posXPlayerTwo  = gridArrayLcl[dex].x;
                console.log("posXPlayerTwo = " + posXPlayerTwo);
                var posYPlayerTwo = gridArrayLcl[dex].y;
                console.log("posYPlayerTwo = " + posYPlayerTwo);     
                var ecartX = Math.abs(posXPlayerTwo - p1.x);// Math.abs() renvoie la valeur absolue d'un nombre ou d'une expression
                var ecartY = Math.abs(posYPlayerTwo - p1.y);
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
            for (var q = 0; q < gridArrayLcl.length; q++) {
                if (gridArrayLcl[q].classe === elt) {
                    count++;
                } else {}
            }
            return count;
        }
        console.log("compteur herbe = " + count("grass"));
        console.log("compteur pierres = " + count("stone"));
        console.log("compteur épée = " + count("epee"));
        console.log("compteur dague = " + count("dague"));
        console.log("compteur hache = " + count("hache"));
        console.log("compteur sabre = " + count("sabre"));
        console.log("compteur playerOne = " + count("PlayerOne"));
        console.log("compteur playerTwo = " + count("PlayerTwo"));
    };
    this.playerOne = function(){
        for(var i = 0; i < this.array.length; i++){
            if(this.array[i].classe === "playerOne"){
                return this.array[i];
            }
        }
    };
    this.playerTwo = function(){
        for(var j = 0; j < this.array.length; j++){
            if(this.array[j].classe === "playerTwo"){
                return this.array[j];
            }
        }
    }

    //-----------Fin de this.createElements()--------------    
    
    // methode objet de raffraichissment de l'affichage toutes les 500 millisecondes:
    this.draw = function(){
        setInterval(intervalDraw, 500);
    };
    var gridArrayBis = this.array;
    function intervalDraw(){
        var map = document.getElementById('map');
        while (map.firstChild) {// vidage de la zone de jeu de son contenu
            map.removeChild(map.firstChild);
        }
        for (var i = 0; i < gridArrayBis.length; i++) {
            var boxDiv = document.createElement('div');            
            boxDiv.style.left = this.x + "px";
            boxDiv.style.top = this.y + "px";
            boxDiv.className = gridArrayBis[i].classe;
            if(gridArrayBis[i].path === true){
                boxDiv.classList.add("pathTrue");
            }
            if(gridArrayBis[i].active === true){
                boxDiv.classList.add("active");
            }          
            map.appendChild(boxDiv);            
        };
        myGame.infoBox();
        console.log("Refresh");
    };
    this.path = function(index) { // définit le chemin possible pour le joueur actif (mouvement haut bas gauche droite de 1 à 3 cases)
        var gridArray = this.array;           
        if ((gridArray[index].x < 540) && (gridArray[index + 1].accessible === true)) {
            gridArray[index + 1].path = true;
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
}
