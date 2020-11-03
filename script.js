const cvs = document.getElementById("snake");
// ctx =context
const ctx = cvs.getContext("2d");

// creating the unit
const box = 32;

//Loading the images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//Loading the audios
const dead = new Audio();
	dead.src = "audio/dead.mp3";
const eat = new Audio();
	eat.src = "audio/eat.mp3";
const up = new Audio();
	up.src = "audio/up.mp3";
const left = new Audio();
	left.src = "audio/left.mp3";
const right = new Audio();
	right.src = "audio/right.mp3";
const down = new Audio();
	down.src = "audio/down.mp3";

//Creating the snake
let snake = [];
snake[0] = {
	x : 9 * box,
	y : 10 * box,
}

//Creating the food/Defining the location of the food
// 15+3
// 17+1

let food = {
	x : Math.floor(Math.random()*17+1)*box,
	y : Math.floor(Math.random()*15+3)*box,
}


//Creating score
let score = 0;

//Controlling the snake
let d;
document.addEventListener("keydown", direction);

//Check Collision Function
function collision(head, array) {
	for (let i=0; i < array.length; i++){
		if (head.x == array[i].x && head.y == array[i].y){
			return true;
		}
	}
	return false;
}

//Left 37
//Up 38
//Right 39
//Down 40

function direction(event){
	if(event.keyCode == 37 && d != "RIGHT"){
		left.play();
		d = "LEFT";	
	} else if(event.keyCode == 38 && d != "DOWN"){
		up.play();
		d = "UP";	
	} else if(event.keyCode == 39 && d != "LEFT"){
		right.play();
		d = "RIGHT";	
	} else if(event.keyCode == 40 && d != "UP"){
		down.play();
		d = "DOWN";	
	}
}


// Draw Everything to canvas
function draw() {
	ctx.drawImage(ground, 0, 0);

	for (let i = 0; i < snake.length; i++){
		ctx.fillStyle = (i == 0)? "blue" : "white";
		ctx.fillRect(snake[i].x, snake[i].y, box, box)

		ctx.strokeStyle = "yellow";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box)
	}
	ctx.drawImage(foodImg, food.x, food.y);

	//old head position
	let snakeX =snake[0].x;
	let snakeY = snake[0].y;

	//which direction
	if(d == "LEFT") snakeX -= box;
	if(d == "UP") snakeY -= box;
	if(d == "RIGHT") snakeX += box;
	if(d == "DOWN") snakeY += box;

	//If snake eats the apple
	if(snakeX == food.x && snakeY ==food.y){
		score++;
		eat.play();
		food ={
			x : Math.floor(Math.random()*17+1)*box,
			y : Math.floor(Math.random()*15+3)*box,
		}
	}
		else{
			snake.pop();
		}


	let newHead ={
		x : snakeX,
		y: snakeY
	}
	//Game Over
	if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)){
		clearInterval(game);
		dead.play();
		alert("Game Over");
	}

	snake.unshift(newHead);

	//scores
	ctx.fillStyle = "white";
	ctx.font ="45px Changa one"
	ctx.fillText (score, 2 * box, 1.6 * box);

}

// Call draw function every 100 ms
let game = setInterval(draw, 200);