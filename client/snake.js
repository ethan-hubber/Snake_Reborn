//finding the cavas from the html
const canvas = document.getElementById('game');
//getting contex i 2d to paint on canvas
const ctx = canvas.getContext('2d');
console.log("hello");

//building the snake
class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
const scores = [];
let speed = 7;

//I ant to make the canvas of size 20 sqf
let tileCount = 20;
//when we draw our snake we want it a little smaller then the tyle itself
let tileSize = canvas.width / tileCount - 2;
//putting the head of the snake in the middle of the screen
let headX = 10;
let headY = 10;

//array of the snake parts
const snakeParts = [];

//the length of the tail 
let tailLength = 0; 

//
let appleX = 5;
let appleY = 5;

//this is for when the user clics the directions 
let xVelocity=0;
let yVelocity=0;

let score = 0;

//adding audio to the game
const gulpSound = new Audio("gulp.mp3");


//this is he game loop of my game
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return; }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();
    //increasing level
    if(score > 2){
        speed = 9;
    }
    if(score > 10){
        speed = 15;
    }
//i want to make the game faster by the time so i will use settimeout like we learne in class
    setTimeout(drawGame, 1000/ speed);
} 

function isGameOver(){
    let gameOver = false;
//if gme has not strted tha dont game over
    if(yVelocity ===0 && xVelocity ===0){
        return false;
    }
    
    //if we hit the walls game is over
    if(headX < 0 ){
        gameOver = true;
    }
    else if(headX === tileCount){
        gameOver = true
    }
    else if( headY < 0){
        gameOver = true;
    }
    else if(headY === tileCount){
        gameOver = true
    }
//if the snake goes on its own body than user lose
    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }


    if (gameOver) {
        console.log(score)

        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        //adding a gradient if game is over
        if (gameOver) {
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";
        
            var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", " magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("0.7", "green");
            gradient.addColorStop("1.0", "red");
            // Fill with gradient
            ctx.fillStyle = gradient;
        
            ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
            ctx.fillText("your score is "+ score, canvas.width/60, canvas.height / 1.5);

          }
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
      }

    return gameOver;
}

let privouseScore = 0;

//drawing the score to the screen
function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "10px Verdana"
    ctx.fillText("Score " + score, canvas.width-50, 10);
    if(privouseScore != score) {
        postData(score);
        privouseScore = score;
    }
}

// clears the screen of the game
function clearScreen(){
    //ctx - contex allowes us to draw to the screenits like choosing our paint brush
    ctx.fillStyle = 'silver';
    //takig the fill style and usig it in our canvas
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
   //paint brush
    ctx.fillStyle = 'black';

    //adding to the snake
    for(let i =0; i < snakeParts.length; i++){
        let part =  snakeParts[i];
        //draws the snake
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
   //put an item at the end of the list next to the head
    snakeParts.push(new SnakePart(headX, headY)); 
    //we always want to remove the last piece that is drawn on the screen so we will get the efect of moving
    while (snakeParts.length > tailLength){ 

        snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
    }

    ctx.fillStyle =  'orange';
    ctx.fillRect(headX * tileCount, headY* tileCount, tileSize,tileSize);


}
//changing the snake position
function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}
//
function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX* tileCount, appleY* tileCount, tileSize, tileSize)
}

function checkAppleCollision(){
    //if the snake head is in the same position then addd to snake
    if(appleX === headX && appleY == headY){
        //add new apple in a random place
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        //increasing scor with every collision
        score++;
        gulpSound.play();
    }
}

document.body.addEventListener('keydown', keyDown);
//controlling the keys
function keyDown(event){
    //up 
    if(event.keyCode == 38){
        //when i ckick the up arrow i want to change the y velocity
        //if velocity is equal to 1 then i cant go up(becasue im going down)
        if(yVelocity == 1)
        //return nothing because i want nothing to happend i want the player to continue going down...
            return;
        yVelocity = -1;
        //if i am going side ways i want to stop that...
        xVelocity = 0;
    }

    //down
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
   //right
   if(event.keyCode == 39){
    if(xVelocity == -1)
    return;
    yVelocity = 0;
    xVelocity = 1;
}
    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
}

drawGame();

//posting the game in json file called scores.json
function postData(score_number) {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ "score": score_number })
    }
    return fetch("http://localhost:8080/record_score", params)
  }
  
  function getData(url) {
    const params = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": 'application/json'
      }
    }
    return fetch(url, params)
  }

