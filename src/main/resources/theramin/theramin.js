const A0 = 27.5;
const C8 = 4186;
const context = new (window.AudioContext || window.webkitAudioContext)();

userNodeMap = {};

function createNodeIfUserDoesntExist(userId) {
  if (userNodeMap[userId] == undefined) {
    newNode(userId);
  }
}

function newNode(userId) {
  const osc = context.createOscillator();
  const mouseGain = context.createGain();
  const toggleGain = context.createGain();
  osc.connect(mouseGain);
  mouseGain.connect(toggleGain);
  toggleGain.connect(context.destination);
  toggleGain.gain.value = 1;
  osc.frequency.value = 440;
  osc.start();

  userElement = document.createElement("div");
  userElement.className = "user";
  document.body.appendChild(userElement);
  userElement.style.color ="white";

  userNodeMap[userId] = {
    "osc": osc,
    "mouseGain": mouseGain,
    "toggleGain": toggleGain,
    "userElement": userElement
  }
}

function deleteNode(userId) {
  document.body.removeChild(userNodeMap[userId]["userElement"]);
  delete userNodeMap[userId];
}

function logScale(n, min, max) {
  const top = Math.log(max);
  const bot = Math.log(min);
  const scale = top - bot;
  return Math.exp(bot + scale * n);
}

document.onmousemove = function(event) {
  moveUser()
}

document.touchmove = function(event) {
  event.preventDefault();
  moveUser()
}

function moveUser() {
  const y = 1 - event.pageY / window.innerHeight;
  const x = event.pageX / window.innerWidth;
  frequency = logScale(x, A0, C8)
  mouseGainValue = logScale(y, 0.02, 1);
  const hue = x * 340;
  const sat = Math.round(y * 100);
  const lit = Math.round(y * 65);

  sendMessage(JSON.stringify({
    "frequency": frequency,
    "mouseGain": mouseGainValue,
    "hue": hue,
    "sat": sat,
    "lit": lit,
    "x": event.pageX,
    "y": event.pageY
  }));
}

function updatePage(user, frequency, mouseGainValue, hue, sat, lit, x, y) {
  // document.body.parentElement.style.backgroundColor ="hsl("+hue+","+sat+"%,"+lit+"%)";
  var userElement = userNodeMap[user]["userElement"];
  userElement.style.color ="hsl("+hue+","+sat+"%,"+lit+"%)";
  userElement.style.backgroundColor ="hsl("+hue+","+sat+"%,"+lit+"%)";
  userElement.style.left = x + "px"; 
  userElement.style.top = y + "px";
  userNodeMap[user]["osc"].frequency.value = frequency;
  userNodeMap[user]["mouseGain"].gain.value = mouseGainValue;
}

// document.onmousedown = function() {
//   document.body.style.opacity = 0;
//   toggleGain.gain.value = 1;
// }
// document.onmouseup = function() {
//   document.body.style.opacity = 1;
//   toggleGain.gain.value = 0;
// }
