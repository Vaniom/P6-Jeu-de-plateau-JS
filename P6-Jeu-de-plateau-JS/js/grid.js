var gridArray = [];
function Grid() {
    
}
Grid.prototype.createElements = function(){
    for (var i = 0; i < 10; i++) { //variable i boucle sur les abscisses
        for (var j = 0; j < 10; j++) { // variable j boucle sur les ordonnées 
            var box = new Box("grass", j*60, i*60);
            gridArray.push(box);
        }
    };
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