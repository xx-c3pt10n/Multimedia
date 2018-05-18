class PoliceCar extends SpriteImage {
  constructor(x, y, w, h, speed, clickable, img) {
    super(x, y, w, h, speed, clickable, img);
    this.inCanvas = true;

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
    return true;
  }

  checkSpriteInCanvas() {
    return this.inCanvas;
  }

  class() {
    return "policecar";
  }

}
