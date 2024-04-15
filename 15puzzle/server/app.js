const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express()

const port = process.env.PORT || 4000

app.use(cors());

app.use(bodyParser.urlencoded({extended : false}))

app.use(bodyParser.json())

//set connect in database
const pool = mysql.createPool({
  connectionLimit : 10,
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'puzzleGame'
})

app.get('/', (req,res)=>{
  pool.getConnection((err, connection) =>{
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`);
    connection.query('SELECT * FROM players', (err, rows) =>{
      if(!err){
        res.send(rows)
      }else{
        console.log(err);
      }
    })
    connection.release()
  })
})

app.post('/createPlayer', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    console.log(req.body.player);
    const playerData = {
      playerName : req.body.name
    };

    const sql = 'INSERT INTO players SET ?';

    connection.query(sql, playerData, (err, results) => {
      if (!err) {
        res.send({ 
          message: 'Player created successfully!!',
          data: playerData,
          status: 'ok'
        });
      } else {
        console.log(err);
      }
    });
    connection.release();
  });
});

app.post('/createLeaderboard', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const leaderboardData = {
      playerId: req.body.playerId,
      timeToplay: req.body.timeToplay
    };

    const sql = 'INSERT INTO leaderboard SET ?';

    connection.query(sql, leaderboardData, (err, results) => {
      if (!err) {
        res.send({ 
          message: 'Leaderboard updated successfully!!',
          data: leaderboardData,
          status: 'ok'
        });
      } else {
        console.log(err);
      }
    });
    connection.release();
  });
});

app.get('/getLeaderboardData', (req,res)=>{
  pool.getConnection((err, connection) =>{
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`);
    connection.query('SELECT leaderboard.id, players.playerName, leaderboard.timeToplay FROM leaderboard INNER JOIN players ON leaderboard.playerId = players.id ORDER BY leaderboard.timeToplay LIMIT 9', (err, rows) =>{
      if(!err){
        res.send(rows)
      }else{
        console.log(err);
      }
    })
    connection.release()
  })
})


app.listen(port,() => console.log((`listen on port ${port}`)));