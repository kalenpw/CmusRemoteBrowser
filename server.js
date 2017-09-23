var express = require('express');
var app = express();
var path = require('path');
var exec = require('child_process').exec;
var child;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/play', function(req, res){
    var pause = "cmus-remote -u";
    handleCommand(pause);
    res.redirect("index.html");
});

app.get('/next', function(req, res){
    var next = "cmus-remote -n";
    handleCommand(next);
    res.redirect("index.html");
});

app.get('/previous', function(req,res){
    var previous = "cmus-remote -r";
    handleCommand(previous);
    res.redirect("index.html");
});

app.get('/shuffle', function(req, res){
    var shuffle = "cmus-remote -S";
    handleCommand(shuffle);
    res.redirect("index.html");
});

app.get('/repeat', function(req, res){
    var shuffle = "cmus-remote -R";
    handleCommand(shuffle);
    res.redirect("index.html");
});

app.get('/volumeUp', function(req, res){
    var shuffle = "cmus-remote -v +5%";
    handleCommand(shuffle);
    res.redirect("index.html");
});

app.get('/volumeDown', function(req, res){
    var shuffle = "cmus-remote -v -5%";
    handleCommand(shuffle);
    res.redirect("index.html");
});

app.get('/rewind', function(req, res){
    var shuffle = "cmus-remote -k -10s";
    handleCommand(shuffle);
    res.redirect("index.html");
});

app.get('/fastforward', function(req, res){
    var shuffle = "cmus-remote -k +10s";
    handleCommand(shuffle);
    res.redirect("index.html");
});

//Returns array with track information
// Index    Value
// 0        Track title
// 1        Album title
// 2        Artist name
app.get('/songInfo', function(req, res){
    var cmdSongName = "cmus-remote -Q | sed -n -e 's/^.*tag title //p'";
    var cmdAlbumName = "cmus-remote -Q | sed -n -e 's/^.*tag album //p'";
    var cmdArtistName = "cmus-remote -Q | sed -n -e 's/^.*tag artist //p'";

    var song = getCommandOutput(cmdSongName);
    var album = getCommandOutput(cmdAlbumName);
    var artist = getCommandOutput(cmdArtistName);

    var songInfo = [song, album, artist];

    res.send(songInfo);
});

//Returns an array to client with shuffle and repeat information
// Index      Value
// 0          Shuffle On?
// 1          Repeat On?
app.get("/shuffleRepeat", function(rerq, res){
    var cmdShuffle = "cmus-remote -Q | sed -n -e 's/^.*set shuffle //p'";
    var cmdRepeat = "cmus-remote -Q | sed -n -e 's/^.*set repeat //p'";

    var isShuffled = getCommandOutput(cmdShuffle);
    var isRepeat = getCommandOutput(cmdRepeat);

    var playInfo = [isShuffled, isRepeat];

    res.send(playInfo);
});

var server = app.listen(8080, function () {
    console.log("Server online");
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