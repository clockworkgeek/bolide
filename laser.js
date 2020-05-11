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
    this.radius -= 0.4;
    // invalidate self if outside bounds
    if (this.x < 0 || this.y < 0 || this.x > width || this.y > height || this.radius < 0) {
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
    let i = friendly.indexOf(this);
    if (i >= 0) friendly.splice(i, 1);
    else {
      i = enemy.indexOf(this);
      if (i >= 0) enemy.splice(i, 1);
    }
  }

}
