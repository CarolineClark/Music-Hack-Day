//Establish the WebSocket connection and set up event handlers
var webSocket = new WebSocket("ws://" + location.hostname + ":" + location.port + "/theramin");
webSocket.onmessage = function (msg) { receiveMessage(msg); };
webSocket.onclose = function () { alert("WebSocket connection closed") };

function receiveMessage(msg) {
    console.log(msg);
    const data = JSON.parse(msg.data);
    if (data.type == "music") {
        createNodeIfUserDoesntExist(data.user);
        updateMusic(data);
    }
    else if (data.type == "newuser") {
        newNode(data.user);
    }
}

//Send a message if it's not empty, then clear the input field
function sendMessage(message) {
    if (message !== "") {
        webSocket.send(message);
    }
}

//Update the chat-panel, and the list of connected users
function updateMusic(data) {
    message = JSON.parse(data.message);
    console.log(message);
    updatePage(
        data.user, 
        message.frequency, 
        message.mouseGain, 
        message.hue, 
        message.sat, 
        message.lit,
        message.x,
        message.y
    );
}