// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //set random x and y starting coordinates
    this.x = x;
    this.y = y;
    this.speed = 100;
    this.width = 90;
    this.height = 65;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y){
    this.x = x;
    this.y = y;
    this.speed = 100;
    this.width = 80;
    this.height = 70;
    this.sprite = 'images/char-cat-girl.png';

}
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
    //When player gets to the water, you win!
    if (this.y < -) {
        alert("You win!");
    }
    //Player can't move down off canvas
    if (this.y > 420) {
        this.y = 420;
    }

    //When the player moves off canvas to the left or right, it appears at the opposite side
    if (this.x > 420 || this.x < 0){
        if (this.x > 420) {
            this.x = 0;
        }
        else {
            this.x = 400;
        }
    }
   this.checkCollisions();
};

Player.prototype.handleInput = function(direction) {
    if (direction === "up") {
        this.y = this.y - 90;
    } else if (direction === "down") {
        this.y = this.y + 90;
    } else if (direction === "left") {
        this.x = this.x - 100;
    } else if (direction === "right") {
        this.x = this.x + 100;
    }

};

Player.prototype.checkCollisions = function (){

    for (i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + allEnemies[i].width &&
       this.x + this.width > allEnemies[i].x &&
       this.y < allEnemies[i].y + allEnemies[i].height &&
       this.height + this.y > allEnemies[i].y) {
        console.log("collision");
        this.reset();
        }
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player reset to original position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 420;
}

// Now instantiate your objects.
var bug1 = new Enemy(-200,60);
var bug2 = new Enemy(-400, 150);
var bug3 = new Enemy(-20, 230);

// Place the player object in a variable called player
var player = new Player(200, 420);
// Place all enemy objects in an array called allEnemies
var allEnemies = [bug1, bug2, bug3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
