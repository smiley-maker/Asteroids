let score = 0; 
function Laser(shipPos, angle) {
  this.pos = createVector(shipPos.x, shipPos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);
  
  this.update = function() {
    this.pos.add(this.vel);
  };
  
  this.render = function() {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  };
  
  this.hits = function(asteroids) {
    var d = dist(this.pos.x, this.pos.y, asteroids.pos.x, asteroids.pos.y);
    if(d < asteroids.r) {
      score++;
      return true;
    } else {
      return false;
    }
  };
  
  this.offscreen = function() {
    if(this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if(this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  };
  
  this.printScore = function() {
    fill(255, 204, 241);
    textAlign(LEFT);
    text("Score: " + score, 50, 200);
  }
}
