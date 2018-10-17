$(function(){
    //initialisation du canvas
    var canvas = $('#myCanvas')[0];
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    //Définition des variables
    var i = "";
    var j = "";    
    var myMap = "";
    var arme = "";
    var epee = "epée";
    var dague = "dague";
    var sabre = "sabre";
    var hache = "hache";
    var epeeBois = "epée en bois";
    var joueur1 = "Link";
    var joueur2 = "Steve";
    var casesArray = [];// tableau de stockages des objets Cases qui seront créés
    // définition du constructeur Case
    
    function Case(forme, id) {
        this.forme = forme;        
        this.id = id;   
        this.grise = false;
        this.arme = null;
        this.joueur = null;
    
        Case.prototype.interdire = function() {  // definition de la méthode de grisage des cases 
            this.grise = true;
        };
        Case.prototype.autoriser = function() {
            this.grise = false;
        }
        Case.prototype.contientArme = function(nomArme) { // definition de la methode qui gerera l'attribution d'une arme
            this.arme = nomArme;
        };
        Case.prototype.contientJoueur = function(nomJoueur) {
            this.joueur = nomJoueur;
        }
    }
    
    //génération de la carte lors du clic:
    $('#generateMap').click(function(){ //event listener
        ctx.clearRect(0, 0, 600, 600); //nettoyage du Canvas
        casesArray.splice(0, 100); //nettoyage du tableau
       
                for (i = 0; i < 10; i++) { //variable i boucle sur les abscisses
                    for (j = 0; j < 10; j++) { // variable j boucle sur les ordonnées    
                        myMap = new Case(ctx.strokeRect(i * 60, j *60, 60, 60), i + "." + j); // à chaque tour, on crée un nouvel objet case
                        casesArray.push(myMap); // et on le pousse dans le tableau
                        //console.log("i = " + i);
                        //console.log("j = " + j);
                    // console.log(myMap);                             
                    }           
                }

        function placerCasesGrises() { // fonction de placement des cases grises
            for (var k = 0; k < 15 ; k++){ //initialisation d'une boucle de 15 tours
            // génération aleatoire de x et y en chiffres entiers compris entre 0 et 10
                var aleatX = Math.floor(Math.random() * 10);
                //console.log('aleatX = ' + aleatX);
                var aleatY = Math.floor(Math.random() * 10);
                //console.log('aleatY = ' + aleatY);
                var idCase = aleatX + "." + aleatY; // stockage des coordonnées sous la forme x.y ==> serviront à alimenter le paramètre Case.id
                for (var l = 0; l < casesArray.length; l++) { // on remplace dans le tableau les cases initialement créées par des cases grises. correspondance faite sur l'id
                    if (idCase == casesArray[l].id){
                        var caseGrise = new Case(ctx.fillRect(aleatX *60, aleatY *60, 60, 60), idCase);//si l
                        caseGrise.interdire();// on applique la méthode .interdire()
                        casesArray.splice(l, 1, caseGrise);// et on remplace dans le tableau
                    } else {};
                }                      
            //var caseGrise = new Case(ctx.fillRect(aleatX *60, aleatY *60, 60, 60), idCase);                      
            //caseGrise.interdire();
            //console.log(caseGrise);            
            }
            
        }
        placerCasesGrises();
        
        function placerArme(nomArme) {// placement des armes (même structure de fonction que placerCasesGrises)
            var aleatX = Math.floor(Math.random() * 10);
            var aleatY = Math.floor(Math.random() * 10);
            var idCase = aleatX + "." + aleatY;
            for (var l = 0; l < casesArray.length; l++) { 
                if (idCase == casesArray[l].id){
                    casesArray[l].autoriser();
                    casesArray[l].contientArme(nomArme);            
                } else {};
            }
        }
        function placerJoueur1() {
            var aleatX = Math.floor(Math.random() * 3);
            var aleatY = Math.floor(Math.random() * 3);
            var idCase = aleatX + "." + aleatY;
            for (var l = 0; l < casesArray.length; l++) { 
                if (idCase == casesArray[l].id && casesArray[l].grise == false){
                    casesArray[l].autoriser();
                    casesArray[l].contientJoueur(joueur1);            
                } else {};
            }
        }
        // On renvoie un entier aléatoire entre une valeur min (incluse)
        // et une valeur max (incluse).
        // Attention : si on utilisait Math.round(), on aurait une distribution
        // non uniforme !
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min +1)) + min;
        }

        function placerJoueur2() {
            var aleatX = getRandomIntInclusive(6, 9);
            var aleatY = getRandomIntInclusive(6, 9);
            var idCase = aleatX + "." + aleatY;
            for (var l = 0; l < casesArray.length; l++) { 
                if (idCase == casesArray[l].id && casesArray[l].grise == false){
                    casesArray[l].autoriser();
                    casesArray[l].contientJoueur(joueur2);      
                } else {};
            }
        }

        
        placerArme(epee);
        placerArme(dague);
        placerArme(sabre);
        placerArme(hache);
        placerJoueur1();
        placerJoueur2();
        console.log(casesArray);// affichage du tableau pour contrôle
    });

    ctx.closePath();
})