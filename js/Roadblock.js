class Roadblock extends SpriteImage {
  constructor(x, y, w, h, speed, clickable, img, life) {
    super(x, y, w, h, speed, clickable, img);
    this.life = life;
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

  remove(ctx) {
    this.clear(ctx);
  }
  checkLife() {
    if(this.life < 1) {
      return false;
    }
    return true;
  }

  checkSpriteInCanvas() {
    return this.inCanvas;
  }

  class() {
    return "roadblock";
  }
}
