class Charm extends Hadron {
  constructor() {
    super(
      random(width),
      random(height),
      10,
      p5.Vector.random2D().mult(random(0.1, 1))
    );
    this.blue = color(110, 110, 255, 100);
  }

  render() {
    blendMode(DIFFERENCE);
    noStroke();
    fill(this.blue);
    rotate(PI/4);
    square(-this.radius, -this.radius, 2 * this.radius);
  }

  // gobble up charms for points
  score(ship) {
    if (ship.fireShieldOn == 0) {
      addScore(25, this.x, this.y);
      sCharm.play();
    } 
  }
  
  remove() {
    let i = targets.indexOf(this);
    targets.splice(i, 1);
  }
}
