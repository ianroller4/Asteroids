class GameOver {
  constructor() {
    this.mouseWasPressed = false;
  }

  update() {
    this.drawText();
    this.drawButton();
    this.checkForButtonPress();
  }

  checkForButtonPress() {
    if (mouseIsPressed && !this.mouseWasPressed) {
      let x = mouseX;
      let y = mouseY;
      let xLB = width / 2 - width / 4;
      let xRB = width / 2 + width / 4;
      let yUB = (3 * height) / 4 - height / 8;
      let yBB = (3 * height) / 4 + height / 8;

      if (x >= xLB && x <= xRB && y <= yBB && y >= yUB) {
        print("button clicked");
      }
    }
    this.mouseWasPressed = mouseIsPressed;
  }

  drawText() {
    push();
    textSize(100);
    fill("white");
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 4);
    pop();
  }

  drawButton() {
    push();
    rectMode(CENTER);
    fill("white");
    rect(width / 2, (3 * height) / 4, width / 4, height / 8);
    pop();

    push();
    textSize(100);
    fill("black");
    textAlign(CENTER, CENTER);
    text("Try Again", width / 2, (3 * height) / 4);
    pop();
  }
}
