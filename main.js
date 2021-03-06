
var canvas = document.getElementById("MyCanvas");
var context = canvas.getContext("2d");

// Declare variables for robots
var bobbyX = 150; // x-axis of the center point of bobby
var bobbyY = 150; // y-axis of the center point of bobby
var clarkX = 450; // x-axis of the center point of clark
var clarkY = 150; // y-axis of the center point of clark
var bodyHalfWidth = 70;
var bodyHalfHeight = 40;
var headHalfWidth = 50;
var headHalfHeight = 25;
var neckLength = 10;
var armLength = 30;
var shoulderLength = 15;
var legLength = 40;
var footLength = 10;
var eyeWidth = 5;
var mouthWidth = 60;

var bobby = {
  'position': {
    'x': 150,
    'y': 150
  },
  'body': {
    'halfWidth': 70,
    'halfHeight': 40
  },
  'head': {
    'halfWidth': 50,
    'halfHeight': 25
  },
  'neckLength': 10,
  'armLength': 30,
  'shoulderLength': 15,
  'legLength': 40,
  'footLength': 10,
  'eyeWidth': 5,
  'mouthWidth': 60
};

var clark = {
  'position': {
    'x': 150,
    'y': 450
  },
  'body': {
    'halfWidth': 70,
    'halfHeight': 40
  },
  'head': {
    'halfWidth': 50,
    'halfHeight': 25
  },
  'neckLength': 10,
  'armLength': 30,
  'shoulderLength': 15,
  'legLength': 40,
  'footLength': 10,
  'eyeWidth': 5,
  'mouthWidth': 60
};

// Define functions

// erase existing drawing
function eraseBobby(){
  context.beginPath();
  context.fillStyle = "White";
  context.fillRect(0, 0, 300, 300);
}

function eraseClark(){
  context.beginPath();
  context.fillStyle = "White";
  context.fillRect(300, 0, 300, 300);
}

// draw a line
function drawLine(x1, y1, x2, y2){
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.stroke();
}

// draw a box
function drawBox(x1, x2, y1, y2){
  drawLine(x1, y1, x1, y2);
  drawLine(x1, y2, x2, y2);
  drawLine(x1, y1, x2, y1);
  drawLine(x2, y1, x2, y2);
}

function drawBoxWithBox(box){
  // var x1 = box.topLeft.x;
  // var x2 = box.bottomRight.x;
  // var y1 = box.topLeft.y;
  // var y2 = box.bottomRight.y;
  drawLineWithLine(box.leftLine());
  drawLineWithLine(box.rightLine());
  drawLineWithLine(box.topLine());
  drawLineWithLine(box.bottomLine());
  // drawLine(x1, y1, x1, y2);
  // drawLine(x1, y2, x2, y2);
  // drawLine(x1, y1, x2, y1);
  // drawLine(x2, y1, x2, y2);
}

function drawLineWithLine(line) {
  drawLine(line.start.x, line.start.y, line.end.x, line.end.y);
}

// draw an arm
function drawArm(x1, y1, x2, y2){
  drawLine(x1, y1, x2, y1);
  drawLine(x2, y1, x2, y2);
}

// draw a leg
function drawLeg(x1, y1, x2, y2){
  drawLine(x1, y1, x1, y2);
  drawLine(x1, y2, x2, y2);
}

// draw eyes
function drawEye(x1, y1, r1, x2, y2, r2){
  context.beginPath();
  context.arc(x1, y1, r1, 0, 2*Math.PI);
  context.stroke();
  context.beginPath();
  context.arc(x2, y2, r2, 0, 2*Math.PI);
  context.stroke();
}

// draw a mouth
function drawMouth(x1, y1, x2, y2, x3, y3){
  context.beginPath();
  context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
  context.stroke();
}

// draw name
function drawName(name, location){
  context.font = '32px Arial';
  context.textBaseline = 'bottom';
  context.fillText(name, location, 300);
}

function drawRobot(x, y, name) {
  // draw body
  var Robot = Wonderland.Robot;
  var bobby = new Robot(x, y, name);
  drawBoxWithBox(bobby.getBody());

  // draw neck
  drawLine(x, y - bodyHalfHeight, x, y - bodyHalfHeight - neckLength);
  // draw head
  drawBox(x - headHalfWidth, x + headHalfWidth, y - bodyHalfHeight - neckLength - 2*headHalfHeight, y - bodyHalfHeight - neckLength);
  // draw arm
  drawArm(x - bodyHalfWidth, y - 15, x - bodyHalfWidth - shoulderLength, y - 15 + armLength);
  drawArm(x + bodyHalfWidth, y - 15, x + bodyHalfWidth + shoulderLength, y - 15 + armLength);
  // draw leg
  drawLeg(x - bodyHalfWidth/2, y + bodyHalfHeight, x - bodyHalfWidth/2 - footLength, y + bodyHalfHeight + legLength);
  drawLeg(x + bodyHalfWidth/2, y + bodyHalfHeight, x + bodyHalfWidth/2 - footLength, y + bodyHalfHeight + legLength);
  // draw eyes
  drawEye(x - headHalfWidth/2, y - bodyHalfHeight - neckLength - headHalfHeight*1.5, eyeWidth, x + headHalfWidth/2, y - bodyHalfHeight - neckLength - headHalfHeight*1.5, eyeWidth);
  // draw mouth
  drawMouth(x - mouthWidth/2, y - bodyHalfHeight - neckLength - headHalfHeight/1.5, x, y - bodyHalfHeight - neckLength - headHalfHeight/5, x + mouthWidth/2, y - bodyHalfHeight - neckLength - headHalfHeight/1.5);
  // draw name
  drawName(name, x - 50);
}

function drawRobotWithRobot(robot){
  // draw body
  drawBox(x - bodyHalfWidth, x + bodyHalfWidth, y - bodyHalfHeight, y + bodyHalfHeight);
  // draw neck
  drawLine(x, y - bodyHalfHeight, x, y - bodyHalfHeight - neckLength);
  // draw head
  drawBox(x - headHalfWidth, x + headHalfWidth, y - bodyHalfHeight - neckLength - 2*headHalfHeight, y - bodyHalfHeight - neckLength);
  // draw arm
  drawArm(x - bodyHalfWidth, y - 15, x - bodyHalfWidth - shoulderLength, y - 15 + armLength);
  drawArm(x + bodyHalfWidth, y - 15, x + bodyHalfWidth + shoulderLength, y - 15 + armLength);
  // draw leg
  drawLeg(x - bodyHalfWidth/2, y + bodyHalfHeight, x - bodyHalfWidth/2 - footLength, y + bodyHalfHeight + legLength);
  drawLeg(x + bodyHalfWidth/2, y + bodyHalfHeight, x + bodyHalfWidth/2 - footLength, y + bodyHalfHeight + legLength);
  // draw eyes
  drawEye(x - headHalfWidth/2, y - bodyHalfHeight - neckLength - headHalfHeight*1.5, eyeWidth, x + headHalfWidth/2, y - bodyHalfHeight - neckLength - headHalfHeight*1.5, eyeWidth);
  // draw mouth
  drawMouth(x - mouthWidth/2, y - bodyHalfHeight - neckLength - headHalfHeight/1.5, x, y - bodyHalfHeight - neckLength - headHalfHeight/5, x + mouthWidth/2, y - bodyHalfHeight - neckLength - headHalfHeight/1.5);
  // draw name
  drawName(name, x - 50);
}

// draw gradient
// var grd = context.createRadialGradient(75,50,5,90,60,100);
// grd.addColorStop(0,"red");
// grd.addColorStop(1,"white");
// context.fillStyle = grd;
// context.fillRect(102, 70, 10, 20);
// drawBox(100, 200, 50, 100); // head
// drawBox(80, 220, 120, 200); // body
// drawLine(150, 100, 150, 120); // neck
// drawArm(80, 150, 60, 180); // left arm
// drawArm(220, 150, 240, 180); // right arm
// drawLeg(115, 200, 100, 220); // left leg
// drawLeg(185, 200, 170, 220); // right leg
// drawEye(125, 65, 5, 175, 65, 5); // eyes
// drawMouth(120, 85, 150, 95, 180, 85); //mouth
// erase();
// drawRobot(clarkX, clarkY, "Clark");
// set timer to animate Bobby and Clark

setInterval(eraseBobby, 1000);
setTimeout(function(){
  setInterval(drawRobot, 1000, bobbyX, bobbyY, 'Bobby');
}, 500);

setInterval(eraseClark, 1000);
setTimeout(function(){
  setInterval(drawRobot, 1000, clarkX, clarkY, 'Clark');
}, 500);


// setInterval(eraseBobby, 1000);

