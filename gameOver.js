class GameOver {
  constructor(score) {
    this.mouseWasPressed = false;
    this.displayScore = 0;
    this.name = createInput();
    this.name.position(width / 2, height / 2 + height / 8);
    this.name.hide();
    this.submit = createButton("Submit Score");
    this.submit.position(width / 2, height / 2 + height / 4);
    this.submit.mousePressed(() => this.saveScore());
    this.submit.hide();
  }

  update() {
    this.drawText();
    this.drawScore();
    this.drawButton();
    this.drawReturnButton();
    if (this.checkForReturnButtonPress()) {
      return 1;
    } else {
      this.mouseWasPressed = false;
    }
    if (this.checkForTryAgainButtonPress()) {
      return 2;
    }

    return 0;
  }

  saveScore() {
    let playerName = this.name.value();
    let leaderboard = getItem("leaderboard");

    leaderboard.push({ name: playerName, score: this.displayScore });
    leaderboard.sort((a, b) => b.score - a.score);

    leaderboard = leaderboard.slice(0, 10);

    storeItem("leaderboard", leaderboard);
  }

  checkForTryAgainButtonPress() {
    let result = false;
    if (mouseIsPressed && !this.mouseWasPressed) {
      let x = mouseX;
      let y = mouseY;
      let xLB = (3 * width) / 4 - width / 8;
      let xRB = (3 * width) / 4 + width / 8;
      let yUB = (3 * height) / 4 - height / 16;
      let yBB = (3 * height) / 4 + height / 16;

      if (x >= xLB && x <= xRB && y <= yBB && y >= yUB) {
        result = true;
      }
    }
    this.mouseWasPressed = mouseIsPressed;
    return result;
  }

  drawButton() {
    push();
    rectMode(CENTER);
    fill("white");
    rect((3 * width) / 4, (3 * height) / 4, width / 4, height / 8);
    pop();

    push();
    textSize(min(width / 10, height / 10));
    fill("black");
    textAlign(CENTER, CENTER);
    text("Retry", (3 * width) / 4, (3 * height) / 4);
    pop();
  }

  checkForReturnButtonPress() {
    let result = false;
    if (mouseIsPressed && !this.mouseWasPressed) {
      let x = mouseX;
      let y = mouseY;
      let xLB = width / 4 - width / 8;
      let xRB = width / 4 + width / 8;
      let yUB = (3 * height) / 4 - height / 16;
      let yBB = (3 * height) / 4 + height / 16;

      if (x >= xLB && x <= xRB && y <= yBB && y >= yUB) {
        result = true;
      }
    }
    this.mouseWasPressed = mouseIsPressed;
    return result;
  }

  drawReturnButton() {
    push();
    rectMode(CENTER);
    fill("white");
    rect(width / 4, (3 * height) / 4, width / 4, height / 8);
    pop();

    push();
    textSize(min(width / 10, height / 10));
    fill("black");
    textAlign(CENTER, CENTER);
    text("Main", width / 4, (3 * height) / 4);
    pop();
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
    textSize(min(width / 8, height / 8));
    fill("white");
    textAlign(CENTER, CENTER);
    text(str(this.displayScore), width / 2, height / 2);
    pop();
  }
}
