var pointsToSmallBullets = 30; //alterar valores depois
var pointsToMediumBullets = 80;//alterar valores depois
var pointsToHeavyBullets = 150;//alterar valores depois
var pointsToRockets = 300;//alterar valores depois

class Player extends SpriteImage {
  constructor(x, y, w, h, speed, clickable, img, points, score, fuelLevel, untouchablePower, freezePower, ) {
    super(x, y, w, h, speed, clickable, img);
    this.points = points;
    this.score = score;
    this.fuelLevel = fuelLevel;
    this.untouchablePower = untouchablePower;
    this.freezePower = freezePower;
  }
  moveLeft(ctx) {
    this.clear(ctx);
    this.x = this.x - this.speed;
    this.draw(ctx);
  }
  moveRight(ctx) {
    this.clear(ctx);
    this.x = this.x + this.speed;
    this.draw(ctx);
  }
  moveUp(ctx) {
    this.clear(ctx);
    this.y = this.y - this.speed;
    this.draw(ctx);
  }
  moveDown(ctx) {
    this.clear(ctx);
    this.y = this.y + this.speed;
    this.draw(ctx);
  }

  checkWeapon() {
    if((this.points > pointsToSmallBullets) && (this.points < pointsToMediumBullets)) { // small bullets
      return 1;
    }
    else if((this.points > pointsToMediumBullets) && (this.points < pointsToHeavyBullets)){ // medium bullets
      return 2;
    }
    else if((this.points > pointsToHeavyBullets) && (this.points < pointsToRockets)) { //heavy bullets
      return 3;
    }
    else if (this.points > pointsToRockets){ //rockets /* mudar depois para os poderes */
      return 4;
    }
  }

  /*nao testado*/
  shoot(ctx) {
    if(this.points >= pointsToSmallBullets) {
      var img = new Image();
      var bulletType = this.checkWeapon();
      img.src = "resources/bullets/bullet" + bulletType + ".png";
      var nw = img.naturalWidth;
      var nh = img.naturalHeight;
      var sp = new Bullet(this.x + this.width/2.3, this.y, nw / 80, nh / 80, speed, false, img, bulletType);
      return sp;
    }
  }
  checkFuelLevel() {
    if(this.fuelLevel < 1) {
      return false;
    }
    return true;
  }
  relocate(ctx) {

  }

  class() {
    return "player";
  }
}
