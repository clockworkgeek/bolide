
class Asteroid {
  constructor(pos, r) {
    this.vel = p5.Vector.random2D().mult(random(-astSpeed, astSpeed));
       // this.vel = createVector(random(-astSpeed, astSpeed), random(-astSpeed, astSpeed)); 

    this.total = floor(random(5, 15));
    this.offset = [];
    this.pointDisplay = false;
    this.clr = color(random(0, 255), random(20, 205), random(50, 200));
    
    if (pos) {
      this.pos = pos.copy(); //??
    } else {
      this.pos = createVector(random(width), random(height));
    }

    if (r) {
      this.r = r * 0.5;
    } else {
      this.r = random(15, 50);
    }

    for (var i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }

  }

  update() {
    this.pos.add(this.vel);
  }

  render() {
    push();
    blendMode(DIFFERENCE);
    stroke(255);
    strokeWeight(1);
    fill(this.clr);
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  breakup() {
    var newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }

  displayPoints() {

    if (this.pointDisplay) {
      console.log("sds");
      while (frameCount % 120 == 0) {
        push();
        noStroke();
        fill(255, 200, 200);
        textSize(50);
        text("points", this.pos.x, this.pos.y);
        pop();
      }
    }

    this.pointDisplay = false;

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