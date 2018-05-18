var fuelIncreaseSmall = 25;
var fuelIncreaseBig = 100;

class Fuel extends SpriteImage {
  constructor(x, y, w, h, speed, clickable, img, type) {
    super(x, y, w, h, speed, clickable, img);
    this.type = type;
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
    switch(this.type){
      case 1:  // aumenta os pontos
        player.fuelLevel += 25;
        if(soundsOn) {
          var audio = new Audio("resources/songs/slurping0.wav");
          audio.volume = 0.6;
          audio.play();
        }
        break;
      case 2:  // aumenta os pontos
        player.fuelLevel += 100;
        if(soundsOn) {
          var audio = new Audio("resources/songs/slurping1.wav");
          audio.volume = 0.6;
          audio.play();
        }
        break;
      }

    if(player.fuelLevel > 100) {
      player.fuelLevel = 100;
    }
    return false;
  }
  checkSpriteInCanvas() {
    return this.inCanvas;
  }

  class() {
    return "fuel";
  }
}
