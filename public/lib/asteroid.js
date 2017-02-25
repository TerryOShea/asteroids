const Util = require("./utils.js");
const MovingObject = require("./moving_objects.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

function Asteroid(options) {
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(5);

  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.COLOR = "white";
Asteroid.RADIUS = 10;

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  } else if (otherObject instanceof Bullet) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

module.exports = Asteroid;
