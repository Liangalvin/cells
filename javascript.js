var rows = 20;
var cols = 20;
var grid = [];
var theGrid = document.querySelector("#grid");
var button = document.querySelector("#generate");
var arr = [];
// var newArr = [];
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
      positions.id="c"+num;                 //Gabe: added an ID to be able querySelect
      num++;                                //This ID is just the created cell order
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
  });
}

//check for single boxes and remove
function updateGrid(objAry){
  var newArr;
  var numConnect;
  console.log("during the update");
  console.log(newArr);
  function checkGrid(objAry){
    var x;
    var y;
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
        numConnect+=1;
      }
      //southEast
      if(((x < 19 && y < 19) && grid[x][y].checked === true) && grid[xAnd1(obj.objx)][yAnd1(obj.objy)].checked === true){
        console.log("southEast");
        console.log(grid[xAnd1(obj.objx)][yAnd1(obj.objy)]);
        numConnect+=1;
      }
      //southWest Airlines
      if(((x < 19 && y > 0) && grid[x][y].checked === true) && grid[xAnd1(obj.objx)][yLess1(obj.objy)].checked === true){
        console.log("southWest Airlines");
        console.log(grid[xAnd1(obj.objx)][yLess1(obj.objy)]);
        numConnect+=1;
      }
      //east
      if(((x > 0 && y < 19) && grid[x][y].checked === true) && grid[x][yAnd1(obj.objy)].checked === true){
        console.log("East");
        console.log(grid[x][yAnd1(obj.objy)]);
        numConnect+=1;
      }
      //west
      if(((x > 0 && y > 0) && grid[x][y].checked === true) && grid[x][yLess1(obj.objy)].checked === true){
        console.log("West");
        console.log(grid[x][yLess1(obj.objy)]);
        numConnect+=1;
      }
      //north
      if(((x > 0 && y <= 18) && grid[x][y].checked === true) && grid[xLess1(obj.objx)][y].checked === true){
        console.log("North");
        console.log(grid[xLess1(obj.objx)][y]);
        numConnect+=1;
      }
      //northEast
      if(((x > 0 && y <= 18) && grid[x][y].checked === true) && grid[xLess1(obj.objx)][yAnd1(obj.objy)].checked === true){
        console.log("northEast");
        console.log(grid[xLess1(obj.objx)][yAnd1(obj.objy)]);
        numConnect+=1;
      }
      //northWest
      if(((x >= 1 && y >= 1 ) && grid[x][y].checked === true) && grid[xLess1(obj.objx)][yLess1(obj.objy)].checked === true){
        console.log("northWest");
        console.log(grid[xLess1(obj.objx)][yLess1(obj.objy)]);
        numConnect+=1;
      }
      console.log(numConnect);

      if(numConnect < 1){
        grid[x][y].checked = false;
      }
    }); //closes ary.forEach
  }

  //move each object randomly?
  //go through the grid and check the "alive" boxes
  //position[x][y] will be unchecked after position[x+-rand][y+-rand]
  var move = function(ary){
    newArr = [];
      ary.forEach(function(obj){
        if(grid[obj.objx][obj.objy].checked === true){
          // console.log("grid position of index");
          // console.log(obj);
          newArr.push(obj);
        }
      });
      //console.log(newArr);

    newArr.forEach(function(obj){
      //for each object randomly add/subtract a space to move
      //status will then be checked
      var x = parseInt(obj.objx);
      var y = parseInt(obj.objy);
      var randX = Math.floor(Math.random()*2);
      var randY = Math.floor(Math.random()*2);
      console.log(randX);
      console.log(randY);

      if((x < 19 && y < 19) && grid[obj.objx + randX][obj.objy + randY].checked === false){
        grid[obj.objx+randX][obj.objy+randY].checked = true;
        grid[obj.objx][obj.objy].checked = false;
        console.log("original space");
        console.log(grid[obj.objx][obj.objy]);
        console.log("the new space");
        console.log(grid[obj.objx+randX][obj.objy+randY]);
      }
      // console.log("move index");
      // console.log(grid[obj.objx][obj.objy]);

    });
    //console.log(arr);
  }

  checkGrid(arr);
  move(arr);
  //set interval for checking
  setInterval(function(){
    var array = [];
    checkGrid(newArr);
    move(newArr);

      var grids = document.querySelectorAll('input');
      for(i=0;i<grids.length;i++){
          if(grids[i].checked===true){
              var next = i+1;
              array.push(next);
              grids[i].checked=false;
            }
          }
      for(j=0;j<array.length;j++){
          var neighbor= document.querySelector("#c"+array[j]);
          neighbor.checked=true;
      }
    console.log(newArr);
  }, 1500);

}

// button.addEventListener("click", setInterval(function(){
button.addEventListener("click", function(){
updateGrid(arr);
});

buildGrid();
randomize();
