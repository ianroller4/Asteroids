class GameOver {
  constructor() {
    this.mouseWasPressed = false;
    this.displayScore = 0;
  }

  update() {
    this.drawText();
    this.drawScore();
    this.drawButton();
    this.drawReturnButton();
    if (this.checkForReturnButtonPress()) {
      return 1;
    }
    if (this.checkForTryAgainButtonPress()) {
      return 2;
    }

    return 0;
  }

  checkForTryAgainButtonPress() {
    let result = false;
    if (mouseIsPressed && !this.mouseWasPressed) {
      let x = mouseX;
      let y = mouseY;
      let xLB = (3 * width) / 4 - width / 4;
      let xRB = (3 * width) / 4 + width / 4;
      let yUB = (3 * height) / 4 - height / 8;
      let yBB = (3 * height) / 4 + height / 8;

      if (x >= xLB && x <= xRB && y <= yBB && y >= yUB) {
        result = true;
      }
    }
    this.mouseWasPressed = mouseIsPressed;
    return result;
  }

  checkForReturnButtonPress() {
    let result = false;
    if (mouseIsPressed && !this.mouseWasPressed) {
      let x = mouseX;
      let y = mouseY;
      let xLB = width / 4 - width / 4;
      let xRB = width / 4 + width / 4;
      let yUB = (3 * height) / 4 - height / 8;
      let yBB = (3 * height) / 4 + height / 8;

      if (x >= xLB && x <= xRB && y <= yBB && y >= yUB) {
        result = true;
      }
    }
    this.mouseWasPressed = mouseIsPressed;
    return result;
  }

  drawText() {
    push();
    textSize(min(width / 4, height / 4));
    fill("white");
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 4);
    pop();
  }

  drawScore() {
    push();
    textSize(100);
    fill("white");
    textAlign(CENTER, CENTER);
    text(str(this.displayScore), width / 2, height / 2);
    pop();
  }

  drawReturnButton() {
    push();
    rectMode(CENTER);
    fill("white");
    rect(width / 4, (3 * height) / 4, width / 4, height / 8);
    pop();

    push();
    textSize(100);
    fill("black");
    textAlign(CENTER, CENTER);
    text("Main Menu", width / 4, (3 * height) / 4);
    pop();
  }

  drawButton() {
    push();
    rectMode(CENTER);
    fill("white");
    rect((3 * width) / 4, (3 * height) / 4, width / 4, height / 8);
    pop();

    push();
    textSize(100);
    fill("black");
    textAlign(CENTER, CENTER);
    text("Try Again", (3 * width) / 4, (3 * height) / 4);
    pop();
  }
}
