"use strict"

window.onload = function () {
    var body = document.getElementById("body");
    body.addEventListener("keypress", handleKeyPress);
    body.addEventListener("keydown", handleKeyDown);
}

function handleKeyPress(event){
    var key = event.keyCode;
    var keyBinds = createKeyBindsArray();
    var xmlHttp = new XMLHttpRequest();
    for(var i = 0; i < keyBinds.length; i++){
        if(keyBinds[i][0] === key){
            xmlHttp.open("GET", keyBinds[i][1], false);
            xmlHttp.send(null);
            return xmlHttp.responseText;
        }
    }
}

function handleKeyDown() {
    var key = event.keyCode;
    var keyBinds = createKeyDownArray();
    var xmlHttp = new XMLHttpRequest();
    for(var i = 0; i < keyBinds.length; i++){
        if(keyBinds[i][0] === key){
            xmlHttp.open("GET", keyBinds[i][1], false);
            xmlHttp.send(null);
            return xmlHttp.responseText;
        }
    }
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
    return keyBinds
}

function createKeyDownArray(){
    var keyDownArray = [
        [37, "/rewind"],//left arrow
        [39, "/fastforward"],//right arrow
        [38, "/volumeUp"],//up arrow
        [40, "/volumeDown"]//down arrow
    ]
    return keyDownArray;
}