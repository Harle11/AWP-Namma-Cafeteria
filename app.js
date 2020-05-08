var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/NammaDB');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));

db.once('open', function(callback) {
    console.log("connection succeeded");
})


var app = express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('login', function(req, res) {
    var name = req.body.username;
    var pass = req.body.password;
    

    var data = {
        "eid": rachna,
        "pwd": rachna,
	}
       
    db.collection('users').insertOne(data, function(err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    return res.redirect('/login.html');
})


app.get('/', function(req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('login.html');
}).listen(3000)


console.log("server listening at port 3000");