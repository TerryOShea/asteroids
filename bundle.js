/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = __webpack_require__(2);
var MovingObject = __webpack_require__(1);

function Bullet(options) {
  options.color = Bullet.COLOR;
  options.radius = Bullet.RADIUS;

  MovingObject.call(this, options);
}

Bullet.COLOR = "red";
Bullet.RADIUS = 3;

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;

module.exports = Bullet;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function MovingObject(options, game) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.isWrappable = true;

MovingObject.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];

  if (!this.isWrappable && this.game.isOutOfBounds(this.pos)) {
    this.game.remove(this);
  } else {
    this.pos = this.game.wrap(this.pos);
  }
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  var xdiff = this.pos[0] - otherObject.pos[0];
  var ydiff = this.pos[1] - otherObject.pos[1];

  var dist = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2));
  return dist < this.radius + otherObject.radius;
};

MovingObject.prototype.collideWith = function (otherObject) {};

module.exports = MovingObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = {
  inherits: function inherits(ChildClass, ParentClass) {
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },


  // Return a randomly oriented vector with the given length.
  randomVec: function randomVec(length) {
    var deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },


  // Scale the length of a vector by the given amount.
  scale: function scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

module.exports = Util;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = __webpack_require__(2);
var MovingObject = __webpack_require__(1);
var Ship = __webpack_require__(5);
var Bullet = __webpack_require__(0);

function Asteroid(options) {
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(5);

  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.COLOR = "white";
Asteroid.RADIUS = 10;

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  } else if (otherObject instanceof Bullet) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

module.exports = Asteroid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Asteroid = __webpack_require__(3);
var Bullet = __webpack_require__(0);
var Ship = __webpack_require__(5);

function Game() {
  this.asteroids = this.addAsteroids();
  this.ship = new Ship({ pos: this.randomPosition(), game: this });
  this.bullets = [];
  this.getImage();
}

Game.prototype.getImage = function () {
  var _this = this;

  var img = new Image();
  img.onload = function () {
    _this.img = img;
  };
  img.src = 'https://static.pexels.com/photos/51021/pexels-photo-51021.jpeg';
};

Game.DIM_X = window.innerWidth;
Game.DIM_Y = window.innerHeight;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function () {
  var asteroids = [];
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    var a = new Asteroid({ pos: this.randomPosition(), game: this });
    asteroids.push(a);
  }
  return asteroids;
};

Game.prototype.randomPosition = function () {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.drawImage(this.img, 0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach(function (obj) {
    return obj.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function (obj) {
    return obj.move();
  });
};

Game.prototype.wrap = function (pos) {
  var new_pos = [].concat(_toConsumableArray(pos));
  if (new_pos[0] <= 0) {
    new_pos[0] = Game.DIM_X;
  } else if (new_pos[0] >= Game.DIM_X) {
    new_pos[0] = 0;
  }

  if (new_pos[1] <= 0) {
    new_pos[1] = Game.DIM_Y;
  } else if (new_pos[1] >= Game.DIM_Y) {
    new_pos[1] = 0;
  }
  return new_pos;
};

Game.prototype.checkCollisions = function () {
  var objects = this.allObjects();
  for (var i = 0; i < objects.length - 1; i++) {
    for (var j = i + 1; j < objects.length; j++) {
      if (objects[i].isCollidedWith(objects[j])) {
        objects[i].collideWith(objects[j]);
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (obj) {
  if (obj instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(obj), 1);
  } else if (obj instanceof Asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(obj), 1);
  }
};

Game.prototype.allObjects = function () {
  return [].concat(_toConsumableArray(this.asteroids), _toConsumableArray(this.bullets), [this.ship]);
};

Game.prototype.isOutOfBounds = function (pos) {
  return pos[0] < 0 || pos[0] > Game.DIM_X || pos[1] < 0 || pos[1] > Game.DIM_Y;
};

module.exports = Game;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MovingObject = __webpack_require__(1);
var Util = __webpack_require__(2);
var Bullet = __webpack_require__(0);

function Ship(options, game) {
  options.radius = Ship.RADIUS;
  options.vel = [0, 0];
  options.color = Ship.COLOR;

  MovingObject.call(this, options);
}

Ship.RADIUS = 20;
Ship.COLOR = "#f4c242";

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];

  if (this.vel[0] < -8) {
    this.vel[0] = -8;
  }
  if (this.vel[0] > 8) {
    this.vel[0] = 8;
  }
  if (this.vel[1] < -8) {
    this.vel[1] = -8;
  }
  if (this.vel[1] > 8) {
    this.vel[1] = 8;
  }
};

Ship.prototype.fireBullet = function () {
  if (this.vel[0] !== 0 || this.vel[1] !== 0) {
    var bullet_vel = [this.vel[0] * 1.5, this.vel[1] * 1.5];
    var b = new Bullet({ pos: this.pos, vel: bullet_vel, game: this.game });
    this.game.bullets.push(b);
  }
};

module.exports = Ship;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(4);

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  var _this = this;

  this.bindKeyHandlers();
  setInterval(function () {
    _this.game.step();
    _this.game.draw(_this.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  var _this2 = this;

  key('down', function () {
    return _this2.game.ship.power([0, 1]);
  });
  key('up', function () {
    return _this2.game.ship.power([0, -1]);
  });
  key('left', function () {
    return _this2.game.ship.power([-1, 0]);
  });
  key('right', function () {
    return _this2.game.ship.power([1, 0]);
  });
  key('space', function () {
    return _this2.game.ship.fireBullet();
  });
};

module.exports = GameView;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//same as astreroids.js in directions

var GameView = __webpack_require__(6);
var Asteroid = __webpack_require__(3);
var Game = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", function () {
  var canvasEl = document.getElementById("game-canvas");
  canvasEl.height = window.innerHeight;
  canvasEl.width = window.innerWidth;
  var ctx = canvasEl.getContext('2d');
  new GameView(ctx).start();
});

/***/ })
/******/ ]);