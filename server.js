var express = require('express');
var app = express();
var path = require('path');
var sys = require('sys');
var exec = require('child_process').exec;
var child;

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/play', function(req, res){
    var pause = "cmus-remote -u";
    handleCommand(pause);

});

app.get('/next', function(req, res){
    var next = "cmus-remote -n";
    handleCommand(next);
});

app.get('/previous', function(req,res){
    var previous = "cmus-remote -r";
    handleCommand(previous);
});

app.get('/shuffle', function(req, res){
    var shuffle = "cmus-remote -S";
    handleCommand(shuffle);
});

app.get('/volumeUp', function(req, res){
    var shuffle = "cmus-remote -v +5%";
    handleCommand(shuffle);
});

app.get('/volumeDown', function(req, res){
    var shuffle = "cmus-remote -v -5%";
    handleCommand(shuffle);
});

var server = app.listen(8080, function () {
    console.log("Server online");
});

function handleCommand(command){
    child = exec(command, function(error, stdout, stderr){
        // sys.print('Stdout ' + stdout);
        // sys.print('Stderr ' + stderr);
        if(error !== null){
            console.log('exec error ' + error);
        }
    })
}
