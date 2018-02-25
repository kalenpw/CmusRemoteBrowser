"use strict";


window.onload = function () {
    $('button').click(function(){
        $.ajax({
            type: 'POST',
            url: '/command',
            data: {
                ID: event.target.id
            },
            
        });
    });

    //$('#play').click(function(){
    //    $.post('/play');
    //});

    //$('#previous').click(function(){
    //    console.log("Clicked play");
    //    $.post('/previous');
    //});

    console.log("Loaded");
    var body = document.getElementById("body");
    body.addEventListener("keypress", handleKeyPress);
    body.addEventListener("keydown", handleKeyDown);

    $.get("/songInfo", function (output) {
        var song = output[0];
        var album = output[1];
        var artist = output[2];
        document.getElementById("song").innerHTML = song;
        document.getElementById("album").innerHTML = album;
        document.getElementById("artist").innerHTML = artist;
    });

    $.get("/shuffleRepeat", function (output) {
        var isShuffle = output[0].toString();
        var isRepeat = output[1].toString();

        //God knows why .includes() works, but === "true" doesn't but oh well
        var shuffleColor = (isShuffle.includes("true")) ? "#999999" : "#333333";
        var repeatColor = (isRepeat.includes("true")) ? "#999999" : "#333333";

        document.getElementById("shuffle").style.color = shuffleColor;
        document.getElementById("repeat").style.color = repeatColor;
    });

    // $.get("/albumArt", function(output){
    //     // console.log(output);
    // });

    // var apiCall = new URL("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=0cfc4bbbd70f2237020eb7a1b4e7fd4f&artist=Cher&album=Believe&format=json");
    // // console.log(apiCall.toJSON());
    // var url = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=0cfc4bbbd70f2237020eb7a1b4e7fd4f&artist=Cher&album=Believe&format=json";
    // var xhmlHttp = new XMLHttpRequest();
    // xhmlHttp.open("GET", url, false);
    // xhmlHttp.send(null);
    // console.log(xhmlHttp.responseXML);

    //Duplicated so we can have one run every 5 seconds to keep updated,
    //but also have one that loads instantly on page load so the remote doesn't
    //jump around each time updateSongInfo() is called
    updateSongInfo();
};

function updateSongInfo(){
    setInterval(function(){
        $.get("/songInfo", function(output){
            var song = output[0];
            var album = output[1];
            var artist = output[2];
            document.getElementById("song").innerHTML = song;
            document.getElementById("album").innerHTML = album;
            document.getElementById("artist").innerHTML = artist;
        });
    }, 5000);
}

function handleHotKeys(event, isKeyDown){
    var keyBinds = (isKeyDown) ? createKeyDownArray() : createKeyBindsArray();
    var key = event.keyCode;
    var xmlHttp = new XMLHttpRequest();
    for(var i = 0; i < keyBinds.length; i++){
        if(keyBinds[i][0] === key){
            var command = keyBinds[i][1];
            var commandElementId = command.substring(1);
            document.getElementById(commandElementId).style.color = "#999999";
            xmlHttp.open("GET", command, false);
            xmlHttp.send(null);
            setTimeout(function() {revertButtonTextColor(commandElementId);}, 200);
            return xmlHttp.responseText;
        }
    }
}

function handleKeyPress(event){
    return handleHotKeys(event, false);
}

function handleKeyDown(event) {
    return handleHotKeys(event, true);
}

function revertButtonTextColor(eleId) {
    var fontColor = "#333333";
    var element = document.getElementById(eleId);
    element.style.color = fontColor;
}

function createKeyBindsArray(){
    var keyBinds = [
        [32, "/play"],//Spacebar
        [122, "/previous"],//z
        [98, "/next"],//b
        [99, "/play"],//c
        [115, "/shuffle"],//s
        [114, "/repeat"],//r
        [45, "/volumeDown"],//minus
        [61, "/volumeUp"]// + sign
    ];
    return keyBinds;
}

function createKeyDownArray(){
    var keyDownArray = [
        [37, "/rewind"],//left arrow
        [39, "/fastforward"],//right arrow
        [38, "/volumeUp"],//up arrow
        [40, "/volumeDown"]//down arrow
    ];
    return keyDownArray;
}
