class GameManager {
  constructor() {
    this.state = "game";
    this.menu = new MainMenu();
    this.over = new GameOver();
    this.game = new ActorManager();
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
    this.game.updateActors();
    this.game.collisionCheck();
    if (this.game.player.lives <= 0) {
      this.state = "over";
      this.game.engineSFX.stop();
    }
    this.drawHud();
  }

  updateOver() {
    this.over.update();
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
