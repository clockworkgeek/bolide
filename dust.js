// Gently expanding, fading motes of dust

class Dust extends Hadron {
  constructor(x, y) {
    super(x, y, 3, p5.Vector.random2D().mult(random(0.2, 2.0)));
    this.clr = color(random(100, 255), random(100, 255), random(100, 255));
    this.ttl = randomGaussian(100, 20);
  }

  update() {
    super.update();
    this.radius *= 1.01; // increase rate of expansion for cloudy/bokeh effect
    this.ttl--;
    this.clr.setAlpha(this.ttl * 2);
    if (this.ttl <= 0) {
      let i = overlay.indexOf(this);
      // splicing an array while it is iterated will cause next item to skip updating for one frame
      overlay.splice(i, 1);
    }
  }

  render() {
    stroke(this.clr);
    strokeWeight(this.radius);
    point(0, 0);
  }

}