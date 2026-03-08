class ActorManager {
  constructor() {
    this.player = new Player(createVector(width / 2, height / 2));
    this.saucer = null;
    this.asteroids = [];
    this.pBullets = [];
    this.sBullets = [];

    this.engineSFX = loadSound("SFX/Engine.mp3");
    this.explosionSFX = loadSound("SFX/Explosion.mp3");
    this.hyperJumpSFX = loadSound("SFX/HyperJump.mp3");
    this.shootSFX = loadSound("SFX/Shoot.mp3");

    this.engineSFX.setVolume(0.5);

    this.level = 1;
    for (let i = 0; i < this.level * 5; i++) {
      let pos = p5.Vector.random2D();
      pos.mult(sqrt(pow(width, 2) + pow(height, 2)));
      this.asteroids.push(new Asteroid(pos, 3, p5.Vector.random2D()));
    }
    this.saucer = new Saucer(createVector(0, height / 2), 2);
  }

  updateActors() {
    this.readInput();
    this.player.update();
    if (this.saucer != null) {
      if (this.saucer.canShoot) {
        this.sBullets.push(this.saucer.shoot(this.player.pos.copy()));
      }
      let clearSaucer = this.saucer.update();
      if (clearSaucer) {
        this.saucer = null;
      }
    }
    for (let b = 0; b < this.pBullets.length; b++) {
      this.pBullets[b].update();
      if (this.pBullets[b].life <= 0) {
        this.pBullets.splice(b, 1);
      }
    }
    for (let b = this.sBullets.length - 1; b >= 0; b--) {
      this.sBullets[b].update();
      if (this.sBullets[b].life <= 0) {
        this.sBullets.splice(b, 1);
      }
    }
    for (let a = 0; a < this.asteroids.length; a++) {
      this.asteroids[a].update();
    }
  }

  readInput() {
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
      this.player.rotateLeft();
    }
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
      this.player.rotateRight();
    }
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
      this.player.fireEngine();
      if (!this.engineSFX.isPlaying()) {
        this.engineSFX.play();
      }
    } else {
      this.player.releaseEngine();
      this.engineSFX.stop();
    }
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
      if (this.player.canHyperJump) {
        this.player.hyperJump();
        this.hyperJumpSFX.play();
        this.checkPlayerAsteroidCollision();
      }
    }
    if (keyIsDown(32)) {
      if (this.player.canShoot) {
        this.pBullets.push(this.player.shoot());
        this.shootSFX.play();
      }
    }
  }

  collisionCheck() {
    // Player Collided with Asteroids
    let r1 = this.checkPlayerAsteroidCollision();

    // Saucer Collided with Asteroids
    let r2 = this.checkSaucerAsteroidCollision();

    // Player Bullets Collided with Asteroids
    let r3 = this.checkPlayerBulletCollision();

    // Saucer Bullets Collided with Asteroids
    let r4 = this.checkSaucerBulletCollision();

    return r1 || r2 || r3 || r4;
  }

  checkPlayerBulletCollision() {
    let result = false;
    for (let b = this.pBullets.length - 1; b >= 0; b--) {
      for (let a = this.asteroids.length - 1; a >= 0; a--) {
        let hit = this.pBullets[b].poly.polyPolyCollision(
          this.asteroids[a].poly.vertices,
          this.pBullets[b].pos,
          this.asteroids[a].pos,
        );
        result = result || hit;
        if (hit) {
          switch (this.asteroids[a].lifeState) {
            case 3:
              this.player.updateScore(20);
              this.spawnMidAsteroids(this.asteroids[a].pos.copy());
              break;
            case 2:
              this.player.updateScore(50);
              this.spawnBabyAsteroids(this.asteroids[a].pos.copy());
              break;
            case 1:
              this.player.updateScore(100);
          }
          this.explosionSFX.play();
          this.asteroids.splice(a, 1);
          this.pBullets.splice(b, 1);
          break;
        }
      }
    }
    return result;
  }

  checkSaucerBulletCollision() {
    let result = false;

    return result;
  }

  checkSaucerAsteroidCollision() {
    // Check if saucer collided with asteroid
    let result = false;
    if (this.saucer != null) {
      for (let a = this.asteroids.length - 1; a >= 0; a--) {
        let saucerHit = this.asteroids[a].poly.polyPolyCollision(
          this.saucer.poly.vertices,
          this.asteroids[a].pos,
          this.saucer.pos,
        );
        result = result || saucerHit;
        if (saucerHit) {
          switch (this.asteroids[a].lifeState) {
            case 3:
              this.spawnMidAsteroids(this.asteroids[a].pos.copy());
              break;
            case 2:
              this.spawnBabyAsteroids(this.asteroids[a].pos.copy());
              break;
          }
          this.explosionSFX.play();
          this.asteroids.splice(a, 1);
          this.saucer = null;
          break;
        }
      }
    }
    return result;
  }

  checkPlayerAsteroidCollision() {
    let result = false;
    for (let a = this.asteroids.length - 1; a >= 0; a--) {
      // Check if player collided with asteroid
      let playerHit = this.asteroids[a].poly.polyPolyCollision(
        this.player.poly.vertices,
        this.asteroids[a].pos,
        this.player.pos,
      );
      result = result || playerHit;
      if (playerHit) {
        switch (this.asteroids[a].lifeState) {
          case 3:
            this.player.updateScore(20);
            this.spawnMidAsteroids(this.asteroids[a].pos.copy());
            break;
          case 2:
            this.player.updateScore(50);
            this.spawnBabyAsteroids(this.asteroids[a].pos.copy());
            break;
          case 1:
            this.player.updateScore(100);
        }
        this.explosionSFX.play();
        this.asteroids.splice(a, 1);
        this.player.death();
      }
    }
    return result;
  }

  spawnMidAsteroids(pos) {
    let baseDir = p5.Vector.random2D();
    let aDir = baseDir.copy().rotate(radians(20));
    let bDir = baseDir.copy().rotate(radians(-15));

    let offSet = p5.Vector.random2D();
    offSet.mult(3);
    this.asteroids.push(new Asteroid(pos.copy().add(offSet), 2, aDir));
    this.asteroids.push(new Asteroid(pos.copy().sub(offSet), 2, bDir));
  }

  spawnBabyAsteroids(pos) {
    let baseDir = p5.Vector.random2D();
    let aDir = baseDir.copy().rotate(radians(20));
    let bDir = baseDir.copy().rotate(radians(-15));

    let offSet = p5.Vector.random2D();
    offSet.mult(3);
    this.asteroids.push(new Asteroid(pos.copy().add(offSet), 1, aDir));
    this.asteroids.push(new Asteroid(pos.copy().sub(offSet), 1, bDir));
  }
}
