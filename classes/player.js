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

    // Hyper Jump Variables
    this.hyperJumpTimer = 0;
    this.hyperJumpTimerMax = 2000;
    this.canHyperJump = true;
  }

  update() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    this.poly.drawPoly();
    pop();
    this.hyperJumpTimerUpdate();
    this.screenWrap();
    this.pos.add(this.vel);
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
        this.hyperJumpTimer = 0;
        this.canHyperJump = true;
      }
    }
  }
}
