// ============================================================
// JOUST — Serverless P2P Networking via WebRTC (PeerJS)
// No server needed. One browser = host. Others = clients.
// Deployable as static files on GitHub Pages.
// ============================================================

var net = {
  isHost: false,
  peer: null,
  connections: {},   // peerId -> DataConnection (host keeps all clients)
  hostConn: null,    // DataConnection to host (client keeps one)
  hostId: null,
  myPeerId: null,
  roomCode: null,
  ready: false,
  onMessage: null,   // callback(type, data, fromPeerId)

  // Socket.io compatibility shim — so game_client.js works unchanged
  socketShim: null,
};

// ============================================================
// ROOM CODE — short 4-char codes for easy sharing
// ============================================================
function generateRoomCode() {
  var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  var code = "";
  for (var i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// ============================================================
// SOCKET.IO SHIM — makes PeerJS look like socket.io to game code
// ============================================================
function createSocketShim() {
  var handlers = {};
  var shim = {
    id: null,
    connected: false,

    on: function(event, fn) {
      if (!handlers[event]) handlers[event] = [];
      handlers[event].push(fn);
    },

    emit: function(event, data) {
      if (net.isHost) {
        // Host: handle locally (server-side logic runs in this browser)
        hostHandleMessage(shim.id, event, data);
      } else {
        // Client: send to host via WebRTC
        if (net.hostConn && net.hostConn.open) {
          net.hostConn.send(JSON.stringify({ e: event, d: data }));
        }
      }
    },

    // Internal: trigger a handler as if we received from server
    _trigger: function(event, data) {
      if (handlers[event]) {
        handlers[event].forEach(function(fn) { fn(data); });
      }
    }
  };

  return shim;
}

// ============================================================
// HOST — runs the authoritative game loop in-browser
// ============================================================
var hostPlayers = {};  // peerId -> { joustGuy, name, team }
var hostWorldPlayers = []; // server-side player array (separate from client world.players)
var hostUpdateTimer = null;
var hostRoundTimer = null;

var hostGameState = {
  running: false,
  roundEndTime: new Date(),
  roundDurationMs: 5 * 60 * 1000,
  pauseDurationMs: 10 * 1000,
  teamscore: { red: 0, ylo: 0, blu: 0 }
};

var adjectives = [
  "Acrylic","Ghost","Other","Armed","Land","Disco","Kid","Sparkle",
  "Annoyed","Feisty","Hermit","Last","Old","Brave","Cosmic","Fuzzy",
  "Iron","Mega","Neon","Pixel","Rapid","Shadow","Turbo","Ultra",
  "Wild","Zen","Epic","Swift","Hyper","Laser","Storm","Night"
];
var nouns = [
  "Goat","Raven","Trout","Sparrow","Chicken","Llama","Lampstand",
  "Mama","Pelican","Panda","Monster","Ninja","Ostrich","Heron",
  "Falcon","Dragon","Phoenix","Tiger","Wolf","Eagle","Cobra",
  "Hawk","Shark","Bear","Panther","Viper","Fox","Owl","Condor"
];

function generateName() {
  return adjectives[Math.floor(Math.random() * adjectives.length)] +
         nouns[Math.floor(Math.random() * nouns.length)];
}

function hostInit() {
  console.log("[Host] Initializing game server in this browser...");

  // Hook game events
  world.onKill = function(killer, victim) {
    hostGameState.teamscore[killer.team] = (hostGameState.teamscore[killer.team] || 0) + 1;
    hostBroadcastScore();
    hostBroadcast("effect", [["die", victim.x, victim.y, victim.team]]);
  };
  world.onRepel = function(a, b) {
    hostBroadcast("effect", [["repel", (a.x + b.x) / 2, (a.y + b.y) / 2, ""]]);
  };
  world.onBump = function(p) {
    hostBroadcast("effect", [["bump", p.x, p.y, p.team]]);
  };
  world.onSpawn = function(p) {
    hostBroadcast("effect", [["spawn", p.x, p.y, p.team]]);
  };

  // Init world
  hostInitWorld(5);

  // Start game loop
  hostUpdateTimer = setInterval(hostGameLoop, world.interval);

  // Don't start round yet — wait for first player to join
}

function hostInitWorld(playerCount) {
  var targetArea = Math.max(world.minWidth * world.minHeight, playerCount * world.idealPixelsPerPlayer);
  var aspect = world.minWidth / world.minHeight;
  world.height = Math.max(world.minHeight, Math.sqrt(targetArea / aspect));
  world.width = Math.max(world.minWidth, world.height * aspect);
  world.height = Math.round(world.height);
  world.width = Math.round(world.width);
  world.generate();
}

var MIN_TOTAL_PLAYERS = 6;

function hostEnsureBots() {
  var humanCount = 0;
  for (var id in hostPlayers) {
    if (!hostPlayers[id].isBot) humanCount++;
  }
  var desiredBots = Math.max(0, MIN_TOTAL_PLAYERS - humanCount);

  // Clean excess bots if humans joined
  var currentBots = [];
  for (var id in hostPlayers) {
    if (hostPlayers[id].isBot) currentBots.push(id);
  }
  while (currentBots.length > desiredBots) {
    var removeId = currentBots.pop();
    var p = hostPlayers[removeId];
    if (p) {
      var idx = hostWorldPlayers.indexOf(p.joustGuy);
      if (idx > -1) hostWorldPlayers.splice(idx, 1);
      delete hostPlayers[removeId];
    }
  }

  // Spawn needed bots
  while (currentBots.length < desiredBots) {
    var botId = "bot_" + Math.random().toString(36).substr(2, 6);
    var teamIndex = Object.keys(hostPlayers).length % world.teams.length;
    var team = world.teams[teamIndex].id;
    var name = generateName();

    var jg = new JoustGuy(null, botId, 0, 0);
    jg.team = team;
    jg.render = function() {};
    jg.updateTeam = function() {};
    jg.remove = function() {};
    jg.isBot = true;

    hostPlayers[botId] = {
      joustGuy: jg,
      name: name,
      team: team,
      isBot: true,
      flapCadence: 130 + Math.random() * 100,
      lastFlap: 0,
      nextDirChange: 0,
      currentDir: Math.random() < 0.5 ? -1 : 1
    };
    currentBots.push(botId);
  }
}

function hostStartRound() {
  hostEnsureBots();
  var count = Object.keys(hostPlayers).length;
  hostInitWorld(Math.max(count, 5));

  hostBroadcast("world", world.serialize());

  world.teams.forEach(function(t) { t.score = 0; });
  hostGameState.teamscore = { red: 0, ylo: 0, blu: 0 };

  hostWorldPlayers = [];
  var clientPlayers = world.players;
  for (var id in hostPlayers) {
    var p = hostPlayers[id];
    p.joustGuy.dead = false;
    p.joustGuy.revivable = false;
    p.joustGuy.fragcount = 0;
    p.joustGuy.score = 0;
    hostWorldPlayers.push(p.joustGuy);
  }
  // Swap for findSpawnPoint which reads world.players
  world.players = hostWorldPlayers;
  hostWorldPlayers.forEach(function(p) { p.findSpawnPoint(); });
  world.players = clientPlayers;

  hostGameState.running = true;
  hostGameState.roundEndTime = new Date(Date.now() + hostGameState.roundDurationMs);

  hostBroadcast("round", { running: true, msRemaining: hostGameState.roundDurationMs });
  hostBroadcastPlayers();

  if (hostRoundTimer) clearTimeout(hostRoundTimer);
  hostRoundTimer = setTimeout(hostEndRound, hostGameState.roundDurationMs);

  console.log("[Host] Round started: " + count + " players (with AI opponents)");
}

function hostEndRound() {
  hostGameState.running = false;
  hostBroadcast("round", { running: false, msRemaining: hostGameState.pauseDurationMs });
  if (hostRoundTimer) clearTimeout(hostRoundTimer);
  hostRoundTimer = setTimeout(hostStartRound, hostGameState.pauseDurationMs);
}

function hostGameLoop() {
  if (!hostGameState.running) return;

  var now = Date.now();
  // Update AI bot decisions
  for (var id in hostPlayers) {
    var p = hostPlayers[id];
    if (p.isBot && p.joustGuy && !p.joustGuy.dead) {
      var bot = p.joustGuy;

      // 1. Directional movement
      if (now > p.nextDirChange) {
        p.nextDirChange = now + 1200 + Math.random() * 2000;
        p.currentDir = Math.random() < 0.5 ? -1 : 1;
        if (p.currentDir === -1) {
          bot.handleKeyDown(37);
          bot.handleKeyUp(39);
        } else {
          bot.handleKeyDown(39);
          bot.handleKeyUp(37);
        }
      }

      // 2. Flapping behavior: keep bots dynamic in mid-air
      var shouldFlap = false;
      if (bot.y > (world.height - 75)) {
        shouldFlap = true;
      } else if (bot.vy > 0.6 && Math.random() < 0.45) {
        shouldFlap = true;
      } else if (bot.y > 120 && Math.random() < 0.08) {
        shouldFlap = true;
      }

      if (shouldFlap && (now - p.lastFlap > p.flapCadence)) {
        p.lastFlap = now;
        bot.handleKeyDown(38);
        bot.handleKeyUp(38);
      }
    }
  }

  // Swap world.players to server array during tick
  // (game_common.js methods like check/findSpawnPoint reference world.players)
  var clientPlayers = world.players;
  world.players = hostWorldPlayers;

  hostWorldPlayers.forEach(function(p) { p.move(); });

  for (var i = 0; i < hostWorldPlayers.length; i++) {
    for (var j = i + 1; j < hostWorldPlayers.length; j++) {
      hostWorldPlayers[i].check(hostWorldPlayers[j]);
    }
  }

  var effects = [];
  hostWorldPlayers.forEach(function(p) {
    if (p.dead && p.revivable) {
      p.revive();
      effects.push(["spawn", p.x, p.y, p.team]);
    }
  });

  // Restore client array
  world.players = clientPlayers;

  var update = hostWorldPlayers.map(function(p) { return p.serialize(); });
  hostBroadcast("update", update);

  if (effects.length > 0) hostBroadcast("effect", effects);
}

function hostBroadcastScore() {
  var playerScores = hostWorldPlayers.map(function(p) {
    return { id: p.id, score: p.score, fragcount: p.fragcount };
  });
  hostBroadcast("score", { teams: hostGameState.teamscore, players: playerScores });
}

function hostBroadcastPlayers() {
  var list = [];
  for (var id in hostPlayers) {
    list.push({ id: id, name: hostPlayers[id].name, team: hostPlayers[id].joustGuy.team });
  }
  hostBroadcast("players", list);
}

// Send to all peers + local shim
function hostBroadcast(event, data) {
  var msg = JSON.stringify({ e: event, d: data });
  for (var peerId in net.connections) {
    try {
      if (net.connections[peerId].open) net.connections[peerId].send(msg);
    } catch(e) {}
  }
  // Also deliver to local client (host is also a player)
  if (net.socketShim) net.socketShim._trigger(event, data);
}

// Handle a message from a peer (or self)
function hostHandleMessage(peerId, event, data) {
  switch (event) {
    case "new-player":
      var teamIndex = Object.keys(hostPlayers).length % world.teams.length;
      var team = world.teams[teamIndex].id;
      var name = generateName();

      // If no round is running, start one first (sets up world + spawn points)
      var needsRound = !hostGameState.running && !hostRoundTimer;
      if (needsRound) {
        // Temporarily register the player so hostStartRound includes them
        var jg = new JoustGuy(null, peerId, 0, 0);
        jg.team = team;
        jg.render = function() {};
        jg.updateTeam = function() {};
        jg.remove = function() {};
        hostPlayers[peerId] = { joustGuy: jg, name: name, team: team };

        hostStartRound(); // this rebuilds world, spawns all players, broadcasts world+round
      } else {
        // Round already running — add player mid-round
        var jg = new JoustGuy(null, peerId, 0, 0);
        jg.team = team;
        jg.render = function() {};
        jg.updateTeam = function() {};
        jg.remove = function() {};
        hostPlayers[peerId] = { joustGuy: jg, name: name, team: team };
        hostWorldPlayers.push(jg);
        // Swap for findSpawnPoint
        var cp = world.players;
        world.players = hostWorldPlayers;
        jg.findSpawnPoint();
        world.players = cp;

        // Send current world state to the new peer
        var worldData = world.serialize();
        var roundData = {
          running: hostGameState.running,
          msRemaining: Math.max(0, hostGameState.roundEndTime - Date.now())
        };

        if (peerId === net.myPeerId) {
          net.socketShim._trigger("world", worldData);
          net.socketShim._trigger("round", roundData);
        } else if (net.connections[peerId] && net.connections[peerId].open) {
          net.connections[peerId].send(JSON.stringify({ e: "world", d: worldData }));
          net.connections[peerId].send(JSON.stringify({ e: "round", d: roundData }));
        }
      }

      hostBroadcastPlayers();
      hostBroadcastScore();

      console.log("[Host] Player joined: " + name + " (" + team + ") [" + Object.keys(hostPlayers).length + " total]");
      break;

    case "keydown":
      var p = hostPlayers[peerId];
      if (p && !p.joustGuy.dead) p.joustGuy.handleKeyDown(data);
      break;

    case "keyup":
      var p = hostPlayers[peerId];
      if (p && !p.joustGuy.dead) p.joustGuy.handleKeyUp(data);
      break;

    case "team":
      var p = hostPlayers[peerId];
      if (p && world.teams.find(function(t) { return t.id === data; })) {
        p.joustGuy.team = data;
        p.team = data;
        hostBroadcastPlayers();
      }
      break;

    case "stuck":
      var p = hostPlayers[peerId];
      if (p) {
        p.joustGuy.findSpawnPoint();
        p.joustGuy.vx = 0;
        p.joustGuy.vy = 0;
      }
      break;

    case "ping":
      var ackMsg = JSON.stringify({ e: "ack", d: "" });
      if (peerId === net.myPeerId) {
        net.socketShim._trigger("ack", "");
      } else if (net.connections[peerId] && net.connections[peerId].open) {
        net.connections[peerId].send(ackMsg);
      }
      break;
  }
}

function hostRemovePeer(peerId) {
  var p = hostPlayers[peerId];
  if (p) {
    var idx = hostWorldPlayers.indexOf(p.joustGuy);
    if (idx > -1) hostWorldPlayers.splice(idx, 1);
    delete hostPlayers[peerId];
    hostBroadcastPlayers();
    console.log("[Host] Player left: " + p.name);
  }
  delete net.connections[peerId];
}

// ============================================================
// PEERJS SETUP — HOST / CLIENT
// ============================================================

// HOST: create a room
function hostCreateRoom(callback) {
  net.isHost = true;
  net.roomCode = generateRoomCode();

  // Create peer directly with room-based ID so clients can find us
  net.peer = new Peer("joust-" + net.roomCode, { debug: 1 });

  net.peer.on("open", function(id) {
    net.myPeerId = id;
    console.log("[Host] Registered as: " + id);
    console.log("[Host] Room code: " + net.roomCode);

    // Create socket shim
    net.socketShim = createSocketShim();
    net.socketShim.id = id;
    net.socketShim.connected = true;

    // Initialize host game logic
    hostInit();

    // Listen for incoming peer connections
    net.peer.on("connection", function(conn) {
      net.connections[conn.peer] = conn;
      conn.on("open", function() {
        console.log("[Host] Peer joined: " + conn.peer);
      });
      conn.on("data", function(raw) {
        try {
          var msg = JSON.parse(raw);
          hostHandleMessage(conn.peer, msg.e, msg.d);
        } catch(e) {}
      });
      conn.on("close", function() { hostRemovePeer(conn.peer); });
      conn.on("error", function() { hostRemovePeer(conn.peer); });
    });

    if (callback) callback(net.roomCode);
  });

  net.peer.on("error", function(err) {
    console.error("[Host] Error:", err.type, err.message);
  });
}

// CLIENT: join a room
function clientJoinRoom(roomCode, callback) {
  net.isHost = false;
  net.roomCode = roomCode.toUpperCase();

  net.peer = new Peer(undefined, { debug: 1 });

  net.peer.on("open", function(myId) {
    net.myPeerId = myId;
    console.log("[Client] My Peer ID: " + myId);

    net.socketShim = createSocketShim();
    net.socketShim.id = myId;

    var hostPeerId = "joust-" + net.roomCode;
    console.log("[Client] Connecting to host: " + hostPeerId);

    var conn = net.peer.connect(hostPeerId, { reliable: true });
    net.hostConn = conn;

    conn.on("open", function() {
      console.log("[Client] Connected to host!");
      net.socketShim.connected = true;
      net.ready = true;
      if (callback) callback();
    });

    conn.on("data", function(raw) {
      try {
        var msg = JSON.parse(raw);
        net.socketShim._trigger(msg.e, msg.d);
      } catch(e) {}
    });

    conn.on("close", function() {
      console.log("[Client] Disconnected from host");
      net.socketShim.connected = false;
    });

    conn.on("error", function(err) {
      console.error("[Client] Connection error:", err);
    });
  });

  net.peer.on("error", function(err) {
    console.error("[Client] Peer error:", err.type, err.message);
    if (err.type === "peer-unavailable") {
      var statusEl = document.getElementById("room-status");
      if (statusEl) statusEl.textContent = "Room not found. Check the code and try again.";
    }
  });
}

// ============================================================
// AUTO-JOIN — everyone goes to the same hardcoded room
// First player becomes host. Others join as clients.
// Click/tap start screen to play. No room UI needed.
// ============================================================
var ROOM_ID = "joust-ARENA";
var autoJoinReady = false;

function autoJoin() {
  var startscreen = document.getElementById("startscreen");

  // Try to be host first (claim the room peer ID)
  net.isHost = true;
  net.roomCode = "ARENA";
  net.peer = new Peer(ROOM_ID, { debug: 1 });

  net.peer.on("open", function(id) {
    // We claimed host successfully
    net.myPeerId = id;
    console.log("[Net] I am HOST: " + id);

    net.socketShim = createSocketShim();
    net.socketShim.id = id;
    net.socketShim.connected = true;

    hostInit();

    net.peer.on("connection", function(conn) {
      net.connections[conn.peer] = conn;
      conn.on("open", function() {
        console.log("[Host] Peer joined: " + conn.peer);
      });
      conn.on("data", function(raw) {
        try {
          var msg = JSON.parse(raw);
          hostHandleMessage(conn.peer, msg.e, msg.d);
        } catch(e) {}
      });
      conn.on("close", function() { hostRemovePeer(conn.peer); });
      conn.on("error", function() { hostRemovePeer(conn.peer); });
    });

    autoJoinReady = true;
  });

  net.peer.on("error", function(err) {
    if (err.type === "unavailable-id") {
      // Room already has a host — join as client instead
      console.log("[Net] Host exists, joining as client...");
      net.isHost = false;
      net.peer.destroy();

      net.peer = new Peer(undefined, { debug: 1 });
      net.peer.on("open", function(myId) {
        net.myPeerId = myId;
        console.log("[Net] I am CLIENT: " + myId);

        net.socketShim = createSocketShim();
        net.socketShim.id = myId;

        var conn = net.peer.connect(ROOM_ID, { reliable: true });
        net.hostConn = conn;

        conn.on("open", function() {
          console.log("[Client] Connected to host!");
          net.socketShim.connected = true;
          net.ready = true;
          autoJoinReady = true;
        });

        conn.on("data", function(raw) {
          try {
            var msg = JSON.parse(raw);
            net.socketShim._trigger(msg.e, msg.d);
          } catch(e) {}
        });

        conn.on("close", function() {
          console.log("[Client] Disconnected from host");
          net.socketShim.connected = false;
        });

        conn.on("error", function(err) {
          console.error("[Client] Connection error:", err);
        });
      });

      net.peer.on("error", function(err2) {
        console.error("[Client] Peer error:", err2.type, err2.message);
      });

    } else {
      console.error("[Net] Peer error:", err.type, err.message);
    }
  });

  // Start screen click/tap handler
  function onStartClick() {
    if (!autoJoinReady) {
      console.log("[Net] Still connecting, please wait...");
      return;
    }
    startscreen.removeEventListener("click", onStartClick);
    window.removeEventListener("keydown", onStartKey);
    startGame();
  }
  function onStartKey(e) {
    if (!autoJoinReady) return;
    startscreen.removeEventListener("click", onStartClick);
    window.removeEventListener("keydown", onStartKey);
    startGame();
  }
  startscreen.addEventListener("click", onStartClick);
  window.addEventListener("keydown", onStartKey);
}

function startGame() {
  console.log("[startGame] isHost=" + net.isHost + " peerId=" + net.myPeerId);
  document.getElementById("startscreen").style.display = "none";

  // Fullscreen only works from user gesture — wrapped in try/catch
  setTimeout(function() {
    try {
      var options = {navigationUI: "hide"};
      if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen(options).catch(function(){});
    } catch(e) {}
  }, 0);

  window.socket = net.socketShim;
  world.myId = net.socketShim.id;
  console.log("[startGame] triggering connect, myId=" + world.myId);
  net.socketShim._trigger("connect", null);

  // Safety: check if player spawned after 2 seconds
  setTimeout(function() {
    if (!world.dude) {
      console.warn("[startGame] world.dude still null after 2s, players=" + world.players.length);
      console.warn("[startGame] running=" + world.running + " hostRunning=" + (net.isHost ? hostGameState.running : "N/A"));
    } else {
      console.log("[startGame] Player spawned OK: " + world.dude.id + " at " + Math.round(world.dude.x) + "," + Math.round(world.dude.y));
    }
  }, 2000);
}
