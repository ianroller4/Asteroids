// Asteroids
// Ian Roller
// March 19, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;

let startingAsteroids = 5;

let bullets = [];
let asteroids = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = createPlayer();
  for (let i = 0; i < startingAsteroids; i++) {
    let pos = p5.Vector.random2D();
    pos.mult(sqrt(pow(width, 2) + pow(height, 2)));
    asteroids.push(new Asteroid(pos));
  }
}

function draw() {
  background("black");
  GetInput();
  player.update();

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
    if (bullets[i].life <= 0) {
      bullets.splice(i, 1);
    }
  }

  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].update();
  }
}

function GetInput() {
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
    // Rotate Left
    player.rotateLeft();
  }
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
    // Rotate Right
    player.rotateRight();
  }
  if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
    // Fire Engine
    player.fireEngine();
  } else {
    // Release Engine
    player.releaseEngine();
  }
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
    // Hyper Jump
    player.hyperJump();
  }
  if (keyIsDown(32)) {
    if (player.canShootBullet()) {
      bullets.push(player.shoot());
    }
  }
}

function createPlayer() {
  let position = createVector(width / 2, height / 2);
  return new Player(position);
}

function createAsteroid() {
  let position = createVector(width / 4, height / 4);
  return new Asteroid(position);
}
