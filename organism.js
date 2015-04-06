var rows = 20;
var cols = 20;
var gridScheme = [];
var state = [];
var grid = document.querySelector("#grid");
var button = document.querySelector("#generate");
var body = document.querySelector("body");

//1. build the grid
function buildGrid() {
  var x; //x axis
  var y; //y axis
  var position; //the position on the grid
  var num = 0;

  for(x = 0; x < rows; x++) {
    gridScheme[x] = [];
    state[x] = [];

    for(var y = 0; y < cols; y++) {
      position = document.createElement("input");
      position.setAttribute("type", "checkbox");
      position.id = num;
      num++;

      gridScheme[x][y] = position;
      state[x][y] = 0;

      grid.appendChild(position);
    }
  }
}

//2. randomly put organism onto grid (state 1 = checked or alive / 0 = unchecked or dead)
function randomize() {
  var x;
  var y;
  var randNum; //only allow 30% of the grid to be generated with alive organisms

  for(x = 0; x < rows; x++) {
    for(y = 0; y < rows; y++) {

      randNum = Math.random();
      state[x][y] = Math.round(Math.random());

      if(state[x][y] === 1 && randNum > .7) {
        gridScheme[x][y].checked = true;
      }
    }
  }
}

//3.check grid for checkedboxes
//3.1. check surrounding boxes ->
//single array(the grid) with 20 arrays, each with 20 check boxes
//3.2. get rid of single boxes
function checkGrid(grid) {
  var oldSpace = [];
  grid.forEach(function(ary) {
    ary.forEach(function(box) {

      //var banned = document.getElementById(box.id-1); //do not allow
      var north = document.getElementById(box.id-20);
      var northEast = document.getElementById(box.id-19);
      var northWest = document.getElementById(box.id-21);
      var east = document.getElementById(parseInt(box.id)+1);
      var west = document.getElementById(box.id-1);
      var south = document.getElementById(parseInt(box.id)+20);
      var southEast = document.getElementById(parseInt(box.id)+21);
      var southWest = document.getElementById(parseInt(box.id)+19);
      var boxConnect = 0;

      // if((box.id % 20 === 0 && box.checked === true) && banned.checked === true) {
      //   console.log(box.id + " " + banned.id);
      // }
      if((box.checked === true && box.id > 19) && north.checked === true) {
        //console.log("North: " + box.id + " " + north.id);
        boxConnect++;
      }
      if((box.checked === true && box.id > 19) && northEast.checked === true) {
        //console.log("Northeast: " + box.id + " " + northEast.id);
        boxConnect+=2;
      }
      if((box.checked === true && box.id % 20 !== 0) && (box.id > 19 && northWest.checked === true)) {
        //console.log("Northwest: " + box.id + " " + northWest.id);
        boxConnect+=2;
      }
      if((box.checked === true && (parseInt(box.id)+1)%20 !== 0) && east.checked === true) {
        //console.log("East: " + box.id + " " + east.id);
        boxConnect++;
      }
      if(box.checked === true && west.checked === true && (box.id-1)%20 !== 19) {
        //console.log("West: " + box.id + " " + west.id);
        boxConnect++;
      }
      if((box.checked === true && box.id < 380) && south.checked === true) {
        //console.log("South: " + box.id + " " + south.id);
        boxConnect++;
      }
      if(box.checked === true && (box.id < 380) && southEast.checked === true) {
        //console.log("Southeast: " + box.id + " " + southEast.id);
        boxConnect+=2;
      }
      if((box.checked === true && box.id < 380) && southWest.checked === true) {
        //console.log("Southwest: " + box.id + " " + southWest.id);
        boxConnect+=2;
      }

      function ridSingles(){
        if(boxConnect < 2) {
          box.checked = false;
        }
      }


      //1.store old box.id in array
      //2.uncheck old position during random space move
      //3.check new position after random space move
      // *******THIS IS THE PROBLEM*******
      function moveBoxes(){
        var spaces = [1, -1, 19, 20, 21, -19, -20, -21];
        var randNewSpace = Math.floor(Math.random()*spaces.length);
        if(box.checked === true && box.id < 400 || box.id > 0){
          box.id = parseInt(box.id)+ parseInt(spaces[randNewSpace]);
          //console.log(parseInt(box.id) + parseInt(spaces[randNewSpace]));
          box.id = parseInt(box.id);
        }
        else if(box.checked === true && box.id > 400 || box.id < 0){
          box.checked = false;
        }
      }

      setInterval(function(){
        ridSingles();
        moveBoxes();
      }, 1000);
    });
    //console.log(ary);
  });

}

buildGrid();
randomize();

button.addEventListener("click", function() {
  console.log("clicked");
  checkGrid(gridScheme);
});
