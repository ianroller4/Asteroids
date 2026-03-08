class Saucer extends Actor {
  constructor(pos, size, direction) {
    let a = createVector(-10 * size, 0);
    let b = createVector(-5 * size, 5 * size);
    let c = createVector(5 * size, 5 * size);
    let d = createVector(10 * size, 0);
    let e = createVector(5 * size, -5 * size);
    let f = createVector(-5 * size, -5 * size);

    let p = new Polygon([a, b, c, d, e, f]);
    super(pos, p);
    this.size = size;
    this.vel = createVector(5 * direction, 0);

    // Shoot Variables
    this.canShoot = true;
    this.shootTimer = 0;
    this.shootTimerMax = 500;
  }

  update() {
    let result = false;
    push();
    translate(this.pos.x, this.pos.y);
    this.move();
    this.poly.drawPoly();
    pop();
    this.shootTimerUpdate();
    if (this.pos.x < 0 || this.pos.x > width) {
      result = true;
    }
    return result;
  }

  move() {
    this.pos.add(this.vel);
  }

  shoot(position) {
    let fireVector = position.sub(this.pos).normalize();
    let fireAngle = atan2(fireVector.y, fireVector.x) + HALF_PI;
    switch (this.size) {
      case 2:
        fireAngle += random(-0.1, 0.1);
        break;
      case 4:
        fireAngle += random(-0.5, 0.5);
        break;
    }
    this.canShoot = false;
    return new Bullet(this.pos.copy(), fireAngle);
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
}
