$(function(){
    //initialisation du canvas
    var canvas = $('#myCanvas')[0];
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    //Déclaration des variables
    var i;
    var j;
    var xpos;
    var ypos;
    var id;    
    var myMap;
    var idCase;
    var arme;
    var epee = "epée";
    var dague = "dague";
    var sabre = "sabre";
    var hache = "hache";
    var epeeBois = "epée en bois";
    var joueur1 = "Steve";
    var joueur2 = "Link";
    var grassImg = document.getElementById("grassImg");
    var laveImg = document.getElementById("laveImg");
    var linkImg = document.getElementById("linkImg");
    var steveImg = document.getElementById("steveImg");
    var epeeImg = document.getElementById("epeeImg");
    var sabreImg = document.getElementById("sabreImg");
    var hacheImg = document.getElementById("hacheImg");
    var dagueImg = document.getElementById("dagueImg");
    var epeeBoisImg = document.getElementById("epeeBoisImg");
    var casesArray = [];// tableau de stockages des objets Cases qui seront créés
    // définition du constructeur Case
    
    function Case(nom, img, xpos, ypos, largeur, hauteur, id) {
        this.nom = nom,
        this.forme = ctx.drawImage(            
            this.img = img, 
            this.xpos = xpos, 
            this.ypos = ypos, 
            this.largeur = largeur, 
            this.hauteur = hauteur,
        );        
        this.id = id;   
        this.grise = false;
        this.arme = null;
        this.joueur = null;
    
        Case.prototype.interdire = function() {  // definition de la méthode de grisage des cases 
            this.grise = true;
        };
        Case.prototype.autoriser = function() {
            this.grise = false;
            this.img = grassImg;
        };
        Case.prototype.contientArme = function(nomArme) { // definition de la methode qui gerera l'attribution d'une arme
            this.arme = nomArme;
        };
    }
    // définition d'un constructeur fils pour les objets "joueur"
    function Joueur (nom, img, xpos, ypos, largeur, hauteur, id){
        Case.call(this, nom, img, xpos, ypos, largeur, hauteur, id);
        this.pdv = 100;
        this.arme = epeeBois;
        this.xspeed = 1;
        this.yspeed = 0;
        this.dir = function (x, y) {
            this.xspeed = x;
            this.yspeed = y;
        };
      
        Joueur.prototype.clear = function() {
            ctx.clearRect(
                this.xpos, 
                this.ypos, 
                this.largeur, 
                this.hauteur);
            ctx.drawImage(grassImg, this.xpos, this.ypos, 60, 60);                
        }
        Joueur.prototype.contientJoueur = function(nomJoueur) {
            this.joueur = nomJoueur;
        }
    }
    
    //génération de la carte lors du clic:
    $('#generateMap').click(function(){ //event listener
        ctx.clearRect(0, 0, 600, 600); //nettoyage du Canvas
        casesArray.splice(0, 100); //nettoyage du tableau
       
                for (i = 0; i < 10; i++) { //variable i boucle sur les abscisses
                    for (j = 0; j < 10; j++) { // variable j boucle sur les ordonnées    
                        myMap = new Case("herbe", grassImg, i * 60, j *60, 60, 60, i + "." + j); // à chaque tour, on crée un nouvel objet case
                        casesArray.push(myMap); // et on le pousse dans le tableau                 
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
                        var caseGrise = new Case("obstacle", laveImg, aleatX *60, aleatY *60, 60, 60, idCase);//si l
                        caseGrise.interdire();// on applique la méthode .interdire()
                        caseGrise.grise =  true;
                        casesArray.splice(l, 1, caseGrise);// et on remplace dans le tableau
                    } else {};
                }                       
            }
            
        }
        /*placerCasesGrises();*/
        
      
        // On renvoie un entier aléatoire entre une valeur min (incluse)
        // et une valeur max (incluse).
        // Attention : si on utilisait Math.round(), on aurait une distribution
        // non uniforme !
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min +1)) + min;
        }
        
        function placerArme(nomArme, img) {// placement des armes 
            var aleatX = getRandomIntInclusive(1, 8);
            var aleatY = getRandomIntInclusive(0, 9);
            var idCase = aleatX + "." + aleatY;
            console.log('tirage = ' + idCase);
            for (var l = 0; l < casesArray.length; l++) {
                if (idCase == casesArray[l].id){ // on verifie la condition 
                    do { // tant qu'on tombre sur un case grise ou contenant un joueur, on incrémente l
                        l++;
                        console.log('increment = ' + l);
                    } while (casesArray[l].grise == true || casesArray[l].joueur != null || casesArray[l].arme != null);                   
                    var caseArme = new Case(nomArme, img, casesArray[l].xpos, casesArray[l].ypos, casesArray[l].largeur, casesArray[l].hauteur, casesArray[l].id);// on instancie un nouvel objet
                    caseArme.contientArme(nomArme); 
                    casesArray.splice(l, 1, caseArme);//on remplace dans le tableau
               
                } else{} 
 
            }
        }
       
         
        var Joueur1 = new Joueur("joueur1", steveImg, 0, 0, 60, 60, 0.0);
        var Joueur2 = new Joueur("joueur2", linkImg, 300, 300, 60, 60, 0.0);
        function placerJoueur1(){
            var aleatX = 0; // on bloque l'abscisse sur le bord gauche
            var aleatY = Math.floor(Math.random() * 9);
            idCase = aleatX + "." + aleatY;// on stocke les coordonnées x.y
            for (var l = 0; l < casesArray.length; l++){
                if (idCase == casesArray[l].id){ // on verifie la condition 
                    do { // tant qu'on tombre sur un case grise, on incrémente l
                        l++;
                        console.log('l = ' + l);
                    } while (casesArray[l].grise == true);                    
                        //Joueur1 = new Joueur("joueur1", steveImg, casesArray[l].xpos, casesArray[l].ypos, casesArray[l].largeur, casesArray[l].hauteur, casesArray[l].id);// et on instancie un nouvel objet
                        Joueur1.clear();
                        Joueur1.xpos = casesArray[l].xpos;
                        Joueur1.ypos = casesArray[l].ypos;
                        id = casesArray[l].id;
                        Joueur1.contientJoueur(joueur1);
                        casesArray.splice(l, 1, Joueur1);//on remplace dans le tableau
                        Joueur1.forme = ctx.drawImage(steveImg, casesArray[l].xpos, casesArray[l].ypos, 60, 60);
                          
                        console.log('Joueur1 = ' + Joueur1);
                } else{}
            }
        }
        

        function placerJoueur2() {
            var aleatX = 9;
            var aleatY = getRandomIntInclusive(0, 6);
            var idCase = aleatX + "." + aleatY;
            for (var l = 0; l < casesArray.length; l++){
                if (idCase == casesArray[l].id){
                    do {
                        l++;
                        console.log('l(joueur2) = ' + l);
                    } while (casesArray[l].grise == true);                    
                        //Joueur2 = new Joueur("joueur2", linkImg, casesArray[l].xpos, casesArray[l].ypos, casesArray[l].largeur, casesArray[l].hauteur, casesArray[l].id);
                        Joueur2.clear();
                        Joueur2.xpos = casesArray[l].xpos;
                        Joueur2.ypos = casesArray[l].ypos;
                        Joueur2.id = casesArray[l].id;
                        Joueur2.contientJoueur(joueur2);
                        casesArray.splice(l, 1, Joueur2);
                        Joueur1.forme = ctx.drawImage(linkImg, casesArray[l].xpos, casesArray[l].ypos, 60, 60);                      
                } else{}
            }
        }

        console.log(casesArray);
        placerArme(epee, epeeImg);
        placerArme(dague, dagueImg);
        placerArme(sabre, sabreImg);
        placerArme(hache, hacheImg);
        placerJoueur1();
        placerJoueur2();
        //console.log(casesArray);// affichage du tableau pour contrôle
        


       
    });

    ctx.closePath();
})