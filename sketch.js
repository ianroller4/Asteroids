// Asteroids
// Ian Roller
// March 19, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = createPlayer();
}

function draw() {
  background("black");
  player.update();
}

function createPlayer() {
  let position = createVector(width / 2, height / 2);
  return new Player(position, 0);
}

function createAsteroid() {
  let position = createVector(width / 4, height / 4);
  return new Asteroid(position, 0);
}

function createBullet() {
  let position = createVector(width / 6, height / 6);
  return new Bullet(position, 0);
}
