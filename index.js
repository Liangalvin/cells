var gen = 0;
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

  for( row = 0; row < rows; ++row ) {
    cells[row] = [];
    states[row] = [];

    for( col = 0; col < cols; ++col ) {
      cell = document.createElement("input");
      cell.setAttribute("type", "checkbox");

      cells[row][col] = cell;
      states[row][col] = 0;

      grid.appendChild(cell);

    }
  }
}

function randomize() {
//var rand = Math.round(Math.random());

//random state either 1(checked) or 0(not)
//input box is either checked or not

  var row;
  var col;

  for( row = 0; row < rows; ++row ) {
    for( col = 0; col < cols; ++col ) {
      states[row][col] = Math.round(Math.random());
      console.log(states[row][col]);
      if(cells[row][col] === true){
        states[row][col].checked = true;
      }
    }
  }
}

function updateGrid(){

  var row;
  var col;
  var num;

  // update states from last update

  for( row = 0; row < rows; ++row ) {
    for( col = 0; col < cols; ++col ) {
      if( cells[row][col].checked === true ){
        states[row][col].checked = 1;
      }
    }
  }

  for( row = 0; row < rows; ++row ) {
    for( col = 0; col < cols; ++col ) {
      numCell = 0;

      // North
      if( row > 0 )
        numCell += states[row - 1][col];
      // NorthEast
      if( row > 0 && col < cols - 1 ) numCell += states[row - 1][col + 1];
      // East
      if( col < cols - 1 )
        numCell += states[row][col + 1];
      // SouthEast
      if( row < rows - 1 && col < cols - 1 )
        numCell += states[row + 1][col + 1];
      // South
      if( row < rows - 1 )
        numCell += states[row + 1][col];
      // SouthWest airlines
      if( row < rows - 1 && col > 0 )
        numCell += states[row + 1][col - 1];
      // West
      if( col > 0 )
        numCell += states[row][col - 1];
      // NorthWest
      if( col > 0 && row > 0 )
        numCell += states[row - 1][col - 1];

      //cell row col checked and its 2 in a row or 3 in a row
      if(cells[row][col].checked === true ) {
        if(numCell === 2 || numCell === 3){
          states[row][col].checked = 1;
        }
      }
    }
  }
  gen++;
}

function generateCells() {
  updateGrid();
  interval = setInterval( updateGrid, 800 );
}

//buildGrid();

button.addEventListener("click", function(evt){
  console.log("clicked");
  buildGrid();
  gen = 0;
  randomize();
  generateCells();
});
