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

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(2);

function Bullet(options) {
  options.color = Bullet.COLOR;
  options.radius = Bullet.RADIUS;

  MovingObject.call(this, options);
}

Bullet.COLOR = "green";
Bullet.RADIUS = 3;

Util.inherits(Bullet, MovingObject);

module.exports = Bullet;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function MovingObject(options, game) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  const xdiff = this.pos[0] - otherObject.pos[0];
  const ydiff = this.pos[1] - otherObject.pos[1];

  const dist = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2));
  return dist < this.radius + otherObject.radius;
};

MovingObject.prototype.collideWith = function(otherObject) {};

// MovingObject.prototype.relocate = function() {};
// MovingObject.prototype.power = function(impulse) {};


module.exports = MovingObject;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Util = {
  inherits(ChildClass, ParentClass) {
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },

  // Return a randomly oriented vector with the given length.
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};


module.exports = Util;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(2);
const Ship = __webpack_require__(5);
const Bullet = __webpack_require__(0);

function Asteroid(options) {
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(5);

  MovingObject.call(this, options);
}

Asteroid.COLOR = "blue";
Asteroid.RADIUS = 10;

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
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

const Asteroid = __webpack_require__(3);
const Bullet = __webpack_require__(0);
const Ship = __webpack_require__(5);


function Game() {
  this.asteroids = this.addAsteroids();
  this.ship = new Ship({ pos: this.randomPosition(), game: this });
  this.bullets = [];
}

Game.DIM_X = window.innerWidth;
Game.DIM_Y = window.innerHeight;
Game.NUM_ASTEROIDS = 20;

Game.prototype.addAsteroids = function() {
  const asteroids = [];
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    const a = new Asteroid({ pos: this.randomPosition(), game: this });
    asteroids.push(a);
  }
  return asteroids;
};

Game.prototype.randomPosition = function() {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach(obj => obj.draw(ctx));
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(obj => obj.move());
};

Game.prototype.wrap = function(pos) {
  const new_pos = [...pos];
  if (new_pos[0] <= 0) { new_pos[0] = Game.DIM_X; }
  else if (new_pos[0] >= Game.DIM_X) { new_pos[0] = 0; }

  if (new_pos[1] <= 0) { new_pos[1] = Game.DIM_Y; }
  else if (new_pos[1] >= Game.DIM_Y) { new_pos[1] = 0; }
  return new_pos;
};

Game.prototype.checkCollisions = function() {
  const objects = this.allObjects();
  for (let i = 0; i < objects.length - 1; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      if (objects[i].isCollidedWith(objects[j])) {
        objects[i].collideWith(objects[j]);
      }
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(obj) {
  if (obj instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(obj), 1);
  } else if (obj instanceof Asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(obj), 1);
  }
};

Game.prototype.allObjects = function() {
  return [...this.asteroids, ...this.bullets, this.ship];
};

module.exports = Game;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Bullet = __webpack_require__(0);
const Util = __webpack_require__(2);

function Ship(options, game) {
  options.radius = Ship.RADIUS;
  options.vel = [0, 0];
  options.color = Ship.COLOR;

  MovingObject.call(this, options);
}

Ship.RADIUS = 20;
Ship.COLOR = "#e24a4a";

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function() {
  if (this.vel[0] !== 0 || this.vel[1] !== 0) {
    const bullet_vel = [this.vel[0] * 3, this.vel[1] * 3];
    const b = new Bullet({ pos: this.pos, vel: bullet_vel, game: this.game });
    this.game.bullets.push(b);
  }
};

module.exports = Ship;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);

function GameView(ctx) {
  this.game = new Game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function() {
  key('down', () => this.game.ship.power([0, 1]) );
  key('up', () => this.game.ship.power([0, -1]) );
  key('left', () => this.game.ship.power([-1, 0]) );
  key('right', () => this.game.ship.power([1, 0]) );
  key('space', () => this.game.ship.fireBullet() );
};

module.exports = GameView;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

//same as astreroids.js in directions

const GameView = __webpack_require__(6);
const Asteroid = __webpack_require__(3);
const Game = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.height = window.innerHeight;
  canvasEl.width = window.innerWidth;
  const ctx = canvasEl.getContext('2d');

  new GameView(ctx).start();
});


/***/ })
/******/ ]);