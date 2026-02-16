class Actor {
  constructor(pos, poly, layer) {
    this.pos = pos;
    this.poly = poly;
    this.layer = layer;
  }

  screenWrap() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
}
