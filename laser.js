class Laser {
  constructor(spos, angle) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(10);
  }

  update() {
    this.pos.add(this.vel);
  }

  render() {
    push();
    stroke(255, 240, 20);
    strokeWeight(15);
    point(this.pos.x, this.pos.y);
    pop();
  }

  hits(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      if (asteroid.r > 30) {
        asteroidTotal += 10;
      } else if (asteroid.r < 25 && asteroid.r > 15) {
        asteroidTotal += 25;
      } else if (asteroid.r < 15) {
        asteroidTotal += 100;
      }
      return true;
    } else {
      return false;
    }
  }

  
  
  offscreen() {
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  }


}