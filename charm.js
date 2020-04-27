class Charm extends Hadron {
  constructor() {
    super(
      random(width),
      random(height),
      20,
      p5.Vector.random2D().mult(random(0.1, 1))
    );
    this.blue = color(110, 110, 255, 100);
  }

  render() {
    push();
    blendMode(DIFFERENCE);
    noStroke();
    fill(this.blue);
    translate(this.x, this.y);
    rotate(PI/4);
    square(0, 0, this.rad);
    pop();
    
  }

  // gobble up charms for points
  score(ship) {
    if (ship.fireShieldOn == 0) {
      addScore(25, this.x, this.y);
      sCharm.play();
    } 
  }
}