class Heal extends Hadron {
  constructor() {
    super(
      random(width),
      random(height),
      11,
      p5.Vector.random2D().mult(random(0, level))
    );
    this.green = color(10, 200, 10, 200);
  }

  render() {
    blendMode(DIFFERENCE);
    noFill();
    stroke(this.green);
    strokeWeight(4);
    rotate(frameCount * 0.1);
    rect(0, 0, this.radius, this.radius);
  }

  // shrink the ship or replace self with a shield powerup
  heal(ship) {
    if (ship.radius >= startingShipSize) {
      ship.fireShieldOn = 0;
      ship.radius -= 2;
      addScore(-5, this.x, this.y);
      sRestorer.play();
    } else {
      let i = targets.indexOf(this);
      if (i < 0) {
        targets.push(new Ring());
      } else {
        targets[i] = new Ring();
      }
    }
  }
}