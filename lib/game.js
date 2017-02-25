const Asteroid = require('./asteroid.js');
const Bullet = require('./bullet.js');
const Ship = require('./ship.js');


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
