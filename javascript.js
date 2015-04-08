var rows = 20;
var cols = 20;
var grid = [];
var theGrid = document.querySelector("#grid");
var button = document.querySelector("#generate");
var arr = [];
//var obj;

// build the grid
function buildGrid(){
  var x; //array of arrays 0-19
  var y; //elements 0-19 in a array
  var positions; //the positions on the grid
  var num = 0;

  for(x = 0; x < rows; x++){
    grid[x] = [];

    for(var y = 0; y < cols; y++){
      positions = document.createElement("input");
      positions.setAttribute("type", "checkbox");

      grid[x][y] = positions;

      theGrid.appendChild(positions);
    }
  }
}

// randomly make 40 checked boxes
function randomize(){
  for(var i = 0; i < 40; i++){
    var x = Math.floor(Math.random()*20);
    var y = Math.floor(Math.random()*20);
    arr.push({objx: x, objy: y, state: true});
  }
  arr.forEach(function(obj){
    grid[obj.objx][obj.objy].checked = obj.state;
    //console.log(obj);
  });
}

//check for single boxes and remove
function updateGrid(objAry){
  var x;
  var y;
  var numConnect;
  objAry.forEach(function(obj){
    x = parseInt(obj.objx);
    //console.log(x);
    y = parseInt(obj.objy);
    numConnect = 0;

    function xAnd1(xVal){
      if(xVal+1 === 20){
        console.log("val: " + xVal);
        return false;
      }
      else {
        return xVal+1;
      }
    }

    function yAnd1(yVal){
      if(yVal+1 === 20){
        return false;
      }
      else {
        return yVal+1;
      }
    }

    function xLess1(xVal){
      if(xVal-1 === -1){
        return false;
      }
      else {
        return xVal-1;
      }
    }

    function yLess1(yVal){
      if(yVal-1 === -1){
        return false;
      }
      else {
        return yVal-1;
      }
    }

    //south
    if(((x <= 18 && y <= 18) && grid[x][y].checked === true) && grid[xAnd1(obj.objx)][y].checked){
      console.log("South");
      console.log(grid[xAnd1(obj.objx)][y]);
      numConnect++;
    }
    //southEast
    if(((x <= 18 && y <= 18) && grid[x][y].checked === true) && grid[xAnd1(obj.objx)][yAnd1(obj.objy)].checked === true){
      console.log("southEast");
      console.log(grid[xAnd1(obj.objx)][yAnd1(obj.objy)]);
      numConnect++;
    }
    //southWest Airlines
    if(((x <= 18 && y > 0) && grid[x][y].checked === true) && grid[xAnd1(obj.objx)][yLess1(obj.objy)].checked === true){
      console.log("southWest Airlines");
      console.log(grid[xAnd1(obj.objx)][yLess1(obj.objy)]);
      numConnect++;
    }
    //east
    if(((x < 19 && y < 19) && grid[x][y].checked === true) && grid[x][yAnd1(obj.objy)].checked === true){
      console.log("East");
      console.log(grid[x][yAnd1(obj.objy)]);
      numConnect++;
    }
    //west
    if(((x > 0 && y > 0) && grid[x][y].checked === true) && grid[x][yLess1(obj.objy)].checked === true){
      console.log("West");
      console.log(grid[x][yLess1(obj.objy)]);
      numConnect++;
    }
    //north
    if(((x > 0 && y > 0) && grid[x][y].checked === true) && grid[xLess1(obj.objx)][y].checked === true){
      console.log("North");
      console.log(grid[xLess1(obj.objx)][y]);
      numConnect++;
    }
    //northEest
    if(((x > 0 && y <= 18) && grid[x][y].checked === true) && grid[xLess1(obj.objx)][yAnd1(obj.objy)].checked === true){
      console.log("northEast");
      console.log(grid[xLess1(obj.objx)][yAnd1(obj.objy)]);
      numConnect++;
    }
    //northWest
    if(((x >= 1 && y >= 1 ) && grid[x][y].checked === true) && grid[xLess1(obj.objx)][yLess1(obj.objy)].checked === true){
      console.log("northWest");
      console.log(grid[xLess1(obj.objx)][yLess1(obj.objy)]);
      numConnect++;
    }
    console.log(numConnect);

    if(numConnect < 1){
      grid[x][y].checked = false;
    }

    //move each object randomly
    var move = function(){
      console.log(obj);
    }
    move();
  }); //closes ary.forEach

}

button.addEventListener("click", function(){
  updateGrid(arr);
});

buildGrid();
randomize();
