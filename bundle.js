!function(t){function e(o){if(i[o])return i[o].exports;var n=i[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,o){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=7)}([function(t,e,i){"use strict";function o(t){t.color=o.COLOR,t.radius=o.RADIUS,r.call(this,t)}var n=i(2),r=i(1);o.COLOR="red",o.RADIUS=3,n.inherits(o,r),o.prototype.isWrappable=!1,t.exports=o},function(t,e,i){"use strict";function o(t,e){this.pos=t.pos,this.vel=t.vel,this.radius=t.radius,this.color=t.color,this.game=t.game}o.prototype.isWrappable=!0,o.prototype.draw=function(t){t.beginPath(),t.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI),t.fillStyle=this.color,t.fill()},o.prototype.move=function(){this.pos[0]+=this.vel[0],this.pos[1]+=this.vel[1],!this.isWrappable&&this.game.isOutOfBounds(this.pos)?this.game.remove(this):this.pos=this.game.wrap(this.pos)},o.prototype.isCollidedWith=function(t){var e=this.pos[0]-t.pos[0],i=this.pos[1]-t.pos[1],o=Math.sqrt(Math.pow(e,2)+Math.pow(i,2));return o<this.radius+t.radius},o.prototype.collideWith=function(t){},t.exports=o},function(t,e,i){"use strict";var o={inherits:function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t},randomVec:function(t){var e=2*Math.PI*Math.random();return o.scale([Math.sin(e),Math.cos(e)],t)},scale:function(t,e){return[t[0]*e,t[1]*e]}};t.exports=o},function(t,e,i){"use strict";function o(t){t.color=o.COLOR,t.radius=o.RADIUS,t.vel=n.randomVec(5),r.call(this,t)}var n=i(2),r=i(1),s=i(5),a=i(0);n.inherits(o,r),o.COLOR="white",o.RADIUS=10,o.prototype.collideWith=function(t){t instanceof s?t.relocate():t instanceof a&&(this.game.remove(t),this.game.remove(this))},t.exports=o},function(t,e,i){"use strict";function o(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}function n(){this.asteroids=this.addAsteroids(),this.ship=new a({pos:this.randomPosition(),game:this}),this.bullets=[],this.getImage()}var r=i(3),s=i(0),a=i(5);n.prototype.getImage=function(){var t=this,e=new Image;e.onload=function(){t.img=e},e.src="https://static.pexels.com/photos/51021/pexels-photo-51021.jpeg"},n.DIM_X=window.innerWidth,n.DIM_Y=window.innerHeight,n.NUM_ASTEROIDS=10,n.prototype.addAsteroids=function(){for(var t=[],e=0;e<n.NUM_ASTEROIDS;e++){var i=new r({pos:this.randomPosition(),game:this});t.push(i)}return t},n.prototype.randomPosition=function(){return[Math.random()*n.DIM_X,Math.random()*n.DIM_Y]},n.prototype.draw=function(t){t.clearRect(0,0,n.DIM_X,n.DIM_Y),t.drawImage(this.img,0,0,n.DIM_X,n.DIM_Y),this.allObjects().forEach(function(e){return e.draw(t)})},n.prototype.moveObjects=function(){this.allObjects().forEach(function(t){return t.move()})},n.prototype.wrap=function(t){var e=[].concat(o(t));return e[0]<=0?e[0]=n.DIM_X:e[0]>=n.DIM_X&&(e[0]=0),e[1]<=0?e[1]=n.DIM_Y:e[1]>=n.DIM_Y&&(e[1]=0),e},n.prototype.checkCollisions=function(){for(var t=this.allObjects(),e=0;e<t.length-1;e++)for(var i=e+1;i<t.length;i++)t[e].isCollidedWith(t[i])&&t[e].collideWith(t[i])},n.prototype.step=function(){this.moveObjects(),this.checkCollisions()},n.prototype.remove=function(t){t instanceof s?this.bullets.splice(this.bullets.indexOf(t),1):t instanceof r&&this.asteroids.splice(this.asteroids.indexOf(t),1)},n.prototype.allObjects=function(){return[].concat(o(this.asteroids),o(this.bullets),[this.ship])},n.prototype.isOutOfBounds=function(t){return t[0]<0||t[0]>n.DIM_X||t[1]<0||t[1]>n.DIM_Y},t.exports=n},function(t,e,i){"use strict";function o(t,e){t.radius=o.RADIUS,t.vel=[0,0],t.color=o.COLOR,n.call(this,t)}var n=i(1),r=i(2),s=i(0);o.RADIUS=20,o.COLOR="#f4c242",r.inherits(o,n),o.prototype.relocate=function(){this.pos=this.game.randomPosition(),this.vel=[0,0]},o.prototype.power=function(t){this.vel[0]+=t[0],this.vel[1]+=t[1],this.vel[0]<-8&&(this.vel[0]=-8),this.vel[0]>8&&(this.vel[0]=8),this.vel[1]<-8&&(this.vel[1]=-8),this.vel[1]>8&&(this.vel[1]=8)},o.prototype.fireBullet=function(){if(0!==this.vel[0]||0!==this.vel[1]){var t=[1.5*this.vel[0],1.5*this.vel[1]],e=new s({pos:this.pos,vel:t,game:this.game});this.game.bullets.push(e)}},t.exports=o},function(t,e,i){"use strict";function o(t){this.game=new n,this.ctx=t}var n=i(4);o.prototype.start=function(){var t=this;this.bindKeyHandlers(),setInterval(function(){t.game.step(),t.game.draw(t.ctx)},20)},o.prototype.bindKeyHandlers=function(){var t=this;key("down",function(){return t.game.ship.power([0,1])}),key("up",function(){return t.game.ship.power([0,-1])}),key("left",function(){return t.game.ship.power([-1,0])}),key("right",function(){return t.game.ship.power([1,0])}),key("space",function(){return t.game.ship.fireBullet()})},t.exports=o},function(t,e,i){"use strict";var o=i(6);i(3),i(4);document.addEventListener("DOMContentLoaded",function(){var t=document.getElementById("game-canvas");t.height=window.innerHeight,t.width=window.innerWidth;var e=t.getContext("2d");new o(e).start()})}]);