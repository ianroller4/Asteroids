class MainMenu {
  constructor() {
    this.mouseWasPressed = false;
    this.leaderboard = [];
    storeItem("leaderboard", this.leaderboard);
  }

  update() {
    this.drawText();
    this.drawButton();
    this.drawLeaderboard();
    return this.checkForButtonPress();
  }

  checkForButtonPress() {
    let result = false;
    if (mouseIsPressed && !this.mouseWasPressed) {
      let x = mouseX;
      let y = mouseY;
      let xLB = width / 2 - width / 4;
      let xRB = width / 2 + width / 4;
      let yUB = (3 * height) / 4 - height / 8;
      let yBB = (3 * height) / 4 + height / 8;

      if (x >= xLB && x <= xRB && y <= yBB && y >= yUB) {
        result = true;
      }
    }
    this.mouseWasPressed = mouseIsPressed;
    return result;
  }

  drawLeaderboard() {
    this.leaderboard = getItem("leaderboard");
    if (this.leaderboard.length > 0) {
      push();
      textSize(min(width / 40, height / 40));
      fill("white");
      textAlign(CENTER, CENTER);
      for (let i = 0; i < this.leaderboard.length; i++) {
        let textString =
          str(i + 1) +
          ". " +
          str(this.leaderboard[i].name) +
          ": " +
          str(this.leaderboard[i].score);
        text(
          textString,
          width / 2,
          height / 3 + height / 40 + (height * i) / 40,
        );
      }
      pop();
    }
  }

  drawText() {
    push();
    textSize(min(width / 4, height / 4));
    fill("white");
    textAlign(CENTER, CENTER);
    text("Asteroids", width / 2, height / 4);
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
    text("Play", width / 2, (3 * height) / 4);
    pop();
  }
}
