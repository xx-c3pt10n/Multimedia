"use strict";

(function() {
  window.addEventListener("load", main);
}());

function main(){
  var numBoogie = 1;
  var numBullet = 1;
  var numFuel = 1;
  var numCar = 1;
  var numPoliceCar = 1;
  var numRoadblock = 1;
  var boogieTextArray = ["The black and white boogie, the least powerful of them all at giving points", "The green boogie, a little bether than the white one", "The blue boogie, a boogie that gives the player already a good ammount of points", "The purple boogie, better than the blue one and almost as better as the orange one", "The orange boogie, the most powerful of them all"];
  var bulletTextArray = ["Pistol bullet, not very powerful but many can be fired in a short ammount of time and it has short range", "Medium bullet, medium range and takes good damage", "Heavy bullet, very powerful bullet with large range", "Rockets, take a generous ammount damage and long range"];
  var fuelTextArray = ["Red fuel supply (25 fuel), essential for the car to survive and not run out of fuel","Green fuel supply, gets the player more fuel than the normal red supply, it gives 50 fuel to the player"];
  var carTextArray = ["Normal car, has 100 health, appears often", "Truck has 250 health, appears less frequently", "Bus, these cars are the most powerful one with finite health, at 500 health", "Ambulance with infinite life, appears rarely "];
  document.getElementById("boogieImg").addEventListener("click", function() {
    if(numBoogie < 5) {
      numBoogie++;
      document.getElementById("boogieImg").src="resources/boogies/boogie"+numBoogie+".png";
      document.getElementById("boogieText").textContent =boogieTextArray[numBoogie-1];
    }
    else if(numBoogie == 5) {
      numBoogie=1;
      document.getElementById("boogieImg").src="resources/boogies/boogie"+numBoogie+".png";
      document.getElementById("boogieText").textContent =boogieTextArray[numBoogie-1];
    }
  });
  document.getElementById("bulletImg").addEventListener("click", function() {
    if(numBullet < 4) {
      numBullet++;
      document.getElementById("bulletImg").src="resources/bullets/bullet"+numBullet+".png";
      document.getElementById("bulletText").textContent =bulletTextArray[numBullet-1];
    }
    else if(numBullet == 4) {
      numBullet=1;
      document.getElementById("bulletImg").src="resources/bullets/bullet"+numBullet+".png";
      document.getElementById("bulletText").textContent =bulletTextArray[numBullet-1];
    }
  });
  document.getElementById("gasContainerImg").addEventListener("click", function() {
    if(numFuel < 2) {
      numFuel++;
      document.getElementById("gasContainerImg").src="resources/fuel/gasContainer"+numFuel+".png";
      document.getElementById("gasContainerText").textContent =fuelTextArray[numFuel-1];
    }
    else if(numFuel == 2) {
      numBullet=1;
      document.getElementById("gasContainerImg").src="resources/fuel/gasContainer"+numFuel+".png";
      document.getElementById("gasContainerText").textContent =fuelTextArray[numFuel-1];
    }
  });
  document.getElementById("carImg").addEventListener("click", function() {
    if(numCar < 4) {
      numCar++;
      document.getElementById("carImg").src="resources/car/carCopy"+numCar+".png";
      document.getElementById("carText").textContent =carTextArray[numCar-1];
    }
    else if(numCar == 4) {
      numCar=1;
      document.getElementById("carImg").src="resources/car/carCopy"+numCar+".png";
      document.getElementById("carText").textContent =carTextArray[numCar-1];
    }
  });
  document.getElementById("policeCarImg").addEventListener("click", function() {
    if(numPoliceCar < 4) {
      numPoliceCar++;
      document.getElementById("policeCarImg").src="resources/car/police"+numPoliceCar+".png";
    }
    else if(numPoliceCar == 4) {
      numPoliceCar=1;
      document.getElementById("policeCarImg").src="resources/car/police"+numPoliceCar+".png";
    }
  });
  document.getElementById("roadblockImg").addEventListener("click", function() {
    if(numRoadblock < 5) {
      numRoadblock++;
      document.getElementById("roadblockImg").src="resources/road/roadblock"+numRoadblock+".png";
    }
    else if(numRoadblock == 5) {
      numRoadblock=1;
      document.getElementById("roadblockImg").src="resources/road/roadblock"+numRoadblock+".png";
    }
  });
}
