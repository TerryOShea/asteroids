const Util = require("./utils.js");
const MovingObject = require("./moving_objects.js");

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
