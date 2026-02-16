class Polygon {
  constructor(vertices) {
    this.vertices = vertices;
  }

  drawPoly() {
    stroke("white");
    strokeWeight(3);
    for (let i = 0; i < this.vertices.length; i++) {
      if (i != this.vertices.length - 1) {
        line(
          this.vertices[i].x,
          this.vertices[i].y,
          this.vertices[i + 1].x,
          this.vertices[i + 1].y,
        );
      } else {
        line(
          this.vertices[i].x,
          this.vertices[i].y,
          this.vertices[0].x,
          this.vertices[0].y,
        );
      }
    }
  }
}
