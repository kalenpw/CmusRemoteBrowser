var express = require('express');
var app = express();
var path = require('path');
var exec = require('child_process').exec;
var Commands = require('./commands.js');
var child;
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());

app.all('/', function(request, response){
    res.sendFile(path.join(__dirname + '/index.html'));
    res.send(200);
});

app.post('/command', function(request, response){
    var command = Commands.get(request.body.ID);
    if(command){
        handleCommand(command);
    }
    response.send("");
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
