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

app.get('/tickets', (req, res) => {
  pool.getConnection((err, connection) => {
    let sql = `SELECT * FROM ticket`;
    
    if (req.query.status) {
      sql += ` WHERE Status = ${connection.escape(req.query.status)}`;
    }
    
    sql += ` ORDER BY LastestTicketTimeStamp DESC, Status`;
    
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send({
        message : 'List & Sort Tickets Success!!',
        data : results
      });
    });
  });
});

app.get('/ticket/:id', (req,res)=>{
  pool.getConnection((err, connection) =>{
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`);
    connection.query('SELECT * from ticket WHERE id = ?',[req.params.id] ,(err, rows) =>{
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

app.put('/updateTicket/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    const data = {
      Title: req.body.Title,
      Description: req.body.Description,
      ContactInformation: req.body.ContactInformation,
      newTimestamp: new Date(),
      newStatus: req.body.Status
    };
    
    let sqlTicket = `UPDATE ticket SET Title = ?, Description = ?, ContactInformation = ?, Status = ?, LastestTicketTimeStamp = ? WHERE id = ?`;
    let sqlLastestTicket = `INSERT INTO LastestTicket (TicketId, LastestTicketTimeStamp, Status) VALUES (?, ?, ?)`;

    connection.query(sqlTicket, [data.Title, data.Description, data.ContactInformation, data.newStatus, data.newTimestamp, req.params.id], (err, result) => {
        if (err) throw err;
        connection.query(sqlLastestTicket, [req.params.id, data.newTimestamp, data.newStatus], (err, result) => {
            if (err) throw err;
            res.send({
              message : 'Update & Insert Data Sucess!!',
              data : data
            });
        });
    });
  })
});



app.listen(port,() => console.log((`listen on port ${port}`)));