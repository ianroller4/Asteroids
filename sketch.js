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
  let a = createVector(-10, 10);
  let b = createVector(0, -20);
  let c = createVector(10, 10);
  let vertices = [a, b, c];
  return new Player(position, new Polygon(vertices), 0);
}
