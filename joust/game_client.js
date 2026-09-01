var sprites = [];
var view = {
	scale: 3,
	width: window.innerWidth, //292 * 3,
	height: window.innerHeight, //240 * 3,
	muted:false,
	playerStates:["rest","glide","flap","walk1","walk2","walk3","walk4","glide_norider","flap_norider"],
	playerFacings:["left","right"],

	preload:function(id, imgSrc) {
		imgSrc = `images/${id}.gif`
		sprites[id] = new Image();
		sprites[id].src = imgSrc;
	},
	
	changeImage:function(img, imgObj) {
		img.src = sprites[imgObj].src;
	},

	preloadSprites:function()
	{
		world.teams.forEach(t => {
			view.playerFacings.forEach(f => {
				view.playerStates.forEach(s => {
					const key = `${t.id}_${f}_${s}`;
					view.preload(key);
				})
			})
		})

		for (var i=0; i<world.platformTypes.length; i++)
		{
			view.preload(`platform_${i}`);
		}
	},
	showAlert:function(msg, duration=1000)
	{
		var div = document.createElement("DIV");
		div.className = "alert";
		div.innerHTML = msg;
		document.body.appendChild(div);

		setTimeout(()=>{
			document.body.removeChild(div);
		}, duration)

	}
}


view.preloadSprites();

var clips = {};
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

var loadClip = function(key)
{
	var source = audioContext.createBufferSource();
	var request = new XMLHttpRequest();
	request.open("get", `sound/${key}.mp3`, true);
	request.responseType = "arraybuffer";
	request.onload = function()
	{
		var data = request.response;
		audioContext.decodeAudioData(data, function(buffer){
			clips[key] = buffer;

		}, function(e)
		{
			console.log("decode error", key, e)
		});
	}
	request.send();
	clips[key] = source;
}

var playClip = function(key, volume)
{
	const maxVolume = 0.2;
	volume = volume || 1;
	if (view.muted)
	{
		return;
	}

	if (clips[key] && (clips[key] instanceof AudioBuffer))
	{
		try {
			var source = audioContext.createBufferSource();
			var gain = audioContext.createGain();
			gain.gain.value = volume * maxVolume;
			source.buffer = clips[key];
			source.connect(gain);
			gain.connect(audioContext.destination);
			
			source.start(0);
		} catch(e) {}
	}

}

var initAudio = function()
{
	var clipNames = ["bump","die","flap","repel","spawn","spawn_other","spawn_short","start","walk1","walk2"];
	clipNames.forEach(c => loadClip(c));


}

global.JoustGuy.prototype.clientInit = function () {
    // todo: color pick
}

global.JoustGuy.prototype.render = function () {

	this.obj.style.left = (this.x * view.scale) + "px";
	this.obj.style.top = (this.y * view.scale) + "px";


    if (this.grounded) {
        if (this.vx == 0) {
            if (this.facingRight) view.changeImage(this.img, this.image_right_rest);
            else view.changeImage(this.img, this.image_left_rest);
        }
        else {
            if (this.dead) {
                if (this.facingRight) view.changeImage(this.img, this.image_right_flap_norider);
                else view.changeImage(this.img, this.image_left_flap_norider);

            }
            else {
                pixels_per_step = 1.25;
                this.walkframe = (this.x / pixels_per_step) % 4;
                wf = Math.floor(this.walkframe);
                if (this.facingRight) view.changeImage(this.img, this["image_right_walk" + (wf+1)]);
                else view.changeImage(this.img, this["image_left_walk" + (wf+1)]);
            }

        }
    }
    else if (this.flapdown) {
        if (this.dead) {
            if (this.facingRight) view.changeImage(this.img, this.image_right_flap_norider);
            else view.changeImage(this.img, this.image_left_flap_norider);
        }
        else {
            if (this.facingRight) view.changeImage(this.img, this.image_right_flap);
            else view.changeImage(this.img, this.image_left_flap);
        }
    }
    else {
        if (this.dead) {
            if (this.facingRight) view.changeImage(this.img, this.image_right_glide_norider);
            else view.changeImage(this.img, this.image_left_glide_norider);
        }
        else {
            if (this.facingRight) view.changeImage(this.img, this.image_right_glide);
            else view.changeImage(this.img, this.image_left_glide);
        }
    }


}

global.JoustGuy.prototype.updateTeam = function()
{
	view.playerFacings.forEach(f => {
		view.playerStates.forEach(s => {
			const key = `image_${f}_${s}`;
			const imgKey = `${this.team}_${f}_${s}`;
			this[key] = imgKey;
		})
	})
}

global.JoustGuy.prototype.remove = function()
{
	console.log("remove", this.id, arena, this.obj)
	arena.removeChild(this.obj);
	this.obj = null;
	this.img = null;
}

var renderPlatforms = function () {

	Array.from(arena.getElementsByClassName("platform")).forEach(p=>p.parentNode.removeChild(p));

	world.platform.forEach(p => {
		var type = world.platformTypes[p.index];

		var div = document.createElement("DIV");
		var img = document.createElement("IMG");
		div.className = "platform";
		div.style.left = p.x1 * view.scale;
		div.style.top = p.y1 * view.scale;
		img.width = type.width * view.scale;
		img.height = type.height * view.scale;
		div.appendChild(img);
		arena.appendChild(div);
	
		p.img = img;
		view.changeImage(img, type.id);
	});


}

world.changeTeam = function()
{
	if (!world.dude)
	{
		return;
	}
	var teamNames = world.teams.map(t=>t.id)
	var teamIndex = teamNames.indexOf(world.dude.team);
	var nextTeamIndex = (teamIndex+1) % world.teams.length
	console.log(world.dude.team, teamIndex, nextTeamIndex, world.teams[nextTeamIndex].id, teamNames)
	socket.emit("team", world.teams[nextTeamIndex].id);

}

var addPlayer = function(index,origx,origy)
{

	var div = document.createElement("DIV");
	var img = document.createElement("IMG");
	var nametag = document.createElement("DIV");
	div.className = "player";
	nametag.className = "nametag";
	img.width = world.joustguys.width * view.scale;
	img.height = world.joustguys.height * view.scale;
	div.appendChild(img);
	div.appendChild(nametag);
	arena.appendChild(div);
	var player = new global.JoustGuy(div,index,origx,origy);
	player.img = img;
	player.nametag = nametag;

	view.changeImage(player.img, player.image_right_rest);
	return player;

}

var addSerializedPlayer = function(packet)
{
	var player = addPlayer(packet[0],0,0);
	player.deserialize(packet);
	world.players.push(player);
	return player;
}

function updateScale()
{
	view.width = window.innerWidth;
	view.height = window.innerHeight;

	var hscale = window.innerWidth / 292;
	var vscale = window.innerHeight / 240;
	console.log("scale", hscale, vscale)
	view.scale = Math.min(hscale,vscale);

	renderPlatforms();

	world.players.forEach(p => {
		if (p.img) {
			p.img.width = world.joustguys.width * view.scale;
			p.img.height = world.joustguys.height * view.scale;
		}
	})

	var r = document.querySelector(':root');
	r.style.setProperty('--borderWidth', `${Math.floor(1.5 * view.scale)}px`);
	r.style.setProperty('--baseFontSize', `${Math.floor(8 * view.scale)}px`);
	r.style.setProperty('--bigFontSize', `${Math.floor(13 * view.scale)}px`);
	r.style.setProperty('--smallFontSize', `${Math.floor(4 * view.scale)}px`);
	r.style.setProperty('--nameTagTop', `${Math.floor(-20 * view.scale)}px`);
	r.style.setProperty('--nameTagLeft', `${Math.floor(-200 + 8 * view.scale)}px`);
	r.style.setProperty('--menuLineHeight', `${Math.floor(32 * view.scale)}px`);
}


function ClientLoop() {
	world.players.forEach(p=>{
		p.move();
		p.render();
	});

	renderArena();

}

var arena = document.getElementById("arena");
var pauseScreen = document.getElementById("paused");
var timerDiv = document.getElementById("timer");
var scoreBoard = document.getElementById("scoreboard");
var scoreLeft = document.getElementById("scoreleft");
var scoreRight = document.getElementById("scoreright");
var scoreCenter = document.getElementById("scorecenter");
var pausedTimerDiv = document.getElementById("pausedTimer")
var menuButton = document.getElementById("menubutton")
var menu = document.getElementById("menu")
var changeTeam = document.getElementById("changeteam")
var toggleLeaderboard = document.getElementById("toggleleaderboard")
var toggleSound = document.getElementById("togglesound")
var unstick = document.getElementById("unstick")


function renderArena()
{
	if (!world.dude)
	{
		return;
	}

	if (!world.running)
	{
		renderPaused();
		return;
	}
	pauseScreen.style.display = "none";
	timerDiv.style.display = "";

	var tx=0, ty=0;
	var sx = world.dude.x * view.scale;
	var sy = world.dude.y * view.scale;
	if (sx < view.width / 2)
	{
		tx = 0;
	}
	else if (sx > world.width * view.scale - view.width/2)
	{
		tx = world.width * view.scale - view.width;
	}
	else
	{
		tx = sx - view.width / 2;
	}

	if (sy < view.height / 2)
	{
		ty = 0;
	}
	else if (sy > world.height * view.scale - view.height/2)
	{
		ty = world.height * view.scale - view.height;
	}
	else
	{
		ty = sy - view.height / 2;
	}

	arena.style.transform = `translate3d(${-tx}px,${-ty}px,0)`

	var timeLeft = Math.max(0, Math.floor((world.roundEndTime - new Date()) / 1000)) + 1;
	if (timeLeft >= 60)
	{
		timerDiv.innerHTML = `${Math.floor(timeLeft/60)}:${("00" + timeLeft % 60).slice(-2)}`;
	}
	else
	{
		timerDiv.innerHTML = timeLeft;
	}

}

function renderPaused()
{
	pauseScreen.style.display = "block";
	timerDiv.style.display = "none";
	var timeLeft = Math.max(0, Math.floor((world.roundEndTime - new Date()) / 1000)) + 1;
	pausedTimerDiv.innerHTML = timeLeft;


}

function initClient()
{
	if (world.clientInitialized)
	{
		return;
	}
	world.clientInitialized = true;

	renderArena();

	world.intervalReference = setInterval(ClientLoop, world.interval);

	window.addEventListener("keydown", function(e) {
		if (!world.dude || world.dude.dead) 
		{
			return;
		}

		switch (e.keyCode)
		{
			case 32:
			case 87:
			case 65:
			case 68:
			case 83:
			case 37:
			case 38:
			case 39:
			case 40:
				e.preventDefault();
				socket.emit("keydown", e.keyCode);
				world.dude.handleKeyDown(e.keyCode);
				return false;

			case 9:
				e.preventDefault();
				scoreBoard.style.display = scoreBoard.style.display === "block" ? "none" : "block";
				break;

			case 80: // p
				e.preventDefault();
				view.pingStart = new Date();
				socket.emit("ping","");
				break;

			case 81: // q
				e.preventDefault();
				if (world.dude)
				{
					socket.emit("stuck","");
				}
			break;

			case 84: // t
				e.preventDefault();
				world.changeTeam();
				break;

			case 86: // v
				e.preventDefault();
				view.muted = !view.muted;
				view.showAlert(`Sound ${view.muted ? "Off" : "On"}`)
				break;

			default:
				console.log(e.keyCode);
		}
	});

	window.addEventListener("keyup", function(e) {
		if (!world.dude || world.dude.dead) 
		{
			return;
		}

		switch (e.keyCode)
		{
			case 32:
			case 87:
			case 65:
			case 68:
			case 83:
			case 37:
			case 38:
			case 39:
			case 40:
				socket.emit("keyup", e.keyCode);
				world.dude.handleKeyUp(e.keyCode);
				break;
		}
	});

	if ("ontouchstart" in window)
	{
		var controls = document.getElementById("touchcontrols");
		controls.style.display = "block";
		controls.appendChild(menuButton);
		console.log("init client", controls, controls.style, controls.style.display)
		
		controls.addEventListener("touchstart", function(e) {
			if (!world.dude || world.dude.dead)
			{
				e.preventDefault();
				return;
			}

			var keyCode = 38;
			switch (e.target.id)
			{
				case "touchleft":
					keyCode = 37;
					break;
				case "touchright":
					keyCode = 39;
					break;
				case "menubutton":
					return;
				}

				e.preventDefault();
				socket.emit("keydown", keyCode);
			world.dude.handleKeyDown(keyCode);
		});

		controls.addEventListener("touchmove", function(e) {
			e.preventDefault();
		});

		controls.addEventListener("touchend", function(e) {
			if (!world.dude || world.dude.dead) 
			{
				e.preventDefault();
				return;
			}

			var keyCode = 38;
			switch (e.target.id)
			{
				case "touchleft":
					keyCode = 37;
					break;
				case "touchright":
					keyCode = 39;
					break;
				case "menubutton":
					return;
			}

			e.preventDefault();
			socket.emit("keyup", keyCode);
			world.dude.handleKeyUp(keyCode);
		});

	}

	menuButton.addEventListener("mousedown", function()
	{
		menu.style.display = menu.style.display === "block" ? "none" : "block";
	});

	changeTeam.addEventListener("mousedown", function()
	{
		menu.style.display = "none";
		world.changeTeam();
	});

	toggleLeaderboard.addEventListener("mousedown", function()
	{
		menu.style.display = "none";
		scoreBoard.style.display = scoreBoard.style.display === "block" ? "none" : "block";
	});

	toggleSound.addEventListener("mousedown", function()
	{
		menu.style.display = "none";
		view.muted = !view.muted;
		view.showAlert(`Sound ${view.muted ? "Off" : "On"}`)
	});

	unstick.addEventListener("mousedown", function()
	{
		menu.style.display = "none";
		socket.emit("stuck", "");
	});
}

// Register all socket event handlers on whatever socket object exists (shim or real)
function registerSocketHandlers(socket)
{
	socket.on('ack', function (data) {
		var ms = new Date() - view.pingStart;
		view.showAlert(`Ping: ${ms}ms`);
	})

	socket.on('update', function (data) {
		var ids = data.map(p=>{
			var player = world.players.find(t=>t.id===p[0]);
			if (player)
			{
				player.deserialize(p)
			}
			else
			{
				player = addSerializedPlayer(p);
				if (player.id === world.myId)
				{
					world.dude = player;
				}
			}
			return p[0];
		});

		world.players = world.players.filter(p => {
			if (ids.indexOf(p.id) < 0)
			{
				p.remove();
				return false;
			}
			return true;
		});
	})

	socket.on("players", (list) => {
		list.forEach(p=>{
			var player = world.players.find(t=>t.id===p.id);
			if (!player)
			{
				player = addPlayer(p.id,0,0);
				world.players.push(player);
				if (player.id === world.myId)
				{
					world.dude = player;
				}
			}
			player.name = p.name;
			player.team = p.team;
			if (player.updateTeam) player.updateTeam();
			if (player.nametag) {
				player.nametag.innerHTML = p.name;
				player.nametag.className = `nametag ${player.team}`;
			}
		});
	});

	socket.on("world", (obj) => {
		world.deserialize(obj);
		renderPlatforms();
		console.log("deserialized world", obj, world)
	});

	socket.on("score", (obj) => {
		world.teams.forEach(t => t.score = obj.teams[t.id]);
		scoreLeft.innerHTML = ("00000" + obj.teams["ylo"]).slice(-5);
		scoreRight.innerHTML = ("00000" + obj.teams["red"]).slice(-5);
		scoreCenter.innerHTML = ("00000" + obj.teams["blu"]).slice(-5);

		scoreBoard.innerHTML = "";
		var appendLI = function(txt, className)
		{
			const li = document.createElement("LI");
			li.className = className;
			li.innerHTML = txt;
			scoreBoard.appendChild(li)
		}

		var cutoff = 20;
		const sorted = obj.players.sort((a,b)=>b.score-a.score);
		sorted.forEach(p => {
			const player = world.players.find(pl => pl.id === p.id);
			if (player && cutoff > 0)
			{
				player.score = p.score;
				player.fragcount = p.fragcount;
				appendLI(`${player.name}: ${player.score}`, player.team);
			}
			cutoff--;
		});
		if (cutoff < 0) appendLI(`... and ${-cutoff} more.`)
	});

	socket.on("round", (obj) => {
		world.roundEndTime = new Date(new Date() - 0 + obj.msRemaining);
		world.running = obj.running;
	});

	socket.on("effect", (effects) => {
		if (!world.dude) return;
		var nearX = view.width / 2 / view.scale;
		var nearY = view.height / 2 / view.scale;
		var factor = 1;
		effects.forEach(e => {
			var clip = e[0];
			switch (clip)
			{
				case "flap": factor = 0.2; break;
				case "bump": factor = 0.7; break;
				case "spawn":
					clip = (e[3] === world.dude.team) ? "spawn_short" : "spawn_other";
					factor = 1;
					break;
				default: factor = 1;
			}
			factor = 1
			var dx = Math.abs(e[1] - world.dude.x)
			var dy = Math.abs(e[2] - world.dude.y)
			if (dx < nearX * factor && dy < nearY * factor)
			{
				var fx = dx / nearX;
				var fy = dy / nearY;
				var vol = factor-Math.sqrt(fx * fx + fy * fy)
				playClip(clip, vol)
			}
		});
	});

	socket.on("connect", function() {
		world.myId = socket.id;
		console.log("[client] connect handler, myId=" + socket.id);
		initClient();
		console.log("[client] initClient done, emitting new-player");
		socket.emit("new-player", socket.id);
		console.log("[client] new-player emitted to joust.life");
	});
}

window.addEventListener("resize", updateScale);
updateScale();

// Initialize audio
initAudio();

function startGame() {
	console.log("[Client] Connecting to live https://joust.life game server...");
	var startscreen = document.getElementById("startscreen");
	if (startscreen) startscreen.style.display = "none";

	// Connect directly to live joust.life game server (NO FULLSCREEN)
	window.socket = io("https://joust.life", {
		transports: ["websocket", "polling"]
	});

	registerSocketHandlers(window.socket);
}

// Start on click or key press
var startscreen = document.getElementById("startscreen");
if (startscreen) {
	startscreen.addEventListener("click", function onStart() {
		startscreen.removeEventListener("click", onStart);
		startGame();
	});
	window.addEventListener("keydown", function onKey(e) {
		if (startscreen && startscreen.style.display !== "none") {
			startscreen.removeEventListener("click", onStart);
			startGame();
		}
	}, { once: true });
}


