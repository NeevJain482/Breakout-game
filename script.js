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

// Game
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const ball = new Ball(150, 150, 10, 2, 2);

function gameLoop() {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ball.update();
  ball.draw(context);
  requestAnimationFrame(gameLoop)
}
gameLoop()
