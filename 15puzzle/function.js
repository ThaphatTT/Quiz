const rows = 4;
const columns = 4;

let obTile;
let airTile;

let imgOrder = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"]

const pathFolder = "img/"

let timer;
let seconds = 0;
export function startGame(){
  startTimer();
  let countdown = 3;
  let countdownTimer = setInterval(function() {
    document.getElementById('title').innerText = "Game starts in: " + countdown + "s";
    countdown--;
    if (countdown < 0) {
      clearInterval(countdownTimer);
      imgOrder = randomIndex(imgOrder)
      for(let r = 0; r<rows; r++){
        for(let c = 0; c<columns; c++){
          let tile = document.createElement("img");
          tile.id = r.toString() + "-" + c.toString();
          tile.src = pathFolder + imgOrder.shift() + ".png"

          tile.addEventListener("dragstart",dragStart);
          tile.addEventListener("dragover",dragOver);
          tile.addEventListener("dragenter",dragEnter);
          tile.addEventListener("dragleave",dragLeave);
          tile.addEventListener("drop",dragDrop);
          tile.addEventListener("dragend",dragEnd);
          document.getElementById("board").append(tile);
          document.getElementById('title').innerText = 'Puzzle Game'
        }
      }
    }
  }, 1000);
}


function dragStart(){
  obTile = this;
}

function dragOver(e){
  e.preventDefault();
}

function dragEnter(e){
  e.preventDefault();
}

function dragLeave(){
  
}
function dragDrop(e){
  e.preventDefault();
  airTile = this;
}
function dragEnd(){
  if (!airTile.src.includes("16.png")) {
    return;
  }

  let tileCoords = obTile.id.split("-");
  let r = parseInt(tileCoords[0]);
  let c = parseInt(tileCoords[1]);
  // console.log('Tile r'+r);
  // console.log('Tile c'+c);
  // console.log('TileCoords'+tileCoords);
  let airCoords = airTile.id.split("-");
  let r2 = parseInt(airCoords[0]);
  let c2 = parseInt(airCoords[1]);
  // console.log('Air r:'+r);
  // console.log('Air c:'+c);
  // console.log('AirCoords :'+ airCoords);

  let moveLeft = r == r2 && c2 == c-1;
  // console.log('move left :'+moveLeft);
  let moveRight = r == r2 && c2 == c+1;
  // console.log('move right :'+moveRight);
  let moveUp = c == c2 && r2 == r-1;
  // console.log('move up :'+moveUp);
  let moveDown = c == c2 && r2 == r+1;
  // console.log('move down :'+moveDown);
  let checkObjectMove = moveLeft || moveRight || moveUp || moveDown;
  // console.log(checkObjectMove);

  if (checkObjectMove) {
      let tileImg = obTile.src;
      let airImg = airTile.src;
      
      obTile.src = airImg;
      airTile.src = tileImg;
  }
  checkWin();
  console.log(checkWin());

}

function randomIndex(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function checkWin() {
  let tiles = document.getElementById("board").getElementsByTagName("img");
  for (let i = 0; i < tiles.length; i++) {
    let filename = tiles[i].src.replace(/^.*[\\\/]/, '');
    let number = filename.split(".")[0];
    if (number != i + 1) {
      return false;
    }
  }
  stopTimer()
  return true;
}

function startTimer() {
  timer = setInterval(function() {
    seconds++;
    document.getElementById('timer').innerText = "Time: " + seconds + "s";
  }, 4000);
}

function stopTimer() {
  clearInterval(timer);
}