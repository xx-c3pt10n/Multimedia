var lifeTakenBySmallBullets = 10;
var lifeTakenByMediumBullets = 50;
var lifeTakenByHeavyBullets = 100;
var lifeTakenByRockets = 300;


class Bullet extends SpriteImage {
  constructor(x, y, w, h, speed, clickable, img, type) {
    super(x, y, w, h, speed, clickable, img);
    this.type = type;
    this.inCanvas = true;
  }

  relocate(ctx) {
    this.clear(ctx);
    if(this.y > 0) {
      this.y = this.y - this.speed;
    }
    else {
      this.inCanvas = false;
    }
  }

  action(ctx, enemyCar) {
    switch(this.type){
      case 1:  //pequenas
        enemyCar.life -= lifeTakenBySmallBullets;
        break;
      case 2:  //medias
        enemyCar.life -= lifeTakenByMediumBullets;
        break;
      case 3:  //grandes
        enemyCar.life -= lifeTakenByMediumBullets;
        break;
      case 4: //rocket
        enemyCar.life -= lifeTakenByRockets;
        break;
    }
    if(!enemyCar.checkLife()) {
      return true;
    }
    return false;
  }
  bulletDamage() {
    switch(this.type){
      case 1:  //pequenas
        return lifeTakenBySmallBullets;
      case 2:  //medias
        return lifeTakenByMediumBullets;
      case 3:  //grandes
        return lifeTakenByHeavyBullets;
      case 4: //rocket
        return lifeTakenByRockets;
    }

  }
  checkSpriteInCanvas() {
    return this.inCanvas;
  }
  class() {
    return "bullet";
  }
}
