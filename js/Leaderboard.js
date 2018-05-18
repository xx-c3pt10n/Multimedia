"use strict";
var leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
if(leaderboard === null) {
  leaderboard = [];
}

(function() {
  window.addEventListener("load", main);
}());

function main(){
  tableCreate();
}




function quickSort(origArray) {
	if (origArray.length <= 1) {
		return origArray;
	} else {

		var left = [];
		var right = [];
		var newArray = [];
		var pivot = origArray.pop();
		var length = origArray.length;

		for (var i = 0; i < length; i++) {
			if (origArray[i] > pivot) {
				left.push(origArray[i]);
			} else {
				right.push(origArray[i]);
			}
		}

		return newArray.concat(quickSort(left), pivot, quickSort(right));
	}
}

function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

function tableCreate(){
    var div = document.getElementById("tableLeaderboard");
    var array = quickSort(removeDuplicates(leaderboard));
    for(var i = 0; i < array.length; i++){
      if(i==0) {
        var div1 = document.createElement("div");
        var img = document.createElement("img");
        img.src = "resources/trophies/trophie1.png";
        img.setAttribute('width', '60px');
        img.setAttribute('height', '60px');
        div1.appendChild(img);
        div1.appendChild(document.createTextNode(array[i]));
        div.appendChild(div1);
      }
      else if(i==1) {
        var div1 = document.createElement("div");
        var img = document.createElement("img");
        img.src = "resources/trophies/trophie2.png";
        img.setAttribute('width', '60px');
        img.setAttribute('height', '60px');
        div1.appendChild(img);
        div1.appendChild(document.createTextNode(array[i]));
        div.appendChild(div1);
      }
      else if(i==2) {
        var div1 = document.createElement("div");
        var img = document.createElement("img");
        img.src = "resources/trophies/trophie3.png";
        img.setAttribute('width', '60px');
        img.setAttribute('height', '60px');
        div1.appendChild(img);
        div1.appendChild(document.createTextNode(array[i]));
        div.appendChild(div1);
      }
      else {
        var div1 = document.createElement("div");
        var img = document.createElement("img");
        img.src = "resources/trophies/trophieOthers.png";
        img.setAttribute('width', '30px');
        img.setAttribute('height', '40px');
        div1.appendChild(img);
        div1.appendChild(document.createTextNode(array[i]));
        div.appendChild(div1);
      }
    }
}
