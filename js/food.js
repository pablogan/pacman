function Food(ctx,x,y) {

    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height  = 5;
    this.weight  = 5;

    this.isHidden = false;
}

Food.prototype.draw = function(){

    this.ctx.fillRect(this.x, this.y, this.height, this.weight);
}

// Repasar estas colisiones

Food.prototype.collide =  function (packman){
    console.log(packman)
    return !(this.x + this.w < packman.x || 
    this.x > packman.x + packman.w ||
        this.y + this.h < packman.y ||
        this.y > packman.y + packman.h);
}