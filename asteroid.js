class Asteroid extends Hadron {
  constructor(x, y, r) {
    super(
      x || random(width),
      y || random(height),
      r * 0.5 || random(15, 50),
      p5.Vector.random2D().mult(randomGaussian(0, level + 1))
    );

    this.total = floor(random(5, 15));
    this.offset = [];
    this.clr = color(10);

    for (let i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.radius * 0.5, this.radius * 0.5);
    }

    numTargets++;
  }

  render(x, y) {
    super.render(); // Added to avoid 
    blendMode(DIFFERENCE);
    stroke(255);
    strokeWeight(1);
    fill(this.clr);
    beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI);
      let r = this.radius + this.offset[i];
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  // impact this asteroid and turn into smaller rocks or dust
  breakup() {
    sHit.play();

    if (this.radius > 30) {
      addScore(10, this.x, this.y);
    } else if (this.radius > 15) {
      addScore(25, this.x, this.y);
    } else {
      addScore(100, this.x, this.y);
    }

    for (let i = this.radius; i > 0; i--) {
      overlay.push(new Dust(this.x, this.y));
    }

    let i = targets.indexOf(this);
    if (i >= 0) {
      if (this.radius > minAstSize) {
        // replace self with smaller rocks
        targets[i] = [
          new Asteroid(this.x, this.y, this.radius),
          new Asteroid(this.x, this.y, this.radius)
        ];
      } else {
        // replace self with empty placeholder
        targets[i] = [];
      }
      numTargets--;
    }
  }

}