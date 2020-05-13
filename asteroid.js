class Asteroid extends Hadron {
  constructor(x, y, radius, velocity) {
    // shorthand for copy all arguments to Hadron constructor
    super(...arguments);

    this.angle = 0;
    this.spin = randomGaussian(0, 0.01);
    this.clr = color(10);

    let numPoints = floor(random(5, 15));
    this.points = [];
    for (let i = 0; i < numPoints; i++) {
      let ang = map(i, 0, numPoints, 0, TWO_PI);
      // 2nd parameter controls how spikey this rock looks
      let rad = randomGaussian(this.radius, this.radius * 0.2);
      this.points.push(p5.Vector.fromAngle(ang, rad));
    }
  }

  // used for initially populating game space with randomish rocks
  static withSpeed(maxSpeed) {
    // gaussian distribution is mostly somewhere in the middle of 0..maxSpeed
    let speed = randomGaussian(maxSpeed / 2, maxSpeed / 2);
    let velocity = p5.Vector.random2D().mult(speed);
    return new Asteroid(random(width), random(height), random(15, 50), velocity);
  }

  update() {
    super.update();
    this.angle += this.spin;
  }

  render() {
    rotate(this.angle);
    blendMode(DIFFERENCE);
    stroke(255);
    strokeWeight(1);
    fill(this.clr);
    beginShape();
    for (let point of this.points) {
      vertex(point.x, point.y);
    }
    endShape(CLOSE);
  }

  // impact this asteroid and turn into smaller rocks or dust
  breakup() {
    sHit.play();

    if (this.radius > 30) {
      game.score.add(10, this.x, this.y);
    } else if (this.radius > 15) {
      game.score.add(25, this.x, this.y);
    } else {
      game.score.add(100, this.x, this.y);
    }

    for (let i = this.radius; i > 0; i--) {
      overlay.push(new Dust(this.x, this.y));
    }

    if (this.radius > minAstSize) {
      // replace self with smaller rocks on a similar trajectory
      let velocity = this.velocity.copy().rotate(randomGaussian(0, 0.5));
      game.addTarget(new Asteroid(this.x, this.y, this.radius / 2, velocity));
      velocity = this.velocity.copy().rotate(randomGaussian(0, 0.5));
      game.addTarget(new Asteroid(this.x, this.y, this.radius / 2, velocity));
    }
    game.removeTarget(this);
  }

}
