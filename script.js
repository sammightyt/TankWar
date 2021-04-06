var canvas = document.getElementById("holder");
var ctx = canvas.getContext("2d");
var stage = "version 3.1"
var game = new Game();
var enemyX = game.tank.x;
var enemyY = game.tank.y;

function Tank(x, y, which) {
	this.x = x;
	this.y = y;
	this.bullets = [];
	this.tankimg = new Image();
	this.tankimg.src = 'https://art.pixilart.com/8e7d871b88dbc81.gif';
	this.tankimg2 = new Image();
	this.tankimg2.src = "tankIN.png"
	this.ammo = 15;
	this.health = 100;
	this.message = "You Died"
	this.which = which;

}

Tank.prototype.moveEnemy = function () {

  this.y = enemyY;

}

function Bullet(x, y) {
	this.x = x;
	this.y = y;
	this.damage = 5;
}

Tank.prototype.draw = function () {
	if (this.which == 1) {
		ctx.drawImage(this.tankimg, this.x, this.y, 60, 40);
	} else if (this.which == 2) {
		ctx.drawImage(this.tankimg2, this.x, this.y, 60, 40);
	}

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
	ctx.beginPath();
	ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI)
	ctx.fill();
}

Bullet.prototype.fire = function () {
	this.x += 5;
}

Tank.prototype.shoot = function () {
	if (this.ammo > 0) {
		this.ammo--
		this.bullets.push(new Bullet(this.x + 60, this.y + 21.5));
	} else {
		setTimeout(function () {
			this.ammo = 15;
		}.bind(this), 5000)
	}
}

Tank.prototype.touchingwall = function () {
	if (this.y <= -16.75) {
		this.y += 20;
		this.health -= 5;
		if (this.health == 5) {
			message = "Don't Run Into Walls";
		}
	}

	if (this.y >= 115) {
		this.y -= 20;
		this.health -= 5;
		if (this.health == 5) {
			message = "Don't Run Into Walls";
		}
	}

	if (this.x <= -16.75) {
		this.x += 20;
		this.health -= 5;
		if (this.health == 5) {
			message = "Don't Run Into Walls";
		}
	}

	if (this.x >= 245) {
		this.x -= 20;
		this.health -= 5;
		if (this.health == 5) {
			message = "Don't Run Into Walls";
		}
	}
}




function Game() {
	this.tank = new Tank(10, 10, 1);
	this.aI = new Tank(200, 50, 2)
	document.addEventListener("keydown", (e) => {
		var x = e.keyCode;
		if (x == 83 || x == 40) {
			this.tank.moveDown();
			this.tank.draw();
		} else if (x == 68 || x == 39) {
			this.tank.moveRight();
			this.tank.draw();
		} else if (x == 87 || x == 38) {
			this.tank.moveUp();
			this.tank.draw();
		} else if (x == 65 || x == 37) {
			this.tank.moveLeft();
			this.tank.draw();
		} else if (x == 32) {
			this.tank.shoot()
		}
	});
}

Game.prototype.run = function () {
	var interval = setInterval(function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = "black";
		this.tank.draw();
		this.tank.touchingwall();
		this.aI.draw();
		this.aI.touchingwall();
		ctx.font = "9px Comic Sans MS";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.fillText(`Ammo: ${this.tank.ammo}`, 275, 10);
		ctx.fillText(`Health: ${this.tank.health}`, 30, 10)
		for (var i = 0; i < this.tank.bullets.length; i++) {
			this.tank.bullets[i].draw();
			this.tank.bullets[i].fire();
			if (this.tank.bullets[i].x < 0 || this.tank.bullets[i].x > canvas.width) {
				this.tank.bullets.shift();
			}

		}

		if (this.tank.health <= 0) {
			setInterval(function () {
				ctx.beginPath()
				ctx.font = "20px Comic Sans MS";
				ctx.fillStyle = "red";
				ctx.textAlign = "center";
				ctx.fillText(`${message}`, canvas.width / 2, canvas.height / 2);
			})
			clearInterval(interval)
		}

    enemyX = game.tank.x;

		window.setInterval(function(){
			this.aI.moveEnemy();
		}.bind(this), 5000);
	


    enemyY = game.tank.y;
	}.bind(this), 100)
}



ctx.font = "20px Comic Sans MS";
ctx.fillStyle = "green";
ctx.textAlign = "center";
ctx.fillText(`Shut Up Samhith ${stage}`, canvas.width / 2, canvas.height / 2);
ctx.fillStyle = "red";
ctx.font = "10px Permanent Marker";
ctx.fillText("Click to begin!", (canvas.width / 2) + 5, (canvas.height / 2) + 20)

addEventListener("click", function () {
	game.run();
});