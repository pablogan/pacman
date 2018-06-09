function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = 660;
    this.canvas.height = 650;
    this.ctx = this.canvas.getContext('2d');
    this.fps = 50;
    this.drawIntervalId = undefined;

    
    this.obstacles = []
    this.food = []
    this.generateObstacles();

    this.packman = new Packman(this.ctx);

    console.log('Iniciando game')
}

Game.prototype.start = function() {
    this.drawIntervalId = setInterval(function() {
        this.drawAll();
        this.checkCollisions();
        this.checkEat ();
        this.moveAll();
        this.checkWin();
    }.bind(this), 1000 / this.fps);
}

Game.prototype.stop = function() {
    clearInterval(this.drawIntervalId);
}

//MAPA DE OSBTACULOS

Game.prototype.generateObstacles = function() {

    this.obstacles.push(new Obstacle(this.ctx, 60, 60, 180, 60));
    this.obstacles.push(new Obstacle(this.ctx, 60, 60, 60, 180));
    this.obstacles.push(new Obstacle(this.ctx, 300, 60, 60, 180));

    this.obstacles.push(new Obstacle(this.ctx, 420, 60, 180, 60));
    this.obstacles.push(new Obstacle(this.ctx, 540, 60, 60, 180));

    this.obstacles.push(new Obstacle(this.ctx, 60, 240, 180, 60));
    this.obstacles.push(new Obstacle(this.ctx, 420, 240, 180, 60));

    this.obstacles.push(new Obstacle(this.ctx, 60, 360, 180, 60));
    this.obstacles.push(new Obstacle(this.ctx, 60, 360, 60, 180));
    this.obstacles.push(new Obstacle(this.ctx, 60, 520, 180, 60));

    this.obstacles.push(new Obstacle(this.ctx, 420, 520, 180, 60));
    this.obstacles.push(new Obstacle(this.ctx, 420, 360, 180, 60));
    this.obstacles.push(new Obstacle(this.ctx, 540, 520, 60, -120));

    this.obstacles.push(new Obstacle(this.ctx, 300, 300, 60, 60));
    this.obstacles.push(new Obstacle(this.ctx, 300, 420, 60, 160));

    //FOOD

    this.food.push(new Food(this.ctx, 30, 30));
    this.food.push(new Food(this.ctx, 30, 60));
    this.food.push(new Food(this.ctx, 30, 90));
    this.food.push(new Food(this.ctx, 30, 120));
    this.food.push(new Food(this.ctx, 30, 150));
    this.food.push(new Food(this.ctx, 30, 180));
    this.food.push(new Food(this.ctx, 30, 210));
    this.food.push(new Food(this.ctx, 30, 240));
    this.food.push(new Food(this.ctx, 30, 270));
    this.food.push(new Food(this.ctx, 30, 300));
    this.food.push(new Food(this.ctx, 30, 330));
    this.food.push(new Food(this.ctx, 30, 360));
    this.food.push(new Food(this.ctx, 30, 390));
    this.food.push(new Food(this.ctx, 30, 420));
    this.food.push(new Food(this.ctx, 30, 450));
    this.food.push(new Food(this.ctx, 30, 480));
    this.food.push(new Food(this.ctx, 30, 510));
    this.food.push(new Food(this.ctx, 30, 540));
    this.food.push(new Food(this.ctx, 30, 570));
    this.food.push(new Food(this.ctx, 30, 600));
    this.food.push(new Food(this.ctx, 30, 630));


    this.food.push(new Food(this.ctx, 265, 30));
    this.food.push(new Food(this.ctx, 265, 60));
    this.food.push(new Food(this.ctx, 265, 90));
    this.food.push(new Food(this.ctx, 265, 120));
    this.food.push(new Food(this.ctx, 265, 150));
    this.food.push(new Food(this.ctx, 265, 180));
    this.food.push(new Food(this.ctx, 265, 210));
    this.food.push(new Food(this.ctx, 265, 240));
    this.food.push(new Food(this.ctx, 265, 270));
    this.food.push(new Food(this.ctx, 265, 300));
    this.food.push(new Food(this.ctx, 265, 330));
    this.food.push(new Food(this.ctx, 265, 360));
    this.food.push(new Food(this.ctx, 265, 390));
    this.food.push(new Food(this.ctx, 265, 420));
    this.food.push(new Food(this.ctx, 265, 450));
    this.food.push(new Food(this.ctx, 265, 480));
    this.food.push(new Food(this.ctx, 265, 510));
    this.food.push(new Food(this.ctx, 265, 540));
    this.food.push(new Food(this.ctx, 265, 570));
    this.food.push(new Food(this.ctx, 265, 600));
    this.food.push(new Food(this.ctx, 265, 630));

    this.food.push(new Food(this.ctx, 390, 30));
    this.food.push(new Food(this.ctx, 390, 60));
    this.food.push(new Food(this.ctx, 390, 90));
    this.food.push(new Food(this.ctx, 390, 120));
    this.food.push(new Food(this.ctx, 390, 150));
    this.food.push(new Food(this.ctx, 390, 180));
    this.food.push(new Food(this.ctx, 390, 210));
    this.food.push(new Food(this.ctx, 390, 240));
    this.food.push(new Food(this.ctx, 390, 270));
    this.food.push(new Food(this.ctx, 390, 300));
    this.food.push(new Food(this.ctx, 390, 330));
    this.food.push(new Food(this.ctx, 390, 360));
    this.food.push(new Food(this.ctx, 390, 390));
    this.food.push(new Food(this.ctx, 390, 420));
    this.food.push(new Food(this.ctx, 390, 450));
    this.food.push(new Food(this.ctx, 390, 480));
    this.food.push(new Food(this.ctx, 390, 510));
    this.food.push(new Food(this.ctx, 390, 540));
    this.food.push(new Food(this.ctx, 390, 570));
    this.food.push(new Food(this.ctx, 390, 600));
    this.food.push(new Food(this.ctx, 390, 630));


    this.food.push(new Food(this.ctx, 630, 30));
    this.food.push(new Food(this.ctx, 630, 60));
    this.food.push(new Food(this.ctx, 630, 90));
    this.food.push(new Food(this.ctx, 630, 120));
    this.food.push(new Food(this.ctx, 630, 150));
    this.food.push(new Food(this.ctx, 630, 180));
    this.food.push(new Food(this.ctx, 630, 210));
    this.food.push(new Food(this.ctx, 630, 240));
    this.food.push(new Food(this.ctx, 630, 270));
    this.food.push(new Food(this.ctx, 630, 300));
    this.food.push(new Food(this.ctx, 630, 330));
    this.food.push(new Food(this.ctx, 630, 360));
    this.food.push(new Food(this.ctx, 630, 390));
    this.food.push(new Food(this.ctx, 630, 420));
    this.food.push(new Food(this.ctx, 630, 450));
    this.food.push(new Food(this.ctx, 630, 480));
    this.food.push(new Food(this.ctx, 630, 510));
    this.food.push(new Food(this.ctx, 630, 540));
    this.food.push(new Food(this.ctx, 630, 570));
    this.food.push(new Food(this.ctx, 630, 600));
    this.food.push(new Food(this.ctx, 630, 630));


    this.food.push(new Food(this.ctx, 60, 30));
    this.food.push(new Food(this.ctx, 90, 30));
    this.food.push(new Food(this.ctx, 120, 30));
    this.food.push(new Food(this.ctx, 150, 30));
    this.food.push(new Food(this.ctx, 180, 30));
    this.food.push(new Food(this.ctx, 210, 30));
    this.food.push(new Food(this.ctx, 240, 30));
    this.food.push(new Food(this.ctx, 300, 30));
    this.food.push(new Food(this.ctx, 330, 30));
    this.food.push(new Food(this.ctx, 360, 30));
    this.food.push(new Food(this.ctx, 420, 30));
    this.food.push(new Food(this.ctx, 450, 30));
    this.food.push(new Food(this.ctx, 480, 30));
    this.food.push(new Food(this.ctx, 510, 30));
    this.food.push(new Food(this.ctx, 540, 30));
    this.food.push(new Food(this.ctx, 570, 30));
    this.food.push(new Food(this.ctx, 600, 30));

    this.food.push(new Food(this.ctx, 60, 330));
    this.food.push(new Food(this.ctx, 90, 330));
    this.food.push(new Food(this.ctx, 120, 330));
    this.food.push(new Food(this.ctx, 150, 330));
    this.food.push(new Food(this.ctx, 180, 330));
    this.food.push(new Food(this.ctx, 210, 330));
    this.food.push(new Food(this.ctx, 240, 330));
    this.food.push(new Food(this.ctx, 300, 330));
   
    this.food.push(new Food(this.ctx, 420, 330));
    this.food.push(new Food(this.ctx, 450, 330));
    this.food.push(new Food(this.ctx, 480, 330));
    this.food.push(new Food(this.ctx, 510, 330));
    this.food.push(new Food(this.ctx, 540, 330));
    this.food.push(new Food(this.ctx, 570, 330));
    this.food.push(new Food(this.ctx, 600, 330));


    this.food.push(new Food(this.ctx, 60, 600));
    this.food.push(new Food(this.ctx, 90, 30));
    this.food.push(new Food(this.ctx, 120, 30));
    this.food.push(new Food(this.ctx, 150, 30));
    this.food.push(new Food(this.ctx, 180, 30));
    this.food.push(new Food(this.ctx, 210, 30));
    this.food.push(new Food(this.ctx, 240, 30));
    this.food.push(new Food(this.ctx, 300, 30));
    this.food.push(new Food(this.ctx, 330, 30));
    this.food.push(new Food(this.ctx, 360, 30));
    this.food.push(new Food(this.ctx, 420, 30));
    this.food.push(new Food(this.ctx, 450, 30));
    this.food.push(new Food(this.ctx, 480, 30));
    this.food.push(new Food(this.ctx, 510, 30));
    this.food.push(new Food(this.ctx, 540, 30));
    this.food.push(new Food(this.ctx, 570, 30));
    this.food.push(new Food(this.ctx, 600, 30));







    







    



    
    
}

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.obstacles = this.obstacles.filter(function(obstacle) {
        return !obstacle.isHidden;
    });
}

Game.prototype.onKeyEvent = function(event) {
    this.packman.onKeyEvent(event);
}

Game.prototype.drawAll = function() {
    this.clear();
    this.packman.draw();
    this.obstacles.forEach(function(obstacle) {
        obstacle.draw();
    });
    this.food.forEach(function(food) {
        food.draw();
    });
}

Game.prototype.moveAll = function() {
    this.packman.move();
}

Game.prototype.checkCollisions = function () {
    this.packman.checkCollisions(this.obstacles);
}

Game.prototype.checkEat = function () {
    this.packman.checkEat(this.food);
}

Game.prototype.checkWin = function () {
    if (this.food.length === 0){
        this.win ();
    }console.log(this.food);
}

Game.prototype.win = function() {
    clearInterval(this.drawIntervalId);

    alert ("YOU WIN");
    location.reload();

}