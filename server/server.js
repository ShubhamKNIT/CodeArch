const express = require('express');
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true}));

const port = 3004;
const express = require('express');
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true}));

const port = 3004;

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chm'
    });

// connect to database
dbConn.connect(); 

// connection configuration
app.get("/dummy", (req, res) => {
    res.json({})
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.get("/dummy", (req, res) => {
    res.json({})
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
