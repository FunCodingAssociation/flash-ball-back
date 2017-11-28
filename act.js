var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 3;
var dy = -3;
var paddleHeight = 10;
var paddleWidth = 95;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 15;
var brickColumnCount = 5;
var brickWidth = 50;
var brickHeight = 40;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
var cornerRadius = 2;
var level = 1;
var maxLevel = 6;
var brickCount = 0;
var fps = 100;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

var bricks = [];

function setBricks(){
	for(c=0; c<brickColumnCount; c++) {
		bricks[c] = [];
		for(r=0; r<brickRowCount; r++) {
			bricks[c][r] = { x: 0, y: 0, status: 0 };
		}
	}
	if(level == 1)
	{
		for(j = 0; j < 4; j++)
		{
			bricks[j][1] = { x: 0, y: 0, status: 1 };
			bricks[j][5] = { x: 0, y: 0, status: 1 };
			brickCount += 2;
		}
		for(i = 2; i < 5; i++)
		{
			bricks[4][i] = { x: 0, y: 0, status: 1 };
			brickCount++;
		}
		for(j = 1; j < 5; j++)
		{
			bricks[j][9] = { x: 0, y: 0, status: 1 };
			bricks[j][13] = { x: 0, y: 0, status: 1 };
			brickCount += 2;
		}
		for(i = 10; i < 13; i++)
		{
			bricks[0][i] = { x: 0, y: 0, status: 1 };
			bricks[2][i] = { x: 0, y: 0, status: 1 };
			brickCount += 2;
		}
	}
	else if(level == 2)
	{
		for(j = 0; j < 5; j++){
			bricks[j][2] = { x: 0, y: 0, status: 1 };
			bricks[j][7] = { x: 0, y: 0, status: 1 };
			bricks[j][12] = { x: 0, y: 0, status: 1 };
			brickCount+=3;
		}
		bricks[2][3] = { x: 0, y: 0, status: 1 };
		brickCount++;
		for(j = 0; j < 2; j++)
		{
			bricks[j][4] = { x: 0, y: 0, status: 1 };
			bricks[j + 3][4] = { x: 0, y: 0, status: 1 };
			brickCount += 2;
		}
		bricks[0][8] = { x: 0, y: 0, status: 1 };
		bricks[2][8] = { x: 0, y: 0, status: 1 };
		bricks[1][9] = { x: 0, y: 0, status: 1 };
		brickCount += 3;
	}
	else if (level == 3)
	{
		for(j = 0; j < 5; j++){
			bricks[j][2] = { x: 0, y: 0, status: 1 };
			bricks[j][5] = { x: 0, y: 0, status: 1 };
			bricks[j][11] = { x: 0, y: 0, status: 1 };
			brickCount += 3;
		}
		bricks[0][6] = { x: 0, y: 0, status: 1 };
		bricks[2][6] = { x: 0, y: 0, status: 1 };
		bricks[1][7] = { x: 0, y: 0, status: 1 };
		brickCount += 3;
		for(i = 9; i < 14; i++){
			bricks[0][i] = { x: 0, y: 0, status: 1 };
			brickCount++;
		}
	}
	else if (level == 4)
	{
		for(j = 0; j < 5; j++){
			bricks[j][7] = { x: 0, y: 0, status: 1 };
			bricks[j][11] = { x: 0, y: 0, status: 1 };
			brickCount += 2;
		}
		for(j = 0; j < 3; j++){
			bricks[j][1] = { x: 0, y: 0, status: 1 };
			bricks[j][5] = { x: 0, y: 0, status: 1 };
			brickCount += 2;
		}
		bricks[3][2] = { x: 0, y: 0, status: 1 };
		bricks[3][4] = { x: 0, y: 0, status: 1 };
		bricks[4][3] = { x: 0, y: 0, status: 1 };
		brickCount += 3;
		for(i = 9; i < 14; i++){
			bricks[0][i] = { x: 0, y: 0, status: 1 };
			brickCount++;
		}
	}
	else if (level == 5)
	{
		for(j = 0; j < 5; j++){
			bricks[j][4] = { x: 0, y: 0, status: 1 };
			bricks[j][8] = { x: 0, y: 0, status: 1 };
			brickCount += 2;
		}
		for(j = 1; j < 5; j++){
			bricks[j][0] = { x: 0, y: 0, status: 1 };
			bricks[j][2] = { x: 0, y: 0, status: 1 };
			brickCount += 2;
		}
		bricks[0][1] = { x: 0, y: 0, status: 1 };
		bricks[2][1] = { x: 0, y: 0, status: 1 };
		bricks[4][5] = { x: 0, y: 0, status: 1 };
		bricks[4][6] = { x: 0, y: 0, status: 1 };
		brickCount += 4;
		for(i = 9; i < 11; i++){
			bricks[0][i] = { x: 0, y: 0, status: 1 };
			bricks[2][i] = { x: 0, y: 0, status: 1 };
			bricks[4][i] = { x: 0, y: 0, status: 1 };
			brickCount += 3;
		}
		bricks[2][13] = { x: 0, y: 0, status: 1 };
		brickCount++;
		for(j = 0; j < 2; j++){
			bricks[j][12] = { x: 0, y: 0, status: 1 };
			bricks[j+3][12] = { x: 0, y: 0, status: 1 };
			bricks[j][14] = { x: 0, y: 0, status: 1 };
			bricks[j+3][14] = { x: 0, y: 0, status: 1 };
			brickCount += 4;
		}
	}
	else if(level == 6)
	{
		for(j = 0; j < 5; j++){
			bricks[j][0] = { x: 0, y: 0, status: 1 };
			bricks[j][9] = { x: 0, y: 0, status: 1 };
			brickCount += 2;
		}
		bricks[2][1] = { x: 0, y: 0, status: 1 };
		brickCount++;
		for(j = 0; j < 2; j++){
			bricks[j][2] = { x: 0, y: 0, status: 1 };
			bricks[j+3][2] = { x: 0, y: 0, status: 1 };
			bricks[j][4] = { x: 0, y: 0, status: 1 };
			bricks[j][6] = { x: 0, y: 0, status: 1 };
			brickCount += 4;
		}
		for(j = 2; j < 5; j++){
			bricks[j][5] = { x: 0, y: 0, status: 1 };
			brickCount++;
		}
		bricks[4][13] = { x: 0, y: 0, status: 1 };
		brickCount++;
		for(j = 0; j < 4; j++){
			bricks[j][12] = { x: 0, y: 0, status: 1 };
			bricks[j][14] = { x: 0, y: 0, status: 1 };
			brickCount += 2;
		}
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
		if(paddleX < 0)
			paddleX = 0;
		else if(paddleX + paddleWidth > canvas.width)
			paddleX = canvas.width - paddleWidth;
    }
}
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x - ballRadius && x < b.x + brickWidth + ballRadius && y > b.y - ballRadius && y < b.y + brickHeight + ballRadius) {
					if(x > b.x + cornerRadius && x < b.x + brickWidth - cornerRadius)
						dy = -dy;
					else if (y > b.y + cornerRadius && y < b.y + brickHeight - cornerRadius)
						dx = -dx;
					else
					{
						dy = -dy;
						dx = -dx;
					}
					b.status = 0;
                    score++;
                    if(score == brickCount) {
						if(level == maxLevel){
							alert("YOU WIN, CONGRATS!");
							document.location.reload();
						}
						else
						{
							drawBricks();
							alert("Ready for the next level?");
							level++;
							brickCount = 0;
							score = 0;
							setBricks();
							dx = 3;
							dy = -3;
							draw();
						}
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
function drawLevel()
{
	ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Level: "+level, canvas.width/2 - 4, 20);
}

function draw() {
    requestAnimationFrame(draw);
	now = Date.now();
    delta = now - then;
     
    if (delta > interval) {
		then = now - (delta % interval);
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBricks();
		drawBall();
		drawPaddle();
		drawScore();
		drawLives();
		drawLevel();
		collisionDetection();
		
		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
			dx = -dx;
		}
		if(y + dy < ballRadius) {
			dy = -dy;
		}
		else if(y + dy > canvas.height-ballRadius) {
			if(x > paddleX && x < paddleX + paddleWidth) {
				dy = -dy;
			}
			else {
				lives--;
				if(!lives) {
					alert("GAME OVER");
					document.location.reload();
				}
				else {
					x = canvas.width/2;
					y = canvas.height-30;
					dx = 4;
					dy = -4;
					paddleX = (canvas.width-paddleWidth)/2;
				}
			}
		}
		
		if(rightPressed && paddleX < canvas.width-paddleWidth) {
			paddleX += 7;
			if(paddleX + paddleWidth > canvas.width)
				paddleX = canvas.width - paddleWidth;
		}
		else if(leftPressed && paddleX > 0) {
			paddleX -= 7;
			if(paddleX < 0)
				paddleX = 0;
		}
		
		x += dx;
		y += dy;
    }
}

//ПОЧЕМУ УСКОРЯЕТСЯ ИГРА?!!!
setBricks();
draw();