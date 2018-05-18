"use strict";
var settings = JSON.parse(localStorage.getItem('settings'));
if(settings === null) {
  settings = {carCheck:true,fuelCheck:true,policeCarCheck:true,boogieAndBulletCheck:true,roadblockCheck:true,oilCheck:true,soundCheck:true,musicCheck:true,carRate:1,fuelRate:1,policeCarRate:1,boogieRate:1,oilRate:1,bulletLimit:1,difficultyRate:150,speedID:2,secondsToStartID:1};
}
var maxScore = parseInt(localStorage.getItem('maxScore'));
if(isNaN(maxScore)) {
  maxScore = 0;
}
var leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
if(leaderboard === null) {
  leaderboard = [];
}

var scoreCounter = 0; //para o score ir incrementando
var speed = 2; //velocidade do carro a descer (mudar qd criarmos a classe carro)
var lineSpeed = 4; //velocidade da linha a descer (mudar qd criarmos a classe linha)
var gameOver = false;
var gamePaused = false;
var reqID = 0; //ID para o requestAnimationFrame
var initialPlayerPoints = 31; //numero de pontos com que o jogador começa
var secondsToStart = settings.secondsToStartID; //numero de segundos antes de começar
var maxBullets = settings.bulletLimit;
var carsKill = 0;

/*RATES*/
var updateScoreCounterRate = 40; //numero de iteraçoes necessarias no animLoop para incrementar o Score
var difficultyRate = settings.difficultyRate; //numero de iteraçoes necessarias no animloop para aumentar a dificuldade(speed e linespeed incrementam)
var fuelDecreaseRate = 30; //numero de iteracoes necessarias no animLoop para decrementar a gasolina

var fuelAppearRate = settings.fuelRate*getRandomInt(400, 700); //numero de iteraçoes necessarias no animloop para aparecer gasolina no mapa
var carAppearRate = settings.carRate*getRandomInt(110, 160);
var oilAppearRate = settings.oilRate*getRandomInt(700,900);
var roadblockAppearRate = settings.roadblockRate*getRandomInt(800,1200);
var policeCarAppearRate = settings.policeCarRate*getRandomInt(150,500);
var boogieAppearRate = settings.boogieRate*getRandomInt(300,500);



var musicOn = settings.musicCheck; //musica on ou off
var soundsOn = settings.soundCheck; //sons on ou off
var sp = null;
var bool = true;
var backgroundAudio;
var lineWidth;
var nTimesFasterThanSpeed = 2;
var pointsToScorePercentage = 0.01;
var carsKilledToScorePercentage = 0.3;
var carsOvertakenToScorePercentage = 0.3;



/** variaveis auxiliares no programa **/
var totalArray = []; //array com todas as sprites para a canvas
var carsArray = [];
var linesArray = [];
var bulletsArray = [];
var collisionArray = [];
var shootableArray = [];

(function() {
  window.addEventListener("load", main);
}());

function main(){
  document.getElementById("maxScoreID").textContent = maxScore;

  backgroundAudio = new Audio('resources/songs/backgroundMusic.mp3');
  if(musicOn) {
    backgroundAudio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    backgroundAudio.play();
  }
  else {
    document.getElementById("muteImg").src = "resources/extra/soundMute.png";
  }
  document.getElementById("mute_div").addEventListener("click", function() {
    if(isPlaying(backgroundAudio)) {
      document.getElementById("muteImg").src = "resources/extra/soundMute.png";
      backgroundAudio.pause();
    }
    else {
      backgroundAudio.play();
      document.getElementById("muteImg").src = "resources/extra/soundPlay.png";
    }
  });


  if(!settings.fuelCheck) {
    document.getElementById("fuelIDp").parentNode.removeChild(document.getElementById("fuelIDp"));
  }

  if(!settings.boogieAndBulletCheck) {
    document.getElementById("pointsIDp").parentNode.removeChild(document.getElementById("pointsIDp"));
    document.getElementById("bulletIDp").parentNode.removeChild(document.getElementById("bulletIDp"));
    document.getElementById("carsKilledIDp").parentNode.removeChild(document.getElementById("carsKilledIDp"));
  }
  if(!settings.carCheck) {
    document.getElementById("carsOvertakenIDp").parentNode.removeChild(document.getElementById("carsOvertakenIDp"));
  }

  document.getElementById("Settings").addEventListener("click", function() {
    location.href = "Settings.html";
  });
  document.getElementById("Leaderboard").addEventListener("click", function() {
    location.href = "Leaderboard.html";
  });
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var totalArray;
  document.getElementById("startCounter").textContent = secondsToStart;
  var counter = secondsToStart;
  setInterval(function() {
    counter--;
    if (counter >= 0) {
      document.getElementById("startCounter").textContent=parseInt(document.getElementById("startCounter").textContent - 1);
    }
    if (counter === 0) {
      document.getElementById("startCounterDiv").parentNode.removeChild(document.getElementById("startCounterDiv"));
      canvas.addEventListener("initend", initEndHandler);
      init(ctx); //carregar todos os componentes

      //listeners clicks
      document.getElementById("restart_div").addEventListener("click", function() {
        window.location.reload();
      });
      document.getElementById("quit_div").addEventListener("click", function() {
        window.location = "index.html";
      });
      document.getElementById("pause_div").addEventListener("click", function() {
        if(!gameOver) {
          if(!gamePaused) {
            gamePaused = !gamePaused;
            document.getElementById("pause_div").textContent = "continue";
            backgroundAudio.pause();
          }
          else {
            gamePaused = !gamePaused;
            document.getElementById("pause_div").textContent = "pause";
            backgroundAudio.play();
          }
        }
      });
      //funções locais para gestão de eventos
      function initEndHandler(ev) {
        totalArray = ev.totalArray;

        //listeners to move player
        movePlayer(totalArray[4], ctx);
        //iniciar a animação
        startAnim(ctx, totalArray);
      }
      clearInterval(counter);
    }
  }, 1000);
}


//init: carregamento de componentes
function init(ctx) {
  var line = new Image();
  line.addEventListener("load", linesLoadedHandler);
  line.id = "line";
  line.src = "resources/extra/line.png";

  var img = new Image();
  img.addEventListener("load", imgLoadedHandler);
  img.id = "car";
  img.src = "resources/car/car1.png"; //dá ordem de carregamento da imagem



  /*carregar o a estrada (linhas do eixo)*/
  function linesLoadedHandler(ev) {
    var img = ev.target;
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    var height = ctx.canvas.height;
    var sp = new Line(ctx.canvas.width/2, 0, Math.round(nw / 2), Math.round(nh / 2), lineSpeed, false, img);
    linesArray.push(sp);
    sp = new Line(ctx.canvas.width/2, 250, nw / 2, nh / 2, lineSpeed, false, img);
    linesArray.push(sp);
    sp = new Line(ctx.canvas.width/2, 500, nw / 2, nh / 2, lineSpeed, false, img);
    linesArray.push(sp);
    sp = new Line(ctx.canvas.width/2, 750, nw / 2, nh / 2, lineSpeed, false, img);
    linesArray.push(sp);
    totalArray = totalArray.concat(linesArray);
    lineWidth = nw;
  }

  /*carregar nosso carro*/
  function imgLoadedHandler(ev) {
    var img = ev.target;
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    if(settings.boogieAndBulletCheck) {
      document.getElementById("pointsID").textContent = 0;
    }
    else {

    }

    var sp = new Player(ctx.canvas.width/1.5, ctx.canvas.height/1.5, Math.round(nw / 6), Math.round(nh / 6), 3, true, img, initialPlayerPoints, 0, 100, false, false);
    totalArray.push(sp);
    var ev2 = new Event("initend");
    ev2.totalArray = totalArray;
    ctx.canvas.dispatchEvent(ev2);
  }
}

//-------------------------------------------------------------
//--- controlo da animação: coração da aplicação!!!

//-------------------------------------------------------------


function animLoop(ctx, totalArray) {
  var al = function(time) {
    if(!gameOver && !gamePaused) {
      //ver os objetos q nao tao na canvas para remover dos arrays
      for(let j = 0; j < totalArray.length; j++) {
        if(!totalArray[j].checkSpriteInCanvas()) {
          collisionArray = removeFromArray(collisionArray, totalArray[j]);
          var length = bulletsArray.length;
          bulletsArray = removeFromArray(bulletsArray, totalArray[j]);
          if(bulletsArray.length != length) {
            maxBullets++;
          }
          shootableArray = removeFromArray(shootableArray, totalArray[j])
          var length = carsArray.length;
          carsArray = removeFromArray(carsArray, totalArray[j])
          if(bulletsArray.length != length) {
            document.getElementById("carsOvertakenID").textContent = parseInt(document.getElementById("carsOvertakenID").textContent) + 1;
          }
          totalArray = removeFromArray(totalArray, totalArray[j]);
        }
      }
      if(scoreCounter > 0) {
        if(scoreCounter % carAppearRate == 0 && settings.carCheck) {
          generateEnemycar(ctx);
        }
        if(scoreCounter % fuelAppearRate == 0 && settings.fuelCheck) {
          generateFuel(ctx);
        }
        if(scoreCounter % oilAppearRate == 0 && settings.oilCheck) {
          generateOil(ctx);
        }
        if(scoreCounter % roadblockAppearRate == 0 && settings.roadblockCheck) {
          generateRoadblock(ctx);
        }
        if(scoreCounter % policeCarAppearRate == 0 && settings.policeCarCheck) {
          generatePoliceCar(ctx);
        }
        if(scoreCounter % boogieAppearRate == 0 && settings.boogieAndBulletCheck) {
          generateBoogie(ctx);
        }
      }

      for(let y = 0; y < shootableArray.length; y++) {
        for(let x = 0; x < bulletsArray.length; x++) {
          if(bulletsArray[x].checkCollisionRect(shootableArray[y])) {
            var intersectRect = bulletsArray[x].intersect(shootableArray[y]);
            if(intersectRect) {
              if(shootableArray[y].class() != "policecar") {
                if(bulletsArray[x].action(ctx, shootableArray[y])) {
                  totalArray = removeFromArray(totalArray, shootableArray[y]);
                  carsArray = removeFromArray(carsArray, shootableArray[y]);
                  shootableArray = removeFromArray(shootableArray, shootableArray[y]);
                  collisionArray = removeFromArray(collisionArray, shootableArray[y]);
                  carsKill++;
                  document.getElementById("carsKilledID").textContent = carsKill;
                }
                maxBullets++;
              }
              else { //if enemy car is police
                gameOverFunction(ctx, reqID, 2, totalArray[4]);
              }
              totalArray = removeFromArray(totalArray, bulletsArray[x]);
              bulletsArray = removeFromArray(bulletsArray, bulletsArray[x]);
            }
          }
        }
      }
      for(let i = 0; i < collisionArray.length; i++) {
        if(collisionArray[i].checkCollisionRect(totalArray[4])) {
          var intersectRect = totalArray[4].intersect(collisionArray[i]);
          if(intersectRect) {
            if(totalArray[4].check(collisionArray[i], intersectRect)) { // Checka as intersecções com todos os objetos que existem na canvas
              if(collisionArray[i].action(ctx, totalArray[4])) {
                gameOverFunction(ctx, reqID, 0, totalArray[4]);
              }
              else {
                totalArray = removeFromArray(totalArray, collisionArray[i]);
                collisionArray = removeFromArray(collisionArray, collisionArray[i]);
              }
            }
          }
        }
      }

      scoreCounter++;

      if(settings.fuelCheck) {
        if(scoreCounter % fuelDecreaseRate == 0) {
          document.getElementById("fuelID").textContent=totalArray[4].fuelLevel;
          totalArray[4].fuelLevel--;
        }
        if(totalArray[4].fuelLevel < 0) {
          gameOverFunction(ctx, reqID, 1, totalArray[4]);
        }
      }

      if (scoreCounter % updateScoreCounterRate == 0) {
        var actualScore = parseInt(document.getElementById("score").textContent) + 1;
        document.getElementById("score").textContent = actualScore;
        totalArray[4].score = actualScore;
      }
      if(scoreCounter % difficultyRate == 0) {
        increaseSpeedAll(totalArray);
      }

        relocateAll(ctx, totalArray);
      }
      moveWithKeyboardMovingControls(totalArray[4], ctx);
      animLoop(ctx, totalArray);
    }
    if(!gameOver) {
      reqID = window.requestAnimationFrame(al);
      if(!gamePaused) {
        render(ctx, totalArray, reqID);
      }
    }
}

function gameOverFunction(ctx, reqID, type, player) {
  document.getElementById("restart_div").style.boxShadow = "10px 20px 30px yellow";
  clear(ctx, totalArray);
  var img = new Image();
  switch (type) {
    case 0:
      img.src = "resources/GameOver/gameOver.png";
      var audio = new Audio('resources/songs/explosion.mp3');
      break;
    case 1:
      img.src = "resources/GameOver/outoffuel.png";
      var audio = new Audio('resources/songs/lowfuel.wav');
      break;
    case 2:
      img.src = "resources/GameOver/busted.png";
      var audio = new Audio('resources/songs/busted.wav');
      break;
  }
  img.onload = function() {
    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  if(isPlaying(backgroundAudio)) {
    backgroundAudio.pause();
  }
  if(soundsOn) {
    audio.play();
  }
  document.getElementById("pause_div").style.cursor = "default";
  document.getElementById("pause_div").classList.remove("hvr-underline-from-center");
  window.cancelAnimationFrame(reqID);
  if(settings.boogieAndBulletCheck) {
    if(parseInt(player.points*pointsToScorePercentage) > 0) {
      player.score = player.score + parseInt(player.points*pointsToScorePercentage);
    }
    if(parseInt(parseInt(document.getElementById("carsKilledID").textContent)*carsKilledToScorePercentage) > 0) {
      player.score = player.score + parseInt(parseInt(document.getElementById("carsKilledID").textContent)*carsKilledToScorePercentage);
    }
    document.getElementById("score").textContent = player.score;
  }
  if(settings.carCheck) {
    if(parseInt(parseInt(document.getElementById("carsOvertakenID").textContent)*carsOvertakenToScorePercentage) > 0) {
      player.score = player.score + parseInt(parseInt(document.getElementById("carsOvertakenID").textContent)*carsOvertakenToScorePercentage);
      document.getElementById("score").textContent = player.score;
    }
  }
  if(player.score > parseInt(document.getElementById("maxScoreID").textContent)) {
    document.getElementById("maxScoreID").textContent = player.score;
    localStorage.setItem("maxScore", player.score);
  }
  leaderboard.push(player.score);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  gameOver = true;
}

function relocateAll(ctx, totalArray) {
  for (let i = 0; i < totalArray.length; i++) {
    totalArray[i].relocate(ctx);
  }
}

function increaseSpeedAll(totalArray) {
  var actualSpeed = speed;
  for (let i = 0; i < totalArray.length; i++) {
    if(totalArray[i].class() != "player") {
      totalArray[i].speed = totalArray[i].speed + 0.4;
      actualSpeed = totalArray[i].speed;
    }
  }
  speed = actualSpeed;
}
//iniciar animação
function startAnim(ctx, totalArray) {
  if(settings.boogieAndBulletCheck) {
    document.getElementById("pointsID").textContent = totalArray[4].points-31;
    document.getElementById("weaponID").src = "resources/bullets/bullet"+totalArray[4].checkWeapon()+".png";
    var imgT = new Image();
    imgT.src = "resources/bullets/bullet1.png";
    var nw = imgT.naturalWidth;
    var nh = imgT.naturalHeight;
    document.getElementById("weaponDamageID").textContent = new Bullet(0, 0, nw / 80, nh / 80, speed, false, imgT, totalArray[4].checkWeapon()).bulletDamage();
  }
  draw(ctx, totalArray);
  animLoop(ctx, totalArray);
}


//desenhar sprites
function draw(ctx, totalArray) {
  for (let i = 0; i < totalArray.length; i++) {
    totalArray[i].draw(ctx);
  }
}


//apagar sprites
function clear(ctx, totalArray) {
  for (let i = 0; i < totalArray.length; i++) {
    totalArray[i].clear(ctx);
  }
}

//resedenho, actualizações, ...
function render(ctx, totalArray) {
  var cw = ctx.canvas.width;
  var ch = ctx.canvas.height;
  //apagar canvas
  ctx.clearRect(0, 0, cw, ch);
  //animar sprites
  draw(ctx, totalArray);
}

var Keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  space: false,
  pause: false
};

function moveWithMouse(player, ctx) {
  var cw = ctx.canvas.width;
  var ch = ctx.canvas.height;
  var roadLimitXf = cw - 25;
  var roadLimitYf = ch - 25;
  var roadLimiti = 0;
  var mousePosition;
  var offset = [0, 0];
  var isDown = false;
  player.speed = 5;
  document.addEventListener('mousedown', function(e) {
    if (player.clickedBoundingBox(e)) {
      isDown = true;
    }
    offset = [
      player.x - e.clientX,
      player.y - e.clientY
    ];
  }, true);
  document.addEventListener('mouseup', function() {
    isDown = false;
  }, true);

  document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      if ((mousePosition.x + offset[0]) < roadLimitXf && (mousePosition.y + offset[1]) <
      roadLimitYf && (mousePosition.x + offset[0]) > roadLimiti && (mousePosition.y + offset[1]) > roadLimiti) {
        player.x = (mousePosition.x + offset[0]);
        player.y = (mousePosition.y + offset[1]);
      }
    }
  }, true);
}

function moveWithKeyboardHandlers(player, ctx) {
  window.addEventListener("keydown", function(e) {
    var kc = e.keyCode;
    e.preventDefault();
    if (kc === 37) Keys.left = true;
    else if (kc === 38) Keys.up = true;
    else if (kc === 39) Keys.right = true;
    else if (kc === 40) Keys.down = true;
    /*else if (kc === 32) Keys.space = true;
    else if (kc === 80) Keys.pause = true;*/
  });
  window.addEventListener("keyup", function(e) {
    var kc = e.keyCode;
    e.preventDefault();
    if (kc === 37) Keys.left = false;
    else if (kc === 38) Keys.up = false;
    else if (kc === 39) Keys.right = false;
    else if (kc === 40) Keys.down = false;
    /*else if (kc === 32) Keys.space = false;
    else if (kc === 80) Keys.pause = false;*/
  });
}


function moveWithKeyboardMovingControls(player, ctx) {
  var cw = ctx.canvas.width;
  var ch = ctx.canvas.height;
  var roadLimitYi = 131;
  var roadLimitXi = 64;
  var roadLimitXf = cw - 5;
  var roadLimitYf = ch - 5;
  if(!gamePaused) {
    if (Keys.up && (player.y + player.height > roadLimitYi)) player.moveUp(ctx);
    else if (Keys.down && (player.y + player.height < roadLimitYf)) player.moveDown(ctx);
    if (Keys.left && (player.x + player.width > roadLimitXi)) player.moveLeft(ctx);
    else if (Keys.right && (player.x + player.width < roadLimitXf)) player.moveRight(ctx);
  }
}

function movePlayer(player, ctx) {
  moveWithKeyboardHandlers(player, ctx);
  moveWithMouse(player, ctx);
  keyboardSecondControls(player, ctx);
}


function keyboardSecondControls(player, ctx) {
  var cw = ctx.canvas.width;
  var ch = ctx.canvas.height;
  document.onkeydown = function(e){
    switch (e.keyCode) {
      case 32:
      /*space: player shoots*/
    //  if(bulletsArray.length == ) {
      if(maxBullets > 0 && settings.boogieAndBulletCheck){
        var bullet = player.shoot(ctx)
        totalArray.push(bullet);
        bulletsArray.push(bullet);
        maxBullets--;
      }
      break;
      case 80:
      if(!gameOver) {
        if(!gamePaused) {
          gamePaused = !gamePaused;
          document.getElementById("pause_div").textContent = "continue";
          if(soundsOn) {
            backgroundAudio.pause();
          }
        }
        else {
          gamePaused = !gamePaused;
          document.getElementById("pause_div").textContent = "pause";
          if(soundsOn) {
            backgroundAudio.play();
          }
        }
      }
      break;
      case 190:
      //alert('dot');
      break;
      case 188:
      //alert('comma');
      break;
    }
  };
}

function isPlaying(audio) { return !audio.paused; }

function removeFromArray(array, i) {
  var index = array.indexOf(i);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}



function generateEnemycar(ctx) {
  var random = getRandomInt(1,17);
  var normalCarLife = 100;
  var bigCarLife = 250;
  var enormousCarLife = 500;
  var iceTruckLife = 9999999;
  var carLife = 100;
  var size = 6;
  if(random < 13) {
    carLife = normalCarLife;
  }
  else if(random < 15) {
    carLife = bigCarLife;
  }
  else if(random < 17) {
    carLife = enormousCarLife;
    size = 4.5;
  }
  else if(random == 17) {
    carLife = iceTruckLife;
    size = 4.5;
  }
  var carImg = new Image();
  carImg.addEventListener("load", carImgLoadedHandler);
  carImg.src = "resources/car/car"+random+".png";
  function carImgLoadedHandler(ev) {
    var img = ev.target;
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    var actualWidth = Math.round(nw / size);
    var actualHeight = Math.round(nh / size);
    var random = Math.random();
    var positionX;
    if(random < 0.5) {
      positionX = getRandomInt(0 + actualWidth/2, ctx.canvas.width/2 - lineWidth/2 - actualWidth/2);
    }
    else {
      positionX = getRandomInt(ctx.canvas.width/2 + lineWidth/2,ctx.canvas.width - actualWidth/2);
    }
    var sp = new Car(positionX, -100, actualWidth, actualHeight, speed, false, img, carLife);
    carsArray.push(sp);
    collisionArray.push(sp);
    shootableArray.push(sp);
    totalArray.push(sp);
  }
}

function generateFuel(ctx) {
  var random = Math.random();
  var probToSmallFuel = 0.7;
  var type = 0;
  var size = 28;
  if(random < probToSmallFuel) {
    type = 1;
    size = 28;
  }
  else {
    type = 2;
    size = 25;
  }
  var fuelImg = new Image();
  fuelImg.addEventListener("load", fuelImgLoadedHandler);
  fuelImg.src = "resources/fuel/gasContainer"+type+".png";
  function fuelImgLoadedHandler(ev) {
    var img = ev.target;
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    var actualWidth = nw / size;
    var actualHeight = nh / size;
    var sp = new Fuel(getRandomInt(0+actualWidth/2,ctx.canvas.width-actualWidth/2), -100, actualWidth, actualHeight, speed*nTimesFasterThanSpeed, false, img, type);
    totalArray.push(sp);
    collisionArray.push(sp);
  }
}

function generateOil(ctx) {
  var oilImg = new Image();
  oilImg.addEventListener("load", oilImgLoadedHandler);
  oilImg.src = "resources/oil/oil.png";
  function oilImgLoadedHandler(ev) {
    var img = ev.target;
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    var actualWidth = nw / 6;
    var actualHeight = nh / 6;
    var sp = new Oil(getRandomInt(0+actualWidth/2,ctx.canvas.width-actualWidth/2), -100, actualWidth, actualHeight, speed, false, img);
    totalArray.push(sp);
    collisionArray.push(sp);
  }
}

function generateRoadblock(ctx) {
  var roadblockImg = new Image();
  roadblockImg.addEventListener("load", roadblockImgLoadedHandler);
  roadblockImg.src = "resources/road/roadblock"+getRandomInt(1,5)+".png";
  function roadblockImgLoadedHandler(ev) {
    var img = ev.target;
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    var sp = new Roadblock(0, -100, nw / 1.3, nh / 1.3, speed, false, img);
    totalArray.push(sp);
    collisionArray.push(sp);
  }
}
function generatePoliceCar(ctx) {
  var policeCarImg = new Image();
  policeCarImg.addEventListener("load", policeCarImgLoadedHandler);
  policeCarImg.src = "resources/car/police"+getRandomInt(1,4)+".png";
  function policeCarImgLoadedHandler(ev) {
    var img = ev.target;
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    var random = Math.random();
    var positionX;
    if(random < 0.5) {
      positionX = getRandomInt(0 + nw/6, ctx.canvas.width/2 - lineWidth/2 - nw/6);
    }
    else {
      positionX = getRandomInt(ctx.canvas.width/2 + lineWidth/2,ctx.canvas.width - nw/6);
    }
    var sp = new PoliceCar(positionX, -100, nw/6, nh/6, speed, false, img);
    totalArray.push(sp);
    collisionArray.push(sp);
    shootableArray.push(sp);
    carsArray.push(sp);
  }
}

function generateBoogie(ctx) {
  var random = Math.random();
  var type = 1;
  if(random < 0.4) {
    type = 1;
  }
  else if(random < 0.7) {
    type = 2;
  }
  else if(random < 0.8) {
    type = 3;
  }
  else if(random < .95) {
    type = 4;
  }
  else {
    type = 5;
  }
  var boogieImg = new Image();
  boogieImg.addEventListener("load", boogieImgLoadedHandler);
  boogieImg.src = "resources/boogies/boogie"+type+".png";
  function boogieImgLoadedHandler(ev) {
    var img = ev.target;
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    var actualWidth = nw / 30;
    var actualHeight = nh / 30;
    var sp = new Boogie(getRandomInt(0+actualWidth/2,ctx.canvas.width-actualWidth/2), -100, actualWidth, actualHeight, speed*nTimesFasterThanSpeed, false, img, type);
    totalArray.push(sp);
    collisionArray.push(sp);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
