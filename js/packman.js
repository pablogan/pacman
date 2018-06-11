//DEFINO LOS MOVIMIENTOS QUE HACE PACKMAN

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var SPEED_MOVE = 1;
var FRICTION = 0.3;

//DEFINO PROPIEDADES DE PACKMAN

function Packman(ctx) {
    this.ctx = ctx ;

    this.w = 30;
    this.h = 30;

    this.img = new Image();
    this.img.src = "img/pacman_sprite.png";
    this.img.frames = 5;
    this.img.frameIndex = 0;
    this.img.animateEvery = 5;

    this.x = 0;
    this.y = 0;

    this.vx = 0;
    this.vy = 0;

    this.drawCounter = 0;

    this.movements = {
        up: false,
        down: false,
        up: false,
        left: false
    }

    this.onKeyEvent(this.movements);
}

//DEFINO LOS MOVIMIENTOS ASOCIADOS CON LAS TECLAS

Packman.prototype.onKeyEvent = function(event) {
    var state = (event.type === 'keydown' ? true : false);

    switch(event.keyCode) {
        case KEY_UP:
            this.movements.up = state;
            break;
        case KEY_DOWN:
            this.movements.down = state;
            break;
        case KEY_LEFT:
            this.movements.left = state;
            break;
        case KEY_RIGHT:
            this.movements.right = state;
            break;
    }
}

// ASOCIO LOS MOVIMIENTOS CON ANIMACIONES

Packman.prototype.animate = function() {
    this.vx *= FRICTION;
    this.vy *= FRICTION;

    this.move();

    if (this.drawCounter % this.img.animateEvery === 0) {
        this.img.frameIndex += 1;
    
        if (this.img.frameIndex >= this.img.frames) {
          this.img.frameIndex = 0;
        }
    
        this.drawCounter = 0;
      }
 }


Packman.prototype.move = function() {
    this.checkLimits();

    this.x += this.vx;
    this.y += this.vy;

    if (this.movements.up) {
        this.vy -= SPEED_MOVE; 
    }

    if (this.movements.down) {
        this.vy += SPEED_MOVE; 
    }

    if (this.movements.left) {
        this.vx -= SPEED_MOVE; 
    }

    if (this.movements.right) {
        this.vx += SPEED_MOVE; 
    }
}

Packman.prototype.checkLimits = function() {

    if (this.x < 0)this.x = 0;

    if (this.x + this.w > this.ctx.canvas.width){
        this.x = this.ctx.canvas.width - this.w;
    }
    if (this.y < 0)this.y = 0;
 
    if (this.y + this.h > this.ctx.canvas.height){
    this.y = this.ctx.canvas.height - this.h;
    }
}


//COMO HACER PARA QUE LA COMIDA COLISIONE CON PACMAN

Packman.prototype.checkEat = function(food) {

    food = food.filter(function(food){
        return !food.collide(this);
    }.bind(this));

    console.log(food)
}

Packman.prototype.draw = function() {    
    //definir cada frames de la imagen
    this.ctx.drawImage(        
        this.img,
        this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
        0,
        this.img.width / this.img.frames,
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h
    );

    this.drawCounter++;

    this.animate();
};

Packman.prototype.checkCollisions = function (obstacles){

    var collisions = obstacles.filter(function(obstacle){
        return obstacle.collide(this);
    }.bind(this));

    collisions.forEach(function(obstacle){
        if (obstacle instanceof Obstacle) {
            this.collideWithWall(obstacle);
        } 
    }.bind(this))
 }


Packman.prototype.collideWithWall = function(wall) {
    if (this.x + this.w > wall.x && this.x + this.w < wall.w + wall.x) {
        this.vx = 0;
        this.movements.right = false;

    } else if (wall.x + wall.w > this.x && wall.x + wall.w < this.w + this.x) {
        this.vx = 0;
        this.movements.left = false;
    }
    if (this.y + this.h > wall.y && this.y + this.h > wall.h + wall.y) {
        this.vy = 0;
        this.movements.up = false;

    } else if (wall.y + wall.h > this.y && wall.y + wall.h > this.h + this.y){
        this.vy = 0;
        this.movements.down = false;
    };

} 