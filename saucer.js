class Saucer extends Actor {
  constructor(pos, size) {
    let a = createVector(-10 * size, 0);
    let b = createVector(-5 * size, 5 * size);
    let c = createVector(5 * size, 5 * size);
    let d = createVector(10 * size, 0);
    let e = createVector(5 * size, -5 * size);
    let f = createVector(-5 * size, -5 * size);

    let p = new Polygon([a, b, c, d, e, f]);
    super(pos, p);
    this.size = size;
    this.bullets = [];
  }

  update() {
    push();
    translate(this.pos.x, this.pos.y);
    this.poly.drawPoly();
    pop();
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();
      if (this.bullets[i].life <= 0) {
        this.bullets.splice(i, 1);
      }
    }
  }

  move() {}

  shoot(position) {}
}
