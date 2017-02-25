const MovingObject = require("./moving_objects.js");
const Util = require("./utils.js");
const Bullet = require("./bullet.js");

function Ship(options, game) {
  options.radius = Ship.RADIUS;
  options.vel = [0, 0];
  options.color = Ship.COLOR;

  MovingObject.call(this, options);
}

Ship.RADIUS = 20;
Ship.COLOR = "#f4c242";

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];

  if (this.vel[0] < -8) { this.vel[0] = -8; }
  if (this.vel[0] > 8) { this.vel[0] = 8; }
  if (this.vel[1] < -8) { this.vel[1] = -8; }
  if (this.vel[1] > 8) { this.vel[1] = 8; }
};

Ship.prototype.fireBullet = function() {
  if (this.vel[0] !== 0 || this.vel[1] !== 0) {
    const bullet_vel = [this.vel[0] * 1.5, this.vel[1] * 1.5];
    const b = new Bullet({ pos: this.pos, vel: bullet_vel, game: this.game });
    this.game.bullets.push(b);
  }
};

module.exports = Ship;
