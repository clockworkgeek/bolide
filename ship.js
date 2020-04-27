class Ship extends Hadron {
  constructor() {
    super(width / 2, height / 2, startingShipSize);
    this.heading = 0;
    this.isBoosting = false;
    this.fireShieldOn = 0;
    this.cooldown = 10; // firing speed
    this.cooling = 0;
    this.filling = color(0, 0, 0);
    this.red = color(255, 0, 0);
    this.white = color(255);
    this.yellow = color(255, 255, 0);
  }

  // increase effective radius if shield is on since it is bigger than ship
  collide(object) {
    if (this.fireShieldOn) {
      this.radius *= 3;
      let result = super.collide(object);
      this.radius /= 3;
      return result;
    }
    return super.collide(object);
  }

  // ship has taken damage
  hit(source) {
    ship.radius += 0.1;
    sDead.play();
    if (source instanceof Laser) {
      sFizzle.play();
      addScore(-10, this.x, this.y);
    }
  }

  update() {

    // grow/shrink slowly to true size
    this.radius += (startingShipSize - this.radius) / 1000;
    this.filling.setRed(map(this.radius, startingShipSize, maxShipSize, 0, 255));

    // fire control
    if (this.cooling) {
      this.cooling--;
    } else if (keyIsDown(SPACE)) {
      sShoot.play();
      friendly.push(new Laser(this, randomGaussian(this.heading, 0.06)));
      this.cooling = this.cooldown;
    }

    // navigation
    if (keyIsDown(RIGHT_ARROW)) {
      this.heading += 0.1;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.heading -= 0.1;
    }

    // engine room
    this.isBoosting = keyIsDown(UP_ARROW);
    let thrustForce = p5.Vector.fromAngle(this.heading);
    if (this.isBoosting) {
      thrustForce.setMag(0.1);
    } else if (keyIsDown(DOWN_ARROW)) {
      thrustForce.setMag(-0.1);
    } else {
      thrustForce.setMag(0);
    }
    this.velocity.add(thrustForce);

    this.velocity.mult(0.99);

    // defenses
    if (ship.fireShieldOn) {
      ship.fireShieldOn--;
    }

    super.update();
  }

  render() {
    const r = this.radius;

    // when making clone mode
    // use push and pop blocks to contain all clones

    rotate(this.heading + HALF_PI);
    if (this.isBoosting) {
      fill(this.yellow);
      noStroke();
      triangle(-r + 4, r,
        r - 4, r,
        0, r + 19);
    }

    fill(this.filling);
    stroke(this.white);
    triangle(-r, r,
      r, r,
      0, -r - 11);

    stroke(this.red);
    triangle(-r, r - 7,
      r, r - 7,
      0, -(r + 11));

    if (this.fireShieldOn) {
      noFill();
      stroke(this.red);
      strokeWeight(3);
      circle(0, 0, r * 5);
    }
  }

}