class Car extends SpriteImage {
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
      // ordenar por tamanhos e meter vida conforme esse tamanho - no main para aparcerem mais do que um carro
      this.inCanvas = false;
      /*this.img.src = "resources/car/car"+parseInt(Math.random()*17+1)+".png";
      this.life = life;
      this.x = parseInt(Math.random() * (ctx.canvas.width - this.width));
      this.y = -200;*/
    }
    //this.draw(ctx);
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
    return "car";
  }
}
