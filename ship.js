class Ship {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.r = startingShipSize;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.clr = 0;
    this.isBoosting = false;
    this.isReversing = false;
    this.thrustAlpha = 0;
    this.fireShieldOn = 0;
  }

  boosting(b) {
    this.isBoosting = b;
  }

  reversing(r) {
    this.isReversing = r;
  }

  update() {
    if (this.isBoosting) {
      this.boost();
    }
    if (this.isReversing) {
      this.reverse();
    }

    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  boost() {
    this.thrustAlpha = 200;
    var thrustForce = p5.Vector.fromAngle(this.heading);
    thrustForce.mult(0.1);
    this.vel.add(thrustForce);
  }

  reverse() {
    var reverseForce = p5.Vector.fromAngle(this.heading);
    reverseForce.mult(-0.1);
    this.vel.add(reverseForce);
  }

  hits(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (this.fireShieldOn) {
      d = d - 20;
    }

    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  floaterConnect(floater) {
    var d = dist(this.pos.x, this.pos.y, floater.pos.x, floater.pos.y);
    if (d < this.r + floater.r) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    
    // when making clone mode
    // use push and pop blocks to contain all clones

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    fill(255, 255, 0, this.thrustAlpha);
    noStroke();
    triangle(-this.r + 4, this.r,
      this.r - 4, this.r,
      0, this.r + 19);

    fill(this.clr, 0, 0);
    stroke(255);
    triangle(-this.r, this.r,
      this.r, this.r,
      0, -this.r - 11);

    stroke(255, 0, 0);
    triangle(-this.r, this.r - 7,
      this.r, this.r - 7,
      0, -(this.r + 11));
    pop();
    
    if (this.fireShieldOn) {
      push();
      noFill();
      stroke(255, 0, 0);
      strokeWeight(3);
      translate(this.pos.x, this.pos.y);
      ellipse(0, 0, this.r * 5);
      pop();
    }
  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  setRotation(a) {
    this.rotation = a;
  }

  turn() {
    this.heading += this.rotation;
  }

}