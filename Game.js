var ship;
var asteroids = [];
var lasers = [];
var win = false;
var numAsts = 0;
let bg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = loadImage('space.jpg');
  ship = new Ship();
  numAsts = random(1, 5);
  for(var i = 0; i < numAsts; i++){
    asteroids.push(new Asteroids());
  }
}

function draw() {
  background(20,0,60);
  strokeWeight(1);
  stroke(255);
  textSize(32);
  textFont('Georgia');
  textStyle(BOLD);
  fill(255,255,255);
  textAlign(LEFT);
  text('Welcome to Asteroids!',150,100);
  textSize(20);
  textStyle(BOLD);
  text('To start, press any key.', 150, 200);
  strokeWeight(4);
  stroke(255, 107, 107);
  fill(250, 35, 63);
  circle(540, 400, 150);
  fill(255, 200, 148);
  stroke(255, 200, 148);
  circle(495, 370, 30);
  circle(520, 339, 5);
  textAlign(CENTER);
  textSize(30);
  textStyle(BOLDITALIC);
  strokeWeight(1);
  stroke(169);
  fill(150);
  text('Do not ', 535, 399);
  text('Press!', 535, 439);
  stroke(255);
  fill(255);
  text('Do not ', 540, 400);
  text('Press!', 540, 440);
  if(key) {
    game();
  }
  if(asteroids.length == 0){
    endGame();
  }
  if(win == true){
    background(0,0,0);
    textAlign(CENTER);
    textStyle(NORMAL);
    text('You were hit by an asteroid.', 350, 220);
    text('Now you are hurling towards the sun. ', 350, 250);
    fill(255, 246, 148);
    circle(windowWidth/1.1, windowHeight/1.5, 50);

    noLoop();
  }
}

function game(){
  background(bg);
  stars();
  win = false;
  for(var i = 0; i < asteroids.length; i++){
    if(ship.hits(asteroids[i])) {
      win = true;
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }
  
  for(i = lasers.length - 1; i >= 0; i--) {
    lasers[i].printScore();
    lasers[i].render();
    lasers[i].update();
    if(lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for(var j = asteroids.length - 1; j >= 0; j--){
        if(lasers[i].hits(asteroids[j])){
          if(asteroids[j].r > 10){
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i,1);
          break;
        }  
      }
    }
  }
  
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

}
function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if(key == ' '){
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if(keyCode == RIGHT_ARROW){
    ship.setRotation(0.1);
  } else if(keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  }else if(keyCode == UP_ARROW){
    ship.boosting(true);
  }
}
function endGame(){
  background(0);
  var r = 92;
  var g = 242;
  var b = 250;
  stroke(r, g, b);
  strokeWeight(4);
  for(i = 0; i < 3; i++){
    point(random(width), random(height));
    circle(random(width), random(height), random(10));
    circle(random(width), random(height), random(3));
  }

  strokeWeight(1.5);
  fill(255, 186, 226);
  stroke(255,186, 226);
  textAlign(CENTER);
  text('Press r to reset game. ', 200, 200);
  text('You Won!!!', 200, 150);
  text('Your score was: ' + score, 200, 170);
  if(key == 'r'){
    score = 0;
    setup();
    draw();
  }
}
function stars(){
  stroke(255);
  strokeWeight(2);
  point(random(width), random(height));
}
