class Heal extends Hadron {
  constructor() {
    super(
      random(width),
      random(height),
      11,
      p5.Vector.random2D().mult(random(0, game.level))
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
      game.score.add(-5, this.x, this.y);
      sRestorer.play();
    } else {
      // don't use addTarget() or removeTarget() because that affects target count
      game.targets.delete(this);
      game.targets.add(new Ring());
    }
  }
}
