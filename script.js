var canvas = document.getElementById("holder");
var ctx = canvas.getContext("2d");

console.log(screen.height,screen.width)


function Tank(x,y){
	this.x = x;
	this.y = y;
	this.bullets = [];
}

function Bullet(x,y){
 this.x = x;
 this.y = y;
}

Tank.prototype.draw = function () {
	var tank = new Image();
	tank.src = 'https://art.pixilart.com/8e7d871b88dbc81.gif'; 
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(tank,this.x,this.y,60,40);
}

 Tank.prototype.moveDown = function () {
   this.y += 2;
 }

 Tank.prototype.moveRight = function () {
   this.x += 2;
 }

 Tank.prototype.moveLeft = function () {
   this.x -= 2;
 }
 Tank.prototype.moveUp = function () {
	 this.y -= 2;
 }



 Bullet.prototype.draw = function () {
	 ctx.arc(this.x,this.y,2,0,2 * Math.PI)
	 ctx.fill();
 }

 Bullet.prototype.fire = function() {
	 this.x += 5;
 }

 Tank.prototype.shoot = function () {
	 this.bullets.push(new Bullet(this.x + 60, this.y + 21.5));
 }

 Tank.prototype.touchingwall = function () {
	 if(this.y <= -16.75){
		 this.y += 20;
	 }

	 if(this.y >= 115){
		 this.y -= 20;
	 }

	 if(this.x <= -16.75){
		 this.x += 20;
	 }

	 if(this.x >= 245) {
		 this.x -= 20;
	 }

	 this.tank.draw()
 }

function Game(){
	this.tank = new Tank(10,10);
	document.addEventListener("keydown",(e) => {
		var x = e.keyCode;
		if(x == 83 || x == 40){
			this.tank.moveDown();
			this.tank.draw();
		}else if(x == 68 || x == 39){
     this.tank.moveRight();
		 this.tank.draw();
		}else if(x == 87 || x == 38){
			this.tank.moveUp();
			this.tank.draw();
		}else if(x == 65 || x == 37){
			this.tank.moveLeft();
			this.tank.draw();
		}else if(x == 32) {
      this.tank.shoot()
		} 
	});
}

Game.prototype.run = function () {
	this.interval = setInterval(function(){
		ctx.clearRect(0,0,canvas.width,canvas.height)
		this.tank.draw();
		this.tank.touchingwall()
    for (var i = 0; i < this.tank.bullets.length; i++) {
			this.tank.bullets[i].draw();
      this.tank.bullets[i].fire();
    }
	
	if(this.tank.bullets[0].x < -60) {
      this.tank.bullets.shift();  
    }

		

	}.bind(this),100)
}

var game = new Game();

game.run();