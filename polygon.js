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

  polyPolyCollision(pv, pos1, pos2) {
    let next = 0;
    for (let curr = 0; curr < this.vertices.length; curr++) {
      next = curr + 1;
      if (next == this.vertices.length) {
        next = 0;
      }

      let vc = this.vertices[curr];
      let vn = this.vertices[next];

      let collided = this.polyLineCollision(pv, vc, vn, pos1, pos2);
      if (collided) {
        return true;
      }
    }
    return false;
  }

  polyLineCollision(pv, vc, vn, pos1, pos2) {
    let next = 0;
    for (let curr = 0; curr < pv.length; curr++) {
      next = curr + 1;
      if (next == pv.length) {
        next = 0;
      }

      let pvc = pv[curr];
      let pvn = pv[next];

      let collided = this.lineLineCollision(
        vc.x + pos1.x,
        vc.y + pos1.y,
        vn.x + pos1.x,
        vn.y + pos1.y,
        pvc.x + pos2.x,
        pvc.y + pos2.y,
        pvn.x + pos2.x,
        pvn.y + pos2.y,
      );

      if (collided) {
        return true;
      }
    }
    return false;
  }

  lineLineCollision(x1, y1, x2, y2, x3, y3, x4, y4) {
    let uA =
      ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
      ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    let uB =
      ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
      ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
      return true;
    }

    return false;
  }

  polyPointCollision() {
    return false;
  }
}
