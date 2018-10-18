$(function(){
    $('#generateMap').click(function(){ //event listener
        gridArray.splice(0, 100);
        var grid = new Grid("myMap");
        grid.createElements();
        console.log(gridArray);
        grid.draw();
    })
})