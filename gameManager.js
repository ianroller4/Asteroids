class GameManager {
  constructor() {
    this.state = "game";
    this.menu = new MainMenu();
    this.over = new GameOver();
    this.game = new ActorManager();
    this.shakeAmount = 0;
  }

  update() {
    switch (this.state) {
      case "menu":
        this.updateMenu();
        break;
      case "game":
        this.updateGame();
        break;
      case "over":
        this.updateOver();
        break;
    }
  }

  updateMenu() {
    this.menu.update();
  }

  updateGame() {
    let xShake = random(-this.shakeAmount, this.shakeAmount);
    let yShake = random(-this.shakeAmount, this.shakeAmount);

    translate(xShake, yShake);
    this.game.updateActors();
    let result = this.game.collisionCheck();

    if (result) {
      this.screenShake();
    }

    if (this.game.player.lives <= 0) {
      this.state = "over";
      this.game.engineSFX.stop();
    }
    this.drawHud();
    this.shakeAmount *= 0.9;
    if (this.game.asteroids.length == 0) {
      this.game.nextLevel();
    }
  }

  updateOver() {
    let clicked = this.over.update();
    if (clicked) {
      this.game = new ActorManager();
      this.state = "game";
    }
  }

  screenShake() {
    this.shakeAmount = 10;
  }

  drawHud() {
    textSize(100);
    fill("white");
    // Draw Lives
    push();
    textAlign(LEFT, TOP);
    text(str(this.game.player.lives), 0, 0);
    pop();
    // Draw Score
    push();
    textAlign(RIGHT, TOP);
    text(str(this.game.player.score), width, 0);
    pop();
  }
}
