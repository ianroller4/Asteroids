class Bullet extends Actor {
  constructor(pos, angle) {
    let a = createVector(-1, -5);
    let b = createVector(1, -5);
    let c = createVector(1, 5);
    let d = createVector(-1, 5);

    let p = new Polygon([a, b, c, d]);

    super(pos, p);
    this.vel = p5.Vector.fromAngle(angle - HALF_PI);
    this.vel.mult(10);
    this.rot = angle;
    this.life = 100;
  }

  update() {
    push();
    this.move();
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    this.poly.drawPoly();
    pop();
    this.screenWrap();
    this.updateLife();
  }

  move() {
    this.pos.add(this.vel);
  }

  updateLife() {
    this.life--;
  }
}
