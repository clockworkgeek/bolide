class Attacker {
  constructor() {
    this.vel = p5.Vector.random2D().mult(random(-astSpeed, astSpeed));
    this.pos = createVector(random(width), random(height));
    this.r = 11;
    this.angle = 0;
    this.typeArr = ['starter'];
    this.type = this.typeArr[type];
  }

  update() {
    this.pos.add(this.vel);
  }

  render() {
    switch (this.type) {
      case 'starter':
        push();
        blendMode(DIFFERENCE);
        noStroke();
        fill(10, 200, 10, 200);
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rect(0, 0, this.r, this.r);
        pop();
        this.angle += 0.05;
        break;
    }
  }
  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}

