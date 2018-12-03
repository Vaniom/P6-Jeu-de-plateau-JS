function Player(classe, x, y) {
    this.classe = classe;
    this.name = function () {
        if(this.classe === "playerOne") {
            return "Steve";
        }else if (this.classe === "playerTwo") {
            return "Link";
        }
    }
    this.accessible = false;
    this.x = x;
    this.y = y;
    this.pdv = 100;
    this.isDead = function () {
        $('.combatDiv').html("");
        var winner;
        var loser = this.name();
        if(loser == "Steve") {
            winner = "Link";
        }else if (loser == "Link") {
            winner = "Steve";
        }
        $('.combatDiv').html("<p>Game over! " + winner + " a gagné !</p>");
        $('.combatDiv').show();
        $("#log").prepend("<p>Game Over, " + winner + " a gagné !</p>");
    };
    this.moveCount = 0;
    this.posture = "attaque";
    this.equiped = "epeeBois";
    this.damage = 10;
    this.active = false;
    this.moveUp = function(){
        this.y = this.y - 60;
    };
    this.moveDown = function(){
        this.y = this.y + 60;
    };
    this.moveLeft = function(){
        this.x = this.x - 60;
    };
    this.moveRight = function(){
        this.x = this.x + 60;
    };
}