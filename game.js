const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let carPosition = 375; // Початкове положення автомобіля
let obstacles = [];

const carImage = new Image();
carImage.src = '/car.png'; // Шлях до зображення автомобіля

const obstacleImage = new Image();
obstacleImage.src = '/obstacle.png'; // Шлях до зображення перешкоди

function drawCar() {
  ctx.drawImage(carImage, carPosition, 500, 50, 100);
}

function addObstacle() {
  let positionX = Math.floor(Math.random() * (canvas.width - 50));
  obstacles.push({x: positionX, y: 0, width: 50, height: 50});
}

function drawObstacles() {
  obstacles.forEach(obstacle => {
    ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    obstacle.y += 4; // Швидкість руху перешкоди
  });
  obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

function checkCollisions() {
  obstacles.some(obstacle => {
    if (carPosition < obstacle.x + obstacle.width &&
        carPosition + 50 > obstacle.x &&
        500 < obstacle.y + obstacle.height &&
        600 > obstacle.y) {
      alert("Game Over!");
      document.location.reload();
      return true;
    }
    return false;
  });
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();
  drawObstacles();
  checkCollisions();
}

setInterval(updateGame, 20);
setInterval(addObstacle, 2000);

document.addEventListener('keydown', event => {
  if (event.keyCode == 37 && carPosition > 0) { // Ліво
    carPosition -= 20;
  } else if (event.keyCode == 39 && carPosition < canvas.width - 50) { // Право
    carPosition += 20;
  }
});
