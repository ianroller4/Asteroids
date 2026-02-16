class Bullet extends Actor {
  constructor(pos, layer) {
    let a = createVector(-1, -5);
    let b = createVector(1, -5);
    let c = createVector(1, 5);
    let d = createVector(-1, 5);
    let p = new Polygon([a, b, c, d]);

    super(pos, p, layer);
  }

  update() {
    push();
    translate(this.pos.x, this.pos.y);
    this.poly.drawPoly();
    pop();
  }
}
