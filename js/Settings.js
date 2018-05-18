"use strict";
var settings = JSON.parse(localStorage.getItem('settings'));;

(function() {
  window.addEventListener("load", main);
}());

function main(){
  if(settings) {
    document.getElementById("carCheck").checked = settings.carCheck;
    document.getElementById("fuelCheck").checked = settings.fuelCheck;
    document.getElementById("policeCarCheck").checked = settings.policeCarCheck;
    document.getElementById("boogieAndBulletCheck").checked = settings.boogieCheck;
    document.getElementById("roadblockCheck").checked = settings.roadblockCheck;
    document.getElementById("oilCheck").checked = settings.oilCheck;
    document.getElementById("soundCheck").checked = settings.soundCheck;
    document.getElementById("musicCheck").checked = settings.musicCheck;
    document.getElementById('carRate').value = settings.carRate || 1;
    document.getElementById('fuelRate').value = settings.fuelRate || 1;
    document.getElementById('policeCarRate').value = settings.policeCarRate || 1;
    document.getElementById('boogieRate').value = settings.boogieRate || 1;
    document.getElementById('roadblockRate').value = settings.roadblockRate || 1;
    document.getElementById('oilRate').value = settings.oilRate || 1;
    document.getElementById('bulletLimit').value = settings.bulletLimit || 4;
    document.getElementById('difficultyRate').value = settings.difficultyRate || 150;
    document.getElementById('speedID').value = settings.speedID || 2;
    document.getElementById('secondsToStartID').value = settings.secondsToStartID || 1;
  }
  document.getElementById("submitID").addEventListener("click", function() {
    var carCheck = document.getElementById("carCheck").checked;
    var fuelCheck = document.getElementById("fuelCheck").checked;
    var policeCarCheck = document.getElementById("policeCarCheck").checked;
    var boogieAndBulletCheck = document.getElementById("boogieAndBulletCheck").checked;
    var roadblockCheck = document.getElementById("roadblockCheck").checked;
    var oilCheck = document.getElementById("oilCheck").checked;
    var soundCheck = document.getElementById("soundCheck").checked;
    var musicCheck = document.getElementById("musicCheck").checked;
    var carRate = document.getElementById('carRate').value;
    var fuelRate = document.getElementById('fuelRate').value;
    var policeCarRate = document.getElementById('policeCarRate').value;
    var boogieRate = document.getElementById('boogieRate').value;
    var roadblockRate = document.getElementById('roadblockRate').value;
    var oilRate = document.getElementById('oilRate').value;
    var bulletLimit = document.getElementById('bulletLimit').value;
    var difficultyRate = document.getElementById('difficultyRate').value;
    var speedID = document.getElementById('speedID').value;
    var secondsToStartID = document.getElementById('secondsToStartID').value;
    settings = {carCheck:carCheck,fuelCheck:fuelCheck,policeCarCheck:policeCarCheck,boogieAndBulletCheck:boogieAndBulletCheck,roadblockCheck:roadblockCheck,oilCheck:oilCheck,soundCheck:soundCheck,musicCheck:musicCheck,carRate:carRate,fuelRate:fuelRate,policeCarRate:policeCarRate,boogieRate:boogieRate,oilRate:oilRate,bulletLimit:bulletLimit,difficultyRate:difficultyRate,speedID:speedID,secondsToStartID:secondsToStartID};
    localStorage.setItem("settings", JSON.stringify(settings));
    location.href = "Main.html";
  });
}
