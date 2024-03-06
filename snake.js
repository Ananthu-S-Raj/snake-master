//variable declaration;
var cvs = document.getElementById("canvas").getContext("2d");
var sPosx = 80;
var sPosy = 80;
var nPosx = 0;
var nPosy = 0;
var fPosx = 140;
var fPosy = 140;
var snakeTail = [];
var snakeSize = 1;
var newScore = 0;
var gameStatus = "Ready";
var musicPlaying=false;
var gameSoundPlaying=false;
var music=new Audio("media/music.mp3");
var move=new Audio("media/move.mp3");
var food=new Audio("media/food.mp3");
var gameover=new Audio("media/gameover.mp3");
var interval=200;
var currentLevel="Normal";
var isPaused=false;
//onload function
window.onload = function () {
  document.addEventListener("keydown", inputControl);
  game = setInterval(mainGame,interval);
};

//main game function
function mainGame() {
  if(!isPaused){
  cvs.clearRect(0, 0, canvas.width, canvas.height);//to refresh each cell or frame
  document.getElementById("score").innerHTML = newScore;
  document.getElementById("gameStatus").innerHTML = gameStatus;
  document.getElementById("currentLevel").innerHTML=currentLevel;
  sPosx += nPosx;
  sPosy += nPosy;
  //to get snake from one side if it is gone to aanother side
  if (sPosx > 400) {
    sPosx = 0;
  }
  if (sPosy > 400) {
    sPosy = 0;
  }
  if (sPosx < 0) {
    sPosx = 400;
  }
  if (sPosy < 0) {
    sPosy = 400;
  }
//canvas design
  cvs.fillStyle = "white";
  cvs.fillRect(0, 0, 400, 400);

  //grid lines
      //column wise grid lines/vertical
  for (var cl = 0; cl < 400; cl += 20) {
    cvs.moveTo(cl, 0);
    cvs.lineTo(cl, 400);
  }
        //row wise grid lines/horizontal
  for (var rl = 0; rl < 400; rl += 20) {
    cvs.moveTo(0, rl);
    cvs.lineTo(400, rl);
  }

  cvs.strokeStyle = "white";
  cvs.stroke();

  //create snake
  cvs.fillStyle = "#43eb34";
  // cvs.fillRect(sPosx,sPosy,20,20);
  for (var i = 0; i < snakeTail.length; i++) {
    cvs.fillRect(snakeTail[i].x, snakeTail[i].y, 20, 20); //make snake
    if (sPosx == snakeTail[i].x && sPosy == snakeTail[i].y && snakeSize > 1) { //if snake bites its tail
      music.pause();
      clearInterval(game);
      gameover.play();
      gameStatus = "Game Over";
      document.getElementById("gameStatus").innerHTML = gameStatus;
      alert("Game Over!\nHigh score:"+newScore);
    }
  }
  }// pausing ends here


  //create fruit
  cvs.fillStyle = "red";
  cvs.fillRect(fPosx, fPosy, 20, 20);

  //eat fruit
  if (fPosx == sPosx && fPosy == sPosy) {
    snakeSize++; 
    newScore += 10;
    food.play();
    fPosx = Math.floor(Math.random() * 20) * 20;
    fPosy = Math.floor(Math.random() * 20) * 20;
  }

  snakeTail.push({ x: sPosx, y: sPosy }); //pushing the value to the snakeTail array in each 200 millisecond
  while (snakeTail.length > snakeSize) {
    snakeTail.shift(); //deleting unwanted tail from end i=of the array
  }
}
//control keys
function inputControl(e) {
  switch (e.keyCode) {
    case 40:
      if(nPosy!== -20){//noy going up
      nPosy += 20; //down
      nPosx = 0;
      move.play();
      }
      break;
    case 38:
      if(nPosy!==+20){//noy going down
      nPosy -= 20; //up
      nPosx = 0;
      move.play();
      }
      break;
    case 39:
      if(nPosx!==-20){//noy going left
      nPosx += 20; //right
      nPosy = 0;
      move.play();
      }
      break;
    case 37:
      if(nPosx!==+20){//noy going right
      nPosx -= 20; //left
      nPosy = 0;
      move.play();
      }
      break;
  }

  if (
    e.keyCode == 37 ||
    e.keyCode == 38 ||
    e.keyCode == 39 ||
    e.keyCode == 40
  ) {
    gameStatus = "Playing";
    document.getElementById("gameStatus").innerHTML = gameStatus;
    // music.play();
  }
  if(e.keyCode==32){
    tooglePause();
    move.play();

  }
}
function replay() {
  isPaused=false;
  window.location.reload();
}
var musicPlaying = false;
var gameSoundPlaying = false;

function toogleMusic(){
  if(musicPlaying){
    music.pause();
  }else{
    music.play();
  }
  musicPlaying=!musicPlaying;
}
 function hard(){
  interval=100;
  clearInterval(game);
  game=setInterval(mainGame,interval);
  currentLevel="Hard"
  document.getElementById("currentLevel").innerHTML=currentLevel;

 }
 function slow(){
  interval=250;
  clearInterval(game);
  game=setInterval(mainGame,interval);
  currentLevel="Easy"
  document.getElementById("currentLevel").innerHTML=currentLevel;
 }
 function normal(){
  interval=200;
  clearInterval(game);
  game=setInterval(mainGame,interval);
  currentLevel="Normal"
  document.getElementById("currentLevel").innerHTML=currentLevel;
 }
 function tooglePause(){
    isPaused =! isPaused;
    if(isPaused){
      gameStatus="Paused"
      document.getElementById("gameStatus").innerHTML=gameStatus;
    }else{
      gameStatus="Playing";
      document.getElementById("gameStatus").innerHTML=gameStatus;


    }
 }