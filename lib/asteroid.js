const MovingObject = require("./moving_objects.js");
const Util = require("./utils.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

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
