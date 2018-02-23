var express = require('express');
var app = express();
var path = require('path');
var exec = require('child_process').exec;
var Commands = require('./commands.js');
var child;

app.use(express.static(__dirname + '/public'));

//Routes
app.get('/', function (req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/play', function(req, res){
    // console.log(req);
    handleCommand(Commands.PAUSE);
    res.redirect("index.html");
});

app.get('/next', function(req, res){
    handleCommand(Commands.NEXT);
    res.redirect("index.html");
});

app.get('/previous', function(req,res){
    handleCommand(Commands.PREVIOUS);
    res.redirect("index.html");
});

app.get('/shuffle', function(req, res){
    handleCommand(Commands.SHUFFLE);
    res.redirect("index.html");
});

app.get('/repeat', function(req, res){
    handleCommand(Commands.REPEAT);
    res.redirect("index.html");
});

app.get('/volumeUp', function(req, res){
    handleCommand(Commands.VOLUME_UP);
    res.redirect("index.html");
});

app.get('/volumeDown', function(req, res){
    handleCommand(Commands.VOLUME_DOWN);
    res.redirect("index.html");
});

app.get('/rewind', function(req, res){
    handleCommand(Commands.REWIND);
    res.redirect("index.html");
});

app.get('/fastforward', function(req, res){
    handleCommand(Commands.FASTFORWARD);
    res.redirect("index.html");
});

//Returns array with track information
// Index    Value
// 0        Track title
// 1        Album title
// 2        Artist name
app.get('/songInfo', function(req, res){
    var song = getCommandOutput(Commands.GET_SONG_NAME);
    var album = getCommandOutput(Commands.GET_ALBUM_NAME);
    var artist = getCommandOutput(Commands.GET_ARTIST_NAME);

    var songInfo = [song, album, artist];

    res.send(songInfo);
});

app.get("/test/:testOne", function(req, res){
    // console.log(req);
    // console.log("The res.query is: ");
    // console.log(req.query);
    console.log(req.query.testOne);
});

//Returns an array to client with shuffle and repeat information
// Index      Value
// 0          Shuffle On?
// 1          Repeat On?
app.get("/shuffleRepeat", function(req, res){
    var isShuffled = getCommandOutput(Commands.GET_SHUFFLE);
    var isRepeat = getCommandOutput(Commands.GET_REPEAT);

    var playInfo = [isShuffled, isRepeat];

    res.send(playInfo);
});

app.get("/albumArt", function(req, res) {
    var song = getCommandOutput(Commands.GET_SONG_NAME);
    var album = getCommandOutput(Commands.GET_ALBUM_NAME);
    var artist = getCommandOutput(Commands.GET_ARTIST_NAME);

});

var server = app.listen(8080, function () {
    console.log("Server online");
    console.log(commands.NEXT);
});

function getCommandOutput(command){
    const execSync = require('child_process').execSync;
    var output = execSync(command);
    return output.toString();
}

function handleCommand(command) {
    child = exec(command, function (error, stdout, stderr) {
        // sys.print('Stdout ' + stdout);
        // sys.print('Stderr ' + stderr);
        if (error !== null) {
            console.log('ERROR: ' + error);
        }
    })
}
