class Particle {
  constructor(pos) {
    this.pos = pos;
    this.alpha = 255;
    this.vel = createVector(random(-1, 1), random(-1, 1));
  }

  update() {
    this.move();
    push();
    fill(color(255, this.alpha));
    circle(this.pos.x, this.pos.y, 5);
    pop();
    this.alpha -= 5;
  }

  move() {
    this.pos.add(this.vel);
  }
}
