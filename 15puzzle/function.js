import { showVictoryScreen } from './interacUI.js'
const rows = 4;
const columns = 4;

let obTile;
let airTile;

let imgOrder = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"]

const pathFolder = "img/"

let timer;
let seconds = 0;

let namePlayerInput;
let tokenData = {};
let apiUrlGetPlayers = 'http://localhost:4000/';

let apiUrlCreatePlayer = 'http://localhost:4000/createPlayer';
let apiUrlCreateLeaderBoard = 'http://localhost:4000/createLeaderboard';

function startGame(){
  startTimer();
  let countdown = 3;
  seconds = 0;
  document.getElementById('timer').innerText = "Time: " + seconds + "s";
  let gameImgOrder = [...imgOrder]
  let countdownTimer = setInterval(function() {
    document.getElementById('title').innerText = "Game starts in: " + countdown + "s";
    countdown--;
    gameImgOrder = randomIndex(gameImgOrder)
    console.log(imgOrder);
    if (countdown < 0) {
      clearInterval(countdownTimer);
      let oldTiles = document.getElementById("board").getElementsByTagName("img");
      while(oldTiles.length > 0){
        oldTiles[0].parentNode.removeChild(oldTiles[0]);
      }
      for(let r = 0; r<rows; r++){
        for(let c = 0; c<columns; c++){
          let tile = document.createElement("img");
          tile.id = r.toString() + "-" + c.toString();
          tile.src = pathFolder + gameImgOrder.shift() + ".png"

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
  if(checkWin() === true){
    console.log(checkWin());
    document.getElementById('time-to-finish').innerText = "Time you can play : " + seconds + "s";
    tokenData.score = seconds;
    CreateLeaderBoard(tokenData)
    showVictoryScreen();
    console.log(tokenData);
  }
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

document.getElementById('login-button').addEventListener('click', function() {
  let containerGame = document.getElementById('container');
  let containerLogin = document.getElementById('container-login');
  if (containerGame.classList.contains('hidden')) {
    containerGame.classList.remove('hidden');
    containerLogin.classList.add('hidden');
    namePlayerInput = document.getElementById('login-input').value;
    tokenData = {
      name: namePlayerInput,
      score: null
    };
    createPlayer(namePlayerInput);
    startGame();
  } else {
    containerGame.classList.add('hidden');
    containerLogin.classList.remove('hidden');
  }
});

document.getElementById('victory-button-replay').addEventListener('click', function() {
  let victoryScreen = document.getElementById('container-victory');
  if (victoryScreen.classList.contains('hidden')) {
    victoryScreen.classList.remove('hidden');
  } else {
    victoryScreen.classList.add('hidden');
  }
  stopTimer();
  startGame();
});

document.getElementById('paytoWin').addEventListener('click', function() {
  solvePuzzle() 
});

function solvePuzzle() {
  let tiles = document.getElementById("board").getElementsByTagName("img");
  let sortedTiles = Array.from(tiles).sort((a, b) => {
    let aNumber = Number(a.src.split("/").pop().split(".")[0]);
    let bNumber = Number(b.src.split("/").pop().split(".")[0]);
    return aNumber - bNumber;
  });
  for(let i = 0; i < sortedTiles.length; i++) {
    document.getElementById("board").append(sortedTiles[i]);
  }
}


function createPlayer(name) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ name: name })
  };
  fetch(apiUrlCreatePlayer, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let playerId = data.id;
      tokenData.playerId = playerId;
      
    })
    .catch(error => console.error('Error:', error));
}

function getPlayerId(name) {
  return new Promise((resolve, reject) => {
    fetch(apiUrlGetPlayers)
      .then(response => response.json())
      .then(data => {
        for (let player of data) {
          if (player.playerName === name) {
            resolve(player.id);
            return;
          }
        }
        reject('PlayerId not found');
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}


function CreateLeaderBoard(data) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  // ใช้ getPlayerId ในการรับ playerId และจัดการกับ Promise
  getPlayerId(data.name) // ใช้ data.name แทน namePlayerInput
    .then(playerId => {
      // สร้างข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์
      let leaderboardData = {
        playerId: playerId,
        timeToplay: data.score
      };

      let options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(leaderboardData)
      };

      return fetch(apiUrlCreateLeaderBoard, options);
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // แสดงข้อมูลที่ได้จากการสร้าง Leaderboard
    })
    .catch(error => console.error('Error:', error));
}

let tableElement; // ประกาศตัวแปรเพื่อเก็บอ้างอิงตารางไว้

function fetchLeaderboardData() {
  // หากต้องการดึงข้อมูลผู้เล่นจาก API
  fetch('http://localhost:4000/getLeaderboardData')
    .then(response => response.json())
    .then(data => {
      // ตรวจสอบว่ามีข้อมูลหรือไม่
      if (data.length > 0) {
        // เลือก element ที่ต้องการแสดงข้อมูล
        const container = document.getElementById('container-menu-board-player');

        // ถ้ายังไม่มีตาราง ให้สร้างตารางขึ้นมาใหม่
        if (!tableElement) {
          const table = document.createElement('table');
          table.innerHTML = `
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player Name</th>
                <th>Time To Play</th>
              </tr>
            </thead>
          `;
          const tbody = document.createElement('tbody');
          table.appendChild(tbody);
          container.appendChild(table);
          tableElement = table; // เก็บอ้างอิงตารางไว้
        }

        // ล้างข้อมูลเดิมในตาราง
        const tbody = tableElement.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        // เพิ่มข้อมูลใหม่ลงในตาราง
        data.forEach((player, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.playerName}</td>
            <td>${player.timeToplay}</td>
          `;
          tbody.appendChild(row);
        });
      } else {
        // ถ้าไม่มีข้อมูลให้แสดงข้อความว่าไม่มีข้อมูล
        const container = document.getElementById('container-menu-board-player');
        container.innerHTML = '<p>No player data available.</p>';
      }
    })
    .catch(error => {
      // หากเกิดข้อผิดพลาดในการดึงข้อมูลจาก API
      console.error('Error fetching leaderboard data:', error);
      // แสดงข้อความข้อผิดพลาด
      const container = document.getElementById('container-menu-board-player');
      container.innerHTML = '<p>Error fetching leaderboard data. Please try again later.</p>';
    });
}

document.addEventListener('DOMContentLoaded', fetchLeaderboardData);

// เรียกใช้ fetchLeaderboardData ทุกๆ 5 วินาที
setInterval(fetchLeaderboardData, 5000);