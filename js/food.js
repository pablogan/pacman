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

Food.prototype.collide =  function (obstacle){
    return !(this.x + this.w < obstacle.x || 
        this.x > obstacle.x + obstacle.w ||
        this.y + this.h < obstacle.y ||
        this.y > obstacle.y + obstacle.h);
}