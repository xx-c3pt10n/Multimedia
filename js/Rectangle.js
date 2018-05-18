
"use strict";

class Shape
{
	constructor(x, y) //define coordenadas da forma
	{
		this.x = x;
		this.y = y;
	}

	toString()
	{
		return "(" + this.x + ", " + this.y + ")";
	}
}

class Rectangle extends Shape {
	constructor(x,y,width,height) {
		super(x,y);
		this.width = width;
		this.height = height;
	}
	drawRectangle() {
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
	}
}
