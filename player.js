class Player extends Actor {
  constructor(pos) {
    let a = createVector(-10, 10);
    let b = createVector(0, -20);
    let c = createVector(10, 10);
    let vertices = [a, b, c];
    let p = new Polygon(vertices);

    super(pos, p);
    this.rot = 0;
    this.vel = createVector(0, 0);
    this.lives = 3;

    // Hyper Jump Variables
    this.hyperJumpTimer = 0;
    this.hyperJumpTimerMax = 2000;
    this.canHyperJump = true;

    // Shoot Variables
    this.canShoot = true;
    this.shootTimer = 0;
    this.shootTimerMax = 500;

    // Invincibility Variables
    this.invincible = false;
    this.invincibleTimer = 0;
    this.invincibleTimerMax = 1000;

    this.score = 0;
    this.pointsForNewLife = 0;
  }

  update() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    this.poly.drawPoly();
    pop();
    this.hyperJumpTimerUpdate();
    this.shootTimerUpdate();
    this.invincibleTimerUpdate();
    this.screenWrap();
    this.move();
    this.invincibleRing();
  }

  updateScore(score) {
    this.score += score;
    this.pointsForNewLife += score;
    if (this.pointsForNewLife >= 10000) {
      this.pointsForNewLife -= 10000;
      this.lives += 1;
    }
  }

  death() {
    if (!this.invincible) {
      this.pos.x = width / 2;
      this.pos.y = height / 2;
      this.lives--;
      this.invincible = true;
    }
  }

  invincibleRing() {
    if (this.invincible) {
      push();
      translate(this.pos.x, this.pos.y);
      noFill();
      stroke("cyan");
      strokeWeight(3);
      circle(0, 0, 50);
      pop();
    }
  }

  invincibleTimerUpdate() {
    if (this.invincible) {
      this.invincibleTimer += deltaTime;
      if (this.invincibleTimer >= this.invincibleTimerMax) {
        this.invincibleTimer = 0;
        this.invincible = false;
      }
    }
  }

  move() {
    this.pos.add(this.vel);
  }

  canShootBullet() {
    return this.canShoot;
  }

  shoot() {
    this.canShoot = false;
    return new Bullet(this.pos.copy(), this.rot);
  }

  shootTimerUpdate() {
    if (!this.canShoot) {
      this.shootTimer += deltaTime;
      if (this.shootTimer >= this.shootTimerMax) {
        this.shootTimer -= this.shootTimerMax;
        this.canShoot = true;
      }
    }
  }

  rotateLeft() {
    this.rot -= 0.05;
  }

  rotateRight() {
    this.rot += 0.05;
  }

  fireEngine() {
    let force = p5.Vector.fromAngle(this.rot - HALF_PI);
    force.mult(0.4);
    this.vel.add(force);
  }

  releaseEngine() {
    this.vel.mult(0.95);
  }

  hyperJump() {
    if (this.canHyperJump) {
      this.pos.x = random(0, width);
      this.pos.y = random(0, height);
      this.canHyperJump = false;
    }
  }

  hyperJumpTimerUpdate() {
    if (!this.canHyperJump) {
      this.hyperJumpTimer += deltaTime;
      if (this.hyperJumpTimer >= this.hyperJumpTimerMax) {
        this.hyperJumpTimer -= this.hyperJumpTimerMax;
        this.canHyperJump = true;
      }
    }
  }
}
