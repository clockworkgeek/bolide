// in essence, a sophisticated heat beam
class Laser extends Hadron {
  constructor(spos, angle) {
    let vel = p5.Vector.fromAngle(angle, 10);
    super(spos.x, spos.y, 15, vel);
    this.valid = true;
    this.yellow = color(255, 240, 20);
  }

  update() {
    this.add(this.velocity);
    // invalidate self if outside bounds
    if (this.x < 0 || this.y < 0 || this.x > width || this.y > height) {
      this.remove();
    }
  }

  // override ancestor drawing with simpler way
  draw() {
    push();
    stroke(this.yellow);
    strokeWeight(this.radius);
    point(this.x, this.y);
    pop();
  }

  remove() {
    game.removeFriend(this);
    game.removeEnemy(this);
  }

}