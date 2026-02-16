class Player extends Actor {
  constructor(pos, poly, layer) {
    super(pos, poly, layer);
    this.rot = 0;
    this.vel = 0;

    // Hyper Jump Variables
    this.hyperJumpTimer = 0;
    this.hyperJumpTimerMax = 2000;
    this.canHyperJump = true;
  }

  update() {
    push();
    this.move();
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    this.poly.drawPoly();
    pop();
  }

  move() {
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
      // Rotate Left
      this.rot -= 0.05;
    }
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
      // Rotate Right
      this.rot += 0.05;
    }
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
      // Fire Engine
    } else {
      // Release Engine
    }
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
      // Hyper Jump
      this.hyperJump();
    }
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
