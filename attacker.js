class Attacker extends Hadron {
  constructor(speed) {
    super(
      random(width),
      random(height),
      20,
      p5.Vector.random2D().mult(speed));
    this.cooldown = 600; // 10 seconds before first shot
    this.speed = speed;
  }

  update() {
    super.update();
    this.cooldown--;
    if (this.cooldown <= 0) {
      let angle = p5.Vector.sub(game.ship, this).heading();
      sShoot.play();
      game.addEnemy(new Laser(this, angle));
      this.cooldown = max(randomGaussian(100 / this.speed, 10), 10);
    }
  }

  render() {
    const r = this.radius;
    stroke(255);
    strokeWeight(4);
    fill(0);
    ellipse(0, 0, r * 2.2, r * 1.6);
    line(r * -1.3, 0, r * 1.3, 0);
  }

  hit() {
    sHit.play();
    game.score.add(1000, this.x, this.y);
    game.removeEnemy(this);
  }
}
