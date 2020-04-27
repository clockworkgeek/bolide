class Attacker extends Hadron {
  constructor() {
    super(
      100,
      100,
      20,
      p5.Vector.random2D().mult(astSpeed));
    numTargets++;
    this.cooldown = 600; // 10 seconds before first shot
  }

  update() {
    super.update();
    this.cooldown--;
    if (this.cooldown <= 0) {
      let angle = p5.Vector.sub(ship, this).heading();
      sShoot.play();
      enemy.push(new Laser(this, angle));
      this.cooldown = max(randomGaussian(100 / astSpeed, 10), 10);
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
    addScore(1000, this.x, this.y);

    const i = enemy.indexOf(this);
    if (i >= 0) {
      enemy.splice(i, 1);
      numTargets--;
    }
  }
}