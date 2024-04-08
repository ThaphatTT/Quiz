const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended : false}))

app.use(bodyParser.json())

//set connect in database
const pool = mysql.createPool({
  connectionLimit : 10,
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'ticket_application'
})


app.get('/', (req,res)=>{
  pool.getConnection((err, connection) =>{
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`);
    connection.query('SELECT * from ticket', (err, rows) =>{
      connection.release()
      if(!err){
        res.send(rows)
      }else{
        console.log(err);
      }
    })
  })
})

app.post('/create', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const data = {
      Title: req.body.Title,
      Description: req.body.Description,
      ContactInformation: req.body.ContactInformation,
      StartTimeStamp: new Date(),
      Status: 1
    };

    const sql = 'INSERT INTO ticket SET ?';

    connection.query(sql, data, (err, results) => {
      connection.release();

      if (!err) {
        res.send({ 
          message: 'Create Success!!',
          data: data
      });
      } else {
        console.log(err);
      }
    });
  });
});



app.listen(port,() => console.log((`listen on port ${port}`)));