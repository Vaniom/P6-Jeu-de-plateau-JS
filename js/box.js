function Box (classe, x, y) {
    this.classe = classe;
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.draw = function(){
            var boxDiv = document.createElement('div');
            //boxDiv.css("height", this.height + 'px').css('width', this.width + 'px' );
            boxDiv.style.left = this.x + "px";
            boxDiv.style.top = this.y + "px";
            boxDiv.className = classe;
            var map = document.getElementById('map');

            map.appendChild(boxDiv);
    }   
}