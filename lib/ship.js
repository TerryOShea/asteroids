const MovingObject = require("./moving_objects.js");
const Bullet = require("./bullet.js");
const Util = require("./utils.js");

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
