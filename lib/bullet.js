const MovingObject = require("./moving_objects.js");
const Util = require("./utils.js");

function Bullet(options) {
  options.color = Bullet.COLOR;
  options.radius = Bullet.RADIUS;

  MovingObject.call(this, options);
}

Bullet.COLOR = "green";
Bullet.RADIUS = 3;

Util.inherits(Bullet, MovingObject);

module.exports = Bullet;
