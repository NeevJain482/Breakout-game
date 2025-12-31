let score = 0;

// Ball
class Ball {
  constructor(x, y, radius, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "purple";
    context.fill();
    context.closePath();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

//Paddle
class Paddle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }
  draw(context) {
    context.fillStyle = "orange";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  move(direction) {
    this.x += this.speed * direction;
  }
}

class Brick {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.status = 1;
  }
  draw(context) {
    if (this.status == 1) {
      context.fillStyle = "yellow";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
// Brick wall

const bricks = [];

function createBrickWall() {
  const brickRowCount = 4;
  const brickColumnCount = 8;
  const brickWidth = 50;
  const brickHeight = 20;
  const brickPadding = 10;

  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const x = c * (brickWidth + brickPadding);
      const y = r * (brickHeight + brickPadding);
      bricks.push(new Brick(x, y, brickWidth, brickHeight));
    }
  }
}

// Game
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const ball = new Ball(150, 150, 10, 2, 2);
const paddle = new Paddle(175, canvas.height - 10, 100, 10, 8);

// paddle control

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    if (paddle.x > 0) paddle.move(-1);
  } else if (event.key === "ArrowRight") {
    if (paddle.x + paddle.width < canvas.width) paddle.move(1);
  }
});
document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") paddle.move(0);
});

// Update and draw bricks

function drawBricks() {
  bricks.forEach((brick) => {
    if (brick.status === 1) {
      brick.draw(context);
      if (
        ball.x > brick.x &&
        ball.x < brick.x + brick.width &&
        ball.y > brick.y &&
        ball.y < brick.y + brick.height
      ) {
        ball.speedY *= -1;
        brick.status = 0;
        score += 10;
        document.getElementById("score").innerHTML = `Score:${score}`;
      }
    }
  });
}

createBrickWall();

function resetGame() {
  ball.x = 200;
  ball.y = 200;
  ball.speedX = 2;
  ball.speedY = 2;
  paddle.x = 175;

  bricks.forEach((brick) => {
    brick.status = 1;
  });
  score = 0;
}

function gameLoop() {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ball.update();
  ball.draw(context);

  // Ball collision detection
  // 1. Sides
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.speedX *= -1;
  }

  // 2. Top side
  if (ball.y - ball.radius < 0) {
    ball.speedY *= -1;
  }

  //   // Ground
  //   if (ball.y + ball.radius > canvas.height) {
  //     ball.speedY *= -1;
  //   }

  // 3. Paddle collision detection
  if (
    ball.x + ball.radius > paddle.x &&
    ball.x - ball.radius < paddle.x + paddle.width &&
    ball.y + ball.radius > paddle.y
  ) {
    ball.speedY *= -1;
  }
  drawBricks();

  if (ball.y + ball.radius > canvas.height) {
    alert("game over");
    resetGame();
  }

  if (bricks.every((b) => b.status == 0)) {
    alert("Congratulations! You are legend");
    resetGame();
  }

  paddle.draw(context);
  requestAnimationFrame(gameLoop);
}
gameLoop();
