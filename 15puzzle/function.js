const rows = 4;
const columns = 4;

let currTile;
let otherTile;

let imgOrder = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"]

const pathFolder = "img/"
window.onload = function(){
  for(let r = 0; r<rows; r++){
    for(let c = 0; c<columns; c++){
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = pathFolder + imgOrder.shift() + ".jpg"

      tile.addEventListener("dragstart",dragStart);
      tile.addEventListener("dragover",dragOver);
      tile.addEventListener("dragenter",dragEnter);
      tile.addEventListener("dragleave",dragLeave);
      tile.addEventListener("drop",dragDrop);
      tile.addEventListener("dragend",dragEnd);
      document.getElementById("board").append(tile);
    }
  }
}

function dragStart(){
  currTile = this;
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
  otherTile = this;
}
function dragEnd(){
  let currImg = currTile.src
  let otherImg = otherTile.src;
  currTile.src = otherImg;
  otherTile.src = currImg;
}
