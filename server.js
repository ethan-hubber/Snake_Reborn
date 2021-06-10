const express = require("express")
const port = 8080;
const dataHandler = require("./dataHandler");
const server = express();
const bodyParser = require('body-parser');

//const { link } = require("node:fs");

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

let username = "";

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
server.get("/", function(req, res) {
    res.writeHead(200, {"content-Type": "text/plain"})
    res.end("node js serverrrrrrr")
});



server.post("/login", function(req, res) {
    username = req.body.uname;
   // window.location.href="index.html";
    res.send("success, I love your instrument now lets go play, go back to the main page and start playing");

});

server.post("/record_score", function(req, res) {
    dataHandler.saveItem(req.body["score"], username);
    res.send("ok");
    
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });

