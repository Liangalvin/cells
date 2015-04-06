var generations = 0;
var rows = 20;
var cols = 20;
var total = rows*cols;
var cells = [];
var states = [];
var interval;

var grid = document.querySelector("#grid");
var button = document.querySelector("#generate");
var body = document.querySelector("body");

function buildGrid() {
//build a checkbox grid 20X20
//build checkboxes
//append checkboxes

  var row;
  var col;
  var cell;

  for( row = 0; row < rows; row++ ) {
    cells[row] = [];
    states[row] = [];

    for( col = 0; col < cols; col++ ) {
      cell = document.createElement("input");
      cell.setAttribute("type", "checkbox");

      cells[row][col] = cell;
      states[row][col] = 0;

      grid.appendChild(cell)
      // cell.checked=true;

    }
  }
  //console.log(cells);
}

function randomize() {
//random state either 1(checked for alive) or 0(not)
//input box is either checked or not

  var row;
  var col;

  for( row = 0; row < rows; row++ ) {
    for( col = 0; col < cols; col++ ) {
      states[row][col] = Math.round(Math.random());
      if( states[row][col] === 1 && Math.random() > .7 ){
        cells[row][col].checked = true;
      }
    }
  }
}

function updateGrid(){
  var row;
  var col;
  var numCell;

 // update states from last update

  for( row = 0; row < rows; ++row ) {
    for( col = 0; col < cols; ++col ) {
      if( states[row][col].checked === 1 ) {
        cells[row][col].checked = true;
      }
      // else {
      //   cells[row][col].checked = false;
      // }
    }
  }

  for( row = 0; row < rows; ++row ) {
    for( col = 0; col < cols; ++col ) {
      numCell = 0;

      // North
      if( row > 0 ) {
        numCell += states[row - 1][col];
      }
      // NorthEast
      if( row > 0 && col < cols - 1 ) {
        numCell += states[row - 1][col + 1];
      }
      // East
      if( col < cols - 1 ) {
        numCell += states[row][col + 1];
      }
      // SouthEast
      if( row < rows - 1 && col < cols - 1 ) {
        numCell += states[row + 1][col + 1];
      }
      // South
      if( row < rows - 1 ) {
        numCell += states[row + 1][col];
      }
      // SouthWest airlines
      if( row < rows - 1 && col > 0 ) {
        numCell += states[row + 1][col - 1];
      }
      // West
      if( col > 0 ) {
        numCell += states[row][col - 1];
      }
      // NorthWest
      if( col > 0 && row > 0 ) {
        numCell += states[row - 1][col - 1];
      }

      //console.log(numCell);
      //cell row col checked and its 2 in a row or 3 in a row
      //        ******* fix this ********
      if( cells[row][col].checked === 1 && (numCell === 2 || numCell === 3) ) {
         states[row][col].checked = true;
      }
      //cell is by itself
      else {
        states[row][col].checked = false;
      }
    }
  }
  generations++;
}

function generateCells() {
  //var counter = 0;
  setInterval( function() {
    updateGrid();
    //counter ++;
    //console.log(counter)
  }, 1000 );
}

//buildGrid > random cells generated > update every second
button.addEventListener("click", function(evt) {
   console.log("clicked");
   buildGrid();
   gen = 0;
   randomize();
   generateCells()
   //setInterval( function() { updateGrid(); }, 1000 );
});
