// Asteroids
// Ian Roller
// March 19, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameManager;

let bgMusic;

function preload() {
  bgMusic = loadSound("SFX/AsteroidsMusic.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameManager = new GameManager();
}

function draw() {
  background("black");
  gameManager.update();
}

function mousePressed() {
  if (!bgMusic.isPlaying()) {
    bgMusic.setVolume(0.2);
    bgMusic.play();
    bgMusic.loop();
  }
}
