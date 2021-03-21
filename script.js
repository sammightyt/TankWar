var canvas = document.getElementById("holder");
var ctx = canvas.getContext("2d");

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
	ctx.clearRect(0,0,canvas.width,canvas.height)
	ctx.drawImage(tank,this.x,this.y,60,40)
}

 Tank.prototype.moveDown = function () {
   this.y += .5;
 }

 Tank.prototype.moveRight = function () {
   this.x += .5;
 }

 Tank.prototype.moveLeft = function () {
   this.x -= .5;
 }
 Tank.prototype.moveUp = function () {
	 this.y -= .5;
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

 

function Game(){
	this.tank = new Tank(10,10) 
}

Game.prototype.run = function () {
	this.interval = setInterval(function(){
		ctx.clearRect(0,0,canvas.width,canvas.height)
		this.tank.draw();
		document.addEventListener("keydown",(e) => {
		var x = e.keyCode;
		if(x == 40){
			this.tank.moveDown();
			this.tank.draw();
		}else if(x == 39){
     this.tank.moveRight();
		 this.tank.draw();
		}else if(x == 38){
			this.tank.moveUp();
			this.tank.draw();
		}else if(x == 37){
			this.tank.moveLeft();
			this.tank.draw();
		}else if(x == 32) {
      this.tank.shoot()
		}

		
	
	  
	})
	
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





































