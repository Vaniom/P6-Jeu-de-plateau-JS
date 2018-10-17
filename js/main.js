$(function(){
    $('#generateMap').click(function(){ //event listener
        gridArray.splice(0, 100);
        var grid = new Grid();
        grid.createElements();
        console.log(gridArray);
    })


})