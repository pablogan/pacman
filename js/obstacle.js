function Obstacle(ctx,x,y,w,h) {

    this.ctx = ctx
    this.x = x;
    this.y = y;
    this.h  = h;
    this.w  = w;
    
    
    this.isHidden = false;
}

Obstacle.prototype.collide =  function (obstacle){
    return !(this.x + this.w < obstacle.x || 
        this.x > obstacle.x + obstacle.w ||
        this.y + this.h < obstacle.y ||
        this.y > obstacle.y + obstacle.h);
}

Obstacle.prototype.draw = function(){
    this.ctx.fillRect(this.x, this.y, this.w, this.h)
}