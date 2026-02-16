class Asteroid extends Actor {
  constructor(pos, layer) {
    let vertices = [];
    let a = 0;
    while (a < 360) {
      let x = cos(radians(a)) * random(30, 50);
      let y = sin(radians(a)) * random(30, 50);
      let v = createVector(x, y);
      vertices.push(v);
      a += random(15, 40);
    }
    let p = new Polygon(vertices);

    super(pos, p, layer);
  }

  update() {
    push();
    translate(this.pos.x, this.pos.y);
    this.poly.drawPoly();
    pop();
  }
}
