const Util = {
  inherits: function(ChildClass, ParentClass) {
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },

  // Return a randomly oriented vector with the given length.
  randomVec: function(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  // Scale the length of a vector by the given amount.
  scale: function(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};


module.exports = Util;
