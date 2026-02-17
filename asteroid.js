class Asteroid extends Actor {
  constructor(pos) {
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

    super(pos, p);
    this.vel = p5.Vector.random2D();
    this.vel.mult(5);
  }

  update() {
    push();
    this.move();
    translate(this.pos.x, this.pos.y);
    this.poly.drawPoly();
    pop();
    this.screenWrap();
  }

  move() {
    this.pos.add(this.vel);
  }
}
