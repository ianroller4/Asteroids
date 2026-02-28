class Asteroid extends Actor {
  constructor(pos, lifeState, direction) {
    let vertices = [];
    let a = 0;
    while (a < 360) {
      let x = cos(radians(a)) * random(10 * lifeState, 20 * lifeState);
      let y = sin(radians(a)) * random(10 * lifeState, 20 * lifeState);
      let v = createVector(x, y);
      vertices.push(v);
      a += random(15, 40);
    }
    let p = new Polygon(vertices);

    super(pos, p);
    this.vel = direction;
    this.vel.mult(5 / lifeState);
    this.lifeState = lifeState;
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
