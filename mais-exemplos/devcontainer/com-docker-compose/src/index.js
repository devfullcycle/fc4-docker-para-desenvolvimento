const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/external-api', async function(req, res){
  //const address = 'http://host.docker.internal:9000/products';
  const address = 'http://external-api:9000/products';
  const response = await fetch(address)
  const data = await response.json()
  res.send(data)
});

app.get('/test-db', async function(req, res){
  const mysql = require('mysql2');
  const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
  });
  connection.connect(error => {
    if (error) {
      console.error('Error connecting to database: ', error);
      return;
    }
    res.send('Connected to DB');
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});