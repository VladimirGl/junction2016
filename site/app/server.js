
'use strict';
var http = require('http');
var express = require('express');
var app = express();
var livereload = require('express-livereload');
const routes = require('./api/routes');

app.use(express.static(__dirname+"/build"));

app.get("/", (req,res)=>{
	res.sendFile(__dirname+"/index.html");
});

routes(app);


console.log("server listening on http://locahost:1337");
livereload(app, {
	watchDir: process.cwd()+"/build"
});
app.listen(1337);
