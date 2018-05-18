"use strict";

class SpriteImage
{
	constructor(x, y, w, h, speed, clickable, img)
	{
		//posição e movimento
		this.xIni = x;
		this.yIni = y;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.speed = speed;

		//imagem
		this.img = img;
		//this.img.style.zIndex = "1";
		this.bitmap = this.getImageData(x,y,w,h,img);

		//rato
		this.clickableIni = clickable;
		this.clickable = clickable;
	}


	draw(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}


	clear(ctx)
	{
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}


	reset(ev, ctx)
	{
		this.clear(ctx);
		this.x = this.xIni;
		this.y = this.yIni;
		this.clickable = this.clickableIni;
	}

	mouseOverBoundingBox(ev) //ev.target é a canvas
	{
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;
		if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height){
			var xImg = Math.floor(mx - this.x);
			var yImg = Math.floor(my - this.y);
			if(this.bitmap.data[(yImg*this.width+xImg)*4+3] == 0){
				return false;
			}
			return true;
			}
		else
			return false;
}


	clickedBoundingBox(ev) //ev.target é a canvas
	{
		if (!this.clickable)
			return false;
		else
			return this.mouseOverBoundingBox(ev);
	}
	getImageData(xx,yy,width,height,img) {
		var canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;

		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, this.width, this.height);
		/*alterado porque deu erro IndexSizeError: Index or size is negative or greater than the allowed amount*/
		var width = Math.max(1, Math.round(this.width));
		var height = Math.max(1, Math.round(this.height));
		return ctx.getImageData(0,0,width,height);
	}

	check(other, intersectRect) {
			for(let i = intersectRect.x; i < intersectRect.x + intersectRect.width; i++) {
				for(let j = intersectRect.y; j < intersectRect.y+ intersectRect.height; j++) {
					if(this.bitmap.data[Math.round((i-this.x+(j-this.y)*this.width)*4+3)] > 0 && other.bitmap.data[Math.round((i-other.x+(j-other.y)*other.width)*4+3)] > 0)
						return true;
				}
			}
			return false;
		}

	checkCollisionRect(other) {
		var rect1 = new Rectangle(this.x, this.y, this.width, this.height);
		var rect2 = new Rectangle(other.x, other.y, other.width, other.height);
		if (rect1.x < rect2.x + rect2.width &&
	   rect1.x + rect1.width > rect2.x &&
	   rect1.y < rect2.y + rect2.height &&
	   rect1.height + rect1.y > rect2.y) {
	    return true;
		}
		else {
			return false;
		}
	}

	intersect(other){
		var a = new Rectangle(this.x, this.y, this.width, this.height);
		var b = new Rectangle(other.x, other.y, other.width, other.height);
	  var x = Math.max(a.x, b.x);
	  var num1 = Math.min(a.x + a.width, b.x + b.width);
	  var y = Math.max(a.y, b.y);
	  var num2 = Math.min(a.y + a.height, b.y + b.height);
	  if (num1 >= x && num2 >= y)
	    return new Rectangle(x, y, num1 - x, num2 - y);
	  else
	    return null;
	}
	relocate(ctx) {
		this.clear(ctx);
		if(this.y < 800) {
			this.y = this.y + 2;
		}
		else {
			this.y = -100;
		}
		draw(ctx);
	}

	action(ctx, player) {

	}

	checkSpriteInCanvas() {
		return true;
	}

	class() {
		console.log("spriteimage");
	}
}
