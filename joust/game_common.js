var world = {
	width: 292 * 4,
	height: 240 * 2.5,
	minWidth: 292 * 4,
	minHeight: 240 * 2.5,
	idealPixelsPerPlayer: 50000,
	idealPixelsPerPlatform: 20000,

	interval: 30,
	players: [],
	platform: [],
	spawnPoints : [],
	roundEndTime: new Date(),
	roundDurationMinutes: 5,
	pauseDurationMinutes: 1/6,
	spawnWidth:28,
	running:false,
	teams:[
		{id:"red", name:"Team Buzzard", score:0},
		{id:"ylo", name:"Team Ostrich", score:0},
		{id:"blu", name:"Team Heron", score:0},
	],

	platformTypes: [
		{id:"platform_0", width:186, height:36, spawnX:72},
		{id:"platform_1", width:88, height:9, spawnX:26},
		{id:"platform_2", width:58, height:11, spawnX:28},
		{id:"platform_3", width:102, height:8, spawnX:58},
		{id:"platform_4", width:64, height:8, spawnX:-1},
		{id:"platform_5", width:75, height:7, spawnX:-1},
		{id:"platform_6", width:106, height:36, spawnX:-1},
	],
	
	setClassicMode: function()
	{
		world.width = 292;
		world.height = 240;
		world.spawnPoints = [{x:106,y:53},{x:224,y:101},{x:16,y:110},{x:120,y:183}];
		world.platform = [
			{index:5, x:-46, y:62},
			{index:3, x:-42, y:131},
			{index:1, x:80, y:74},
			{index:4, x:100, y:156},
			{index:5, x:246, y:62}, // left half of 5, on right edge
			{index:2, x:196, y:122},
			{index:3, x:250, y:131}, // left half of 3, on right edge
			{index:0, x:48, y:204},	// scoreboard platform
			{index:6, x:-58, y:204},
			{index:6, x:234, y:204},
		]
		world.addPlatformBounds();
	},
	addPlatformBounds: function()
	{
		world.platform.forEach(p=>{
			var type = world.platformTypes[p.index];
			p.x1 = p.x;
			p.x2 = p.x + type.width;
			p.y1 = p.y;
			p.y2 = p.y + type.height;
		})
	},


	generate: function()
	{
		world.platform = [];
		for (var b=-58; b<world.width; b += 292)
		{
			world.platform.push({index:6, x:b, y:world.height - 36})
			world.platform.push({index:0, x:b + 106, y:world.height - 36})
		}

		var platformCount = Math.floor(world.width * world.height / world.idealPixelsPerPlatform);
		console.log("generating platforms", platformCount)
		for (var i=0; i<platformCount; i++)
		{

			// Try a bunch of times to find a pad we can fit onto the map.
			var tries = 10;
			do {
				var platform = {
					index: Math.floor(Math.random() * 5) + 1,
					x: Math.floor(Math.random() * (world.width - 32)) + 32,
					y: Math.floor(Math.random() * (world.height - 120)) + 50
				}
			} while(Platform.checkSpawnBlock(platform, world.platform) && --tries > 0)

			if (tries > 0)
			{
				world.platform.push(platform)

				if (platform.x > world.width - 32)
				{
					world.platform.push({index:platform.index,x:platform.x-world.width,y:platform.y})

				}
			}
		}

		const spawnablePlatforms = world.platform.filter(p => world.platformTypes[p.index].spawnX > -1);
		world.spawnPoints = spawnablePlatforms.map(p => {return {x:p.x + world.platformTypes[p.index].spawnX, y:p.y - world.joustguys.height-1}});

		world.addPlatformBounds();
	},

	serialize: function()
	{
		// this can also be done with a very ugly destructuring thing in es6. I won't understand it in 5 years, so doing this for maintenance considerations:
		var obj = {
			width: world.width,
			height: world.height,
			spawnPoints: world.spawnPoints,
			platform: world.platform
		};

		return  obj;
	},
	deserialize: function(obj)
	{
		world.width = obj.width,
		world.height = obj.height,
		world.spawnPoints = obj.spawnPoints,
		world.platform = obj.platform
	}

}

function JoustGuy(obj, id, origx, origy) {
	this.obj = obj;
	this.handle = obj
	this.id = id
	this.active = true;
	this.x = origx
	this.y = origy
	this.vx = 0
	this.vy = 0
	this.ax = 0;
	this.facingRight = true;
	this.flapdown = false;
	this.grounded = false;
	this.dead = false;
	this.revivable = false;
	this.walkframe = 0;
	this.fragcount = 0;
	this.score = 0;
	this.styleIndex = 0;
	this.team = "red";

	if (this.updateTeam)
	{
		this.updateTeam()
	}

}

JoustGuy.prototype.move = function () {

	// if rider is dead, move off the screen asap
	if (this.dead) {
		if (this.facingRight) this.ax = world.joustguys.xAccel;
		else this.ax = -world.joustguys.xAccel;
		this.flapdown = false;
		if (Math.random() < 0.1) this.KeyDown_FLAP();

		if (--this.reviveTimer < 0)
		{
			this.revivable = true;
		}
	}

	this.vy += world.joustguys.gravity;
	if (this.vy > this.dropSpeed)
		this.vy = this.dropspeed;

	this.vx += this.ax;
	if (this.vx > world.joustguys.xSpeed && !this.dead) this.vx = world.joustguys.xSpeed;
	if (this.vx < -world.joustguys.xSpeed && !this.dead) this.vx = -world.joustguys.xSpeed;
	if (this.vx > world.joustguys.xSpeed * 3) this.vx = world.joustguys.xSpeed * 3;
	if (this.vx < -world.joustguys.xSpeed * 3) this.vx = -world.joustguys.xSpeed * 3;
	this.x += this.vx;
	this.y += this.vy;

	// Check Bounds
	if (this.x > (world.width - 16)) {
		this.x -= (world.width - 16);
		// bring back to life if dead
		if (this.dead) {
			this.revivable = true;
		}
	}
	if (this.x < 0) {
		this.x += (world.width - 16);
		if (this.dead) {
			this.revivable = true;
		}
	}
	if (this.y > world.height) {
		this.y = world.height;
		this.vy = 0;
	}
	if (this.y < 0) {
		this.vy *= -0.5;
		this.y = 0;
	}

	// Check Collisions	
	for (a = 0; a < world.platform.length; a++) {
		if (this.x + world.joustguys.width > world.platform[a].x1
			&& this.x < world.platform[a].x2
			&& this.y + world.joustguys.height > world.platform[a].y1
			&& this.y < world.platform[a].y2) {

			// Landed?
			if (this.vy > 0 && (this.y - this.vy + world.joustguys.height) < world.platform[a].y1) {
				this.y = world.platform[a].y1 - world.joustguys.height - 0.1;	// they get stuck if they are exactly on the world.platform, so nudge them up a bit
				this.grounded = true;
				this.vy = 0;
				continue;
			}

			// Hit left edge?
			if (this.x < world.platform[a].x1
				&& this.y + world.joustguys.height > world.platform[a].y1
				&& this.y < world.platform[a].y2
				&& (this.y - this.vy) < world.platform[a].y2
			) {
				this.x -= this.vx
				this.vx = -this.vx / 2
				this.grounded = false;
			}

			// Hit right edge?
			else if (this.x + world.joustguys.width > world.platform[a].x2
				&& this.y + world.joustguys.height > world.platform[a].y1
				&& this.y < world.platform[a].y2
				&& (this.y - this.vy) < world.platform[a].y2
			) {
				this.x -= this.vx
				this.vx = -this.vx / 2
				this.grounded = false;
			}
			else // hit bottom.
			{
				this.y -= this.vy;
				this.vy = -this.vy / 2;
			}

			if (world.onBump)
			{
				world.onBump(this);
			}

		}
		else {
			if (this.vy > 0.75) {
				this.grounded = false;
			}
		}
	}




}

JoustGuy.prototype.isOver = function(that) {
	if (this.x + world.joustguys.width - world.joustguys.collisionpad > that.x + world.joustguys.collisionpad
		&& this.x + world.joustguys.collisionpad < that.x + world.joustguys.width - world.joustguys.collisionpad
		&& this.y + world.joustguys.bodyheight - world.joustguys.collisionpad > that.y + world.joustguys.collisionpad
		&& this.y < that.y + world.joustguys.bodyheight
		&& !this.dead
		&& !that.dead
	) {
		return true;
	}
	return false;
}

JoustGuy.prototype.check = function (that) {
	if (!world.running)
	{
		return;
	}

	// Check Player Collisions	
	if (this.isOver(that)) {
		if (this.team === that.team)
		{
			// for now, ignore your own team
			return false;
		}
		else if (this.y < that.y - world.joustguys.height / 4) {
			this.kill(that);
			this.bump();
		}
		else if (this.y > that.y + world.joustguys.height / 4) {
			that.kill(this);
			that.bump();
		}
		else {
			// bumped
			this.bump(true);
			that.bump();
			if (world.onRepel)
			{
				world.onRepel(this,that);
			}

		}

		return true;
	}
	return false;
}

JoustGuy.prototype.bump = function () {
	this.x -= this.vx;
	this.vx = -this.vx;
	this.y -= this.vy/2;
	this.vy= -this.vy/2;

}

JoustGuy.prototype.kill = function(that)
{
	that.dead = true;
	that.reviveTimer = 150;
	this.fragcount++;
	this.score++;

	var team = world.teams.find(t => t.id === this.team);
	team.score++;

	if (that.x < this.x) that.facingRight = false;
	else that.facingRight = true;
	this.x -= this.vx
	this.vx = -this.vx	

	if (world.onKill)
	{
		world.onKill(this,that);
	}
}



JoustGuy.prototype.KeyDown_FLAP = function () {
	if (!this.flapdown) {
		this.vy += world.joustguys.ySpeed;
		if (this.vy < world.joustguys.ySpeed * 4) {
			this.vy = world.joustguys.ySpeed * 4
		}
		this.grounded = false;

		if (world.onFlap)
		{
			world.onFlap(this);
		}
	}
	this.flapdown = true;
}

JoustGuy.prototype.KeyDown_LEFT = function () {
	this.ax = -world.joustguys.xAccel;
	this.facingRight = false;
}

JoustGuy.prototype.KeyDown_RIGHT = function () {
	this.ax = +world.joustguys.xAccel;
	this.facingRight = true;
}

JoustGuy.prototype.KeyDown_STOP = function () {
	if (Math.abs(this.vx) <= world.joustguys.xAccel * 4) {
		this.vx = 0;
	}
}

JoustGuy.prototype.KeyUp_FLAP = function () {
	this.flapdown = false;
}

JoustGuy.prototype.KeyUp_LEFT = function () {
	this.ax = 0;
}

JoustGuy.prototype.KeyUp_RIGHT = function () {
	this.ax = 0;
}


JoustGuy.prototype.handleKeyDown = function (keyCode) {
	switch (keyCode) {
		case 37:
		case 65:
			this.KeyDown_LEFT();
			break;
		case 39:
		case 68:
			this.KeyDown_RIGHT();
			break;
		case 38:
		case 87:
		case 32:
			this.KeyDown_FLAP();
			break;
		case 40:
		case 83:
			this.KeyDown_STOP();
			break;
	}
}


JoustGuy.prototype.handleKeyUp = function (keyCode) {
	switch (keyCode) {
		case 37:
		case 65:
			this.KeyUp_LEFT();
			break;
		case 39:
		case 68:
			this.KeyUp_RIGHT();
			break;
		case 38:
		case 87:
		case 32:
			this.KeyUp_FLAP();
			break;
		// case 40:
		// case 83:
		// 	this.KeyUp_STOP();
		// 	break;

	}
}

JoustGuy.prototype.findSpawnPoint = function()
{
	if (world.spawnPoints.length > 0)
	{
		for (var tries = 0; tries<10; tries++)
		{
			var a = Math.floor(Math.random() * world.spawnPoints.length);
			var spawn = world.spawnPoints[a];
			if (!world.players.find(p=>p.isOver(spawn)))
			{
				this.x = spawn.x;
				this.y = spawn.y;
				return;
			}
		}
	}

	this.x = Math.floor(Math.random() * (world.width - world.joustguys.width));
	this.y = 0;
}
JoustGuy.prototype.revive = function () {

	this.findSpawnPoint();
	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.dead = false;
	this.revivable = false;

	if (world.onSpawn)
	{
		world.onSpawn(this);
	}
};

JoustGuy.prototype.serialize = function () {
	return [this.id, 
		parseFloat((this.x).toFixed(2)),
		parseFloat((this.y).toFixed(2)),
		parseFloat((this.vx).toFixed(2)), 
		parseFloat((this.vy).toFixed(2)), 
		this.ax, 
		this.facingRight ? 1 : 0, 
		this.flapdown ? 1 : 0, 
		this.grounded ? 1 : 0, 
		this.dead ? 1 : 0, 
		this.styleIndex];
}

JoustGuy.prototype.deserialize = function (obj) {
	this.id = obj[0];
	this.x = obj[1];
	this.y = obj[2];
	this.vx = obj[3];
	this.vy = obj[4];
	this.ax = obj[5];
	this.facingRight = obj[6] === 1;
	this.flapdown = obj[7] === 1;
	this.grounded = obj[8] === 1;
	this.dead = obj[9] === 1;
	this.styleIndex = obj[10];
}




function JoustGuys(obj) {
	this.count = 10;
	this.xAccel = 0.625 / 2.5;
	this.xSpeed = 2.5; //1.5;
	this.ySpeed = -1.5;
	this.dropSpeed = 1;
	this.gravity = 0.15;
	this.height = 20;
	this.bodyheight = 13;
	this.width = 16;
	this.collisionpad = 2;
}
world.joustguys = new JoustGuys();

function Platform(obj, x1, y1, x2, y2) {
	this.obj = obj;
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
}

Platform.checkSpawnBlockSingle = function(testPlatform, p)
{
	const testType = world.platformTypes[testPlatform.index];
	const type = world.platformTypes[p.index];
	if (type.spawnX > -1)
	{
		if (testPlatform.y < p.y					// above
			&& testPlatform.y > p.y - 60			// not far above
			&& testPlatform.x < p.x + type.spawnX - 6 + world.spawnWidth	// platform left edge left of pad's right edge
			&& testPlatform.x + type.width > p.x + type.spawnX - 6 	// platform right edge right of pad's left edge
			)
			{
				return true;
			}
	}
}

Platform.checkSpawnBlock = function(testPlatform, platforms)
{
	const testType = world.platformTypes[testPlatform.index];
	
	for (p of platforms)
	{
		if (Platform.checkSpawnBlockSingle(testPlatform, p) || Platform.checkSpawnBlockSingle(p, testPlatform))
		{
			return true;
		}

	}

	return false;
}



if (typeof (global) == 'undefined') {
	// just in case we need to use Node's global instead of window.
	window.global = window;
}

// handhold node.
global.world = world;
global.JoustGuy = JoustGuy;
global.Platform = Platform;

