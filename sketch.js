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

let song;

function preload() {
  song = loadSound("AsteroidsMusic.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = createPlayer();
  for (let i = 0; i < startingAsteroids; i++) {
    let pos = p5.Vector.random2D();
    pos.mult(sqrt(pow(width, 2) + pow(height, 2)));
    asteroids.push(new Asteroid(pos, 3, p5.Vector.random2D()));
  }
}

function draw() {
  background("black");
  if (player.lives > 0) {
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
    CollisionCheck();
  }

  DrawHud();
}

function mousePressed() {
  if (!song.isPlaying()) {
    song.setVolume(0.2);
    song.play();
    song.loop();
  }
}

function DrawHud() {
  textSize(100);
  fill("white");
  // Draw Lives
  push();
  textAlign(LEFT, TOP);
  text(str(player.lives), 0, 0);
  pop();
  // Draw Score
  push();
  textAlign(RIGHT, TOP);
  text(str(player.score), width, 0);
  pop();
}

function CollisionCheck() {
  // Player Collided with Asteroids
  checkAsteroidCollision();

  // Bullets Collided with Asteroids
  checkBulletCollision();
}

function checkAsteroidCollision() {
  for (let a = asteroids.length - 1; a >= 0; a--) {
    // Check if player collided with asteroid
    let hit = asteroids[a].poly.polyPolyCollision(
      player.poly.vertices,
      asteroids[a].pos,
      player.pos,
    );
    if (hit) {
      if (asteroids[a].lifeState == 3) {
        player.updateScore(20);
        spawnMidAsteroids(asteroids[a].pos.copy());
      } else if (asteroids[a].lifeState == 2) {
        player.updateScore(50);
        spawnBabyAsteroids(asteroids[a].pos.copy());
      } else {
        player.updateScore(100);
      }
      asteroids.splice(a, 1);
      player.death();
    }
  }
}

function checkBulletCollision() {
  for (let b = bullets.length - 1; b >= 0; b--) {
    for (let a = asteroids.length - 1; a >= 0; a--) {
      // Check if bullet collided with asteroid
      let hit = bullets[b].poly.polyPolyCollision(
        asteroids[a].poly.vertices,
        bullets[b].pos,
        asteroids[a].pos,
      );
      if (hit) {
        // If hit remove bullet and asteroid
        if (asteroids[a].lifeState == 3) {
          player.updateScore(20);
          spawnMidAsteroids(asteroids[a].pos.copy());
        } else if (asteroids[a].lifeState == 2) {
          player.updateScore(50);
          spawnBabyAsteroids(asteroids[a].pos.copy());
        } else {
          player.updateScore(100);
        }
        bullets.splice(b, 1);
        asteroids.splice(a, 1);
        break;
      }
    }
  }
}

function spawnMidAsteroids(position) {
  let baseDir = p5.Vector.random2D();
  let aDir = baseDir.copy().rotate(radians(20));
  let bDir = baseDir.copy().rotate(radians(-15));

  let offSet = p5.Vector.random2D();
  offSet.mult(3);

  asteroids.push(new Asteroid(position.copy().add(offSet), 2, aDir));
  asteroids.push(new Asteroid(position.copy().sub(offSet), 2, bDir));
}

function spawnBabyAsteroids(position) {
  let baseDir = p5.Vector.random2D();
  let aDir = baseDir.copy().rotate(radians(20));
  let bDir = baseDir.copy().rotate(radians(-15));

  let offSet = p5.Vector.random2D();
  offSet.mult(3);

  asteroids.push(new Asteroid(position.copy().add(offSet), 1, aDir));
  asteroids.push(new Asteroid(position.copy().sub(offSet), 1, bDir));
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
    checkAsteroidCollision();
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
