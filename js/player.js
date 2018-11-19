function Player(classe, x, y) {
    this.classe = classe;
    this.accessible = false;
    this.x = x;
    this.y = y;
    this.pdv = 100;
    this.moveCount = 0;
    this.posture = "attaque";
    this.equiped = "epeeBois";
    this.damage = 15;
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