var pointsGivenByGreyBoogie = 10;
var pointsGivenByGreenBoogie = 20;
var pointsGivenByBlueBoogie = 50;
var pointsGivenByPurpleBoogie = 70;
var pointsGivenByGoldenBoogie = 100;


class Boogie extends SpriteImage {
  constructor(x, y, w, h, speed, clickable, img, type) {
    super(x, y, w, h, speed, clickable, img);
    this.type = type;
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
      switch(this.type){
        case 1:  // aumenta os pontos
          player.points += pointsGivenByGreyBoogie;
          break;
        case 2:  // aumenta os pontos
          player.points += pointsGivenByGreenBoogie;
          break;
        case 3:  // aumenta os pontos
          player.points += pointsGivenByBlueBoogie;
          break;
        case 4: // aumenta os pontos 
          player.points = pointsGivenByPurpleBoogie;
          break;
        case 5: // aumenta os pontos
          player.points = pointsGivenByGoldenBoogie;
          break;
      }
      if(soundsOn) {
        var audio = new Audio('resources/songs/levelup.wav');
        audio.volume = 0.6;
        audio.play();
      }
      if(parseInt(document.getElementById("pointsID").textContent) != player.points) {
        document.getElementById("pointsID").textContent = player.points;
        document.getElementById("weaponID").src = "resources/bullets/bullet"+player.checkWeapon()+".png";
        var imgT = new Image();
        imgT.src = "resources/bullets/bullet1.png";
        var nw = imgT.naturalWidth;
        var nh = imgT.naturalHeight;
        document.getElementById("weaponDamageID").textContent = new Bullet(0, 0, nw / 80, nh / 80, speed, false, imgT, player.checkWeapon()).bulletDamage();
      }
      return false;
    }
  }

  checkSpriteInCanvas() {
    return this.inCanvas;
  }

  class() {
    return "boogie";
  }
}
