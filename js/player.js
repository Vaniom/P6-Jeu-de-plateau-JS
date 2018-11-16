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
}