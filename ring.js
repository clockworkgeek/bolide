class Ring extends Hadron {
  constructor() {
    super(
      random(width),
      random(height),
      11,
      p5.Vector.random2D().mult(random(0, level))
    );
    this.red = color(255, 0, 0);
  }

  render(x, y, r) {
    noFill();
    strokeWeight(4);
    stroke(this.red);
    circle(0, 0, this.radius);
  }

  // give the ship a shield and replace self with heal powerup
  protect(ship) {
    ship.fireShieldOn += 300; //ttl
    ship.radius -= 2;
    addScore(-150, this.x, this.y);
    sRestorer.play();
    let i = targets.indexOf(this);
    if (i < 0) {
      targets.push(new Heal());
    } else {
      targets[i] = new Heal();
    }
  }
}