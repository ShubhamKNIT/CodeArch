const express = require('express');
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true}));

const port = 3004;

app.get("/dummy", (req, res) => {
    res.json({})
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
