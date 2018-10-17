$(function(){
    $('#generateMap').click(function(){ //event listener
        var grid = new Grid();
        grid.createElements();
        console.log(gridArray);
    })


})