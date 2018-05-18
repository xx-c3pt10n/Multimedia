class Line extends SpriteImage {
  constructor(x, y, w, h, speed, clickable, img) {
    super(x, y, w, h, speed, clickable, img);
  }
  relocate(ctx) {
    this.clear(ctx);
    if(this.y < 800) {
      this.y = this.y + this.speed;
    }
    else {
      this.y = -200;
    }
    this.draw(ctx);
  }
  class() {
    return "line";
  }
}
