class Oil extends SpriteImage {
  constructor(x, y, w, h, speed, clickable, img) {
    super(x, y, w, h, speed, clickable, img);
    this.inCanvas = true;
    this.passed = false;

  }
  relocate(ctx) {
    this.clear(ctx);
    if(this.y < 800) {
      this.y = this.y + this.speed;
    }
    else {
      this.inCanvas = false;
    }
  }
  action(ctx, player) {
    if(!this.passed) {
      this.passed = true;
      player.fuelLevel -= 50;
      if(!player.checkFuelLevel()) {
        document.getElementById("fuelID").textContent = 0;
      }
      else {
        document.getElementById("fuelID").textContent = player.fuelLevel;
      }
      return false;
    }
  }
  checkSpriteInCanvas() {
    return this.inCanvas;
  }
  class() {
    return "oil";
  }
}
