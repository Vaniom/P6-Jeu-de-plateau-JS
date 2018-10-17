$(function(){
    $('#generateMap').click(function(){ //event listener
        gridArray.splice(0, 100);
        var grid = new Grid("map");
        grid.createElements();
        console.log(gridArray);
    })


})